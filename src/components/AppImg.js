import React, { useState } from 'react'
import { Image } from 'react-native'

const ImageWithLoadingAndError = ({ source, style }) => {
  const [error, setError] = useState(false)
  return (
    <Image
      source={error ? require('@/assets/placeholder.png') : source}
      style={style}
      onError={() => {
        setError(true)
      }}
      resizeMode="cover"
    />
  )
}

export default ImageWithLoadingAndError
