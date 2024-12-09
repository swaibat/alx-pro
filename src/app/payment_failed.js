import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { XCircle } from 'phosphor-react-native'
import { Text } from '@/components/@ui/Text'
import { Button } from '@/components/@ui/Button'

const OrderFailedScreen = () => {
  const router = useRouter()

  return (
    <>
      <View style={styles.container}>
        <View style={styles.infoWrapper}>
          <XCircle size={80} color="gray" weight="fill" />
          <Text style={styles.title}>Payment Failed</Text>
          <Text secondary style={styles.description}>
            We were unable to process your payment at this time.
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
  infoWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    marginVertical: 16,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    width: '100%',
  },
})

export default OrderFailedScreen
