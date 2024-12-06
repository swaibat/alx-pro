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
} from '@/scripts/locations'
import Constants from 'expo-constants'

const { MAPS_API_URL, GOOGLE_API_KEY } = Constants.expoConfig.extra

const PlacesAutocomplete = ({ onPress }) => {
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
      <View style={[styles.mapContainer, { height: 100 }]}>
        {!details?.geo && loading ? ( // Display loading text if loading is true
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <Image
            source={
              details?.geo
                ? {
                    uri: `${MAPS_API_URL}/staticmap?key=${GOOGLE_API_KEY}&center=${details.geo[0]},${details.geo[1]}&zoom=15&size=370x100&maptype=roadmap&&markers=${details.geo[0]},${details.geo[1]}&sensor=false&style=feature:all|element:geometry|color:0xf2e5d4&style=feature:road|element:geometry.stroke|color:0xd0b084&style=feature:road.highway|element:geometry.fill|color:0xfbc590&style=feature:road.local|element:geometry.fill|color:0xffdfa6&style=feature:water|element:geometry.fill|color:0xaadaff&style=feature:landscape|element:geometry.fill|color:0xf5f5f2`,
                  }
                : null
            }
            style={styles.mapImage}
          />
        )}
      </View>
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
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 14,
  },
  mapContainer: {
    marginBottom: 16,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
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
