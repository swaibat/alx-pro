import { useEffect, useState, useCallback } from 'react'
import NetInfo from '@react-native-community/netinfo'
import { useRouter } from 'expo-router'
import Constants from 'expo-constants'

export const useNetworkStatus = () => {
  const [isOffline, setIsOffline] = useState(false)
  const router = useRouter()

  const checkNetworkStatus = useCallback(async () => {
    // Check if device has network connection
    const state = await NetInfo.fetch()
    if (!state.isConnected || !state.isInternetReachable) {
      setIsOffline(true)
      return
    }

    try {
      const response = await fetch(Constants.expoConfig.extra.SERVER_URL, {
        method: 'HEAD',
      })
      setIsOffline(response.status !== 200)
    } catch (error) {
      setIsOffline(!!error)
    }
  }, [])

  useEffect(() => {
    checkNetworkStatus()

    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected || !state.isInternetReachable)
    })

    return () => unsubscribe()
  }, [checkNetworkStatus])

  useEffect(() => {
    if (isOffline) {
      router.navigate('connection-failed')
    }
  }, [isOffline, router])

  return { isOffline, checkNetworkStatus }
}
