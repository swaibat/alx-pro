import React from 'react'
import CartItemCard from '../products/CartItemCard'
import { View } from 'react-native'

const OrderItems = ({ cartItems }) => {
  return (
    <View style={{ gap: 5 }}>
      {cartItems.map(item => (
        <CartItemCard key={item.uniqueKey} item={item} />
      ))}
    </View>
  )
}

export default OrderItems
