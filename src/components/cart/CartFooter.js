import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@/components/@ui/Text'
import { Button } from '@/components/@ui/Button'
import { colors } from '@/constants/theme'
import { useRouter } from 'expo-router'

const CartFooter = ({ cartItems }) => {
  if (!cartItems.length) return
  const router = useRouter()
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * (item.quantity || 1)
    }, 0)
  }
  return (
    <View style={styles.footer}>
      <View>
        <Text>Total</Text>
        <Text bold primary style={styles.totalPrice}>
          UGX {getTotalPrice().toLocaleString()}
        </Text>
      </View>
      <Button
        style={styles.checkoutButton}
        onPress={() => router.push('checkout')}
        title="Checkout"
      />
    </View>
  )
}

const styles = StyleSheet.create({
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
  totalPrice: {
    fontSize: 17,
  },
  checkoutButton: {
    width: 120,
  },
})

export default CartFooter
