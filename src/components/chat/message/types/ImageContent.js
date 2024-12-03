import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppImg from '@/components/@ui/AppImg'
import { colors } from '@/constants/theme'

const ImageContent = ({ to, type, message, replyToMessage }) => {
  if (type !== 'image' || !Array.isArray(message) || message.length === 0) {
    return null
  }
  console.log('=============', type, '====', message)
  return (
    <View>
      <View style={styles.imageGrid}>
        {message.map((url, index) => (
          <AppImg key={index} src={url} style={styles.image} />
        ))}
      </View>
      {/* <Text style={[to ? styles.messageText : styles.myMessageText]}>
        {message}
      </Text> */}
    </View>
  )
}

export default ImageContent

const styles = StyleSheet.create({
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
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
