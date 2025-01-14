import React from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Rect } from 'react-native-svg'
import { Text } from '@/components/@ui/Text'
import { colors } from '@/constants/theme'

const VerticalProgressBar = ({ progress, label, color }) => {
  return (
    <View style={styles.container}>
      <Svg height="50" width="10">
        <Rect width="15" height="50" fill={colors.grey[400]} />
        <Rect y={50 - progress} width="15" height={progress} fill={color} />
      </Svg>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
  },
})

export default VerticalProgressBar
