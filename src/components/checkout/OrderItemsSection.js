import React from 'react'
import { FlatList } from 'react-native'
import CartItemCard from '../products/CartItemCard'

const OrderItems = ({ cartItems }) => {
  return (
    <FlatList
      data={cartItems}
      style={{ maxHeight: 270 }}
      contentContainerStyle={{ gap: 5 }}
      keyExtractor={(item, index) => `${item._id}-${index}`}
      renderItem={({ item }) => <CartItemCard item={item} />}
    />
  )
}

export default OrderItems
