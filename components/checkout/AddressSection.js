import React, { useState, useEffect } from 'react'
import {
  Layout,
  Text,
  Button,
  Divider,
  Spinner,
  useTheme,
} from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import { User, MapPin, Phone, Envelope } from 'phosphor-react-native'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ShippingAddress = ({ addresses, isLoading }) => {
  const [shippingAddress, setShippingAddress] = useState(null)
  const theme = useTheme()
  const router = useRouter()

  useEffect(() => {
    const fetchSelectedAddress = async () => {
      try {
        const storedAddress = await AsyncStorage.getItem('selectedAddress')
        if (storedAddress) {
          const address = JSON.parse(storedAddress)
          setShippingAddress(address)
        } else if (addresses?.data?.docs.length > 0) {
          setShippingAddress(addresses?.data?.docs[0])
        }
      } catch (error) {
        console.error('Error fetching address:', error)
      }
    }

    fetchSelectedAddress()
  }, [addresses])

  return (
    <Layout
      style={[styles.container, { borderColor: theme['color-basic-400'] }]}
    >
      <View style={styles.header}>
        <Text category="s1">Shipping Address</Text>
        <Button
          appearance="ghost"
          size="small"
          onPress={() =>
            router.push({ pathname: '/addressBook', params: { edit: true } })
          }
        >
          Change
        </Button>
      </View>

      {isLoading ? (
        <View style={styles.loadingPlaceholder}>
          <Spinner size="giant" />
        </View>
      ) : shippingAddress ? (
        <Layout style={styles.card}>
          <View style={styles.addressRow}>
            <MapPin size={20} color="#8F9BB3" weight="fill" />
            <Text category="s2" style={styles.addressText}>
              {shippingAddress.addressName}, {shippingAddress.city},{' '}
              {shippingAddress.region}, Uganda
            </Text>
            <Text style={styles.addressLabel} category="c2">
              {shippingAddress.addressLabel || 'Home'}
            </Text>
          </View>
          <Divider style={{ marginVertical: 5 }} />
          <View style={styles.addressInfo}>
            <User size={20} color="#8F9BB3" weight="fill" />
            <Text category="p2" style={styles.infoText}>
              {shippingAddress.name || 'John Doe'}
            </Text>
          </View>
          <View style={styles.addressInfo}>
            <Phone size={20} color="#8F9BB3" weight="fill" />
            <Text appearance="hint" style={styles.infoText}>
              {shippingAddress.phoneNumber}
            </Text>
          </View>
          <View style={styles.addressInfo}>
            <Envelope size={20} color="#8F9BB3" weight="fill" />
            <Text appearance="hint" style={styles.infoText}>
              {shippingAddress.email || 'example@example.com'}{' '}
              {/* Display email */}
            </Text>
          </View>
        </Layout>
      ) : (
        <Button
          style={styles.addAddressButton}
          onPress={() =>
            router.push({ pathname: '/addressBook', params: { edit: true } })
          }
        >
          Add Shipping Address
        </Button>
      )}
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: { borderBottomWidth: 15, padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  card: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgb(228, 233, 242)',
  },
  addressRow: { flexDirection: 'row', alignItems: 'center' },
  addressLabel: {
    marginLeft: 'auto',
    padding: 6,
    backgroundColor: '#EDF1F7',
    borderRadius: 6,
  },
  addressText: { marginLeft: 10, width: '60%' },
  addressInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  infoText: { marginLeft: 10 },
  addAddressButton: { marginTop: 16 },
  loadingPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
})

export default ShippingAddress
