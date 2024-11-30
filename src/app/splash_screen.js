import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, Animated, Easing } from 'react-native'

const SplashScreen = ({ navigation }) => {
  const progress = useRef(new Animated.Value(0)).current
  const [loadingText, setLoadingText] = useState('Loading...')

  useEffect(() => {
    // Simulate a loading process
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000, // 3 seconds
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      // Navigate to the next screen when loading is complete
      navigation.replace('HomeScreen') // Adjust 'HomeScreen' to your target screen
    })

    // Update loading text as the animation progresses
    const texts = ['Loading...', 'Fetching Data...', 'Almost There...']
    let index = 0
    const interval = setInterval(() => {
      setLoadingText(texts[index])
      index = (index + 1) % texts.length
    }, 1000) // Change text every second

    return () => clearInterval(interval)
  }, [navigation])

  const progressInterpolate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My App</Text>
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[styles.progressBar, { width: progressInterpolate }]}
        />
      </View>
      <Text style={styles.loadingText}>{loadingText}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  progressBarContainer: {
    width: '80%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  loadingText: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
})

export default SplashScreen
