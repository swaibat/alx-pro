import React, { useEffect, useState, useCallback } from 'react'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper'
import * as eva from '@eva-design/eva'
import { Provider } from 'react-redux'
import { ApplicationProvider } from '@ui-kitten/components'
import { store } from '@/store'
import { getAuthState } from '@/scripts/asyncStorage'
import { setAuthState } from '@/store/authSlice'
import AppSnackbar from '@/components/_global/AppSnackbar'
import { usePushNotifications } from '@/scripts/NotificationsService'

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  usePushNotifications()

  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/FontsFree-Net-SFProDisplay-Bold.ttf'),
    digital7: require('@/assets/fonts/digital_7/digital-7.ttf'),
  })

  const [authLoaded, setAuthLoaded] = useState(false)

  // Memoized function to load auth state
  const loadAuthState = useCallback(async () => {
    const { user } = await getAuthState()
    store.dispatch(setAuthState({ user }))
    setAuthLoaded(true)
  }, [])

  useEffect(() => {
    loadAuthState()
  }, [loadAuthState])

  useEffect(() => {
    if (loaded && authLoaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded, authLoaded])

  if (!loaded || !authLoaded) {
    return null
  }

  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: '#004F70',
      background: '#FF3333',
      surface: '#FFFFFF',
    },
  }

  const cThemeRed = {
    'color-primary-500': '#004F70',
  }

  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...cThemeRed }}>
        <PaperProvider theme={theme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="ads/[id]" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <AppSnackbar />
        </PaperProvider>
      </ApplicationProvider>
    </Provider>
  )
}

export default React.memo(RootLayout) // Memoize the entire component
