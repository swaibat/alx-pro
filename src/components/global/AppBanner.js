import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import { Button } from '../@ui/Button'
import { useRouter } from 'expo-router'

const AppBanner = () => {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/prom.png')}
        style={styles.imageBackground}
        imageStyle={styles.imageBackgroundStyle}
      >
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text bold style={styles.textTitle}>
              Limited Time!
            </Text>
            <Text fontWeight="lightItalic" style={styles.textSubtitle}>
              Get Special Offer
            </Text>
            <Text bold style={styles.textDiscount}>
              Up to 40%
            </Text>
          </View>
          <Button
            onPress={() => router.push('/ads/list')}
            size="small"
            title="Shop Now"
          />
        </View>
      </ImageBackground>
    </View>
  )
}

export default AppBanner

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  imageBackground: {
    height: 140,
    justifyContent: 'center',
  },
  imageBackgroundStyle: {
    borderRadius: 8,
  },
  contentContainer: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
  },
  textContainer: {
    backgroundColor: 'transparent',
  },
  textTitle: {
    color: 'white',
  },
  textSubtitle: {
    color: 'white',
  },
  textDiscount: {
    fontSize: 30,
    fontWeight: '800',
    color: 'white',
  },
})
