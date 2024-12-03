import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { icons } from './icons'
import { Text } from './Text'
import { useSelector } from 'react-redux'
import { colors } from '@/constants/theme'

const TabBarButton = props => {
  const { isFocused, label, routeName, color } = props
  const cartCount = useSelector(state => state.cart?.length)

  return (
    <Pressable {...props} style={styles.container}>
      <View>
        {icons[routeName]({
          color,
          isFocused,
        })}
        {label === 'cart' && cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        )}
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
  badge: {
    position: 'absolute',
    right: -10,
    top: -3,
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
})

export default TabBarButton
