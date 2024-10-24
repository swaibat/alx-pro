import React, { useEffect, useRef } from 'react'
import {
  Animated,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { X } from 'phosphor-react-native'
import { useSnackbar } from '@/hooks/useSnackbar'

const { width } = Dimensions.get('window')

const AppSnackbar = () => {
  const theme = useTheme()
  const opacity = useRef(new Animated.Value(0)).current
  const { visible, message, type, closeSnackbar } = useSnackbar()

  const getColorByType = type => {
    switch (type) {
      case 'success':
        return theme.colors.success || 'green'
      case 'error':
        return theme.colors.error || 'red'
      case 'warning':
        return theme.colors.warning || 'orange'
      case 'info':
      default:
        return theme.colors.primary || 'blue'
    }
  }

  useEffect(() => {
    if (visible) {
      // Fade in animation
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()

      // Automatically close the snackbar after 3 seconds
      const timeout = setTimeout(() => {
        closeSnackbar()
      }, 3000)

      // Clear timeout if component unmounts or visibility changes
      return () => clearTimeout(timeout)
    } else {
      // Fade out animation
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [visible])

  if (!visible) {
    return null
  }

  return (
    <Animated.View
      style={[
        styles.snackbarContainer,
        {
          backgroundColor: getColorByType(type), // Set color based on type
          opacity: opacity,
          width: width,
        },
      ]}
    >
      <View />
      <Text style={styles.messageText}>{message}</Text>
      <TouchableOpacity onPress={closeSnackbar}>
        <X size={20} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  snackbarContainer: {
    position: 'absolute',
    top: StatusBar.currentHeight || 0,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
    paddingVertical: 3,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 9999,
  },
  messageText: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    flex: 1,
    marginRight: 10,
  },
})

export default AppSnackbar
