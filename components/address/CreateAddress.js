import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';

// Initialize Google Maps Geocoding API
Geocoder.init('YOUR_GOOGLE_MAPS_API_KEY', { language: 'en' });

const LocationPicker = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState('');
  
  // Request location permissions and fetch location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      // Reverse geocoding to get the address
      Geocoder.from(location.coords.latitude, location.coords.longitude)
        .then(json => {
          const addressComponent = json.results[0].formatted_address;
          setAddress(addressComponent);
        })
        .catch(error => console.warn(error));
    })();
  }, []);

  const handleSetAsShippingAddress = () => {
    if (address) {
      Alert.alert('Shipping Address', `Location: ${address}`);
      // You can pass the `address` to your shipping form or state here
    } else {
      Alert.alert('Error', 'No address found');
    }
  };

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="Your Location"
              description={address}
            />
          </MapView>
          <View style={{ padding: 16 }}>
            <Text style={{ marginBottom: 8 }}>Address: {address}</Text>
            <Button title="Set as Shipping Address" onPress={handleSetAsShippingAddress} />
          </View>
        </>
      ) : (
        <Text>Loading location...</Text>
      )}
    </View>
  );
};

export default LocationPicker;
