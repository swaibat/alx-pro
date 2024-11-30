import React from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import { Text } from '@/components/@ui/Text'

const screenHeight = Dimensions.get('window').height
const adjustedHeight = screenHeight - 250

const EmptyAddressScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/empty.png')}
          style={{ width: 160, height: 160, marginBottom: 10 }}
        />
        <Text
          fontWeight="bold"
          style={{ textAlign: 'center', marginVertical: 10, fontSize: 16 }}
        >
          No Addresses Found
        </Text>
        <Text secondary style={{ textAlign: 'center' }}>
          Press the Plus button at the bottom right to add Address
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: adjustedHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    // fontSize: 18,
    fontWeight: 'bold',
  },
})

export default EmptyAddressScreen
