import React from 'react'
import { Image } from 'react-native'

const AppImg = ({ src, ...props }) => {
  return (
    <Image
      source={{ uri: src }}
      {...props}
      defaultSource={require('@/assets/placeholder.png')}
    />
  )
}
export default AppImg
