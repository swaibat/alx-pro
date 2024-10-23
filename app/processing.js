import React, { useEffect } from 'react'
import { View, Text, StatusBar } from 'react-native'
import SpinSVG from '@/components/Spinner'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Layout, useTheme } from '@ui-kitten/components'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMakePaymentMutation } from '@/api'
import { Appbar } from 'react-native-paper'
import { Lock } from 'phosphor-react-native'

const DepositProcessing = () => {
  const theme = useTheme() // Access the theme colors
  const { amount, msisdn, orderId } = useLocalSearchParams()
  const [payNow] = useMakePaymentMutation()
  const router = useRouter()

  const fetchData = async () => {
    try {
      const response = await payNow({ amount, msisdn, orderId }).unwrap() // Use unwrap to get the response directly

      if (response.status === 'success') {
        console.log('Payment successful:', response)
      } else {
        router.push('/paymentFailed') // Adjust the path according to your routing setup
      }
    } catch (error) {
      console.log('Payment error:', error.message)
      router.push('/paymentFailed')
    }
  }

  useEffect(() => {
    fetchData()
  }, [amount, msisdn])

  return (
    <Layout style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Processing " />
      </Appbar.Header>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          padding: 10,
        }}
      >
        <View style={{ margin: 'auto', padding: 20 }}>
          <View style={{ paddingVertical: 6, marginBottom: 20 }}>
            <SpinSVG />
          </View>
          {/* Updated to use theme for text color */}
          <Text
            style={{
              fontSize: 20,
              marginBottom: 20,
              color: theme['text-basic-color'],
              textAlign: 'center',
            }}
          >
            Waiting for you to Complete
          </Text>
          {/* Kept hardcoded colors where necessary */}
          <Text
            style={{ textAlign: 'center', color: theme['text-hint-color'] }}
          >
            Confirmation Prompt has been sent to{' '}
          </Text>
          <Text
            style={{
              color: theme['text-hint-color'],
              fontWeight: 'bold',
              display: 'block',
              textAlign: 'center',
            }}
          >
            +256{msisdn}
          </Text>
          <Text style={{ color: theme['text-hint-color'] }}>
            Enter your PIN to confirm or Press *165#
          </Text>
        </View>
      </View>
      <SafeAreaView style={{ width: '100%' }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: theme['color-basic-300'], // Kept hardcoded color for background
            width: '100%',
            padding: 15,
            gap: 3,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          {/* Updated to use theme for text color */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Lock size={20} color={theme['text-hint-color']} />
            <Text
              style={{
                marginLeft: 8,
                color: theme['text-hint-color'],
                textAlign: 'center',
              }}
            >
              Secure payment
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Layout>
  )
}

export default DepositProcessing
