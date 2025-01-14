import { StyleSheet, View } from 'react-native'
import React from 'react'
import ProgressBar from '@/assets/ProgressBar'
import BouncingSVG from '@/assets/BouncingLogo'

const SplashScreenComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <BouncingSVG />
      </View>
      <ProgressBar />
    </View>
  )
}

export default SplashScreenComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#004F70',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
