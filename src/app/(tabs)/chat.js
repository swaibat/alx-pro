import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Linking,
  ImageBackground,
} from 'react-native'
import { SafeAreaView } from 'react-native'
import {
  ArrowElbowUpLeft,
  Copy,
  MapPin,
  TrashSimple,
  Image as ImgIcon,
} from 'phosphor-react-native'
import {
  useGetMessagesQuery,
  useSendMessageMutation,
  useUploadFileMutation,
} from '@/api'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '@/store/socketsSlice'
import { convertTo12HourFormat } from '@/scripts/Time'
import { Text } from '@/components/@ui/Text'
import TopToolbar from '@/components/chat/TopToolbar'
import Clipboard from '@react-native-clipboard/clipboard'
import { FlashList } from '@shopify/flash-list'
import CustomPopover from '@/components/chat/Popover'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import InputContainer from '@/components/chat/InputContainer'
import Constants from 'expo-constants'
import { colors } from '@/constants/theme'
import Loading from '@/components/global/Loading'
import { useSnackbar } from '@/hooks/useSnackbar'
import EmptyChatScreen from '@/components/chat/Empty'
import { useLocalSearchParams } from 'expo-router'

const ITEMS_PER_PAGE = 200

const ChatScreen = () => {
  const [newMessage, setNewMessage] = useState('')
  const [popoverVisible, setPopoverVisible] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 })
  const [replyingTo, setReplyingTo] = useState('')
  const [pageLimit, setPageLimit] = useState(ITEMS_PER_PAGE)
  const [uploadFile] = useUploadFileMutation()
  const { triggerSnackbar } = useSnackbar()
  const { product } = useLocalSearchParams()

  const flatListRef = useRef(null)
  const dispatch = useDispatch()
  const { refetch, isFetching, isLoading } = useGetMessagesQuery({
    limit: pageLimit,
  })
  const [sendMessage] = useSendMessageMutation()
  const messages = useSelector(state => state.chat.messages)

  const groupedMessages = useMemo(() => {
    const grouped = {}
    messages?.docs?.forEach(message => {
      const date = new Date(message.createdAt || Date.now()).toDateString()
      if (!grouped[date]) grouped[date] = []
      grouped[date].push(message)
    })
    return Object.entries(grouped).map(([date, messages]) => ({
      date,
      messages: messages.reverse(),
    }))
  }, [messages])

  useEffect(() => {
    if (product) {
      setReplyingTo({ type: 'product', message: JSON.parse(product) })
    }
  }, [product])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return
    const newMessageObj = {
      _id: Date.now(),
      message: newMessage,
      ...(replyingTo?.type === 'product'
        ? { replyToProductDetails: replyingTo?.message }
        : { replyTo: replyingTo }),
    }
    dispatch(addMessage(newMessageObj))
    setNewMessage('')
    replyingTo && clearReplyingTo()

    await sendMessage({
      ...newMessageObj,
      ...(replyingTo?.type === 'product'
        ? { replyTo: undefined, replyToProduct: replyingTo?.message?._id }
        : { replyTo: replyingTo?._id }),
    }).unwrap()
    refetch()
    setReplyingTo(null)
  }

  const handleSendLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      triggerSnackbar('Permission denied: Location access needed.!')
      return
    }
    let location = await Location.getCurrentPositionAsync({})
    const { latitude, longitude } = location.coords
    const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=300x300&markers=color:red%7C${latitude},${longitude}&key=${Constants.expoConfig.extra.GOOGLE_API_KEY}`
    const locationMessage = {
      _id: Date.now(),
      message: staticMapUrl,
      type: 'location',
      replyTo: replyingTo,
    }

    dispatch(addMessage(locationMessage))
    await sendMessage({ ...locationMessage, replyTo: replyingTo._id }).unwrap()
    refetch()
  }

  const handleSendImage = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      triggerSnackbar('Image access Permission needed!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      // mediaType: ImagePicker.MediaTypes.Images,
      quality: 0.7,
      allowsMultipleSelection: true,
    })

    if (result.cancelled || !result.assets?.length) return
    const selectedImages = result.assets?.slice(0, 4)

    let imageMessages = null
    const previewUris = []

    try {
      const formData = new FormData()
      selectedImages?.forEach(asset => {
        const { uri, type } = asset
        previewUris.push(uri)
        formData.append('files', {
          uri,
          name: uri.split('/').pop(),
          type: type || 'image/png',
        })
      })

      imageMessages = {
        _id: Date.now(),
        message: previewUris.length ? JSON.stringify(previewUris) : '',
        type: 'image',
        replyTo: replyingTo,
      }
      replyingTo && clearReplyingTo()
      dispatch(addMessage(imageMessages))

      try {
        const response = await uploadFile({ formData, type: 'chat' }).unwrap()
        const imageUrls = response?.data?.data?.map(({ url }) => url)

        imageMessages = {
          _id: Date.now(),
          message: imageUrls.length ? JSON.stringify(imageUrls) : '',
          type: 'image',
          replyTo: replyingTo,
        }
        await sendMessage({
          ...imageMessages,
          replyTo: replyingTo._id,
        }).unwrap()

        refetch()
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError)

        // dispatch(
        //   addMessage({
        //     ...imageMessages,
        //     isError: true,
        //   })
        // )
        return
      }

      refetch()
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }

  const handleLongPress = (message, event) => {
    setSelectedMessage(message)
    setPopoverPosition({
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    })
    setPopoverVisible(true)
  }

  const handleReply = () => {
    setReplyingTo(selectedMessage)
    setPopoverVisible(false)
  }
  const clearReplyingTo = () => {
    setReplyingTo(null)
  }

  const handleDelete = () => {
    Alert.alert('Delete Message', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setPopoverVisible(false),
      },
    ])
  }

  const handleCopy = () => {
    Clipboard.setString(selectedMessage.message)
    Alert.alert('Copied', 'Message copied to clipboard.')
    setPopoverVisible(false)
  }

  const renderMessage = ({ item }) => {
    const renderContent = () => {
      if (item.type === 'image') {
        const imageUrls = JSON.parse(item.message)
        return (
          <View style={styles.imageGrid}>
            {imageUrls.map((url, index) => (
              <Image key={index} source={{ uri: url }} style={styles.image} />
            ))}
          </View>
        )
      }
      if (item.type === 'location') {
        return (
          <TouchableOpacity
            onPress={() => Linking.openURL(item.message)}
            style={{ flexDirection: 'row', marginVertical: 5 }}
          >
            <Image
              source={{ uri: item.message }}
              style={{ width: 150, height: 150, borderRadius: 8 }}
            />
          </TouchableOpacity>
        )
      }
      return (
        <Text style={[item.to ? styles.messageText : styles.myMessageText]}>
          {item.message}
        </Text>
      )
    }

    return (
      <TouchableOpacity
        onLongPress={e => handleLongPress(item, e)}
        style={[
          styles.messageContainer,
          item.to ? styles.theirMessage : styles.myMessage,
        ]}
      >
        {/* {item.replyTo && (
          <View style={styles.replyContainer}>
            <Text style={styles.replyText}>Replying to: {item.replyTo}</Text>
          </View>
        )} */}
        {item.replyToMessage?.message?.length ||
          (item.replyToProductDetails?._id && (
            <View style={styles.replyContainer}>
              {item.replyToMessage?.type === 'image' ? (
                <View
                  style={[styles.imageGrid, { flexWrap: 'nowrap', gap: 10 }]}
                >
                  {/* Sender label with icon for 'image' */}
                  {/* <View style={styles.replyHeader}>
                  <ImageBackground size={18} style={styles.replyIcon} />
                  <Text style={styles.replyLabel}>
                    {item.replyToMessage?.to ? 'Support Team' : 'You'}
                  </Text>
                </View> */}
                  <View>
                    <Text style={{ fontWeight: 'bold', color: colors.primary }}>
                      {item.replyToMessage?.to ? 'Support Team' : 'You'}
                    </Text>
                    <View style={styles.replyHeader}>
                      <ImgIcon size={18} style={styles.replyIcon} />
                      <Text style={styles.replyLabel}>Photo</Text>
                    </View>
                  </View>

                  {/* Display images */}
                  <View style={{ flexDirection: 'row', gap: 3 }}>
                    {JSON.parse(item.replyToMessage?.message).map(
                      (url, index) => (
                        <Image
                          key={index}
                          source={{ uri: url }}
                          style={styles.replyPreviewImage}
                        />
                      )
                    )}
                  </View>
                </View>
              ) : item.replyToMessage?.type === 'location' ? (
                <View style={styles.locationReply}>
                  <View>
                    <Text style={{ fontWeight: 'bold', color: colors.primary }}>
                      {item.replyToMessage?.to ? 'Support Team' : 'You'}
                    </Text>
                    <View style={styles.replyHeader}>
                      <MapPin size={18} style={styles.replyIcon} />
                      <Text style={styles.replyLabel}>Location</Text>
                    </View>
                  </View>
                  <Image
                    source={{ uri: item.replyToMessage?.message }}
                    style={styles.replyPreviewImage}
                  />
                </View>
              ) : item.replyToProductDetails ? (
                <View
                  style={[
                    {
                      flexWrap: 'nowrap',
                      // backgroundColor: colors.grey[50],
                      // flex: 1,
                      paddingVertical: 7,
                      // flex: 1,
                      maxWidth: '85%',
                      borderRadius: 5,
                      flexDirection: 'row',
                      gap: 10,
                    },
                  ]}
                >
                  <Image
                    source={
                      replyingTo?.message?.thumbnail
                        ? { uri: replyingTo.message.thumbnail }
                        : require('@/assets/images/placeholder.png')
                    }
                    style={styles.replyPreviewImage}
                  />
                  <View style={{ gap: 4 }}>
                    <Text numberOfLines={1} style={{ fontSize: 12 }}>
                      {item.replyToProductDetails.title}
                    </Text>
                    <View style={styles.replyHeader}>
                      <Text bold style={{ color: colors.primary }}>
                        UGX {item.replyToProductDetails.price}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.replyTo}>
                  <Text style={{ fontWeight: 'bold', color: colors.primary }}>
                    {item.replyToMessage?.to ? 'Support Team' : 'You'}
                  </Text>
                  <Text style={styles.replyToText}>
                    {item.replyToMessage?.message}
                  </Text>
                </View>
              )}
            </View>
          ))}
        {renderContent()}
        <Text style={[item.to ? styles.messageTime : styles.myMessageTime]}>
          {item.createdAt
            ? convertTo12HourFormat(item.createdAt)
            : 'Sending...'}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderDate = date => (
    <View style={styles.dateContainer}>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  )

  const loadMoreMessages = useCallback(() => {
    if (messages?.hasNextPage && !isFetching) {
      setPageLimit(messages?.limit + ITEMS_PER_PAGE)
      refetch()
    }
  }, [messages, isFetching, refetch])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TopToolbar />
      </View>
      <FlashList
        ref={flatListRef}
        data={groupedMessages}
        keyExtractor={item => item.date}
        renderItem={({ item }) => (
          <>
            {renderDate(item.date)}
            {item.messages.map(msg => (
              <View key={msg._id}>{renderMessage({ item: msg })}</View>
            ))}
          </>
        )}
        inverted
        estimatedItemSize={100}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          !isLoading && (
            <View style={styles.emptyWrapper}>
              <EmptyChatScreen />
            </View>
          )
        }
        ListFooterComponent={() => {
          if (isLoading) {
            return <Loading text={'Loading Conversation...'} />
          }
        }}
      />
      <View style={styles.footer}>
        <InputContainer
          replyingTo={replyingTo}
          clearReplyingTo={clearReplyingTo}
          setNewMessage={setNewMessage}
          newMessage={newMessage}
          handleSendMessage={handleSendMessage}
          handleSendLocation={handleSendLocation}
          handleSendImage={handleSendImage}
        />
      </View>
      <CustomPopover
        visible={popoverVisible}
        onClose={() => setPopoverVisible(false)}
        anchorPosition={popoverPosition}
        options={[
          { label: 'Reply', action: handleReply, icon: <ArrowElbowUpLeft /> },
          { label: 'Copy', action: handleCopy, icon: <Copy /> },
          { label: 'Delete', action: handleDelete, icon: <TrashSimple /> },
        ]}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { position: 'absolute', top: 0, width: '100%', zIndex: 1 },
  footer: { position: 'absolute', bottom: 0, width: '100%', zIndex: 1 },
  messageContainer: {
    marginVertical: 5,
    padding: 7,
    maxWidth: '80%',
    backgroundColor: 'red',
    borderRadius: 8,
  },
  myMessage: { backgroundColor: colors.blue[500], alignSelf: 'flex-end' },
  theirMessage: {
    backgroundColor: colors.grey[200],
    borderWidth: 0.8,
    borderColor: colors.borderColor,
    alignSelf: 'flex-start',
  },
  myMessageText: { color: 'white' },
  messageText: { color: 'black' },
  myMessageTime: { color: 'white', fontSize: 10, marginLeft: 'auto' },
  messageTime: { color: 'black', fontSize: 10 },
  dateContainer: { marginVertical: 10, alignItems: 'center' },
  dateText: { color: '#aaa', fontSize: 12 },
  replyContainer: {
    marginBottom: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: colors.blue[100],
  },
  replyText: { color: '#555' },
  replyingTo: {
    padding: 5,
    backgroundColor: colors.grey[100],
    marginBottom: 10,
  },
  replyingToText: { fontSize: 12 },
  listContent: { paddingTop: 70, paddingBottom: 100, paddingHorizontal: 15 },
  imageGrid: {
    flexDirection: 'row',
    maxWidth: 210,
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 8,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '180deg' }],
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  replyIcon: {
    marginRight: 5,
  },
  replyLabel: {
    fontSize: 14,
  },
  replyPreviewImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    // borderWidth: 0.8,
    // borderColor: colors.grey[500],
    resizeMode: 'cover',
  },
  locationReply: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  replyTo: {
    padding: 5,
    minWidth: 100,
    borderRadius: 10,
  },
  replyToText: {
    fontSize: 14,
    color: '#333',
  },
})

export default ChatScreen
