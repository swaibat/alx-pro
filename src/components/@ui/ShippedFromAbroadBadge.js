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
        {
          height: small ? 21 : 30,
          marginVertical: small ? 2 : 3,
          borderColor: small ? colors.grey[400] : colors.blue[500],
        },
      ]}
    >
      <View style={{ paddingHorizontal: small ? 3 : 5 }}>
        <AirplaneTilt
          color={small ? colors.grey[500] : colors.blue[500]}
          size={13}
          weight="fill"
        />
      </View>

      <View
        style={[
          styles.textContainer,
          {
            marginRight: small ? 2 : 5,
            backgroundColor: small ? colors.grey[300] : colors.blue[500],
          },
        ]}
      >
        <Text
          style={{
            fontSize: small ? 7 : 10,
            marginLeft: 4,
            color: small ? 'black' : 'white',
          }}
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
    marginVertical: 1,
  },
  textContainer: {
    paddingHorizontal: 7,
    borderRadius: 2,
    borderColor: 'white',
    paddingVertical: 2,
    marginRight: 5,
  },
  iconContainer: {
    paddingHorizontal: 5,
  },
})

export default ShippedFromAbroadBadge
