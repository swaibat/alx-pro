import React from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import { Text } from '@/components/@ui/Text'

const { height: deviceHeight } = Dimensions.get('window')

const EmptyChatScreen = () => {
  return (
    <View style={[styles.container, { height: deviceHeight - 150 }]}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/images/message.png')}
          style={styles.image}
        />
        <Text secondary italic style={styles.message}>
          No chats yet. Send us a message to start conversation!
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '70%',
    marginTop: -100,
  },
  image: {
    width: 130,
    height: 130,
    marginBottom: 10,
  },
  message: {
    textAlign: 'center',
    marginTop: 10,
  },
})

export default EmptyChatScreen
