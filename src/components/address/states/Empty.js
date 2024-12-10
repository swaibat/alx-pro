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
          style={styles.image}
        />
        <Text fontWeight="bold" style={styles.noAddressesText}>
          No Addresses Found
        </Text>
        <Text secondary style={styles.addAddressText}>
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
  image: {
    width: 160,
    height: 160,
    marginBottom: 10,
  },
  noAddressesText: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
  addAddressText: {
    textAlign: 'center',
  },
})

export default EmptyAddressScreen
