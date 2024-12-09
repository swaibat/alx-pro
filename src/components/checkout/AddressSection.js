import React from 'react'
import { View, StyleSheet } from 'react-native'
import { User, MapPin, Phone } from 'phosphor-react-native'
import { useRouter } from 'expo-router'
import { Button } from '@/components/@ui/Button'
import { Text } from '@/components/@ui/Text'
import Divider from '@/components/@ui/Divider'
import { colors } from '@/constants/theme'

const ShippingAddress = ({ selectedAddress }) => {
  const router = useRouter()

  return (
    <View>
      {selectedAddress ? (
        <View style={styles.card}>
          <View style={styles.addressRow}>
            <MapPin size={20} />
            <Text style={styles.addressText}>
              {selectedAddress.addressName}
            </Text>
            <Text style={styles.addressLabel}>
              {selectedAddress.addressLabel || 'Home'}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.namePhoneRow}>
            <View style={styles.rowItem}>
              <User size={20} />
              <Text style={styles.infoText}>
                {selectedAddress.name || 'John Doe'}
              </Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.rowItem}>
              <Phone size={20} />
              <Text style={styles.infoText}>
                {selectedAddress.phoneNumber || 'N/A'}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Button
          style={styles.addAddressButton}
          title="Add Shipping Address"
          outline
          onPress={() =>
            router.push({ pathname: '/addressBook', params: { edit: true } })
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: colors.grey[300],
  },
  addressRow: { flexDirection: 'row', alignItems: 'center' },
  addressLabel: {
    marginLeft: 'auto',
    paddingVertical: 3,
    paddingHorizontal: 10,
    fontSize: 12,
    backgroundColor: '#EDF1F7',
    borderRadius: 6,
  },
  addressText: { marginLeft: 10, flex: 1, fontSize: 13 },
  namePhoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.grey[300],
    marginHorizontal: 15,
  },
  infoText: { marginLeft: 10, fontSize: 14, textTransform: 'capitalize' },
  addAddressButton: { marginTop: 16 },
  divider: { marginVertical: 5 },
})

export default ShippingAddress
