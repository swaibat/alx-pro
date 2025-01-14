import { Button } from '@/components/@ui/Button'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text } from 'react-native'
import { StyleSheet, Image, View } from 'react-native'

export default function NotFoundScreen() {
  const router = useRouter()
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.innerContent}>
          <Image
            source={require('@/assets/images/error.png')}
            style={styles.image}
          />
          <Text style={styles.title}>
            Connection failed. Please check your network and try again.
          </Text>
          <Button
            style={styles.button}
            onPress={() => router.push('/')}
            title="Retry Now"
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    padding: 30,
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    marginTop: 16,
    marginBottom: 10,
    fontSize: 14,
    color: '#8F9BB3',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  button: {
    marginTop: 15,
  },
  image: { height: 150, width: 150 },
  innerContent: {
    marginTop: -100,
    alignItems: 'center',
  },
})
