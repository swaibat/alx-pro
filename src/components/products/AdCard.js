import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { SealCheck, ShoppingCart, Star } from 'phosphor-react-native'
import { useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/store/cartSlice'
import { Text } from '@/components/@ui/Text'
import { colors } from '@/constants/theme'
import AppImg from '../@ui/AppImg'
import FreeShippingBadge from '../@ui/FreeShippingBadge'
import PriceDisplay from '../@ui/PriceDisplay'
import ShippedFromAbroadBadge from '../@ui/ShippedFromAbroadBadge'
import RatingChip from '../@ui/RatingChip'

const AdCard = ({ product }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => console.log('=======')}
    >
      <View style={styles.productImageContainer}>
        <AppImg src={product?.thumbnail} style={styles.productImage} />
      </View>
      <TouchableOpacity
        style={[styles.addToCartButton, { borderColor: colors.grey[600] }]}
        onPress={handleAddToCart}
      >
        <ShoppingCart size={15} color={colors.grey[600]} />
      </TouchableOpacity>
      <Text style={styles.productTitle} numberOfLines={1}>
        {product.title}
      </Text>
      <PriceDisplay primary product={product} size="small" />
      <RatingChip average={product.averageRating} count={product.ratingCount} />
      <FreeShippingBadge small freeShipping={!product.freeShipping} />
      <ShippedFromAbroadBadge small isLocalStore={product.isLocalStore} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  productCard: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 3,
    borderRadius: 8,
    padding: 5,
    overflow: 'hidden',
  },
  productImageContainer: {
    position: 'relative',
    height: 180,
    backgroundColor: '#f1f1f1',
  },
  productImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  addToCartButton: {
    borderWidth: 1,
    top: 12,
    right: 12,
    position: 'absolute',
    padding: 5,
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  smallPrice: {
    fontSize: 10,
    fontWeight: 'bold',
    lineHeight: 14,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  ratingText: {
    fontSize: 11,
    marginLeft: 2,
  },
  ratingCount: {
    fontSize: 11,
    color: '#757575',
    marginLeft: 2,
  },
})

export default React.memo(AdCard)
