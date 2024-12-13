import React, { useState, useRef, useEffect, useCallback } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
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
import SecureRoute from '@/components/global/SecureRoute'

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
    if (messages?.hasNext && !isFetching) {
      setPageLimit(messages?.limit + ITEMS_PER_PAGE)
      refetch()
    }
  }, [messages, isFetching, refetch])

  return (
    <SecureRoute>
      <SafeAreaView style={sx.container}>
        <View style={sx.header}>
          <TopToolbar />
        </View>
        <FlashList
          ref={flatListRef}
          data={messages?.docs}
          renderItem={({ item }) => (
            <View key={item.date}>
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
            </View>
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
    </SecureRoute>
  )
}

const sx = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { position: 'absolute', top: 0, width: '100%', zIndex: 1 },
  footer: { position: 'absolute', bottom: 0, width: '100%', zIndex: 1 },
  dateContainer: {
    marginVertical: 10,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'rgba(245, 245, 245, 0.5)',
  },
  dateText: { color: '#aaa', fontSize: 12 },
  listContent: {
    paddingTop: 70,
    paddingBottom: 100,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    transform: [{ rotate: '180deg' }],
  },
})

export default ChatScreen
