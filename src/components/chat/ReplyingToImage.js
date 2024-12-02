import { StyleSheet, Text, View } from 'react-native'
import { Image as ImgIcon } from 'phosphor-react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import AppImg from '../@ui/AppImg'

const ReplyingToImage = ({ replyingTo: { type, message, to } }) => {
  if (type !== 'image') return
  return (
    <View style={sx.imageGrid}>
      <View>
        <Text bold style={{ color: colors.primary }}>
          {to ? 'Support Team' : 'You'}
        </Text>
        <View style={sx.replyHeader}>
          <ImgIcon size={18} style={sx.replyIcon} />
          <Text style={sx.replyLabel}>Photo</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 3 }}>
        {JSON.parse(message).map((url, index) => (
          <AppImg key={index} src={url} style={sx.replyPreviewImage} />
        ))}
      </View>
    </View>
  )
}

export default ReplyingToImage

const sx = StyleSheet.create({
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 5,
  },
  imageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
    flexWrap: 'wrap',
    marginVertical: 5,
    backgroundColor: colors.grey[50],
    gap: 10,
    padding: 7,
    borderRadius: 5,
  },
})
