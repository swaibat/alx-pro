import { useStripe } from '@stripe/stripe-react-native'
import { Button } from '../@ui/Button'
import { useEffect, useState } from 'react'
import { useStripePaymentSheetMutation } from '@/api'
import { Alert } from 'react-native'

export default function CheckoutScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [loading, setLoading] = useState(false)

  const [createSheet, { data }] = useStripePaymentSheetMutation()

  //   console.log('======', data)

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await createSheet().unwrap()

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Alx.ug.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    })
    if (!error) {
      setLoading(true)
    }
  }

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet()

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      Alert.alert('Success', 'Your order is confirmed!')
    }
  }

  useEffect(() => {
    initializePaymentSheet()
  }, [])

  return (
    <Button
      variant="primary"
      disabled={!loading}
      title="Checkout"
      onPress={openPaymentSheet}
    />
  )
}
