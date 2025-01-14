import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Constants from 'expo-constants'
import { useGetMessagesQuery } from '@/api'
import { useSelector } from 'react-redux'
import { useFocusEffect, usePathname } from 'expo-router'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useSocket = () => {
  const pathname = usePathname()
  const [socket, setSocket] = useState(null) // Use a single socket connection
  const { refetch } = useGetMessagesQuery(undefined, {
    skip: !socket, // Skip the query if socket isn't initialized
  })
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (!user?._id) return

    const initializeSocket = async () => {
      try {
        // Fetch IP and Location from AsyncStorage
        const ip = await AsyncStorage.getItem('ip')
        const loc = await AsyncStorage.getItem('loc')

        // Use SERVER_URL_1 for the socket connection
        const serverUrl = Constants.expoConfig.extra.SERVER_URL_1

        // Initialize connection to the server
        const newSocket = io(serverUrl, {
          transports: ['websocket'],
          auth: {
            userID: user?._id,
            name: user?.name,
            os: Platform.OS,
            ip: ip || 'Unknown',
            country: loc ? JSON.parse(loc).code : 'Unknown',
          },
          autoConnect: true,
          reconnection: true,
        })

        setSocket(newSocket)
      } catch (error) {
        console.error('Error initializing socket with IP and LOC:', error)
      }
    }

    initializeSocket()

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [user])

  useEffect(() => {
    if (socket && user?._id) {
      const event = `PC_${user?._id}`
      socket.on(event, () => {
        refetch()
      })
      return () => {
        socket.off(event)
      }
    }
  }, [socket, user, refetch])

  useFocusEffect(() => {
    if (socket) {
      const event = `PAGE_VISIT_${user?._id || 'guest'}`
      console.log('Screen focused==:', pathname)

      // Emit the pathname as the page activity
      socket.emit(event, { pathname, timestamp: new Date().toISOString() })
    }
  })

  return { socket }
}
