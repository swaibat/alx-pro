import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { CheckCircle } from 'phosphor-react-native'
import { Text } from '@/components/@ui/Text'
import { Button } from '@/components/@ui/Button'

const OrderSuccessScreen = () => {
  const router = useRouter()

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -100,
            paddingHorizontal: 30,
          }}
        >
          <CheckCircle size={80} color="green" weight="fill" />
          <Text style={styles.title}>Success!</Text>
          <Text secondary style={styles.description}>
            Thank you for your purchase! Your order has been successfully.
          </Text>

          <Button
            onPress={() => router.push('/orders')}
            style={styles.button}
            title="View Orders"
          />
          <Button
            outline
            onPress={() => router.push('/')}
            style={styles.button}
            title="Continue Shopping"
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginVertical: 16,
  },
  description: {
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    width: '100%',
  },
})

export default OrderSuccessScreen
