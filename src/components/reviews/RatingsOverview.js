import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Star } from 'phosphor-react-native'
import VerticalProgressBarGroup from '../products/reviews/VerticalProgressBarGroup'
import { colors } from '@/constants/theme'

const renderStars = count =>
  [...Array(5)].map((_, i) => (
    <Star
      key={i}
      size={15}
      color={i < count ? '#FFCC00' : '#A9A9A9'}
      weight={i < count ? 'fill' : 'regular'}
    />
  ))

const RatingsOverview = ({ reviews }) => {
  if (!reviews?.totalDocs) return
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.grey[100],
        borderRadius: 5,
        padding: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={sx.averageRating}>
          {reviews.summary.averageRating}
          <Text style={sx.starsText}> stars</Text>
        </Text>
        <View style={sx.ratingStars}>
          {renderStars(Math.round(reviews.summary.averageRating))}
        </View>
        <Text style={sx.totalRatings}>
          ({reviews.summary.totalRatings}) reviewers
        </Text>
      </View>
      <View style={{ width: 140 }}>
        <VerticalProgressBarGroup
          ratingsDistribution={reviews.summary.ratingsDistribution}
          totalReviews={reviews.summary.totalRatings}
        />
      </View>
    </View>
  )
}

export default RatingsOverview

const sx = StyleSheet.create({
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
  totalRatings: { fontSize: 12 },
})
