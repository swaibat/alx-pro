import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import { useGetRelatedProductsQuery } from '@/api'
import Placeholder from '@/assets/Placeholder'
import { Text } from '@/components/@ui/Text'
import { useRouter } from 'expo-router'
import { colors } from '@/constants/theme'
import { SealCheck, Star, Truck } from 'phosphor-react-native'
import TextSlider from './TextSlider'
import { FlashList } from '@shopify/flash-list'

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
        onPress={() => router.push('AdDetails', { id: product._id })}
      >
        <Image
          source={
            product?.thumbnail
              ? { uri: product.thumbnail }
              : require('@/assets/placeholder.png')
          }
          style={styles.image}
        />
        {/* <TouchableOpacity
          style={[styles.addToCartButton, { borderColor: colors.grey[600] }]}
          onPress={handleAddToCart}
        >
          <ShoppingCart size={15} weight="regular" color={colors.grey[600]} />
        </TouchableOpacity> */}
        <View style={{ gap: 3, flex: 1, paddingHorizontal: 5 }}>
          <Text
            style={styles.productTitle}
            numberOfLines={1}
            ellipsis
            // ellipsizeMode="tail"
          >
            {product.title}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <SealCheck color="#039be5" size={15} weight="fill" />
            <Text style={{ fontSize: 12 }} bold>
              U-Home
            </Text>
          </View>
          {/* Free Shipping Badge */}
          {product.freeShipping && (
            <View style={styles.freeShippingBadge}>
              <View
                style={{
                  backgroundColor: colors.green[500],
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                }}
              >
                <Truck color={'white'} size={13} weight="fill" />
              </View>
              <Text style={styles.freeShippingText}>Free Shipping</Text>
            </View>
          )}

          {!!product.ratingCount && (
            <View style={styles.ratingContainer}>
              <Star color="#FFC107" size={12} weight="fill" />
              <Text style={styles.ratingText}>
                {product.averageRating || 0}
              </Text>
              <Text style={styles.ratingCount}>
                ({product.ratingCount || 0})
              </Text>
            </View>
          )}

          {!!product?.discount?.value && !product?.acceptInstallments && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text bold secondary delete style={{ fontSize: 11 }}>
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

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={styles.priceContainer}>
              <Text primary style={styles.productPrice}>
                UGX {formattedPrice?.slice(0, -3)}
              </Text>
              <Text primary style={styles.smallPrice}>
                {formattedPrice?.slice(-3)}
              </Text>
            </View>
            {product?.acceptInstallments && (
              <View style={styles.badgeContainer}>
                <Text style={styles.discountBadge}>1st Pay</Text>
              </View>
            )}
          </View>

          {/* "Pay in Installments" message for non-discounted products */}
          {product?.acceptInstallments && (
            <TextSlider
              price={product.price}
              installments={product.installments}
            />
          )}
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
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    // flex: 1,
    borderWidth: 1,
    borderColor: colors.grey[200],
    marginRight: 15,
    // width: 320,
    width: Dimensions.get('window').width * 0.9,
    // height: 150,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    padding: 7,
  },
  cardContent: {
    flexDirection: 'row',
    // width: '70%',
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
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    color: colors.grey[700],
    marginBottom: 5,
  },
  location: {
    fontSize: 12,
    color: colors.grey[500],
    marginBottom: 5,
  },
  freeShippingBadge: {
    borderWidth: 0.8,
    height: 20,
    marginRight: 'auto',
    color: colors.green[500],
    borderColor: colors.green[500],
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
    marginVertical: 3,
  },
  freeShippingText: {
    color: colors.green[500],
    paddingRight: 6,
    paddingVertical: 1,
    fontSize: 10,
    marginLeft: 4,
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
  roductImageContainer: {
    position: 'relative',
    height: 180,
    backgroundColor: '#f1f1f1',
  },
  productImage: {
    width: '100%',
    height: 180,
    borderRadius: 5,
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

export default RelatedProducts
