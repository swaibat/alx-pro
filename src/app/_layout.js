import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { Provider } from 'react-redux'
import { store } from '@/store'
import AppSnackbar from '@/components/global/AppSnackbar'
import { useNetworkStatus } from '@/hooks/useNetworkStatus'
import { StatusBar } from 'expo-status-bar'
import { HeaderRight } from '@/components/@ui/HeaderRight'

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const { isOffline, checkNetworkStatus } = useNetworkStatus()

  useEffect(() => {
    checkNetworkStatus()
  }, [isOffline])

  const headerTitleStyle = {
    textTransform: 'capitalize',
  }

  return (
    <Provider store={store}>
      <Stack initialRouteName="splash_screen">
        <Stack.Screen name="splash_screen" />
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
    </Provider>
  )
}

export default React.memo(RootLayout)
