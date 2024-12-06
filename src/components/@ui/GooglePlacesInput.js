import React, { useState } from 'react'
import Constants from 'expo-constants'
import {
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useSnackbar } from '@/hooks/useSnackbar'

const GooglePlacesAutocomplete = () => {
  const [query, setQuery] = useState('')
  const [predictions, setPredictions] = useState([])
  const [selectedPlace, setSelectedPlace] = useState(null)
  const { triggerSnackbar } = useSnackbar()

  // Replace with your actual Google API key
  const googleApiKey = Constants.expoConfig.extra.GOOGLE_API_KEY

  const fetchPredictions = async input => {
    if (!input) {
      setPredictions([])
      return
    }
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${googleApiKey}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      setPredictions(data.predictions || [])
    } catch (error) {
      triggerSnackbar('Error fetching predictions')
    }
  }

  const handleSelectPlace = place => {
    setQuery(place.description)
    setSelectedPlace(place)
    setPredictions([]) // Clear predictions
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectPlace(item)}>
      <View style={styles.item}>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={text => {
          setQuery(text)
          fetchPredictions(text)
        }}
        placeholder="Search for a place"
      />

      {selectedPlace && (
        <Text style={styles.selected}>
          Selected: {selectedPlace.description}
        </Text>
      )}

      {predictions.length > 0 && (
        <FlatList
          data={predictions}
          renderItem={renderItem}
          keyExtractor={item => item.place_id}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selected: {
    marginTop: 10,
    fontSize: 16,
    color: 'green',
  },
})

export default GooglePlacesAutocomplete
