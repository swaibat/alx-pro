import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import DeliveryLogo from './DeliveryLogo'
import { Text } from '@/components/@ui/Text'
import { colors } from '@/constants/theme'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const ShippingOptionItem = ({ option, selectedShipping, onSelect }) => (
  <TouchableOpacity
    onPress={() => onSelect?.(option)}
    style={[
      styles.option,
      selectedShipping?._id === option._id && styles.selectedOption,
    ]}
  >
    <View style={styles.optionDetails}>
      {onSelect && (
        <View style={styles.radioIconContainer}>
          {selectedShipping?._id === option._id ? (
            <MaterialCommunityIcons
              name="radiobox-marked"
              size={24}
              color={colors.primary}
            />
          ) : (
            <MaterialCommunityIcons
              name="radiobox-blank"
              size={24}
              color="black"
            />
          )}
        </View>
      )}
      <View>
        <View style={styles.cardContainer}>
          <View>
            <DeliveryLogo type={option?.shippingType} />
          </View>
        </View>

        <Text style={styles.deliveryText}>
          Delivery In: {option?.shippingTime}
        </Text>
        <Text style={styles.priceText}>
          UGX {(option?.baseAmount * option?.multiplier).toLocaleString()}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  radioIconContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  option: {
    padding: 15,
    borderWidth: 0.8,
    borderColor: colors.grey[300],
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  selectedOption: {
    backgroundColor: colors.orange[50],
    borderColor: colors.primary,
  },
  optionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  deliveryText: {
    marginVertical: 3,
    marginLeft: 20,
  },
  priceText: {
    color: colors.orange[500],
    fontWeight: 'bold',
    marginLeft: 20,
  },
})

export default ShippingOptionItem
