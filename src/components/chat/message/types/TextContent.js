import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'

const TextContent = ({ type, message, to, replyToMessage }) => {
  if (replyToMessage?.type !== 'text' && type !== 'text') return
  return (
    <View style={styles.container}>
      {replyToMessage?.type === 'text' && (
        <View style={styles.replyContainer}>
          <Text style={styles.replySender}>
            {replyToMessage?.to ? 'Support Team' : 'You'}
          </Text>
          <Text
            style={[
              styles.replyMessage,
              { color: to ? colors.grey[900] : colors.grey[400] },
            ]}
          >
            {replyToMessage?.message}
          </Text>
        </View>
      )}
      <Text style={to ? styles.messageText : styles.myMessageText}>
        {message}
      </Text>
    </View>
  )
}

export default TextContent

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2,
    paddingVertical: 3,
  },
  replyContainer: {
    flexWrap: 'nowrap',
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxWidth: '100%',
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    minWidth: 100,
    marginBottom: 5,
  },
  replySender: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  replyMessage: {
    color: colors.grey[300],
    backgroundColor: colors.grey[300],
  },
  messageText: {
    color: 'black',
    fontSize: 14,
  },
  myMessageText: {
    color: colors.grey[300],
    fontSize: 14,
  },
})
