import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MapPin } from 'phosphor-react-native'
import { colors } from '@/constants/theme'
import * as Location from 'expo-location'
import Constants from 'expo-constants'
import { useDispatch } from 'react-redux'
import { useSnackbar } from '@/hooks/useSnackbar'
import { addMessage } from '@/store/socketsSlice'
import { useSendMessageMutation } from '@/api'

const SendLocationBtn = ({ refetch, replyingTo }) => {
  const { triggerSnackbar } = useSnackbar()
  const [sendMessage] = useSendMessageMutation()
  const dispatch = useDispatch()

  const handleSendLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      triggerSnackbar('Permission denied: Location access needed.!')
      return
    }
    let location = await Location.getCurrentPositionAsync({})
    const { latitude, longitude } = location.coords
    const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=300x300&markers=color:red%7C${latitude},${longitude}&key=${Constants.expoConfig.extra.GOOGLE_API_KEY}`
    const locationMessage = {
      _id: Date.now(),
      message: staticMapUrl,
      type: 'location',
      replyTo: replyingTo,
    }

    dispatch(addMessage(locationMessage))
    await sendMessage({ ...locationMessage, replyTo: replyingTo?._id }).unwrap()
    refetch()
  }
  return (
    <TouchableOpacity onPress={handleSendLocation} style={sx.iconButton}>
      <MapPin size={24} color={colors.grey[700]} />
    </TouchableOpacity>
  )
}

export default SendLocationBtn

const sx = StyleSheet.create({})
