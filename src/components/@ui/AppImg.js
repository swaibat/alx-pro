import React, { useState } from 'react'
import { Image, StyleSheet } from 'react-native'

const AppImg = ({
  src,
  style,
  placeholder = require('@/assets/placeholder.png'),
  ...props
}) => {
  const [isError, setIsError] = useState(false)

  // Determine the image source
  const getImageSource = () => {
    if (isError) return placeholder
    if (typeof src === 'string') return { uri: src }
    return src || placeholder
  }

  return (
    <Image
      source={getImageSource()}
      style={StyleSheet.compose(style)}
      onError={() => setIsError(true)}
      {...props}
    />
  )
}

export default AppImg
