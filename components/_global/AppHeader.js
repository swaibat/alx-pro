import React from 'react'
import { StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native'
import { Text, Input } from '@ui-kitten/components'
import { ShoppingCart, MagnifyingGlass, X, Phone } from 'phosphor-react-native'
import { useRouter } from 'expo-router'
import { Appbar } from 'react-native-paper'
import { useSelector } from 'react-redux'

const AppHeader = ({ name, title, headerStyle, telephone }) => {
  const router = useRouter()
  const cartItems = useSelector(state => state.cart.items)
  const cartCount = cartItems.length

  const CartIconWithBadge = () => (
    <TouchableOpacity onPress={() => router.push('/cart')}>
      <View style={styles.cartIconContainer}>
        <ShoppingCart
          size={24}
          color={headerStyle === 'dark' ? 'white' : 'black'}
        />
        {cartCount > 0 && (
          <View style={styles.cartCount}>
            <Text style={styles.cartCountText}>{cartCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  const callSupport = () => {
    // Add logic for calling support
  }
  return (
    <>
      <StatusBar
        barStyle={headerStyle === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Appbar.Header
        style={[
          styles.header,
          {
            backgroundColor: headerStyle === 'dark' ? '#003449' : 'white',
            paddingRight: 15,
            elevation: 4,
          },
        ]}
      >
        <Appbar.BackAction
          onPress={() => router.push('/')}
          color={headerStyle === 'dark' ? 'white' : 'black'}
        />
        <Appbar.Content
          title={
            <Text
              style={{
                color: headerStyle === 'dark' ? 'white' : 'black',
                fontSize: 18,
              }}
            >
              {title}
            </Text>
          }
        />
        {telephone && (
          <View style={styles.contactContainer}>
            <Phone
              size={24}
              color={headerStyle === 'dark' ? 'white' : 'black'}
              onPress={callSupport}
            />
            <Text
              style={[
                styles.contactText,
                { color: headerStyle === 'dark' ? 'white' : 'black' },
              ]}
            >
              {telephone}
            </Text>
          </View>
        )}
        {!telephone && name ? (
          <Input
            placeholder="Search"
            style={{ flex: 1 }}
            accessoryLeft={() => (
              <MagnifyingGlass
                size={20}
                color={headerStyle === 'dark' ? 'white' : 'black'}
              />
            )}
            accessoryRight={() => (
              <TouchableOpacity onPress={() => router.push('search')}>
                <X size={20} color="grey" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            )}
            value={name}
          />
        ) : (
          !telephone && (
            <Appbar.Action
              icon={({ color }) => (
                <MagnifyingGlass
                  size={24}
                  color={headerStyle === 'dark' ? 'white' : color}
                />
              )}
              onPress={() => router.push('search')}
            />
          )
        )}
        {!telephone && (
          <Appbar.Action
            icon={() => <CartIconWithBadge />}
            onPress={() => router.push('cart')}
          />
        )}
      </Appbar.Header>
    </>
  )
}

const styles = StyleSheet.create({
  cartIconContainer: {
    position: 'relative',
  },
  cartCount: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#d32f2f',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCountText: {
    color: 'white',
    fontSize: 12,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'gainsboro',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  contactText: {
    marginLeft: 8,
    fontSize: 16,
  },
})

export default AppHeader
