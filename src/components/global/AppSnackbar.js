import React, { useEffect, useRef } from 'react'
import {
  Animated,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { X } from 'phosphor-react-native'
import { useSnackbar } from '@/hooks/useSnackbar'
import { Text } from '@/components/@ui/Text'
import { colors } from '@/constants/theme'
import { theme } from '@/constants/theme'

const { width } = Dimensions.get('window')

const AppSnackbar = () => {
  const opacity = useRef(new Animated.Value(0)).current
  const { visible, message, type, closeSnackbar } = useSnackbar()

  const getColorByType = type => {
    switch (type) {
      case 'success':
        return theme.colors.green[500] || 'green'
      case 'error':
        return theme.colors.red[500] || 'red'
      case 'warning':
        return colors.orange[300] || 'orange'
      case 'info':
      default:
        return colors.primary || 'blue'
    }
  }

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()

      const timeout = setTimeout(() => {
        closeSnackbar()
      }, 1000)

      return () => clearTimeout(timeout)
    } else {
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
      testID="toast"
      style={[
        styles.snackbarContainer,
        {
          backgroundColor: getColorByType(type),
          opacity: opacity,
          width: width,
          top: StatusBar.currentHeight,
        },
      ]}
    >
      <Text style={styles.messageText}>{message}</Text>
      <TouchableOpacity testID="close-toast" onPress={closeSnackbar}>
        <X size={20} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  snackbarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 15,
    paddingVertical: 5,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 9999,
  },
  messageText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    flex: 1,
    marginRight: 10,
  },
})

export default AppSnackbar
