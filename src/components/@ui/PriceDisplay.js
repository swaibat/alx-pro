import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '@/constants/theme'

const PriceDisplay = ({ product, size, primary }) => {
  const formattedPrice = product?.acceptInstallments
    ? (
        product?.price *
        (product?.installments.firstPayment / 100)
      ).toLocaleString()
    : product?.price?.toLocaleString()

  const discountedPrice =
    product?.price + (product?.price * product?.discount?.value) / 100

  return (
    <View style={styles.priceWrapper}>
      {!!product?.discount?.value && (
        <View style={styles.discountContainer}>
          <Text style={styles.originalPrice}>
            UGX {discountedPrice?.toLocaleString()}
          </Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.discountBadge}>
              {product?.discount?.value}% Off
            </Text>
          </View>
        </View>
      )}

      <View style={styles.priceContainer}>
        <Text
          style={[
            styles.productPrice,
            {
              color: primary ? colors.primary : '',
              fontSize: size == 'small' ? 16 : 20,
            },
          ]}
        >
          UGX {formattedPrice?.slice(0, -3)}
        </Text>
        <Text
          style={[
            styles.smallPrice,
            {
              color: primary ? colors.primary : '',
              fontSize: size == 'small' ? 12 : 20,
            },
          ]}
        >
          {formattedPrice?.slice(-3)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  priceWrapper: {
    flex: 1,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  originalPrice: {
    fontSize: 11,
    fontWeight: '500',
    textDecorationLine: 'line-through',
    color: colors.grey[800],
  },
  badgeContainer: {
    borderColor: colors.orange[200],
    backgroundColor: colors.orange[50],
    borderWidth: 0.7,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  discountBadge: {
    color: colors.orange[600],
    fontSize: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  productPrice: {
    fontWeight: 'bold',
  },
  smallPrice: {
    fontSize: 15,
    fontWeight: 'bold',
  },
})

export default PriceDisplay
