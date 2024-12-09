/* eslint-disable react-native/no-unused-styles */
import { colors as color } from '@/constants/theme'
import React from 'react'
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native'
import { Text } from './Text'
import { IconContext } from 'phosphor-react-native'

export const Button = ({
  title,
  onPress,
  isLoading = false,
  isDisabled = false,
  iconLeft,
  iconRight,
  size = 'medium',
  outline = false,
  ghost = false,
  secondary = false,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const colors = {
    primary: {
      backgroundColor: color.orange[500],
    },
    secondary: {
      backgroundColor: color.grey[300],
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: color.orange[500],
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    disabled: {
      opacity: 0.7,
    },
    textLight: {
      color: '#fff',
    },
    textDark: {
      color: color.orange[500],
    },
  }

  // Determine appearance based on boolean props
  const appearance = secondary
    ? 'secondary'
    : outline
      ? 'outline'
      : ghost
        ? 'ghost'
        : 'primary'

  const buttonStyle = [
    styles.button,
    styles[size],
    isDisabled && styles.disabled,
    style,
    colors[appearance],
  ]

  const textStyles = [
    styles.text,
    styles[`${size}Text`], // Dynamically adjust font size based on the button size
    appearance === 'primary'
      ? styles.textLight
      : appearance === 'secondary'
        ? { color: '#263238' }
        : { color: color.orange[500] },
    textStyle,
  ]

  const loadingColor =
    appearance === 'primary' || appearance === 'secondary' ? '#fff' : '#007bff'

  const Content = () => (
    <IconContext.Provider
      value={{
        size: 24,
        color: appearance === 'outline' ? color.primary : color.grey[700],
      }}
    >
      <View style={styles.content}>
        {iconLeft && <View style={title ? styles.icon : {}}>{iconLeft}</View>}
        <Text style={textStyles}>{title}</Text>
        {iconRight && <View style={title ? styles.icon : {}}>{iconRight}</View>}
      </View>
    </IconContext.Provider>
  )

  return Platform.OS === 'android' ? (
    <Pressable
      style={[buttonStyle, isDisabled || isLoading ? { opacity: 0.5 } : {}]}
      onPress={onPress}
      disabled={isDisabled || isLoading}
      android_ripple={{ color: '#ddd' }}
      accessibilityLabel={accessibilityLabel || title}
    >
      {isLoading ? <ActivityIndicator color={loadingColor} /> : <Content />}
    </Pressable>
  ) : (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isDisabled || isLoading}
      activeOpacity={0.7}
      accessibilityLabel={accessibilityLabel || title}
    >
      {isLoading ? <ActivityIndicator color={loadingColor} /> : <Content />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 7,
  },
  text: {
    fontSize: 14, // Default font size
  },
  // Sizes
  tiny: {
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  small: {
    paddingVertical: 5,
    paddingHorizontal: 9,
  },
  medium: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  // Font sizes for different button sizes
  tinyText: {
    fontSize: 10,
  },
  smallText: {
    fontSize: 13,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  // Appearances
  primary: {
    backgroundColor: '#007bff',
  },
  secondary: {
    backgroundColor: '#cfd8dc',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007bff',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  textLight: {
    color: '#fff',
  },
})
