import { colors } from '@/constants/theme'
import { useSocket } from '@/hooks/useSocket'
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import AppImg from '../@ui/AppImg'

const SalesPopup = () => {
  const [visible, setVisible] = useState(false)
  const [currentProduct, setCurrentProduct] = useState({})
  const [opacity] = useState(new Animated.Value(0))
  const { socket } = useSocket()

  useEffect(() => {
    // Listen for the latest product event from the server
    socket?.on('latestProduct', product => {
      if (product) {
        setCurrentProduct(product) // Set the received product
        setVisible(true) // Show the popup

        // Animate the opacity to make it fade in
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start()

        // Hide the popup after 5 seconds
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start()
          setTimeout(() => setVisible(false), 500) // Hide after fade-out
        }, 5000)
      }
    })

    // Cleanup the event listener when component unmounts
    return () => {
      socket?.off('latestProduct') // Correct event name in cleanup
    }
  }, [socket, opacity])

  if (!visible) return null

  return (
    <Animated.View style={[styles.notification, { opacity }]}>
      <AppImg src={currentProduct?.thumbnail} style={styles.productImage} />
      <View style={styles.content}>
        <View style={styles.text}>
          <Text style={styles.userName} numberOfLines={1}>
            {currentProduct.username} from {currentProduct.address} just bought
          </Text>
          <Text style={styles.productName} numberOfLines={1}>
            {currentProduct.title}
          </Text>
        </View>
        <Text style={styles.timestamp}>{currentProduct.timestamp}</Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  notification: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: 270,
    elevation: 10,
    borderWidth: 0.9,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  userName: {
    fontSize: 12,
    color: colors.grey[300],
  },
  productName: {
    color: colors.grey[300],
    fontWeight: '500',
    fontSize: 12,
  },
  timestamp: {
    color: colors.grey[400],
    fontStyle: 'italic',
    fontSize: 10,
  },
  content: { flex: 1 },
})

export default SalesPopup
