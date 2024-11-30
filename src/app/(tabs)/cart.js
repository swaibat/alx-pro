import React from 'react'
import { View, Image, StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { useRouter } from 'expo-router'
import { Text } from '@/components/@ui/Text'
import { Button } from '@/components/@ui/Button'
import { colors } from '@/constants/theme'
import CartItemCard from '@/components/products/CartItemCard'

const CartScreen = () => {
  const router = useRouter()

  const cartItems = useSelector(state => state.cart)

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * (item.quantity || 1)
    }, 0)
  }

  return (
    <>
      <View style={styles.container}>
        <FlatList
          style={{ padding: 15 }}
          contentContainerStyle={
            cartItems.length === 0
              ? styles.emptyCartContentContainer
              : { paddingBottom: 20, gap: 5 }
          }
          data={cartItems}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          renderItem={({ item }) => <CartItemCard editable item={item} />}
          ListEmptyComponent={
            <View style={styles.emptyCartContainer}>
              <Image
                source={require('@/assets/images/shopping.png')}
                style={{ height: 120, width: 120 }}
              />
              <Text style={styles.emptyCartText}>Your cart is empty!</Text>
              <Button
                onPress={() => router.push('/ads/list')}
                title="Shop Now"
              />
            </View>
          }
        />
        {cartItems.length && (
          <View style={styles.footer}>
            <View>
              <Text>Total</Text>
              <Text bold primary style={{ fontSize: 17 }}>
                UGX {getTotalPrice().toLocaleString()}
              </Text>
            </View>
            <Button
              style={styles.checkoutButton}
              onPress={() => router.push('checkout')}
              title="Checkout"
            />
          </View>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  appbar: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.borderColor,
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
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
    padding: 20,
  },
  emptyCartContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 14,
  },
})

export default CartScreen
