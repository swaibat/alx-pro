import React from 'react'
import { View, StyleSheet } from 'react-native'
import ImageReply from './ImageReply'
import LocationReply from './LocationReply'
import ProductReply from './ProductReply'
import { colors } from '@/constants/theme'
import { Text } from 'react-native-svg'

const ContentReply = ({ item }) => {
  if (
    !item.replyToMessage?.message?.length ||
    (!item.replyToMessage?.message?.length && !item.replyToProductDetails?._id)
  )
    return

  return (
    <View style={styles.replyContainer}>
      <ImageReply replyToMessage={item.replyToMessage} />
      <LocationReply replyToMessage={item.replyToMessage} />
      <ProductReply productDetails={item.replyToProductDetails} />
      <View style={styles.replyTo}>
        <Text style={{ fontWeight: 'bold', color: colors.primary }}>
          {item.replyToMessage?.to ? 'Support Team' : 'You'}
        </Text>
        <Text style={styles.replyToText}>{item.replyToMessage?.message}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  replyContainer: {
    // marginTop: 10,
    // paddingVertical: 2,
    // paddingHorizontal: 7,
    // borderRadius: 5,
  },
})

export default ContentReply
