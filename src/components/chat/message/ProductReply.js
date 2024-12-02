import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppImg from '@/components/@ui/AppImg'
import { colors } from '@/constants/theme'

const ProductReply = ({ productDetails }) => {
  if (!productDetails) return
  return (
    <View style={styles.productReply}>
      <AppImg sr={productDetails.thumbnail} style={styles.replyPreviewImage} />
      <View style={{ gap: 4 }}>
        <Text
          numberOfLines={1}
          style={{ fontSize: 12, color: colors.grey[100] }}
        >
          {productDetails.title}
        </Text>
        <View style={styles.replyHeader}>
          <Text bold style={{ color: colors.primary }}>
            UGX {productDetails.price}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default ProductReply

const styles = StyleSheet.create({
  productReply: {
    flexWrap: 'nowrap',
    paddingVertical: 7,
    maxWidth: '85%',
    borderRadius: 5,
    flexDirection: 'row',
    gap: 10,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyPreviewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
  },
})
