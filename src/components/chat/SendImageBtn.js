import { colors } from '@/constants/theme'
import { Camera } from 'phosphor-react-native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useSendMessageMutation, useUploadFileMutation } from '@/api'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useDispatch } from 'react-redux'
import { addMessage } from '@/store/socketsSlice'

export default function SendImageBtn({ replyingTo, clearReplyingTo, refetch }) {
  const [uploadFile] = useUploadFileMutation()
  const [sendMessage] = useSendMessageMutation()
  const { triggerSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const handleSendImage = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      triggerSnackbar('Image access Permission needed!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
      allowsMultipleSelection: true,
    })

    if (result.cancelled || !result.assets?.length) return
    const selectedImages = result.assets?.slice(0, 4)

    let imageMessages = null
    const previewUris = []

    try {
      const formData = new FormData()
      selectedImages?.forEach(asset => {
        const { uri, type } = asset
        previewUris.push(uri)
        formData.append('files', {
          uri,
          name: uri.split('/').pop(),
          type: type || 'image/png',
        })
      })

      imageMessages = {
        _id: Date.now(),
        message: previewUris.length ? JSON.stringify(previewUris) : '',
        type: 'image',
        replyTo: replyingTo,
      }
      replyingTo && clearReplyingTo()
      dispatch(addMessage(imageMessages))

      try {
        const response = await uploadFile({ formData, type: 'chat' }).unwrap()
        const imageUrls = response?.data?.data?.map(({ url }) => url)

        imageMessages = {
          _id: Date.now(),
          message: imageUrls.length ? JSON.stringify(imageUrls) : '',
          type: 'image',
          replyTo: replyingTo,
        }
        await sendMessage({
          ...imageMessages,
          replyTo: replyingTo._id,
        }).unwrap()

        refetch()
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError)
        return
      }

      refetch()
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }
  return (
    <TouchableOpacity onPress={handleSendImage} style={sx.iconButton}>
      <Camera size={24} color={colors.grey[700]} />
    </TouchableOpacity>
  )
}

const sx = StyleSheet.create({
  iconButton: {
    padding: 2,
  },
})
