import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
  CaretLeft,
  MagnifyingGlass,
  ShoppingCartSimple,
} from 'phosphor-react-native'
import { colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import { Platform, StatusBar as RNStatusBar } from 'react-native'
import { useSelector } from 'react-redux'

const TopNavFloat = () => {
  const router = useRouter()
  const cartItems = useSelector(state => state.cart)

  const statusBarHeight =
    Platform.OS === 'android' ? RNStatusBar.currentHeight : 0

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <View style={styles.topNavWrapper}>
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => router.back()}>
            <CaretLeft size={20} color={colors.black} weight="bold" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerRightWrapper}>
          <TouchableOpacity
            onPress={() => router.push('/search')}
            style={styles.buttonLeft}
          >
            <MagnifyingGlass size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/cart')}
            style={styles.buttonLeft}
          >
            <ShoppingCartSimple size={20} color="black" />
            {cartItems?.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItems?.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default TopNavFloat

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    top: 5,
    zIndex: 1,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(250, 250, 250, .8)',
  },
  topNavWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerRightWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(250, 250, 250, .8)',
  },
  badge: {
    position: 'absolute',
    right: 0,
    top: 0,
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
