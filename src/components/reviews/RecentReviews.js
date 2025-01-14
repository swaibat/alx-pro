import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ReviewItem from './ReviewItem'

const RecentReviews = ({ reviews, setModalVisible }) => {
  if (!reviews?.totalDocs) return
  return (
    <View>
      <View style={styles.popularReviewsHeader}>
        <Text style={styles.sectionTitle}>Recent reviews</Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.reviewsList}>
        {reviews.docs.slice(0, 3).map(item => (
          <ReviewItem key={item._id} item={item} />
        ))}
      </View>
    </View>
  )
}

export default RecentReviews

const styles = StyleSheet.create({
  popularReviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#333',
  },
  viewAllButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E90FF',
  },
  reviewsList: {
    paddingBottom: 0,
  },
})
