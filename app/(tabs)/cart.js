import React from 'react'
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Layout, Text, useTheme } from '@ui-kitten/components'
import { Backspace, Minus, Plus } from 'phosphor-react-native'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, updateItemQuantity } from '@/store/cartSlice'
import useLogin from '@/hooks/useLogin'
import { useRouter } from 'expo-router'
import { Button } from 'react-native-paper'
import AppHeader from '../../components/_global/AppHeader'

const CartScreen = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const router = useRouter()
  const isLoggedIn = useLogin()

  const cartItems = useSelector(state => state.cart.items)

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateItemQuantity({ id: item._id, quantity: newQuantity }))
    } else {
      handleRemoveItem(item)
    }
  }

  const handleRemoveItem = item => {
    dispatch(removeFromCart(item._id))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * (item.quantity || 1)
    }, 0)
  }

  const renderCartItem = item => (
    <Layout
      style={{
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgb(228, 233, 242)',
        borderRadius: 5,
        padding: 10,
      }}
      key={item._id}
    >
      <View style={styles.cartItem}>
        <Image
          source={
            item.file ? { uri: item.file } : require('@/assets/placeholder.png')
          }
          style={styles.productImage}
        />
        <View style={styles.productInfo}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{ fontSize: 14, flexGrow: 1 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
            <TouchableOpacity
              style={styles.removeIcon}
              onPress={() => handleRemoveItem(item)}
            >
              <Backspace size={25} color={theme['color-basic-600']} />
            </TouchableOpacity>
          </View>
          <Text
            appearance="hint"
            style={{ marginVertical: 2 }}
          >{`Qty: ${item.quantity || 1}`}</Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              category="s1"
              style={[styles.price, { color: theme['color-primary-600'] }]}
            >
              UGX {item.price.toLocaleString()}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[
                  styles.quantityButton,
                  {
                    backgroundColor: theme['color-basic-400'],
                    borderColor: theme['color-basic-600'],
                  },
                ]}
                onPress={() => handleQuantityChange(item, item.quantity - 1)}
              >
                <Minus size={12} color={theme['color-basic-700']} />
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity || 1}</Text>
              <TouchableOpacity
                style={[
                  styles.quantityButton,
                  {
                    backgroundColor: theme['color-basic-400'],
                    borderColor: theme['color-basic-600'],
                  },
                ]}
                onPress={() => handleQuantityChange(item, item.quantity + 1)}
              >
                <Plus size={12} color={theme['color-basic-700']} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Layout>
  )

  const renderEmptyCartMessage = () => (
    <View style={styles.emptyCartContainer}>
      <Image
        source={require('@/assets/images/shopping.png')}
        style={{ height: 150, width: 150 }}
      />
      <Text category="s1" style={styles.emptyCartText}>
        Your cart is empty!
      </Text>
      <Button mode="contained" onPress={() => router.push('/')}>
        Shop Now
      </Button>
    </View>
  )

  return (
    <>
      <Layout style={styles.container}>
        <AppHeader
          title={'My Cart'}
          headerStyle="dark"
          telephone={'0200922167'}
        />
        {cartItems.length === 0 ? (
          renderEmptyCartMessage()
        ) : (
          <>
            <ScrollView style={{ padding: 15 }}>
              {cartItems.map(renderCartItem)}
            </ScrollView>
            <Layout style={styles.footer}>
              <View>
                <Text category="s1">Total</Text>
                <Text
                  category="h6"
                  style={{ color: theme['color-primary-600'] }}
                >
                  UGX {getTotalPrice().toLocaleString()}
                </Text>
              </View>
              <Button
                mode="contained"
                style={styles.checkoutButton}
                onPress={() =>
                  router.push(
                    isLoggedIn
                      ? 'checkout'
                      : { pathname: 'login', params: { ref: 'checkout' } }
                  )
                }
              >
                Checkout
              </Button>
            </Layout>
          </>
        )}
      </Layout>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  appbar: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gainsboro',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    position: 'relative',
  },
  removeIcon: {
    marginLeft: 10,
    zIndex: 1,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 5,
  },
  productInfo: {
    flex: 1,
  },
  price: {
    fontWeight: 'bold',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 1,
  },
  quantityButton: {
    width: 25,
    borderRadius: 3,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
  },
  quantity: {
    marginHorizontal: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#EDF1F7',
  },
  checkoutButton: {
    width: 120,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    marginTop: 16,
    marginBottom: 32,
    fontSize: 18,
    color: '#8F9BB3',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default CartScreen
