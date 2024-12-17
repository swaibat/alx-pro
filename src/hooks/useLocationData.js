import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useLocationData = () => {
  const [locationData, setLocationData] = useState(null)

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const storedLocation = await AsyncStorage.getItem('loc')
        if (storedLocation) {
          const parsedData = JSON.parse(storedLocation)
          setLocationData(parsedData)
        }
      } catch (err) {
        setLocationData(null)
      }
    }

    fetchLocationData()
  }, [])

  return locationData
}

export default useLocationData
