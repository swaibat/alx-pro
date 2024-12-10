import React from 'react'
import CartItemCard from '../products/CartItemCard'
import { StyleSheet, View } from 'react-native'

const OrderItems = ({ cartItems }) => {
  return (
    <View style={styles.container}>
      {cartItems.map(item => (
        <CartItemCard key={item.uniqueKey} item={item} />
      ))}
    </View>
  )
}

export default OrderItems

const styles = StyleSheet.create({
  container: { gap: 5 },
})
