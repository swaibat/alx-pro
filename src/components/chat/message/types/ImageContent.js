import { StyleSheet, View } from 'react-native'
import React from 'react'
import AppImg from '@/components/@ui/AppImg'

const ImageContent = ({ type, message }) => {
  if (type !== 'image' || !Array.isArray(message) || message.length === 0) {
    return null
  }
  return (
    <View>
      <View style={styles.imageGrid}>
        {message.map((url, index) => (
          <AppImg key={index} src={url} style={styles.image} />
        ))}
      </View>
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
})
