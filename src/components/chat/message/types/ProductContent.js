import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppImg from '@/components/@ui/AppImg'
import { colors } from '@/constants/theme'

const ProductContent = ({ replyToProductDetails }) => {
  if (!replyToProductDetails) return
  return (
    <View>
      <View style={styles.replyContainer}>
        <AppImg
          src={replyToProductDetails?.thumbnail}
          style={styles.replyPreviewImage}
        />
        <View style={{ gap: 4, flex: 1 }}>
          <Text numberOfLines={1} style={styles.replyTitle}>
            {replyToProductDetails.title}
          </Text>
          <View style={styles.replyHeader}>
            <Text bold style={{ color: colors.primary }}>
              UGX {replyToProductDetails.price}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ProductContent

const styles = StyleSheet.create({
  replyTitle: {
    fontSize: 12,
    color: colors.grey[300],
  },
  replyDetails: {
    gap: 4,
    flex: 1,
  },
  replyContainer: {
    flexWrap: 'nowrap',
    padding: 7,
    maxWidth: '85%',
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    minWidth: 250,
    gap: 10,
  },
  messageText: {
    color: 'black',
    fontSize: 14,
  },
  myMessageText: {
    color: colors.grey[300],
    fontSize: 14,
  },
  replyPreviewImage: {
    width: 45,
    height: 45,
    borderRadius: 10,
    resizeMode: 'cover',
  },
})
