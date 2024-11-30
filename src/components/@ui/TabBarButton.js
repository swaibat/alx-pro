import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { icons } from './icons'
import { Text } from './Text'

const TabBarButton = props => {
  const { isFocused, label, routeName, color } = props

  return (
    <Pressable {...props} style={styles.container}>
      <View>
        {icons[routeName]({
          color,
          isFocused,
        })}
      </View>
      <Text
        style={{
          color,
          fontSize: 11,
          opacity: isFocused ? 0.8 : 1,
        }}
      >
        {label}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
})

export default TabBarButton
