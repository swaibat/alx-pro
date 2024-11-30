import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Star, StarHalf } from 'phosphor-react-native'
import { Text } from '@/components/@ui/Text'
import { colors } from '@/constants/theme'

const RatingChip = ({ review }) => {
  const averageRating = review?.averageRating || 0
  const totalReviews = review?.totalReviews || 0

  // Calculate how many full and half stars to show
  const fullStars = Math.floor(averageRating)
  const hasHalfStar = averageRating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  // Array of stars for rendering
  const stars = [
    ...Array(fullStars).fill('full'),
    ...(hasHalfStar ? ['half'] : []),
    ...Array(emptyStars).fill('empty'),
  ]

  return (
    <View style={styles.ratingContainer}>
      {stars.map((star, index) => {
        if (star === 'full') {
          return <Star key={index} size={16} color="#FFD700" weight="fill" />
        }
        if (star === 'half') {
          return (
            <StarHalf key={index} size={16} color="#FFD700" weight="fill" />
          )
        }
        return (
          <Star
            key={index}
            size={16}
            color={colors.grey[400]}
            weight="duotone"
          />
        )
      })}
      <Text style={styles.ratingText}>
        {averageRating.toFixed(2)} ({totalReviews}) Rating(s)
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    gap: 5,
  },
  ratingText: {
    color: colors.grey[800],
    fontSize: 13,
  },
})

export default RatingChip
