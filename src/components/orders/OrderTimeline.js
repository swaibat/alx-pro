// OrderTimeline.js
import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { CheckCircle, Circle } from 'phosphor-react-native'
import { Text } from '@/components/@ui/Text'

const OrderTimeline = ({
  stages = [
    'Order Placed',
    'Processing',
    'Shipped',
    'Out for Delivery',
    'Delivered',
  ],
  currentStage = 2,
}) => {
  const renderStage = ({ item, index }) => {
    const isCompleted = index <= currentStage
    const isLastItem = index === stages.length - 1

    return (
      <View style={styles.stageContainer}>
        {/* Text description of the stage */}
        <View style={styles.textContainer}>
          <Text style={[styles.stageText, isCompleted && styles.completedText]}>
            {item}
          </Text>
        </View>

        {/* Icon and vertical line for each stage */}
        <View style={styles.iconContainer}>
          {isCompleted ? (
            <CheckCircle size={24} color="#4CAF50" weight="fill" />
          ) : (
            <Circle size={24} color="#BDBDBD" weight="bold" />
          )}
          {/* Right-side timeline line */}
          {!isLastItem && (
            <View
              style={[
                styles.verticalLine,
                isCompleted && styles.verticalLineCompleted,
              ]}
            />
          )}
        </View>
      </View>
    )
  }

  return (
    <FlatList
      data={stages}
      renderItem={renderStage}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.timelineContainer}
    />
  )
}

export default OrderTimeline

const styles = StyleSheet.create({
  timelineContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  stageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginLeft: 10,
    position: 'relative',
  },
  verticalLine: {
    position: 'absolute',
    width: 2,
    height: 40, // Length of line between stages
    backgroundColor: '#BDBDBD',
    top: 30, // Offset to align with icon
    right: -10, // Position to the right of the icon
  },
  verticalLineCompleted: {
    backgroundColor: '#4CAF50',
  },
  textContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  stageText: {
    fontSize: 16,
    color: '#757575',
  },
  completedText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
})
