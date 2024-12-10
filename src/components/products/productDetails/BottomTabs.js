import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from '@/components/@ui/Button'
import { ChatCircleDots, ShoppingCartSimple } from 'phosphor-react-native'
import { useDispatch } from 'react-redux'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useRouter } from 'expo-router'
import { addToCart } from '@/store/cartSlice'
import { colors } from '@/constants/theme'

const BottomTabs = ({ product, selectedOptions }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { triggerSnackbar } = useSnackbar()

  const goToChat = () => {
    router.push(
      `/chat?product=${JSON.stringify({
        _id: product._id,
        thumbnail: product.thumbnail,
        title: product.title,
        price: product.price,
      })}`
    )
  }

  const handleAddToCart = checkout => {
    const cartItem = {
      _id: product._id,
      thumbnail: product.thumbnail,
      discount: product.discount,
      title: product.title,
      price: product.price,
      variants: selectedOptions,
    }
    dispatch(addToCart(cartItem))
    if (checkout) {
      triggerSnackbar('Product Added to cart Successfully!', 'success')
    }
  }

  return (
    <View style={styles.bottomTabsContainer}>
      <Button
        onPress={goToChat}
        outline
        iconRight={<ChatCircleDots weight="light" />}
      />
      <Button
        onPress={handleAddToCart}
        iconRight={<ShoppingCartSimple weight="light" />}
        outline
      />
      <Button
        onPress={() => {
          handleAddToCart(true)
          router.push('/checkout')
        }}
        style={styles.buyNow}
        title="Buy Now"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  bottomTabsContainer: {
    borderTopWidth: 0.8,
    gap: 5,
    borderTopColor: colors.borderColor,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
  },
  buyNow: { flex: 1 },
})

export default BottomTabs
