import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Constants from 'expo-constants'
import { useGetMessagesQuery } from '@/api'
import { useSelector } from 'react-redux'

export const useSocket = () => {
  const [sockets, setSockets] = useState([])
  const { refetch } = useGetMessagesQuery(undefined, {
    skip: sockets.length === 0,
  })
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (!user?._id) return

    // List of server URLs
    const serverUrls = [
      Constants.expoConfig.extra.SERVER_URL,
      Constants.expoConfig.extra.SERVER_URL_1,
      Constants.expoConfig.extra.SERVER_URL_2,
      // Add more server URLs here
    ]

    // Initialize connections to multiple servers
    const newSockets = serverUrls.map(url =>
      io(url, {
        transports: ['websocket'],
        auth: {
          userID: user?._id,
          name: user?.name,
        },
        autoConnect: true,
        reconnection: true,
      })
    )

    setSockets(newSockets)

    // Clean up connections on unmount
    return () => {
      newSockets.forEach(socket => socket.disconnect())
    }
  }, [user])

  useEffect(() => {
    if (sockets.length > 0 && user?._id) {
      const event = `PC_${user?._id}`

      sockets.forEach(socket => {
        socket.on(event, () => {
          refetch()
        })
      })

      return () => {
        sockets.forEach(socket => {
          socket.off(event)
        })
      }
    }
  }, [sockets, user])

  return { sockets } // Return all socket instances if needed
}
