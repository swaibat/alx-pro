import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ArrowsClockwise, Package, ShieldCheck } from 'phosphor-react-native'
import GooglePlacesAutocomplete from '@/components/address/GoogleAutoComplete'
import { colors } from '@/constants/theme'
import { Button } from '@/components/@ui/Button'
import { useRouter } from 'expo-router'

const DeliveryReturnInfo = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      {/* Delivery Information Section */}
      <GooglePlacesAutocomplete mapHeight={70} onPress={loc => loc} />
      {/* Delivery Info */}
      <View style={styles.infoRow}>
        <Package size={24} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Delivery</Text>
          <Text style={styles.description}>
            Standard delivery within 1-2 business days. Free shipping on orders
            above UGX 500,000.
          </Text>
        </View>
      </View>

      {/* Return Policy */}
      <View style={styles.infoRow}>
        <ArrowsClockwise size={24} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Return Policy</Text>
          <Text style={styles.description}>
            Returns accepted within 30 days of purchase. Items must be in
            original condition.
          </Text>
          <Button
            title="Details"
            onPress={() => router.push('/return_policy')}
            style={{ marginLeft: -10 }}
            size="small"
            ghost
          />
        </View>
      </View>

      {/* Warranty Info */}
      <View style={styles.infoRow}>
        <ShieldCheck size={24} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Warranty</Text>
          <Text style={styles.description}>
            1-year warranty on all products. Covers manufacturing defects.
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  section: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  icon: {
    marginRight: 12,
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.grey[800],
    lineHeight: 20,
  },
})

export default DeliveryReturnInfo
