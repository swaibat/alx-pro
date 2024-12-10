import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@/components/@ui/Text'
import PriceDisplay from '@/components/@ui/PriceDisplay'
import SelectedVariantsRow from '@/components/products/SelectedVariantsRow'
import { colors } from '@/constants/theme'
import QuantityControls from './QuantityControls'
import AppImg from '../@ui/AppImg'

const CartItemCard = ({ item, editable }) => {
  return (
    <View style={styles.cardContainer} key={item._id}>
      <View style={styles.cartItem}>
        <AppImg src={item.thumbnail} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <SelectedVariantsRow selectedVariants={item.variants} />
          <PriceDisplay product={item} size="small" />
        </View>
        <QuantityControls item={item} editable={editable} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 5,
    padding: 7,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 0,
    gap: 10,
  },
  title: { fontSize: 14, flexGrow: 1 },
  productImage: {
    width: 90,
    height: 90,
    backgroundColor: colors.borderColor,
    borderRadius: 5,
  },
  productInfo: {
    flex: 1,
  },
})

export default CartItemCard
