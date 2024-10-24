import { useState, useCallback } from 'react'
import { useFocusEffect } from 'expo-router'
import { useSelector } from 'react-redux'

const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { user } = useSelector(state => state.auth)

  useFocusEffect(
    useCallback(() => {
      let isActive = true

      const checkAuthState = async () => {
        if (isActive) {
          if (user !== null) {
            setIsLoggedIn(true)
          } else {
            setIsLoggedIn(false)
          }
        }
      }
      checkAuthState()
      return () => {
        isActive = false
      }
    }, [user])
  )

  return isLoggedIn
}

export default useLogin
