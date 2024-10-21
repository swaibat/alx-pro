import React, {useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserLoggedIn = async () => {
    try {
      const userData = await AsyncStorage.getItem('@user');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setIsLoggedIn(!!parsedData.user);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      setIsLoggedIn(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      checkUserLoggedIn();
    }, [])
  );

  return isLoggedIn;
};

export default useLogin;