import React, { useState } from 'react'
import { Image, StyleSheet } from 'react-native'

const AppImg = ({
  src,
  style,
  placeholder = require('@/assets/placeholder.png'),
  ...props
}) => {
  const [loaded, setLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <Image
      source={
        hasError
          ? placeholder // Show placeholder if there's an error
          : loaded
            ? typeof src === 'string'
              ? { uri: src }
              : src
            : placeholder // Show placeholder until image is loaded
      }
      style={StyleSheet.compose(style)}
      onLoad={() => setLoaded(true)} // Set loaded to true when the image loads
      defaultSource={placeholder}
      onError={() => {
        setHasError(true)
        setLoaded(true) // Ensure the placeholder is shown in case of an error
      }}
      {...props}
    />
  )
}

export default AppImg
