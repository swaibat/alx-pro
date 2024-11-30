import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useGetReviewsQuery } from '@/api'
import { Star } from 'phosphor-react-native'
import ReviewSkeleton from '@/components/products/reviews/ReviewSkeleton'
import { Text } from '@/components/@ui/Text'

const ReviewsScreen = () => {
  const { data: reviews, isLoading, isError } = useGetReviewsQuery()

  const renderStars = count =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={18}
        color={i < count ? '#FFCC00' : '#E0E0E0'}
        weight={i < count ? 'fill' : 'regular'}
      />
    ))

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewContent}>
        <View style={styles.reviewHeader}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.reviewDate}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.ratingContainer}>{renderStars(item.rating)}</View>
        <Text style={styles.reviewText}>{item.reviewText}</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Ratings Overview */}
      <View style={styles.ratingsOverview}>
        <Text style={styles.averageRating}>4.7</Text>
        <View style={styles.ratingDetails}>
          {/* Display star rows and counts as shown previously */}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Reviews:</Text>

      {/* Display Skeleton Loader while loading */}
      {isLoading ? (
        <FlatList
          data={[...Array(3)]}
          renderItem={() => <ReviewSkeleton />}
          keyExtractor={(item, index) => index?.toString()}
        />
      ) : isError ? (
        <Text style={styles.errorText}>Failed to load reviews</Text>
      ) : (
        <FlatList
          data={reviews}
          renderItem={renderReviewItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.reviewsList}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  ratingsOverview: {
    alignItems: 'center',
    marginBottom: 20,
  },
  averageRating: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#333',
  },
  reviewsList: {
    paddingBottom: 20,
  },
  reviewCard: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  reviewDate: {
    fontSize: 14,
    color: '#888',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
})

export default ReviewsScreen
