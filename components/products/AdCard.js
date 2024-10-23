import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Text } from '@ui-kitten/components'
import { ShoppingCart } from 'phosphor-react-native'
import { useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/store/cartSlice'
import { useTheme } from '@ui-kitten/components'

const AdCard = ({ product }) => {
  const router = useRouter()
  const theme = useTheme()
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(product))
  }

  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push(`/ads/${product._id}`)}
    >
      <View style={styles.productImageContainer}>
        <Image
          source={
            product?.files?.length
              ? { uri: product.files[0].url }
              : require('@/assets/placeholder.png')
          }
          style={styles.productImage}
        />
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <ShoppingCart size={20} color="white" weight="bold" />
        </TouchableOpacity>
      </View>
      <Text style={styles.productTitle} numberOfLines={1} ellipsizeMode="tail">
        {product.title}
      </Text>
      <Text
        style={[{ fontSize: 12, textDecorationLine: 'line-through' }]}
        appearance="hint"
      >
        UGX {product.price?.toLocaleString('en-UG')}
      </Text>
      <Text
        style={[styles.productPrice, { color: theme['color-primary-default'] }]}
      >
        UGX {product.price?.toLocaleString('en-UG')}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  productCard: {
    width: '49%',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  productImageContainer: {
    position: 'relative',
    height: 180,
    backgroundColor: '#f1f1f1',
  },
  productImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  addToCartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF5656',
    padding: 8,
    borderRadius: 50,
  },
  productTitle: {
    fontSize: 15,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default AdCard
