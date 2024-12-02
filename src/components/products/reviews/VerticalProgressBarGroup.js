import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Star } from 'phosphor-react-native'
import VerticalProgressBar from './VerticalProgressBar'
import { Text } from '@/components/@ui/Text'
import { colors } from '@/constants/theme'

const VerticalProgressBarGroup = ({ ratingsDistribution, totalReviews }) => {
  const barsData = Object.keys(ratingsDistribution).map(rating => ({
    label: rating,
    progress: totalReviews
      ? (ratingsDistribution[rating] / totalReviews) * 100
      : 0,
  }))

  return (
    <View style={styles.groupContainer}>
      {barsData.map((bar, index) => (
        <VerticalProgressBar
          key={index}
          label={
            <View style={styles.labelContainer}>
              <Text bold style={{ fontSize: 12, color: colors.grey[700] }}>
                {bar.label}
              </Text>
              <Star size={12} color={colors.grey[700]} />
            </View>
          }
          progress={bar.progress}
          color={colors.orange[700]}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  groupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default VerticalProgressBarGroup
