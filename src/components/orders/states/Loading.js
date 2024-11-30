import React from 'react'
import { View, StyleSheet } from 'react-native'

const getRandomWidth = () => {
  return Math.random() * (90 - 50) + 10 + '%'
}

const SkeletonLoader = () => {
  return (
    <View style={{ flex: 1 }}>
      {Array.from({ length: 4 }).map((_, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.skeletonText, { width: getRandomWidth() }]} />
            <View style={[styles.skeletonText, { width: getRandomWidth() }]} />
          </View>
          <View style={styles.divider} />
          <View style={styles.cardBody}>
            <View style={styles.skeletonImage} />
            <View style={[styles.cardDetails, { flex: 1 }]}>
              <View
                style={[styles.skeletonText, { width: getRandomWidth() }]}
              />
              <View
                style={[styles.skeletonText, { width: getRandomWidth() }]}
              />
              <View
                style={[styles.skeletonText, { width: getRandomWidth() }]}
              />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.cardFooter}>
            <View style={styles.statusContainer}>
              <View style={styles.skeletonIcon} />
              <View
                style={[styles.skeletonText, { width: getRandomWidth() }]}
              />
            </View>
            <View style={styles.skeletonButton} />
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'gainsboro',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardBody: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  cardDetails: {
    marginLeft: 10,
    justifyContent: 'space-between',
    gap: 5,
  },
  skeletonImage: {
    width: 80,
    height: 80,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skeletonText: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginVertical: 2,
  },
  skeletonIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginRight: 5,
  },
  skeletonButton: {
    width: 80,
    height: 30,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
})

export default SkeletonLoader
