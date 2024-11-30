import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Chats, Star } from 'phosphor-react-native'
import VerticalProgressBarGroup from './VerticalProgressBarGroup'
import { useRouter } from 'expo-router'
import { Text } from '@/components/@ui/Text'
import { colors } from '@/constants/theme'

const ReviewsScreen = ({ data, productId }) => {
  const router = useRouter()

  const renderLetterAvatar = name => {
    const initials = name[0].toUpperCase()
    return (
      <View style={styles.avatar}>
        <Text bold style={styles.avatarText}>
          {initials}
        </Text>
      </View>
    )
  }

  const renderStars = count =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={15}
        color={i < count ? '#FFCC00' : '#A9A9A9'}
        weight={i < count ? 'fill' : 'regular'}
      />
    ))

  const renderReviewItem = item => (
    <View style={styles.reviewContainer} key={item._id}>
      {renderLetterAvatar(item.user?.name)}
      <View style={styles.reviewContent}>
        <Text style={styles.username} fontWeight="bold">
          {item.user.name}
        </Text>
        <View style={styles.ratingContainer}>{renderStars(item.rating)}</View>
        <Text style={styles.reviewText}>{item.comment}</Text>
      </View>
    </View>
  )

  // Check for empty data conditions
  const isEmpty =
    !data ||
    data.totalReviews === 0 ||
    !data.reviews ||
    data.reviews.length === 0

  return (
    <View style={styles.container}>
      {/* Ratings Overview */}
      <View style={styles.ratingsOverview}>
        <View style={{ flex: 1 }}>
          {isEmpty ? (
            <View style={styles.card}>
              <Chats size={30} color={colors.grey[400]} weight={'light'} />
              <Text style={styles.noReviewsText}>No ratings yet</Text>
            </View>
          ) : (
            <>
              <Text style={styles.averageRating}>
                {data?.averageRating.toFixed(2)}{' '}
                <Text style={styles.starsText}>stars</Text>
              </Text>
              <View style={styles.ratingStars}>
                {renderStars(Math.round(data?.averageRating))}
              </View>
              <Text style={{ fontSize: 12 }}>
                ({data?.totalReviews}) reviewers
              </Text>
            </>
          )}
        </View>
        <View>
          {!isEmpty && (
            <VerticalProgressBarGroup
              ratingsDistribution={data.ratingsDistribution}
              totalReviews={data.totalReviews}
            />
          )}
        </View>
      </View>

      {/* Popular Reviews */}
      {!isEmpty && (
        <View>
          <View style={styles.popularReviewsHeader}>
            <Text style={styles.sectionTitle}>Popular reviews</Text>
            <TouchableOpacity
              onPress={() => router.push(`/reviews/${productId}`)} // Adjust to your navigation setup
              style={styles.viewAllButton}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.reviewsList}>
            {data.reviews.map(renderReviewItem)}
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderColor: colors.grey[400],
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 70,
    flex: 1,
  },
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#fff',
  },
  ratingsOverview: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  averageRating: {
    color: '#333',
    fontWeight: 'bold',
  },
  starsText: {
    fontSize: 16,
    color: '#333',
  },
  ratingStars: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#333',
  },
  popularReviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
  reviewContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewContent: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  reviewText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 10,
  },
  noReviewsText: {
    fontSize: 13,
    color: colors.grey[400],
    textAlign: 'center',
  },
})

export default ReviewsScreen
