import { colors } from '@/constants/theme'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ReplyingToText = ({ replyingTo: { type, message } }) => {
  if (type === 'image' || type === 'location' || type === 'product') return
  return (
    <View style={styles.replyContainer}>
      <Text style={styles.replyText}>{message}</Text>
    </View>
  )
}

export default ReplyingToText

const styles = StyleSheet.create({
  replyContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: 7,
    borderRadius: 5,
    backgroundColor: colors.grey[50],
  },
  replyText: {
    fontSize: 16,
  },
})
