import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Star } from 'phosphor-react-native' // Import the Star icon
import VerticalProgressBar from './VerticalProgressBar'
import { Text } from '@/components/@ui/Text'

const VerticalProgressBarGroup = ({ ratingsDistribution, totalReviews }) => {
  const barsData = [
    {
      label: '1',
      progress: totalReviews
        ? (ratingsDistribution['1'] / totalReviews) * 100
        : 0,
      color: '#FF6B6B',
      tooltipText: `${ratingsDistribution['1']} Review${ratingsDistribution['1'] !== 1 ? 's' : ''}`,
    },
    {
      label: '2',
      progress: totalReviews
        ? (ratingsDistribution['2'] / totalReviews) * 100
        : 0,
      color: '#FF6B6B',
      tooltipText: `${ratingsDistribution['2']} Review${ratingsDistribution['2'] !== 1 ? 's' : ''}`,
    },
    {
      label: '3',
      progress: totalReviews
        ? (ratingsDistribution['3'] / totalReviews) * 100
        : 0,
      color: '#FF6B6B',
      tooltipText: `${ratingsDistribution['3']} Review${ratingsDistribution['3'] !== 1 ? 's' : ''}`,
    },
    {
      label: '4',
      progress: totalReviews
        ? (ratingsDistribution['4'] / totalReviews) * 100
        : 0,
      color: '#FF6B6B',
      tooltipText: `${ratingsDistribution['4']} Review${ratingsDistribution['4'] !== 1 ? 's' : ''}`,
    },
    {
      label: '5',
      progress: totalReviews
        ? (ratingsDistribution['5'] / totalReviews) * 100
        : 0,
      color: '#004F70',
      tooltipText: `${ratingsDistribution['5']} Review${ratingsDistribution['5'] !== 1 ? 's' : ''}`,
    },
  ]

  return (
    <View style={styles.groupContainer}>
      {barsData.map((bar, index) => (
        <VerticalProgressBar
          key={index}
          label={
            <View style={styles.labelContainer}>
              <Text bold style={{ fontSize: 12 }}>
                {bar.label}
              </Text>
              <Star size={12} color="gainsboro" weight="fill" />
            </View>
          } // Updated label with Star icon
          progress={bar.progress}
          color={bar.color}
          tooltipText={bar.tooltipText}
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
