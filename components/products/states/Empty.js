import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Text } from '@ui-kitten/components'

const EmptyCategoryScreen = () => {
  return (
    <View style={styles.content}>
      <Image
        source={require('@/assets/images/error.png')}
        style={{ width: 160, height: 160, marginBottom: 10 }}
      />
      <Text category="s1" appearance="hint">
        No Products Found
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: 'auto',
  },
})

export default EmptyCategoryScreen
