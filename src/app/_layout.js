import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { Provider } from 'react-redux'
import { store } from '@/store'
import AppSnackbar from '@/components/global/AppSnackbar'
import { useNetworkStatus } from '@/hooks/useNetworkStatus'
import { StatusBar } from 'expo-status-bar'
import { HeaderRight } from '@/components/@ui/HeaderRight'

import * as Font from 'expo-font'
import Entypo from '@expo/vector-icons/Entypo'
import SplashScreenComponent from '@/components/global/SplashScreenComponent'
import SalesPopup from '@/components/products/SalesPopup'

SplashScreen.preventAutoHideAsync()

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
})

const RootLayout = () => {
  // useNetworkStatus()
  // useEffect(() => {
  //     checkNetworkStatus()
  //   }, [isOffline])
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(Entypo.font)
      } catch (e) {
        console.warn(e)
      } finally {
        SplashScreen.hide()
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  if (!appIsReady) {
    return <SplashScreenComponent />
  }

  // 

  const headerTitleStyle = {
    textTransform: 'capitalize',
  }

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="ads/[id]"
          options={{
            title: '',
            headerShadowVisible: false,
            headerRight: () => (
              <HeaderRight buttons={[{ name: 'search' }, { name: 'cart' }]} />
            ),
            headerTitleStyle, // Reusable header title style
          }}
        />
        <Stack.Screen
          name="checkout"
          options={{
            title: 'Checkout',
            headerShown: true,
            headerShadowVisible: false,
            headerTitleStyle, // Reusable header title style
          }}
        />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        <Stack.Screen
          name="privacy_policy"
          options={{
            title: 'Privacy Policy',
            headerTitleStyle, // Reusable header title style
          }}
        />
        <Stack.Screen
          name="terms_of_service"
          options={{
            title: 'Terms of Service',
            headerTitleStyle, // Reusable header title style
          }}
        />
        <Stack.Screen
          name="forgot_password"
          options={{
            title: 'Forgot Password',
            headerShown: true,
            headerShadowVisible: false,
            headerTitleStyle, // Reusable header title style
          }}
        />
        <Stack.Screen
          name="ads/list"
          options={{
            title: 'Products',
            headerShown: true,
            headerShadowVisible: false,
            headerLargeTitle: true,
            headerRight: () => (
              <HeaderRight buttons={[{ name: 'search' }, { name: 'cart' }]} />
            ),
            headerTitleStyle, // Reusable header title style
          }}
        />
        <Stack.Screen
          name="connection-failed"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="chat"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="payment_success"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="payment_failed"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FAQ"
          options={{
            headerTitleStyle, // Reusable header title style
          }}
        />
      </Stack>
      <StatusBar style="auto" />
      <AppSnackbar />
      {/* <SalesPopup /> */}
    </Provider>
  )
}

export default React.memo(RootLayout)
