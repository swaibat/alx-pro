import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from '@/components/@ui/Text'
import { colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import { ShoppingCart, MagnifyingGlass } from 'phosphor-react-native'

export const HeaderRight = ({ buttons }) => {
  const router = useRouter()
  const cartItems = useSelector(state => state.cart)

  return (
    <View style={styles.container}>
      {buttons.map(({ name }, index) => (
        <TouchableOpacity key={index} onPressIn={() => router.push(name)}>
          <>
            {name === 'cart' && (
              <>
                <ShoppingCart size={24} color="black" />
                {cartItems?.length > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartItems?.length}</Text>
                  </View>
                )}
              </>
            )}
            {name === 'search' && <MagnifyingGlass size={24} color="black" />}
          </>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    marginRight: 10,
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -3,
    backgroundColor: colors.orange[500],
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
