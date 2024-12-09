import axios from 'axios'
import Constants from 'expo-constants'
import * as Location from 'expo-location'

const { MAPS_API_URL, GOOGLE_API_KEY } = Constants.expoConfig.extra

const api = axios.create({
  baseURL: MAPS_API_URL,
  params: {
    key: GOOGLE_API_KEY,
  },
})

const ENDPOINTS = {
  AUTOCOMPLETE: '/place/autocomplete/json',
  DETAILS: '/place/details/json',
  GEOCODE: '/geocode/json',
}

export const staticMapUri = geo => {
  return `${MAPS_API_URL}/staticmap?key=${GOOGLE_API_KEY}&center=${geo[0]},${geo[1]}&zoom=12&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xebe3cd&style=element:labels.text.fill%7Ccolor:0x523735&style=element:labels.text.stroke%7Ccolor:0xf5f1e6&style=feature:administrative%7Celement:geometry.stroke%7Ccolor:0xc9b2a6&style=feature:administrative.land_parcel%7Celement:geometry.stroke%7Ccolor:0xdcd2be&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xae9e90&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x93817c&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0xa5b076&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x447530&style=feature:road%7Celement:geometry%7Ccolor:0xf5f1e6&style=feature:road.arterial%7Celement:geometry%7Ccolor:0xfdfcf8&style=feature:road.highway%7Celement:geometry%7Ccolor:0xf8c967&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0xe9bc62&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0xe98d58&style=feature:road.highway.controlled_access%7Celement:geometry.stroke%7Ccolor:0xdb8555&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x806b63&style=feature:transit.line%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:transit.line%7Celement:labels.text.fill%7Ccolor:0x8f7d77&style=feature:transit.line%7Celement:labels.text.stroke%7Ccolor:0xebe3cd&style=feature:transit.station%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:water%7Celement:geometry.fill%7Ccolor:0xb9d3c2&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x92998d&size=420x70&markers=color:red%7C&markers=color:red%7C${geo[0]},${geo[1]}`

  // return `${MAPS_API_URL}/staticmap?key=${GOOGLE_API_KEY}&center=${geo[0]},${geo[1]}&zoom=15&size=420x70&maptype=roadmap&markers=color:red%7C${geo[0]},${geo[1]}&sensor=false`
}

const handleApiError = error => {
  // console.error(`[${context}] Error:`, error.message || error)
  throw error
}

const validateApiResponse = (response, context) => {
  if (response.data.status !== 'OK') {
    // console.error(`[${context}] API Response Error:`, response.data)
    throw new Error(`${context} failed.`)
  }
  return response.data
}

export const fetchPlacePredictions = async inputText => {
  try {
    const response = await api.get(ENDPOINTS.AUTOCOMPLETE, {
      params: { input: inputText, components: 'country:UG' },
    })
    return validateApiResponse(response, 'Fetch Place Predictions').predictions
  } catch (error) {
    handleApiError(error, 'Fetch Place Predictions')
    return []
  }
}

export const fetchPlaceDetails = async placeId => {
  try {
    const response = await api.get(ENDPOINTS.DETAILS, {
      params: { place_id: placeId },
    })
    const res = validateApiResponse(response, 'Fetch Place Details')
    return getLocationInfo(res.result)
  } catch (error) {
    handleApiError(error, 'Fetch Place Details')
  }
}

export const fetchCurrentLocationAddress = async () => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    })

    if (!coords?.latitude || !coords?.longitude) {
      throw new Error('Invalid coordinates received')
    }

    const { latitude, longitude } = coords

    const response = await api.get(ENDPOINTS.GEOCODE, {
      params: { latlng: `${latitude},${longitude}` },
    })
    const data = validateApiResponse(response, 'Fetch Current Location')

    const placeId = data.results[0]?.place_id
    if (!placeId) return null

    return fetchPlaceDetails(placeId)
  } catch (error) {
    handleApiError(error, 'Fetch Current Location')
  }
}

export const getLocationInfo = details => {
  if (!details || !details.geometry || !details.address_components) {
    // console.error('Invalid location details provided')
    return null
  }

  const { lat, lng } = details.geometry.location
  const addressComponents = details.address_components

  const updatedLocationInfo = {
    geo: [lat, lng],
    country: null,
    state: null,
    city: null,
    postalCode: null,
    street: null,
    addressName: '',
    placeId: details.place_id || null,
  }

  const componentMap = {
    country: 'country',
    administrative_area_level_1: 'state',
    administrative_area_level_2: 'city',
    postal_code: 'postalCode',
    route: 'street',
  }

  addressComponents.forEach(({ types, long_name }) => {
    const matchedType = types.find(type => componentMap[type])
    if (matchedType) {
      const key = componentMap[matchedType]
      updatedLocationInfo[key] = long_name
    }
  })

  const { city, state, country, street } = updatedLocationInfo
  updatedLocationInfo.addressName = [street, city, state, country]
    .filter(Boolean)
    .join(', ')

  return updatedLocationInfo
}
