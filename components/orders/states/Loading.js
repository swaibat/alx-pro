import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Layout, Card, Text, Divider } from '@ui-kitten/components'

const getRandomWidth = () => {
  return Math.random() * (90 - 50) + 10 + '%'
}

const SkeletonLoader = () => {
  return (
    <Layout style={{ flex: 1 }}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text
              category="s1"
              style={[styles.skeletonText, { width: getRandomWidth() }]}
            />
            <Text
              category="c1"
              appearance="hint"
              style={[styles.skeletonText, { width: getRandomWidth() }]}
            />
          </View>

          <View style={styles.cardDetails}>
            <Text
              category="c1"
              style={[styles.skeletonText, { width: getRandomWidth() }]}
            />
            <Text
              category="c1"
              style={[styles.skeletonText, { width: getRandomWidth() }]}
            />
          </View>

          <View style={styles.cardDetails}>
            <Text
              category="c1"
              style={[styles.skeletonText, { width: getRandomWidth() }]}
            />
            <Text
              category="c1"
              style={[styles.skeletonText, { width: getRandomWidth() }]}
            />
          </View>
          <Divider style={{ marginVertical: 10 }} />
          <View style={styles.cardFooter}>
            <View style={styles.statusContainer}>
              <View style={styles.skeletonIcon} />
              <Text
                category="c1"
                style={[styles.skeletonText, { width: getRandomWidth() }]}
              />
            </View>
            <View style={styles.skeletonButton} />
          </View>
        </Card>
      ))}
    </Layout>
  )
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
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
    backgroundColor: '#e0e0e0', // Slightly darker gray for text
    borderRadius: 4,
    marginVertical: 2,
  },
  skeletonIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#e0e0e0', // Same as skeleton text
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
