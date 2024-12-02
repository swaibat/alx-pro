import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { View, StyleSheet, Alert, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native'
import { ArrowElbowUpLeft, Copy, TrashSimple } from 'phosphor-react-native'
import { useGetMessagesQuery } from '@/api'
import { useSelector } from 'react-redux'
import { Text } from '@/components/@ui/Text'
import TopToolbar from '@/components/chat/TopToolbar'
import Clipboard from '@react-native-clipboard/clipboard'
import { FlashList } from '@shopify/flash-list'
import CustomPopover from '@/components/chat/Popover'
import InputContainer from '@/components/chat/InputContainer'
import Loading from '@/components/global/Loading'
import EmptyChatScreen from '@/components/chat/Empty'
import { useLocalSearchParams } from 'expo-router'
import RenderMessage from '@/components/chat/message/RenderMessage'

const ITEMS_PER_PAGE = 200

const ChatScreen = () => {
  const [newMessage, setNewMessage] = useState('')
  const [popoverVisible, setPopoverVisible] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 })
  const [replyingTo, setReplyingTo] = useState('')
  const [pageLimit, setPageLimit] = useState(ITEMS_PER_PAGE)
  const { product } = useLocalSearchParams()

  const flatListRef = useRef(null)
  const { refetch, isFetching, isLoading } = useGetMessagesQuery({
    limit: pageLimit,
  })
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

  const renderDate = date => (
    <View style={sx.dateContainer}>
      <Text style={sx.dateText}>{date}</Text>
    </View>
  )

  const loadMoreMessages = useCallback(() => {
    if (messages?.hasNextPage && !isFetching) {
      setPageLimit(messages?.limit + ITEMS_PER_PAGE)
      refetch()
    }
  }, [messages, isFetching, refetch])

  return (
    <SafeAreaView style={sx.container}>
      <View style={sx.header}>
        <TopToolbar />
      </View>
      <ImageBackground
        source={{
          uri: 'https://cloud.githubusercontent.com/assets/398893/15136779/4e765036-1639-11e6-9201-67e728e86f39.jpg',
        }} // Set your background image path here
        style={sx.backgroundImage}
      >
        <FlashList
          ref={flatListRef}
          data={groupedMessages}
          keyExtractor={item => item.date}
          renderItem={({ item }) => (
            <>
              {renderDate(item.date)}
              {item.messages.map(msg => (
                <View key={msg._id}>
                  <RenderMessage
                    item={msg}
                    setSelectedMessage={setSelectedMessage}
                    setPopoverPosition={setPopoverPosition}
                    setPopoverVisible={setPopoverVisible}
                  />
                </View>
              ))}
            </>
          )}
          inverted
          estimatedItemSize={100}
          contentContainerStyle={sx.listContent}
          onEndReached={loadMoreMessages}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            !isLoading && (
              <View style={sx.emptyWrapper}>
                <EmptyChatScreen />
              </View>
            )
          }
          ListFooterComponent={
            isLoading && <Loading text={'Loading Conversation...'} />
          }
        />
      </ImageBackground>
      <View style={sx.footer}>
        <InputContainer
          replyingTo={replyingTo}
          clearReplyingTo={clearReplyingTo}
          setNewMessage={setNewMessage}
          newMessage={newMessage}
          setReplyingTo={setReplyingTo}
          refetch={refetch}
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

const sx = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { position: 'absolute', top: 0, width: '100%', zIndex: 1 },
  footer: { position: 'absolute', bottom: 0, width: '100%', zIndex: 1 },
  messageText: { color: 'black' },
  dateContainer: { marginVertical: 10, alignItems: 'center' },
  dateText: { color: '#aaa', fontSize: 12 },
  listContent: { paddingTop: 70, paddingBottom: 100, paddingHorizontal: 15 },
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '180deg' }],
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
})

export default ChatScreen
