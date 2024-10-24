import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, View, StyleSheet } from 'react-native'
import { Text, Button, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ShippingAddress from '@/components/checkout/AddressSection'
import ShippingOptions from '@/components/checkout/ShippingSection'
import OrderItems from '@/components/checkout/OrderItemsSection'
import { useCreateOrderMutation } from '@/api'
import SecureRoute from '@/components/_global/SecureRoute'
import AppHeader from '../components/_global/AppHeader'

const CheckoutScreen = () => {
  const cartItems = useSelector(state => state.cart.items)
  const theme = useTheme()
  const [createOrder] = useCreateOrderMutation()
  const [payNowLoading, setPayNowLoading] = React.useState(false)
  const [selectedAddressId, setSelectedAddressId] = React.useState('')

  useEffect(() => {
    const fetchUserAndAddress = async () => {
      try {
        const address = await AsyncStorage.getItem('selectedAddress')
        if (address) {
          const parsedAddress = JSON.parse(address)
          setSelectedAddressId(parsedAddress._id)
        }
      } catch (error) {
        console.error('Failed to fetch user or address:', error)
      }
    }

    fetchUserAndAddress()
  }, [])

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    )
  }

  const handlePayNow = async () => {
    setPayNowLoading(true)
    const orderData = {
      items: cartItems,
      userAddressId: selectedAddressId,
      total: getTotalPrice() + 10000,
      paymentType: 'Mobile Money',
    }
    try {
      const res = await createOrder(orderData).unwrap()
      router.push({
        pathname: 'payments',
        params: { orderId: res.data._id, amount: getTotalPrice() + 10000 },
      })
    } catch (error) {
      console.error('Error creating order:', error)
    } finally {
      setPayNowLoading(false)
    }
  }

  return (
    <SecureRoute>
      <AppHeader headerStyle="dark" telephone="0200922167" />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <ShippingAddress />
          <OrderItems cartItems={cartItems} theme={theme} />
          <ShippingOptions theme={theme} />
        </ScrollView>
        <View style={styles.footer}>
          <View>
            <Text variant="titleMedium">Total</Text>
            <Text
              variant="bodyLarge"
              style={{ ...styles.totalPrice, color: theme.colors.primary }}
            >
              UGX {(getTotalPrice() + 10000).toLocaleString()}
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={handlePayNow}
            loading={payNowLoading} // Loading state for the button
            style={styles.checkoutButton}
            disabled={payNowLoading} // Disable the button while loading
          >
            Pay Now
          </Button>
        </View>
      </SafeAreaView>
    </SecureRoute>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingHorizontal: 25,
    backgroundColor: '#F7F9FC',
    borderTopWidth: 1,
    borderColor: '#E4E9F2',
  },
  totalPrice: {
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginLeft: 16,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    marginLeft: 8,
    fontSize: 16,
  },
})

export default CheckoutScreen
