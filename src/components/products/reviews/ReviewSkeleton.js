import React from 'react'
import { View, StyleSheet } from 'react-native'

const ReviewSkeleton = () => (
  <View style={styles.skeletonContainer}>
    <View style={styles.userImageSkeleton} />
    <View style={styles.textSkeletonContainer}>
      <View style={styles.lineSkeleton} />
      <View style={styles.lineSkeleton} />
      <View style={styles.shortLineSkeleton} />
    </View>
  </View>
)

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
  },
  userImageSkeleton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    marginRight: 12,
  },
  textSkeletonContainer: {
    flex: 1,
  },
  lineSkeleton: {
    height: 10,
    backgroundColor: '#E0E0E0',
    marginBottom: 5,
    borderRadius: 5,
  },
  shortLineSkeleton: {
    width: '50%',
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
})

export default ReviewSkeleton
