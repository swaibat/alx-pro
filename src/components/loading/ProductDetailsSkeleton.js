import { colors } from '@/constants/theme'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const ProductDetailsSkeleton = () => {
  return (
    <View style={styles.skeletonContainer}>
      <View
        style={[styles.skeletonImage, { backgroundColor: colors.grey[300] }]}
      />
      <View style={styles.skeletonDotsContainer}>
        {[...Array(3)].map((_, index) => (
          <View
            key={index}
            style={[styles.skeletonDot, { backgroundColor: colors.grey[300] }]}
          />
        ))}
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.skeletonInfoContainer}>
          <View
            style={[
              styles.skeletonTitle,
              { backgroundColor: colors.grey[300] },
            ]}
          />
          <View
            style={[
              styles.skeletonRating,
              { backgroundColor: colors.grey[300] },
            ]}
          />
          <View
            style={[
              styles.skeletonRating,
              { backgroundColor: colors.grey[300] },
            ]}
          />
        </View>
        <View
          style={[
            styles.skeletonDescription,
            { backgroundColor: colors.grey[300] },
          ]}
        />
        <View
          style={[
            styles.skeletonDescription,
            { backgroundColor: colors.grey[300] },
          ]}
        />

        <View
          style={[
            styles.skeletonColors,
            { width: '40%', backgroundColor: colors.grey[300] },
          ]}
        />
        <View
          style={[
            styles.skeletonSizes,
            { width: '80%', backgroundColor: colors.grey[300] },
          ]}
        />
        <View
          style={[
            styles.skeletonColors,
            { width: '60%', backgroundColor: colors.grey[300] },
          ]}
        />
        <View
          style={[
            styles.skeletonSizes,
            { width: '80%', backgroundColor: colors.grey[300] },
          ]}
        />
      </View>
      <View style={[styles.bottomTabsContainer, { paddingHorizontal: 0 }]}>
        <View
          style={[styles.skeletonPrice, { backgroundColor: colors.grey[300] }]}
        />
        <View
          style={[styles.skeletonButton, { backgroundColor: colors.grey[300] }]}
        />
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
  // Skeleton Styles
  skeletonContainer: {
    padding: 16,
    height: '100%',
  },
  skeletonImage: {
    height: 300,
    width: '100%',
    backgroundColor: '#e0e0e0',
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
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  skeletonInfoContainer: {
    marginBottom: 20,
  },
  skeletonTitle: {
    height: 25,
    width: '80%',
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 5,
  },
  skeletonRating: {
    height: 15,
    width: '50%',
    backgroundColor: '#e0e0e0',
    marginBottom: 5,
    borderRadius: 5,
  },
  skeletonDescription: {
    height: 15,
    width: '90%',
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 5,
  },
  skeletonColors: {
    height: 30,
    width: '60%',
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 5,
  },
  skeletonSizes: {
    height: 30,
    width: '60%',
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
    borderRadius: 5,
  },
  skeletonBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  skeletonPrice: {
    height: 25,
    width: '40%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  skeletonButton: {
    height: 40,
    width: '40%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
})

export default ProductDetailsSkeleton
