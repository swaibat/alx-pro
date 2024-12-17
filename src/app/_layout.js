import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { Provider } from 'react-redux'
import { store } from '@/store'
import AppSnackbar from '@/components/global/AppSnackbar'
import { HeaderRight } from '@/components/@ui/HeaderRight'
import SplashScreenComponent from '@/components/global/SplashScreenComponent'
import SalesPopup from '@/components/products/SalesPopup'
import getLocale from '@/hooks/getLocale'

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
      await getLocale()
      SplashScreen.hide()
      setAppIsReady(true)
    }
    prepare()
  }, [])

  if (!appIsReady) {
    return <SplashScreenComponent />
  }

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
            headerShown: false,
          }}
        />
        <Stack.Screen name="checkout" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        <Stack.Screen
          name="privacy_policy"
          options={{
            title: 'Privacy Policy',
            headerTitleStyle,
          }}
        />
        <Stack.Screen
          name="terms_of_service"
          options={{
            title: 'Terms of Service',
            headerTitleStyle,
          }}
        />
        <Stack.Screen
          name="forgot_password"
          options={{
            title: 'Forgot Password',
            headerShown: true,
            headerShadowVisible: false,
            headerTitleStyle,
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
            headerTitleStyle,
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
            headerTitleStyle,
          }}
        />
      </Stack>
      <AppSnackbar />
      <SalesPopup />
    </Provider>
  )
}

export default React.memo(RootLayout)
