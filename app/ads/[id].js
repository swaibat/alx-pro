import React, { useState } from 'react'
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { Layout, Text, ViewPager } from '@ui-kitten/components'
import { useGetProductQuery } from '@/api'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/store/cartSlice'
import { ShoppingCart, Star, Check } from 'phosphor-react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Appbar, Button } from 'react-native-paper'
import ProductDetailsSkeleton from '@/components/loading/ProductDetailsSkeleton'
import RelatedProducts from '@/components/products/RelatedProducts'

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)
  const cartCount = cartItems.length

  const { data, isLoading, isUninitialized } = useGetProductQuery(id, {
    skip: !id,
  })

  const product = data?.data
  const images = product?.files.length
    ? product?.files.map(file => ({ uri: file.url }))
    : [require('@/assets/placeholder.png'), require('@/assets/placeholder.png')]
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState({})
  const [selectedSize, setSelectedSize] = useState(null)
  const [activeTab, setActiveTab] = useState('overview') // Added state for active tab

  const handleAddToCart = () => {
    const cartItem = {
      _id: product._id,
      productId: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      file: product.files.length ? product.files[0]?.url : '',
      selectedColor,
      selectedSize,
    }

    dispatch(addToCart(cartItem))
  }

  const CartIconWithBadge = () => (
    <TouchableOpacity onPress={() => router.push('/cart')}>
      <View style={styles.cartIconContainer}>
        <ShoppingCart size={24} color="#3E4685" />
        {cartCount > 0 && (
          <View style={styles.cartCount}>
            <Text style={styles.cartCountText}>{cartCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  return (
    <>
      <Appbar.Header style={{ backgroundColor: 'white' }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Product Details" />
        <Appbar.Action
          style={{ borderRadius: 0 }}
          icon={() => <CartIconWithBadge />}
          onPress={() => router.push('/cart')}
        />
      </Appbar.Header>

      {isLoading || isUninitialized ? (
        <ProductDetailsSkeleton />
      ) : (
        <>
          <ScrollView style={{ backgroundColor: 'white' }}>
            <Layout style={styles.content}>
              <ViewPager
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}
                style={styles.viewPager}
              >
                {images.map((image, index) => (
                  <Layout key={index} style={styles.imageContainer}>
                    <Image source={image} style={styles.image} />
                  </Layout>
                ))}
              </ViewPager>

              <View style={styles.dotsContainer}>
                {images.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      selectedIndex === index && styles.activeDot,
                    ]}
                  />
                ))}
              </View>

              <Layout style={{ padding: 17 }}>
                <View style={styles.infoCard}>
                  <View style={{ flexGrow: 1 }}>
                    <Text category="h6" style={styles.productTitle}>
                      {product?.title}
                    </Text>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.soldText}>{product?.sold} sold</Text>
                      <Star size={16} color="#FFD700" weight="fill" />
                      <Text>4.9</Text>
                    </View>
                  </View>
                </View>

                {/* Custom Tab Implementation */}
                <View style={styles.tabsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.tab,
                      activeTab === 'overview' && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab('overview')}
                  >
                    <Text style={styles.tabText}>Overview</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tab,
                      activeTab === 'specifications' && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab('specifications')}
                  >
                    <Text style={styles.tabText}>Specifications</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tab,
                      activeTab === 'reviews' && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab('reviews')}
                  >
                    <Text style={styles.tabText}>Reviews</Text>
                  </TouchableOpacity>
                </View>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <View style={styles.tabContent}>
                    <Text>{product?.description}</Text>
                  </View>
                )}
                {activeTab === 'specifications' && (
                  <View style={styles.tabContent}>
                    <Text>Specifications go here...</Text>
                  </View>
                )}
                {activeTab === 'reviews' && (
                  <View style={styles.tabContent}>
                    <Text>Reviews go here...</Text>
                  </View>
                )}

                {/* Colors and Sizes */}
                {product?.variants?.colors?.length > 0 && (
                  <View style={{ marginBottom: 5 }}>
                    <Text category="s2" style={{ fontWeight: 'bold' }}>
                      Colors
                    </Text>
                    <View style={styles.colorContainer}>
                      {product.variants.colors.map((colorItem, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.colorBox,
                            { backgroundColor: colorItem.colorCode },
                            selectedColor?.colorCode === colorItem.colorCode &&
                              styles.selectedColorBox,
                          ]}
                          onPress={() => setSelectedColor(colorItem)}
                        >
                          {selectedColor.colorCode === colorItem.colorCode && (
                            <Check size={16} color="#FFF" weight="bold" />
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {product?.variants?.sizes?.length > 0 && (
                  <>
                    <Text category="s2" style={{ fontWeight: 'bold' }}>
                      Sizes
                    </Text>
                    <View style={styles.sizeContainer}>
                      {product.variants.sizes.map((size, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.sizeBox,
                            selectedSize === size && { borderColor: '#3E4685' },
                          ]}
                          onPress={() => setSelectedSize(size)}
                        >
                          <Text
                            style={
                              selectedSize === size && { color: '#3E4685' }
                            }
                          >
                            {size}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </>
                )}
              </Layout>
            </Layout>
            <RelatedProducts productId={id} />
          </ScrollView>

          <Layout style={styles.bottomTabsContainer} level="1">
            <View style={{ flex: 1 }}>
              <Text category="s2" style={{ fontWeight: 'bold' }}>
                Total Price
              </Text>
              <Text category="h6" style={styles.price}>
                {`UGX ${product.price.toLocaleString()}`}
              </Text>
            </View>
            <Button
              style={styles.tabButton}
              mode="contained"
              onPress={handleAddToCart}
              accessoryLeft={() => (
                <ShoppingCart size={20} weight="bold" color="white" />
              )}
            >
              Add to Cart
            </Button>
          </Layout>
        </>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  viewPager: {
    height: 300,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderRadius: 10,
    resizeMode: 'cover',
    borderColor: 'lightgray',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'grey',
    marginHorizontal: 4,
    marginTop: -50,
  },
  activeDot: {
    backgroundColor: '#3E4685',
    width: 20,
  },
  content: {
    flex: 1,
  },
  infoCard: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    marginBottom: 10,
  },
  productTitle: {
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  soldText: {
    marginRight: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    // marginVertical: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3E4685',
  },
  tabText: {
    fontWeight: 'bold',
  },
  tabContent: {
    paddingVertical: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  selectedColorBox: {
    borderColor: '#3E4685',
  },
  sizeContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  sizeBox: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  bottomTabsContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabButton: {
    borderRadius: 5,
  },
  snackbar: {
    backgroundColor: '#3E4685',
  },
  cartIconContainer: {
    position: 'relative',
    padding: 10,
  },
  cartCount: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  cartCountText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default ProductDetailsScreen
