import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { colors } from '@/constants/theme'
import { MapPin } from 'phosphor-react-native'

const ReplyingToLocation = ({ replyingTo }) => {
  if (replyingTo?.type !== 'location') return
  return (
    <View style={sx.replyContainer}>
      <View>
        <Text style={[sx.replyAuthor, { color: colors.primary }]}>
          {replyingTo.to ? 'Support Team' : 'You'}
        </Text>
        <View style={sx.replyHeader}>
          <MapPin size={18} style={sx.replyIcon} />
          <Text style={sx.replyLabel}>Location</Text>
        </View>
      </View>
      <Image source={{ uri: replyingTo?.message }} style={sx.replyImage} />
    </View>
  )
}

export default ReplyingToLocation

const sx = StyleSheet.create({
  replyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    padding: 7,
    borderRadius: 5,
  },
  replyAuthor: {
    fontWeight: 'bold',
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyIcon: {
    marginRight: 5,
  },
  replyLabel: {
    fontSize: 12,
  },
  replyImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
})
