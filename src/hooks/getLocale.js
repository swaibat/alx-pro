import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import countries from '@/assets/countries.json'

const getLocale = async () => {
  try {
    const response = await axios.get('https://1.1.1.1/cdn-cgi/trace')
    const data = response.data
    const lines = data.split('\n')

    // Extract location and IP address
    const locLine = lines.find(line => line.startsWith('loc='))
    const ipLine = lines.find(line => line.startsWith('ip='))

    const location = locLine?.split('=')[1]
    const ip = ipLine?.split('=')[1]

    if (location) {
      const countryData = countries.find(c => c.code === location)
      if (countryData) {
        // Store country data and IP address in AsyncStorage
        await AsyncStorage.setItem('loc', JSON.stringify(countryData))
        await AsyncStorage.setItem('ip', ip || '')
      }
    }
  } catch (err) {
    // Handle error, store empty or fallback values
    await AsyncStorage.setItem('loc', '')
    await AsyncStorage.setItem('ip', '')
  }
}

export default getLocale
