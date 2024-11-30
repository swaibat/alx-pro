import React from 'react'
import {
  ScrollView,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { useGetViewedProductsQuery } from '@/api'
import { Text } from '@/components/@ui/Text'
import { useRouter } from 'expo-router'
import { theme } from '@/constants/theme'

const ProductSkeleton = () => (
  <View style={styles.skeletonProductContainer}>
    <View style={styles.skeletonImage} />
    <View style={styles.skeletonText} />
    <View style={styles.skeletonText} />
  </View>
)

const RecentlyViewed = ({ showAll }) => {
  const router = useRouter()
  const { data: recentlyViewedProducts, isLoading } = useGetViewedProductsQuery(
    undefined,
    {
      keepUnusedDataFor: 600,
      refetchOnReconnect: true,
      refetchOnFocus: false,
    }
  )

  const renderProduct = product => {
    const mainPrice = product?.price.toLocaleString()?.slice(0, -3)
    const smallDigits = product?.price.toLocaleString()?.slice(-3)

    return (
      <TouchableOpacity
        onPress={() => router.push(`/ads/${product._id}`)}
        key={product._id}
        style={styles.productContainer}
      >
        <Image
          source={
            product?.thumbnail
              ? { uri: product.thumbnail }
              : require('@/assets/placeholder.png')
          }
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text bold ellipsis style={styles.productCategory}>
            {product.title}
          </Text>
          <Text style={styles.productPrice}>
            UGX {mainPrice}
            <Text style={styles.smallDigits}>{smallDigits}</Text>
          </Text>
          <Text ellipsis style={styles.productCategory}>
            {product.categoryName}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderSkeleton = () => {
    const skeletonCount = Math.floor(Dimensions.get('window').width / 115) + 1
    return (
      <View style={{ flexDirection: 'row' }}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </View>
    )
  }

  return (
    (recentlyViewedProducts?.data?.length > 2 || showAll) && (
      <View
        style={{
          borderBottomWidth: showAll ? 0 : 10,
          borderBottomColor: theme.colors.grey[300],
          paddingLeft: 7,
          padding: 15,
        }}
      >
        <View style={styles.layout}>
          <View style={styles.header}>
            <Text style={styles.recentlyViewedTitle}>Recently Viewed</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {isLoading
              ? renderSkeleton()
              : recentlyViewedProducts?.data?.length > 2
                ? recentlyViewedProducts.data.map(renderProduct)
                : null}
          </ScrollView>
        </View>
      </View>
    )
  )
}

const styles = StyleSheet.create({
  layout: {
    marginVertical: 1,
  },
  header: {
    marginBottom: 10,
  },
  recentlyViewedTitle: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  productContainer: {
    width: 115,
    paddingVertical: 0,
    paddingHorizontal: 4,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  productImage: {
    height: 100,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#ddd',
  },
  productDetails: {
    // gap: 1,
  },
  productCategory: {
    fontSize: 10,
    color: '#777',
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '600',
  },
  smallDigits: {
    fontSize: 10,
    fontWeight: '400',
    verticalAlign: 'top',
  },
  productSold: {
    fontSize: 10,
    color: '#555',
  },
  skeletonProductContainer: {
    width: 115,
    paddingVertical: 0,
    paddingHorizontal: 4,
    borderRadius: 3,
    marginHorizontal: 5,
  },
  skeletonImage: {
    height: 100,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#ddd',
  },
  skeletonText: {
    height: 15,
    width: '70%',
    backgroundColor: '#ccc',
    marginTop: 5,
    borderRadius: 3,
  },
})

export default React.memo(RecentlyViewed)