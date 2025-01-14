import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import RatingsOverview from '@/components/reviews/RatingsOverview'
import EmptyReviews from '@/components/reviews/EmptyReviews'
import RecentReviews from '@/components/reviews/RecentReviews'
import ReviewsListModal from '@/components/reviews/ReviewsListModal'

const ReviewsScreen = ({ reviews }) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={styles.container}>
      <EmptyReviews reviews={reviews} />
      <RatingsOverview reviews={reviews} />
      <RecentReviews reviews={reviews} setModalVisible={setModalVisible} />
      <ReviewsListModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default ReviewsScreen
