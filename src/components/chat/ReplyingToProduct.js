import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import AppImg from '../@ui/AppImg'

const ReplyingToProduct = ({ replyingTo }) => {
  if (replyingTo?.type !== 'product') return
  return (
    <View style={sx.replyContainer}>
      <AppImg src={replyingTo?.message?.thumbnail} style={sx.replyImage} />
      <View style={sx.productDetails}>
        <Text numberOfLines={1}>{replyingTo.message.title}</Text>
        <Text style={sx.productPrice}>UGX {replyingTo.message.price}</Text>
      </View>
    </View>
  )
}

export default ReplyingToProduct

const sx = StyleSheet.create({
  replyContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: 7,
    borderRadius: 5,
    backgroundColor: colors.grey[50],
  },
  replyImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  productDetails: {
    marginLeft: 10,
  },
  productPrice: {
    fontWeight: 'bold',
    color: colors.primary,
  },
})
