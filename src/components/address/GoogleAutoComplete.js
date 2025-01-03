import React, { useState, useEffect, useCallback } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import * as Location from 'expo-location'
import { CaretDown } from 'phosphor-react-native'
import Input from '@/components/@ui/Input'
import { Image } from 'react-native'
import {
  fetchCurrentLocationAddress,
  fetchPlaceDetails,
  fetchPlacePredictions,
  staticMapUri,
} from '@/scripts/locations'

const PlacesAutocomplete = ({ onPress, showMap = true }) => {
  const [inputText, setInputText] = useState('')
  const [predictions, setPredictions] = useState([])
  const [details, setDetails] = useState(null)
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false)
  const [loading, setLoading] = useState(false)

  const debouncedFetchPredictions = useCallback(async text => {
    if (text.length > 2) {
      setLoading(true)
      const results = await fetchPlacePredictions(text)
      setPredictions(results)
      setLoading(false)
    } else {
      setPredictions([])
    }
  }, [])

  useEffect(() => {
    const checkAndRequestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      setLocationPermissionGranted(status === 'granted')
    }

    checkAndRequestLocationPermission()
  }, [])

  useEffect(() => {
    const loadCurrentLocation = async () => {
      if (locationPermissionGranted) {
        try {
          setLoading(true)
          const placeDetails = await fetchCurrentLocationAddress()
          setDetails(placeDetails)
          onPress(placeDetails)
          setInputText(placeDetails.addressName)
          setLoading(false)
        } catch (error) {
          setLoading(!error)
        }
      }
    }

    loadCurrentLocation()
  }, [locationPermissionGranted])

  const handleTextChange = text => {
    setInputText(text)
    debouncedFetchPredictions(text)
  }

  const handlePlaceSelected = async place => {
    const placeDetails = await fetchPlaceDetails(place.place_id)
    setDetails(placeDetails)
    setInputText(placeDetails.addressName)
    onPress(placeDetails)
    setPredictions([])
  }

  return (
    <View>
      {showMap && (
        <View style={styles.mapContainer}>
          {!details?.geo && loading ? ( // Display loading text if loading is true
            <Text style={styles.loadingText}>Loading...</Text>
          ) : (
            <Image
              source={
                details?.geo
                  ? {
                      uri: staticMapUri(details?.geo),
                    }
                  : null
              }
              style={styles.mapImage}
            />
          )}
        </View>
      )}
      <Input
        value={inputText}
        onChangeText={handleTextChange}
        placeholder="Search for a place"
        style={styles.input}
        multiline={true}
        textAlignVertical="top"
        suffix={<CaretDown size={16} color="#333" style={styles.caretIcon} />}
      />
      {predictions.length > 0 && (
        <FlashList
          data={predictions}
          keyExtractor={item => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handlePlaceSelected(item)}
              style={styles.listItem}
            >
              <Text style={styles.listItemText}>{item.description}</Text>
            </TouchableOpacity>
          )}
          estimatedItemSize={50}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
  },
  caretIcon: {
    marginLeft: 10,
  },
  listItem: {
    paddingVertical: 7,
    paddingLeft: 15,
    borderBottomWidth: 0.7,
    borderBottomColor: '#ddd',
    shadowRadius: 5,
  },
  listItemText: {
    fontSize: 14,
  },
  mapContainer: {
    marginBottom: 16,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
})

export default PlacesAutocomplete
