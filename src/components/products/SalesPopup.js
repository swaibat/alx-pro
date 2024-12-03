import { colors } from '@/constants/theme'
import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, Animated } from 'react-native'

const dummyProducts = [
  {
    productName: 'Wireless Headphones',
    price: '$49.99',
    userName: 'J***D',
    userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    productImage: 'https://via.placeholder.com/100', // Dummy product image
    location: 'Kampala',
    timestamp: '3 minutes ago',
  },
  {
    productName: 'Smartphone',
    price: '$299.99',
    userName: 'J***D',
    userAvatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    productImage: 'https://via.placeholder.com/100', // Dummy product image
    location: 'Entebbe',
    timestamp: '5 minutes ago',
  },
  {
    productName: 'Gaming Laptop',
    price: '$899.99',
    userName: 'C***R',
    userAvatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    productImage: 'https://via.placeholder.com/100', // Dummy product image
    location: 'Kampala',
    timestamp: '2 minutes ago',
  },
  {
    productName: 'Bluetooth Speaker',
    price: '$59.99',
    userName: 'M***G',
    userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    productImage: 'https://via.placeholder.com/100', // Dummy product image
    location: 'Mbarara',
    timestamp: '10 minutes ago',
  },
  {
    productName: 'Fitness Tracker',
    price: '$99.99',
    userName: 'M***L',
    userAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    productImage: 'https://via.placeholder.com/100', // Dummy product image
    location: 'Gulu',
    timestamp: '1 minute ago',
  },
]

const SalesPopup = () => {
  const [visible, setVisible] = useState(false)
  const [currentProduct, setCurrentProduct] = useState({})
  const [opacity] = useState(new Animated.Value(0))

  useEffect(() => {
    const timer = setInterval(
      () => {
        const randomProduct =
          dummyProducts[Math.floor(Math.random() * dummyProducts.length)]
        setCurrentProduct(randomProduct)
        setVisible(true)
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start()

        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start()
          setTimeout(() => setVisible(false), 500)
        }, 5000)
      },
      Math.random() * 100000 + 3000
    )

    return () => clearInterval(timer)
  }, [opacity])

  if (!visible) return null

  return (
    <Animated.View style={[styles.notification, { opacity }]}>
      <Image
        source={{
          uri: 'https://sc04.alicdn.com/kf/Hd706b9ff3e6241fcab2bbc18804adc5cF.jpg_100x100.jpg',
        }}
        style={styles.productImage}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.text}>
          <Text style={styles.userName} numberOfLines={1}>
            {currentProduct.userName} from {currentProduct.location} just bought
          </Text>
          <Text style={styles.productName} numberOfLines={1}>
            {currentProduct.productName}
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
})

export default SalesPopup
