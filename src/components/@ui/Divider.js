import { colors } from '@/constants/theme'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from './Text'

const Divider = ({
  type = 'horizontal',
  color = colors.grey[300],
  thickness = 0.8,
  length = '100%',
  dashed = false,
  align = 'center',
  children,
  padding = 8,
  fontSize = 14,
  fontColor = colors.grey[800],
  fontWeight = 'normal',
  style = {},
  textStyle = {},
}) => {
  const isHorizontal = type === 'horizontal'

  const lineStyle = [
    isHorizontal
      ? {
          borderBottomWidth: thickness,
          borderBottomColor: color,
          borderStyle: dashed ? 'dashed' : 'solid',
          width: length,
        }
      : {
          borderRightWidth: thickness,
          borderRightColor: color,
          borderStyle: dashed ? 'dashed' : 'solid',
          height: length,
        },
  ]

  const containerStyle = [
    isHorizontal ? styles.horizontalContainer : styles.verticalContainer,
    style,
  ]

  const textContainerStyle = [
    styles.textContainer,
    { paddingHorizontal: padding },
  ]

  const textStyleCombined = [
    styles.text,
    { fontSize, color: fontColor, fontWeight },
    textStyle,
  ]

  return (
    <View style={containerStyle}>
      {/* Left/Top Line */}
      {(align === 'center' || align === 'left' || align === 'top') && (
        <View
          style={[lineStyle, isHorizontal ? styles.flex : styles.height40]}
        />
      )}

      {/* Text Content */}
      {children && (
        <View style={textContainerStyle}>
          <Text style={textStyleCombined}>{children}</Text>
        </View>
      )}

      {/* Right/Bottom Line */}
      {(align === 'center' || align === 'right' || align === 'bottom') && (
        <View
          style={[lineStyle, isHorizontal ? styles.flex : styles.height40]}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  verticalContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
  },
  flex: {
    flex: 1,
  },
  height40: {
    height: '40%',
  },
})

export default Divider
