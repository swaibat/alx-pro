import React from 'react'
import { useSelector } from 'react-redux'
import LoginScreen from '../../app/(tabs)/login'

const SecureRoute = ({ children }) => {
  const { user } = useSelector(state => state.auth)

  return <>{user ? children : <LoginScreen />}</>
}

export default SecureRoute
