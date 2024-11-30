import React from 'react'
import { View } from 'react-native'
import CartItemCard from '@/components/products/CartItemCard'

const OrderItemsList = ({ items }) => (
  <View>
    {items.map(item => (
      <CartItemCard key={item._id} item={item} />
    ))}
  </View>
)

export default OrderItemsList
