import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'

const EmptyCategoryScreen = () => {
  return (
    <Layout style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/error.png')}
          style={{ width: 160, height: 160, marginBottom: 10 }}
        />
        <Text category="s1" appearance="hint">
          No Products Found
        </Text>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    // fontSize: 18,
    fontWeight: 'bold',
  },
})

export default EmptyCategoryScreen
