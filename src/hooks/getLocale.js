import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import countries from '@/assets/countries.json'

const getLocale = async () => {
  try {
    const response = await axios.get('https://www.cloudflare.com/cdn-cgi/trace')
    const data = response.data
    const lines = data.split('\n')
    const locLine = lines.find(line => line.startsWith('loc='))
    const location = locLine?.split('=')[1]
    if (location) {
      const data = countries.find(c => c.code === location)
      if (data) {
        await AsyncStorage.setItem('loc', JSON.stringify(data))
      }
    }
  } catch (err) {
    await AsyncStorage.setItem('loc', '')
  }
}

export default getLocale
