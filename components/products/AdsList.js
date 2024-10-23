import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native'
import { Layout, Text, useTheme } from '@ui-kitten/components'
import { useGetProductsQuery } from '@/api'
import { ShoppingCart, Star } from 'phosphor-react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/store/cartSlice'
import Placeholder from '@/assets/Placeholder'
import productsStateLayout from './states/handleStates'
import AdCard from './AdCard'

const AdsList = () => {
  const { categoryId, name } = useLocalSearchParams()
  const { data, isLoading, error, refetch } = useGetProductsQuery(
    categoryId ? { category: categoryId } : name ? { name } : {}
  )
  const products = data?.data?.docs || []

  const stateLayout = productsStateLayout({ data, isLoading, error, refetch })

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout style={styles.container}>
        {stateLayout || (
          <ScrollView contentContainerStyle={styles.productsContainer}>
            {products.map(product => (
              <AdCard key={product._id} product={product} />
            ))}
          </ScrollView>
        )}
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,

    backgroundColor: 'white',
    padding: 10,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
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
    backgroundColor: '#f1f1f1f1',
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
    backgroundColor: '#FF5656', // Adjust color as per your theme
    padding: 8,
    borderRadius: 50,
  },
  productTitle: {
    fontSize: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'orange',
    marginLeft: 5,
  },
  soldText: {
    fontSize: 11,
    backgroundColor: 'gainsboro',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 5,
    marginRight: 15,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    // color: '#FF5656',
    // marginVertical: 2,
  },
  // Skeleton Loader Styles
})

export default AdsList
