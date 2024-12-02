import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppImg from '@/components/@ui/AppImg'
import { colors } from '@/constants/theme'
import { MapPin } from 'phosphor-react-native'

const LocationReply = ({ replyToMessage: { message, to, type } }) => {
  if (type !== 'location') return
  return (
    <View style={styles.locationReply}>
      <View>
        <Text style={{ fontWeight: 'bold', color: colors.primary }}>
          {to ? 'Support Team' : 'You'}
        </Text>
        <View style={styles.replyHeader}>
          <MapPin size={18} style={styles.replyIcon} />
          <Text style={styles.replyLabel}>Location</Text>
        </View>
      </View>
      <AppImg src={message} style={styles.replyPreviewImage} />
    </View>
  )
}

export default LocationReply

const styles = StyleSheet.create({
  locationReply: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#003F5F',
    padding: 7,
    gap: 10,
    minWidth: 150,
    marginVertical: 5,
    borderRadius: 15,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyIcon: {
    marginRight: 5,
  },
  replyLabel: {
    fontSize: 14,
  },
  replyPreviewImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
})
