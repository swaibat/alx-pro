import React from 'react'
import { useSelector } from 'react-redux'
import { useFocusEffect, useRouter } from 'expo-router'

const SecureRoute = ({ children }) => {
  const router = useRouter()
  const { user } = useSelector(state => state.auth)

  useFocusEffect(
    React.useCallback(() => {
      const checkAuthState = async () => {
        if (!user) {
          router.push('/login')
        }
      }
      checkAuthState()
    }, [user])
  )

  return <>{user ? children : null}</>
}

export default SecureRoute
