import React from 'react'
import { Button } from '@/components/@ui/Button'
import { useRouter } from 'expo-router'
import { StyleSheet, Image, View, Text } from 'react-native'

export default function NotFoundScreen() {
  const router = useRouter()

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            source={require('@/assets/images/space.png')}
            style={styles.image}
          />
          <Text style={styles.title}>This screen doesn&rsquo;t exist.</Text>
          <Button
            style={styles.button}
            onPress={() => router.push('/')}
            title={'Go Back'}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  innerContainer: {
    marginTop: -150,
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 150,
  },
  title: {
    marginTop: 16,
    marginBottom: 10,
    fontSize: 14,
    color: '#8F9BB3',
    fontStyle: 'italic',
  },
  button: {
    marginTop: 15,
  },
})
