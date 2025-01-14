import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@/components/@ui/Text'
import { Button } from '@/components/@ui/Button'
import { useRouter } from 'expo-router'
import AppImg from '@/components/@ui/AppImg'

const EmptyCart = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <AppImg
        src={require('@/assets/images/shopping.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Your cart is empty!</Text>
      <Button onPress={() => router.push('/ads/list')} title="Shop Now" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
    padding: 20,
  },
  image: {
    height: 120,
    width: 120,
  },
  text: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 14,
  },
})

export default EmptyCart
