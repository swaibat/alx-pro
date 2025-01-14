import React from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { X } from 'phosphor-react-native'
import { colors, theme } from '@/constants/theme'
import Divider from '@/components/@ui/Divider'
import SendImageBtn from './SendImageBtn'
import ReplyingToImage from './ReplyingToImage'
import ReplyingToLocation from './ReplyingToLocation'
import ReplyingToText from './ReplyingToText'
import ReplyingToProduct from './ReplyingToProduct'
import SendLocationBtn from './SendLocationBtn'
import SendTextMessage from './SendTextMessage'

const InputContainer = ({
  setNewMessage,
  newMessage,
  replyingTo,
  setReplyingTo,
  clearReplyingTo,
  refetch,
}) => {
  return (
    <KeyboardAvoidingView
      style={sx.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {replyingTo?.type && (
        <View style={sx.replyToContainer}>
          <View style={sx.replyingContainer}>
            <ReplyingToImage replyingTo={replyingTo} />
            <ReplyingToLocation replyingTo={replyingTo} />
            <ReplyingToText replyingTo={replyingTo} />
            <ReplyingToProduct replyingTo={replyingTo} />
          </View>
          <View style={sx.cancelContainer}>
            <TouchableOpacity
              onPress={clearReplyingTo}
              style={sx.clearReplyButton}
            >
              <X size={15} weight="light" color={theme.colors.grey[50]} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={sx.inputContainer}>
        <View style={sx.inputSubContainer}>
          <SendLocationBtn replyingTo={replyingTo} refetch={refetch} />
          <Divider
            type="vertical"
            color={theme.colors.grey[700]}
            style={sx.divider}
          />

          <TextInput
            style={sx.input}
            value={newMessage}
            multiline
            placeholderTextColor={theme.colors.grey[700]}
            onChangeText={setNewMessage}
            keyboardAppearance="dark"
            placeholder="Type a message..."
          />
          <SendImageBtn
            replyingTo={replyingTo}
            clearReplyingTo={clearReplyingTo}
            refetch={refetch}
          />
        </View>

        <SendTextMessage
          newMessage={newMessage}
          replyingTo={replyingTo}
          setNewMessage={setNewMessage}
          setReplyingTo={setReplyingTo}
          clearReplyingTo={clearReplyingTo}
          refetch={refetch}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

const sx = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopWidth: 0.8,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 'auto',
    minHeight: 40,
    borderRadius: 20,
    paddingHorizontal: 3,
    backgroundColor: '#f0f0f0',
  },
  replyingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    borderWidth: 0.8,
    borderRadius: 5,
    borderColor: colors.grey[400],
  },
  clearReplyButton: {
    backgroundColor: theme.colors.grey[700],
    padding: 2,
    borderRadius: 3,
  },
  replyToContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopColor: colors.grey[100],
    borderTopWidth: 0.8,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  inputSubContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 7,
    backgroundColor: '#f0f0f0',
  },
  cancelContainer: {
    marginLeft: -15,
    marginTop: -5,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  divider: { height: 20, marginHorizontal: 4 },
})

export default InputContainer
