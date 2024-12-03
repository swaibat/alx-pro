import { StyleSheet } from 'react-native'
import React from 'react'
import { useSendMessageMutation } from '@/api'
import { PaperPlaneRight } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { addMessage } from '@/store/socketsSlice'
import { useDispatch } from 'react-redux'
import { colors } from '@/constants/theme'

const SendTextMessage = ({
  newMessage,
  replyingTo,
  setNewMessage,
  setReplyingTo,
  clearReplyingTo,
  refetch,
}) => {
  const [sendMessage] = useSendMessageMutation()
  const dispatch = useDispatch()

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return
    const newMessageObj = {
      _id: Date.now(),
      message: newMessage,
      type: 'text',
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
  return (
    <TouchableOpacity
      onPress={handleSendMessage}
      disabled={!newMessage.trim()}
      style={[sx.sendButton, !newMessage.trim() && sx.sendButtonDisabled]}
    >
      <PaperPlaneRight size={22} color="white" weight="fill" />
    </TouchableOpacity>
  )
}

export default SendTextMessage

const sx = StyleSheet.create({
  sendButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  sendButtonDisabled: {
    backgroundColor: colors.orange[400],
    opacity: 0.6,
  },
})
