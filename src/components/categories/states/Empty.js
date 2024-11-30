import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Text } from '@/components/@ui/Text'

const EmptyCategoryScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/empty.png')}
          style={{ width: 160, height: 160, marginBottom: 10 }}
        />
        <Text secondary>No categories Found</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginTop: -100,
  },
  text: {
    // fontSize: 18,
    fontWeight: 'bold',
  },
})

export default EmptyCategoryScreen