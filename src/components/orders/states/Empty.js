import React from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import { Text } from '@/components/@ui/Text'
import { useRouter } from 'expo-router'
import { Button } from '@/components/@ui/Button'

const { height: deviceHeight } = Dimensions.get('window')

const EmptyOrderScreen = () => {
  const router = useRouter()
  return (
    <View style={[styles.container, { height: deviceHeight - 150 }]}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/empty.png')}
          style={styles.illustration}
        />
        <Text secondary italic>
          No Orders Found
        </Text>
        <Button
          mode="contained"
          onPress={() => router.push('/ads/list')}
          style={styles.shopButton}
          title="Shop Now"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  illustration: {
    width: 160,
    height: 160,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    marginTop: -100,
  },
  shopButton: {
    marginTop: 20,
  },
})

export default EmptyOrderScreen
