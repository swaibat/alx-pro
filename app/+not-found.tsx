import { Stack, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Image, View, ScrollView } from 'react-native'
import { Surface, Text, Button, IconButton, Appbar } from 'react-native-paper'

export default function NotFoundScreen() {
  const router = useRouter()
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Opps!!" />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={{ marginTop: -150, alignItems: 'center' }}>
          <Image
            source={require('@/assets/images/space.png')}
            style={{ height: 150, width: 150 }}
          />
          <Text style={styles.title}>This screen doesn't exist.</Text>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => router.push('/')}
          >
            Go to home screen!
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    marginTop: 16,
    marginBottom: 10,
    fontSize: 18,
    color: '#8F9BB3',
  },
  button: {
    marginTop: 15,
  },
})
