import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AirplaneTilt } from 'phosphor-react-native'
import { colors } from '@/constants/theme'

const ShippedFromAbroadBadge = ({ isLocalStore }) => {
  if (isLocalStore) return null

  return (
    <View style={styles.shippedBadge}>
      <View style={styles.iconContainer}>
        <AirplaneTilt color="green" size={13} weight="fill" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.shippedText}>Shipped From Abroad</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  shippedBadge: {
    borderWidth: 0.7,
    backgroundColor: 'white',
    overflow: 'hidden',
    height: 30,
    marginRight: 'auto',
    borderColor: colors.green[300],
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 3,
  },
  textContainer: {
    backgroundColor: colors.grey[400],
    paddingHorizontal: 7,
    borderRadius: 10,
    borderColor: 'white',
    paddingVertical: 3,
    marginRight: 5,
  },
  shippedText: {
    // color: 'white',
    fontSize: 10,
    marginLeft: 4,
  },
  iconContainer: {
    paddingHorizontal: 5,
  },
})

export default ShippedFromAbroadBadge
