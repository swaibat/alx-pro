import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colors } from '@/constants/theme'

const ProductDetailsSkeleton = () => {
  return (
    <View style={styles.skeletonContainer}>
      <View style={[styles.skeletonImage, styles.skeletonBackground]} />
      <View style={styles.skeletonDotsContainer}>
        {[...Array(3)].map((_, index) => (
          <View
            key={index}
            style={[styles.skeletonDot, styles.skeletonBackground]}
          />
        ))}
      </View>
      <View style={styles.skeletonContent}>
        <View style={styles.skeletonInfoContainer}>
          <View style={[styles.skeletonTitle, styles.skeletonBackground]} />
          <View style={[styles.skeletonRating, styles.skeletonBackground]} />
          <View style={[styles.skeletonRating, styles.skeletonBackground]} />
        </View>
        <View style={[styles.skeletonDescription, styles.skeletonBackground]} />
        <View style={[styles.skeletonDescription, styles.skeletonBackground]} />
        <View
          style={[
            styles.skeletonColors,
            styles.skeletonBackground,
            styles.skeletonColors40,
          ]}
        />
        <View
          style={[
            styles.skeletonSizes,
            styles.skeletonBackground,
            styles.skeletonSizes80,
          ]}
        />
        <View
          style={[
            styles.skeletonColors,
            styles.skeletonBackground,
            styles.skeletonColors60,
          ]}
        />
        <View
          style={[
            styles.skeletonSizes,
            styles.skeletonBackground,
            styles.skeletonSizes80,
          ]}
        />
      </View>
      <View style={styles.bottomTabsContainer}>
        <View style={[styles.skeletonPrice, styles.skeletonBackground]} />
        <View style={[styles.skeletonButton, styles.skeletonBackground]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomTabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderColor: 'gainsboro',
  },
  skeletonContainer: {
    padding: 16,
    height: '100%',
  },
  skeletonImage: {
    height: 300,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
  skeletonDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  skeletonDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  skeletonContent: {
    flex: 1,
  },
  skeletonInfoContainer: {
    marginBottom: 20,
  },
  skeletonTitle: {
    height: 25,
    width: '80%',
    marginBottom: 10,
    borderRadius: 5,
  },
  skeletonRating: {
    height: 15,
    width: '50%',
    marginBottom: 5,
    borderRadius: 5,
  },
  skeletonDescription: {
    height: 15,
    width: '90%',
    marginBottom: 10,
    borderRadius: 5,
  },
  skeletonColors: {
    height: 30,
    marginBottom: 10,
    borderRadius: 5,
  },
  skeletonSizes: {
    height: 30,
    marginBottom: 20,
    borderRadius: 5,
  },
  skeletonColors40: {
    width: '40%',
  },
  skeletonColors60: {
    width: '60%',
  },
  skeletonSizes80: {
    width: '80%',
  },
  skeletonPrice: {
    height: 25,
    width: '40%',
    borderRadius: 5,
  },
  skeletonButton: {
    height: 40,
    width: '40%',
    borderRadius: 5,
  },
  skeletonBackground: {
    backgroundColor: colors.grey[300],
  },
})

export default ProductDetailsSkeleton
