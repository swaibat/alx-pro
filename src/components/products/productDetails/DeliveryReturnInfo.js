import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ArrowsClockwise, Package, ShieldCheck } from 'phosphor-react-native'
import GooglePlacesAutocomplete from '@/components/address/GoogleAutoComplete'
import { colors, theme } from '@/constants/theme'
import { Button } from '@/components/@ui/Button'
import { useRouter } from 'expo-router'
import DeliveryLogo from '@/components/checkout/DeliveryLogo'
import { useGetShippingByRegionQuery } from '@/api'

const DeliveryReturnInfo = () => {
  const [address, setAddress] = useState(null)
  const [activeTab, setActiveTab] = useState(null) // Active tab based on shippingType
  const { data } = useGetShippingByRegionQuery(
    { region: address?.state?.split(' ')?.[0]?.toLowerCase() },
    { skip: !address }
  )

  const shippingData = data?.data || []
  const router = useRouter()

  // Set default tab when shipping data loads
  useEffect(() => {
    if (shippingData.length > 0 && !activeTab) {
      setActiveTab(shippingData[0]?.shippingType) // Default to the first tab
    }
  }, [shippingData])

  // Renders tab content dynamically
  const renderTabContent = () => {
    const activeData = shippingData.find(
      item => item.shippingType === activeTab
    )

    if (!activeData) {
      return (
        <Text style={styles.infoText}>
          No information available for the selected shipping option.
        </Text>
      )
    }

    return (
      <View style={styles.infoRow}>
        <Package size={24} style={styles.icon} />
        <View style={styles.textContainer}>
          <View style={styles.deliveryInfoHeader}>
            <Text style={styles.title}>
              {activeData.shippingType.charAt(0).toUpperCase() +
                activeData.shippingType.slice(1)}{' '}
              Delivery
            </Text>
            <DeliveryLogo type={activeData.shippingType} />
          </View>
          <Text style={styles.description}>
            {activeData.shippingTime}. Cost: UGX{' '}
            {activeData.baseAmount * activeData.multiplier}.
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        mapHeight={70}
        showMap={false}
        placeholder="Enter your address"
        onPress={loc => setAddress(loc)}
        styles={{
          textInput: styles.input,
        }}
      />

      {/* Tabs */}
      <View style={styles.tabWrapper}>
        <View style={styles.tabContainer}>
          {shippingData.map(item => (
            <TouchableOpacity
              key={item.shippingType}
              style={[
                styles.tab,
                activeTab === item.shippingType && styles.activeTab,
              ]}
              onPress={() => setActiveTab(item.shippingType)}
            >
              <Text
                style={
                  activeTab === item.shippingType
                    ? styles.activeTabText
                    : styles.tabText
                }
              >
                {item.shippingType.charAt(0).toUpperCase() +
                  item.shippingType.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>{renderTabContent()}</View>
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
            style={styles.detailsBtn}
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

export default DeliveryReturnInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    backgroundColor: colors.grey[200],
  },
  activeTab: {
    backgroundColor: 'white',
  },
  tabText: {
    fontSize: 14,
    color: '#888',
  },
  activeTabText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  tabContent: {
    paddingHorizontal: 10,
  },
  tabWrapper: {
    borderWidth: 0.8,
    overflow: 'hidden',
    borderRadius: theme.borderRadius.md,
    marginVertical: 7,
    borderColor: colors.grey[300],
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
  deliveryInfoHeader: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  detailsBtn: { marginLeft: -10 },
})
