import React from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '@/constants/theme'
import Placeholder from '@/assets/Placeholder'

const AdsSkeletonLoader = () => {
  return (
    <View style={styles.safeArea}>
      {[...Array(6)].map((_, index) => (
        <View style={styles.skeletonCard} key={index}>
          {/* Product Image Skeleton */}
          <View
            style={[
              styles.skeletonImageContainer,
              { backgroundColor: colors.grey[300] },
            ]}
          >
            <Placeholder />
          </View>

          {/* Add to Cart Button Skeleton */}
          <View
            style={[
              styles.skeletonAddToCartButton,
              { backgroundColor: colors.grey[300] },
            ]}
          />

          {/* Product Title Skeleton */}
          <View
            style={[styles.skeletonText, { backgroundColor: colors.grey[300] }]}
          />

          {/* Free Shipping Badge Skeleton */}
          <View
            style={[
              styles.skeletonFreeShippingBadge,
              { backgroundColor: colors.grey[300] },
            ]}
          />

          {/* Rating Text Skeleton */}
          <View
            style={[
              styles.skeletonTextSmall,
              { backgroundColor: colors.grey[300] },
            ]}
          />

          {/* Price Skeleton */}
          <View
            style={[
              styles.skeletonPrice,
              { backgroundColor: colors.grey[300] },
            ]}
          />
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skeletonCard: {
    width: '48%',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    padding: 5,
  },
  skeletonImageContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
    height: 190,
  },
  skeletonAddToCartButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#e0e0e0',
  },
  skeletonText: {
    width: '80%',
    height: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 5,
  },
  skeletonFreeShippingBadge: {
    width: '60%',
    height: 20,
    borderRadius: 4,
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
  },
  skeletonTextSmall: {
    width: '60%',
    height: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 5,
  },
  skeletonPrice: {
    width: '50%',
    height: 14,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
})

export default AdsSkeletonLoader
