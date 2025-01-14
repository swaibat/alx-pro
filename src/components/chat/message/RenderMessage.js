import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import ContentType from './ContentType'
import { convertTo12HourFormat } from '@/scripts/Time'
import { colors } from '@/constants/theme'
import { Chat } from 'phosphor-react-native'

const RenderMessage = ({
  item,
  setSelectedMessage,
  setPopoverVisible,
  isPopoverVisible,
}) => {
  const [isLongPressed, setIsLongPressed] = useState(false)

  const handleLongPress = message => {
    setIsLongPressed(true)
    setSelectedMessage(message)
    setPopoverVisible(true)
  }

  const handlePressOut = () => {
    if (!isPopoverVisible) {
      setIsLongPressed(false)
    }
  }

  useEffect(() => {
    if (!isPopoverVisible) {
      setIsLongPressed(false)
    }
  }, [isPopoverVisible])

  return (
    <TouchableOpacity
      style={sx.touchableContainer(isLongPressed)}
      onLongPress={e => handleLongPress(item, e)}
      onPressOut={handlePressOut}
      delayLongPress={200}
    >
      <View
        style={[
          sx.messageContainer,
          item.to ? sx.inComingMessage : sx.myMessage,
        ]}
      >
        <ContentType item={item} />
        <Text style={sx.messageTime}>
          {item.createdAt
            ? convertTo12HourFormat(item.createdAt)
            : 'Sending...'}
        </Text>
        <Chat
          size={40}
          style={item.to ? sx.chatIncoming : sx.chatOutgoing}
          color={item.to ? colors.grey[300] : '#004F70'}
          weight="fill"
        />
      </View>
    </TouchableOpacity>
  )
}

export default RenderMessage

export const sx = StyleSheet.create({
  touchableContainer: isLongPressed => ({
    backgroundColor: isLongPressed ? colors.orange[200] : 'transparent',
    marginBottom: 5,
    borderRadius: 5,
  }),
  messageContainer: {
    marginVertical: 5,
    padding: 7,
    maxWidth: '80%',
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    borderBottomLeftRadius: 20,
  },
  messageTime: { color: colors.grey[500], fontSize: 10, marginLeft: 'auto' },
  myMessage: { backgroundColor: '#004F70', alignSelf: 'flex-end' },
  inComingMessage: {
    backgroundColor: colors.grey[300],
    alignSelf: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 0,
  },
  chatIncoming: {
    position: 'absolute',
    left: -7,
    zIndex: -1,
    bottom: -3.7,
    transform: [{ rotate: '-90deg' }, { scaleY: -1 }],
  },
  chatOutgoing: {
    position: 'absolute',
    right: -7,
    zIndex: -1,
    bottom: -3.7,
    transform: [{ rotate: '270deg' }],
  },
})
