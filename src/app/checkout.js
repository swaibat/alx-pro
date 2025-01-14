import React, { useMemo, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { router } from 'expo-router'
import ShippingAddress from '@/components/checkout/AddressSection'
import ShippingOptions from '@/components/checkout/ShippingSection'
import OrderItems from '@/components/checkout/OrderItemsSection'
import {
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useGetFlutterKeysQuery,
  useGetAddressQuery,
} from '@/api'
import SecureRoute from '@/components/global/SecureRoute'
import { Button } from '@/components/@ui/Button'
import { clearCart } from '@/store/cartSlice'
import { PayWithFlutterwave } from 'flutterwave-react-native'
import { LockSimple } from 'phosphor-react-native'
import { colors } from '@/constants/theme'
import Section from '@/components/@ui/Section'
import LoadingOverlay from '@/components/@ui/LoadingOverlay'
import { useSnackbar } from '@/hooks/useSnackbar'
import { StripeProvider } from '@stripe/stripe-react-native'
import PaymentOptions from '@/components/checkout/PaymentOptions'
import StripeBtn from '@/components/checkout/StripeBtn'

const CheckoutScreen = () => {
  const [selectedShipping, setSelectedShipping] = useState(null)
  const [paymentOption, setPaymentOption] = useState('stripe')
  const { triggerSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart)
  const selectedAddress = useSelector(state => state?.address?.defaultAddress)

  const { data: address, isLoading: isFetchingAddress } = useGetAddressQuery(
    undefined,
    {
      skip: selectedAddress,
    }
  )

  const [createOrder, { data: orderData, isLoading: isCreating }] =
    useCreateOrderMutation()
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation()
  const { data: keysData, isLoading: isLoadingKeys } = useGetFlutterKeysQuery()

  // Calculate total price with useMemo to optimize recalculation
  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    )
  }, [cartItems])

  const handlePayNow = async () => {
    if (!selectedAddress) {
      return
    }

    const orderDetails = {
      items: cartItems,
      userAddressId: selectedAddress._id,
      shippingOptionId: selectedShipping._id,
      total: totalPrice + (selectedShipping?.price || 0),
    }

    try {
      await createOrder(orderDetails).unwrap()
    } catch (error) {
      triggerSnackbar('Error creating order', 'error')
    }
  }

  const handleUpdateOrder = async data => {
    try {
      const res = await updateOrder({
        ...data,
        orderId: orderData?.data?._id,
      }).unwrap()
      dispatch(clearCart())
      if (res.status === 'SUCCESS') {
        router.replace('payment_success')
      } else {
        router.replace('payment_failed')
      }
    } catch (error) {
      router.push('payment_failed')
    }
  }

  if (isFetchingAddress || isLoadingKeys) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.orange[500]} />
          <Text style={styles.loadingText}>Wait a moment ...</Text>
        </View>
      </SafeAreaView>
    )
  }

  console.log('PUBLISHABLE_KEY', keysData.stripe.PUBLISHABLE_KEY)

  return (
    <SecureRoute>
      <StripeProvider publishableKey={keysData.stripe.PUBLISHABLE_KEY}>
        <SafeAreaView style={styles.container}>
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainerStyle}
          >
            <Section
              title="Shipping Address"
              borderTop
              actionBtn={
                address && (
                  <Button
                    title="Change"
                    outline
                    size="tiny"
                    onPress={() => router.push(`/address?edit=true`)}
                  />
                )
              }
            >
              <ShippingAddress selectedAddress={selectedAddress} />
            </Section>
            <Section
              title="Items"
              actionBtn={
                <Button
                  title="Modify"
                  outline
                  size="tiny"
                  onPress={() => router.push({ pathname: '/cart' })}
                />
              }
            >
              <OrderItems cartItems={cartItems} />
            </Section>
            <Section borderBottom={0} title="Shipping">
              <ShippingOptions
                address={selectedAddress}
                selectedShipping={selectedShipping}
                setSelectedShipping={setSelectedShipping}
              />
            </Section>

            <Section borderBottom={0} title="payments">
              <PaymentOptions
                options={keysData.options}
                selectedOption={paymentOption}
                setPaymentOption={setPaymentOption}
              />
            </Section>
          </ScrollView>
        </SafeAreaView>
        <View style={styles.footer}>
          <StripeBtn />
          <PayWithFlutterwave
            onRedirect={async data => {
              if (data.status !== 'cancelled') {
                handleUpdateOrder(data)
              }
            }}
            options={{
              tx_ref: `flw_tx_ref_${keysData?.iat}`,
              authorization: keysData?.flutter.FLW_PUBLIC_KEY,
              customer: {
                email: selectedAddress?.email,
                phone: selectedAddress?.phonenumber,
                fullName: selectedAddress?.name,
              },
              amount: 1000,
              // amount: totalPrice + (selectedShipping?.price || 0),
              currency: 'UGX',
            }}
            customButton={props => (
              <Button
                isLoading={
                  isCreating ||
                  props.isInitializing ||
                  props.disabled ||
                  isUpdating
                }
                textStyle={styles.payBtnTextStyle}
                style={styles.checkoutButton}
                onPress={async () => {
                  if (!orderData?.data?._id) {
                    await handlePayNow()
                  }
                  props.onPress()
                }}
                disabled={props.disabled || isCreating}
                title={`Pay ${(totalPrice + (selectedShipping?.price || 0)).toLocaleString()} /-`}
                iconLeft={
                  <LockSimple style={styles.lockIcon} size={17} color="white" />
                }
              />
            )}
          />
        </View>
        <LoadingOverlay visible={isUpdating} />
      </StripeProvider>
    </SecureRoute>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    // paddingHorizontal: 10,
  },
  footer: {
    padding: 15,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: '#F7F9FC',
    borderTopWidth: 1,
    borderColor: '#E4E9F2',
  },
  contentContainerStyle: {
    paddingBottom: 120,
  },
  lockIcon: { marginLeft: 'auto' },
  payBtnTextStyle: { marginRight: 'auto' },
  loadingText: { fontSizes: 11 },
})

export default CheckoutScreen
