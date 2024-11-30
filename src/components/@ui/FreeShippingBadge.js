import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Truck } from 'phosphor-react-native'
import { colors } from '@/constants/theme'

const FreeShippingBadge = ({ freeShipping }) => {
  if (!freeShipping) return null
  return (
    <View style={styles.freeShippingBadge}>
      <View style={styles.iconContainer}>
        <Truck color="white" size={13} weight="fill" />
      </View>
      <Text style={styles.freeShippingText}>Free Shipping</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  freeShippingBadge: {
    borderWidth: 0.7,
    overflow: 'hidden',
    height: 20,
    marginRight: 'auto',
    borderColor: colors.green[300],
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
    marginVertical: 3,
  },
  iconContainer: {
    backgroundColor: colors.green[500],
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  freeShippingText: {
    color: colors.green[500],
    paddingRight: 6,
    paddingVertical: 1,
    fontSize: 10,
    marginLeft: 4,
  },
})

export default FreeShippingBadge
