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

  // Line style with optional dashed effect
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

  // Container for dividing lines and text
  const containerStyle = [
    isHorizontal ? styles.horizontalContainer : styles.verticalContainer,
    style,
  ]

  return (
    <View style={containerStyle}>
      {/* Left/Top Line */}
      {(align === 'center' || align === 'left' || align === 'top') && (
        <View
          style={[lineStyle, isHorizontal ? { flex: 1 } : { height: '40%' }]}
        />
      )}

      {/* Text Content */}
      {children && (
        <View style={[styles.textContainer, { paddingHorizontal: padding }]}>
          <Text
            style={[
              styles.text,
              { fontSize, color: fontColor, fontWeight },
              textStyle,
            ]}
          >
            {children}
          </Text>
        </View>
      )}

      {/* Right/Bottom Line */}
      {(align === 'center' || align === 'right' || align === 'bottom') && (
        <View
          style={[lineStyle, isHorizontal ? { flex: 1 } : { height: '40%' }]}
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
})

export default Divider
