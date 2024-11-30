import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveAuthState = async user => {
  await AsyncStorage.setItem('@user', JSON.stringify(user))
}

export const getAuthState = async () => {
  const user = await AsyncStorage.getItem('@user')
  return {
    user: user?.user ? JSON.parse(user.user) : null,
  }
}

export const clearAuthState = async () => {
  await AsyncStorage.removeItem('@user')
}
