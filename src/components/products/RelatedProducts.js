import React from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useGetRelatedProductsQuery } from '@/api'
import Placeholder from '@/assets/Placeholder'
import { Text } from '@/components/@ui/Text'
import { useRouter } from 'expo-router'
import { colors } from '@/constants/theme'
import { Star } from 'phosphor-react-native'
import { FlashList } from '@shopify/flash-list'
import FreeShippingBadge from '../@ui/FreeShippingBadge'
import RatingChip from '../@ui/RatingChip'
import AppImg from '../@ui/AppImg'
import ShippedFromAbroadBadge from '../@ui/ShippedFromAbroadBadge'

const ProductCard = ({ product }) => {
  const router = useRouter()

  const formattedPrice = product?.acceptInstallments
    ? (
        product.price *
        (product?.installments.firstPayment / 100)
      ).toLocaleString()
    : product.price?.toLocaleString()

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => router.replace(`/ads/${product._id}`)}
      >
        <AppImg src={product?.thumbnail} style={styles.image} />
        <View style={styles.contentWrapper}>
          <Text style={styles.productTitle} numberOfLines={1}>
            {product.title}
          </Text>
          <FreeShippingBadge small freeShipping={product.freeShipping} />
          <ShippedFromAbroadBadge small isLocalStore={product.isLocalStore} />
          {/* <RatingChip
            average={product.averageRating}
            count={product.ratingCount}
          /> */}
          {!!product?.discount?.value && (
            <View style={styles.discountContainer}>
              <Text bold secondary delete style={styles.discountedPrice}>
                UGX{' '}
                {(
                  product.price +
                  (product.price * product.discount.value) / 100
                ).toLocaleString()}
              </Text>

              <View style={styles.badgeContainer}>
                <Text style={styles.discountBadge}>
                  {product.discount.value}% Off
                </Text>
              </View>
            </View>
          )}

          <View style={styles.priceContainer}>
            <Text primary style={styles.productPrice}>
              UGX {formattedPrice?.slice(0, -3)}
            </Text>
            <Text primary style={styles.smallPrice}>
              {formattedPrice?.slice(-3)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const LoadingGridCard = () => (
  <View style={styles.card}>
    <View style={styles.imagePlaceholder}>
      <Placeholder />
    </View>
    <View style={styles.cardText}>
      <View style={styles.textPlaceholder} />
      <View style={[styles.textPlaceholder, styles.textHalfWidth]} />
      <View style={[styles.textPlaceholder, styles.textShort]} />
    </View>
  </View>
)

const RelatedProducts = ({ productId }) => {
  const { data, isLoading } = useGetRelatedProductsQuery(productId)

  return (
    <View style={styles.relatedProductsContainer}>
      <FlashList
        data={isLoading ? Array(4).fill(0) : data?.data}
        keyExtractor={(item, index) => `item-${index}`}
        renderItem={({ item }) =>
          isLoading ? <LoadingGridCard /> : <ProductCard product={item} />
        }
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  relatedProductsContainer: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.grey[200],
    marginRight: 15,
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    padding: 7,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    borderRadius: 5,
    marginRight: 10,
  },
  cardText: {
    flex: 1,
    justifyContent: 'space-between',
  },
  imagePlaceholder: {
    height: 120,
    width: 120,
    backgroundColor: colors.grey[300],
    borderRadius: 5,
    marginBottom: 10,
  },
  textPlaceholder: {
    height: 20,
    width: '80%',
    borderRadius: 5,
    backgroundColor: colors.grey[300],
    marginBottom: 5,
  },
  textHalfWidth: {
    width: '50%',
  },
  textShort: {
    width: '30%',
  },
  productTitle: {
    fontSize: 14,
    width: '100%',
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
  badgeContainer: {
    borderColor: colors.orange[200],
    backgroundColor: colors.orange[50],
    borderWidth: 0.7,
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  discountBadge: {
    color: colors.orange[600],
    fontSize: 8,
  },
  discountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discountedPrice: {
    fontSize: 11,
  },
  contentWrapper: { gap: 3, flex: 1, paddingHorizontal: 5 },
})

export default RelatedProducts
