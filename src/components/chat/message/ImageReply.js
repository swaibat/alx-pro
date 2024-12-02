import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppImg from '@/components/@ui/AppImg'
import { colors } from '@/constants/theme'
import { Image as ImgIcon } from 'phosphor-react-native'

const ImageReply = ({ replyToMessage }) => {
  if (replyToMessage.type !== 'image') return
  const imageUrls = JSON.parse(replyToMessage.message)
  return (
    <View style={[styles.imageGrid, { flexWrap: 'nowrap', gap: 10 }]}>
      <View>
        <Text style={{ fontWeight: 'bold', color: colors.primary }}>
          {replyToMessage.to ? 'Support Team' : 'You'}
        </Text>
        <View style={styles.replyHeader}>
          <ImgIcon size={18} style={styles.replyIcon} />
          <Text style={styles.replyLabel}>Photo</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 3 }}>
        {imageUrls.map((url, index) => (
          <AppImg key={index} src={url} style={styles.replyPreviewImage} />
        ))}
      </View>
    </View>
  )
}

export default ImageReply

const styles = StyleSheet.create({
  imageGrid: {
    flexDirection: 'row',
    gap: 10,
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
    color: colors.primary,
  },
  replyPreviewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
  },
})
