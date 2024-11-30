import { useState, useEffect, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { useRouter } from 'expo-router'
import { useRouteInfo } from 'expo-router/build/hooks'

export const EXPO_PUSH_TOKEN_STORAGE_KEY = 'expoPushToken'

export const getDeviceId = () => {
  if (Device.isDevice) {
    return Device.osBuildId || Device.osInternalBuildId
  } else {
    return 'Simulator'
  }
}

export async function storeExpoPushToken(token) {
  try {
    await AsyncStorage.setItem(EXPO_PUSH_TOKEN_STORAGE_KEY, token)
  } catch (e) {
    console.error('Failed to save push token to storage', e)
  }
}

export async function getStoredExpoPushToken() {
  try {
    const token = await AsyncStorage.getItem(EXPO_PUSH_TOKEN_STORAGE_KEY)
    return token
  } catch (e) {
    console.error('Failed to retrieve push token from storage', e)
    return null
  }
}

export async function registerForPushNotificationsAsync() {
  try {
    if (!Device.isDevice) {
      console.warn('Push notifications are not supported on a simulator')
      return null
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      console.warn('Push notification permissions not granted')
      return null
    }

    const projectId = Constants?.expoConfig?.extra?.eas?.projectId
    if (!projectId) {
      throw new Error('EAS Project ID is missing in app configuration')
    }

    const token = (await Notifications.getExpoPushTokenAsync({ projectId }))
      .data
    console.log('Expo Push Token:', token)
    await storeExpoPushToken(token)

    return token
  } catch (error) {
    console.error('Error during push notification registration:', error)
    return null
  }
}

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState('')
  const notificationListener = useRef()
  const router = useRouter()
  const route = useRouteInfo()
  const responseListener = useRef()
  const notificationTriggeredRef = useRef(false)

  useEffect(() => {
    const initPushNotifications = async () => {
      const storedToken = await getStoredExpoPushToken()
      const newToken = await registerForPushNotificationsAsync()
      if (storedToken) {
        setExpoPushToken(storedToken)
      } else {
        if (newToken) setExpoPushToken(newToken)
      }
    }

    initPushNotifications()

    notificationListener.current =
      Notifications.addNotificationReceivedListener(async notification => {
        if (!notificationTriggeredRef.current) {
          notificationTriggeredRef.current = true
          if (route.pathname === '/processing') {
            if (notification.request.content?.data?.type === 'SUCCESS') {
              router.push('/order_success')
            } else if (notification.request.content?.data?.type === 'FAILED') {
              router.push('/payment_faied')
            }
          } else {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: notification.request.content.title || 'New Notification',
                body:
                  notification.request.content.body ||
                  'You have a new message!',
                data: notification.request.content.data,
                sound: 'default',
                priority: Notifications.AndroidNotificationPriority.MAX,
                sticky: true,
              },
              trigger: null,
            })
          }
          setTimeout(() => {
            notificationTriggeredRef.current = false
          }, 1000)
        }
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener()

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        )
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }
  }, [])

  return { expoPushToken }
}
