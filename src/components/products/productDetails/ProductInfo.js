import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SealCheck, ShareFat } from 'phosphor-react-native'
import { colors } from '@/constants/theme'

const ProductInfo = ({ product, onShare }) => {
  const formattedPrice = product?.price?.toLocaleString()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product?.title}</Text>
      <Text style={styles.price}>UGX {formattedPrice}</Text>
      <View style={styles.row}>
        <SealCheck color="#039be5" size={15} weight="fill" />
        <Text style={styles.seller}>U-Home</Text>
      </View>
      <ShareFat onPress={onShare} size={24} color={colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  title: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 20, fontWeight: 'bold', color: colors.primary },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  seller: { fontSize: 12, marginLeft: 5 },
})

export default ProductInfo
