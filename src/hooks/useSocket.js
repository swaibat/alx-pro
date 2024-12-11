import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Constants from 'expo-constants'
import { useGetMessagesQuery } from '@/api'
import { useSelector } from 'react-redux'

export const useSocket = () => {
  const [socket, setSocket] = useState(null) // Use a single socket connection
  const { refetch } = useGetMessagesQuery(undefined, {
    skip: !socket, // Skip the query if socket isn't initialized
  })
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (!user?._id) return

    // Use only SERVER_URL_1 for the socket connection
    const serverUrl = Constants.expoConfig.extra.SERVER_URL_1

    // Initialize connection to the server
    const newSocket = io(serverUrl, {
      transports: ['websocket'],
      auth: {
        userID: user?._id,
        name: user?.name,
      },
      autoConnect: true,
      reconnection: true,
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
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

  return { socket }
}
