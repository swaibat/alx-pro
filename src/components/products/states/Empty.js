import React from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import { Text } from '@/components/@ui/Text'

const EmptyCategoryScreen = () => {
  const screenHeight = Dimensions.get('window').height
  const adjustedHeight = screenHeight - 250

  return (
    <View style={[styles.content, { height: adjustedHeight }]}>
      <View>
        <Image
          source={require('@/assets/images/empty.png')}
          style={styles.img}
        />
        <Text secondary italic>
          No Products Found
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    marginTop: 'auto',
  },
  img: { width: 160, height: 160, marginBottom: 10 },
})

export default EmptyCategoryScreen
