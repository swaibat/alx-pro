import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AirplaneTilt } from 'phosphor-react-native'
import { colors } from '@/constants/theme'

const ShippedFromAbroadBadge = ({ isLocalStore, small }) => {
  if (isLocalStore) return null

  return (
    <View
      style={[
        styles.shippedBadge,
        small ? styles.smallBadge : styles.largeBadge,
      ]}
    >
      <View style={small ? styles.smallIconContainer : styles.iconContainer}>
        <AirplaneTilt
          color={small ? colors.grey[500] : colors.blue[500]}
          size={13}
          weight="fill"
        />
      </View>
      <View
        style={[
          styles.textContainer,
          small ? styles.smallTextContainer : styles.largeTextContainer,
        ]}
      >
        <Text
          style={[styles.text, small ? styles.smallText : styles.largeText]}
        >
          Shipped From Abroad
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  shippedBadge: {
    borderWidth: 0.7,
    backgroundColor: 'white',
    overflow: 'hidden',
    marginRight: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
  },
  smallBadge: {
    height: 21,
    marginVertical: 2,
    borderColor: colors.grey[400],
  },
  largeBadge: {
    height: 30,
    marginVertical: 3,
    borderColor: colors.blue[500],
  },
  iconContainer: {
    paddingHorizontal: 5,
  },
  smallIconContainer: {
    paddingHorizontal: 3,
  },
  textContainer: {
    paddingHorizontal: 7,
    borderRadius: 2,
    borderColor: 'white',
    paddingVertical: 2,
  },
  smallTextContainer: {
    marginRight: 2,
    backgroundColor: colors.grey[300],
  },
  largeTextContainer: {
    marginRight: 5,
    backgroundColor: colors.blue[500],
  },
  text: {
    marginLeft: 4,
  },
  smallText: {
    fontSize: 7,
    color: 'black',
  },
  largeText: {
    fontSize: 10,
    color: 'white',
  },
})

export default ShippedFromAbroadBadge
