import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { colors } from '@/constants/theme'
import CartItemCard from '@/components/products/CartItemCard'
import EmptyCart from '@/components/cart/EmptyCart'
import CartFooter from '@/components/cart/CartFooter'

const CartScreen = () => {
  const cartItems = useSelector(state => state.cart)

  return (
    <>
      <View style={sx.container}>
        <FlatList
          style={sx.list}
          contentContainerStyle={
            !cartItems.length ? sx.emptyCartContent : sx.content
          }
          data={cartItems}
          keyExtractor={item => item.uniqueKey}
          renderItem={({ item }) => <CartItemCard editable item={item} />}
          ListEmptyComponent={<EmptyCart />}
        />
        <CartFooter cartItems={cartItems} />
      </View>
    </>
  )
}

const sx = StyleSheet.create({
  list: {
    padding: 15,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  emptyCartContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderTopWidth: 0.8,
    borderTopColor: colors.grey[300],
    backgroundColor: colors.grey[200],
    elevation: 3,
  },
  checkoutButton: {
    width: 120,
  },
  content: { paddingBottom: 20, gap: 5 },
})

export default CartScreen
