import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Lightning } from 'phosphor-react-native'
import { useGetProductsQuery } from '@/api'
import { Text } from '@/components/@ui/Text'
import { useRouter } from 'expo-router'
import { colors } from '@/constants/theme'

const ProductSkeleton = () => (
  <View style={styles.skeletonProductContainer}>
    <View style={styles.skeletonImage} />
    <View style={styles.skeletonText} />
    <View style={styles.skeletonText} />
  </View>
)

const calculateTimeLeft = expiryDate => {
  const difference = new Date(expiryDate) - new Date()
  let timeLeft = {}

  if (difference > 0) {
    timeLeft = {
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
        2,
        '0'
      ),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
        2,
        '0'
      ),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'), // Format seconds
    }
  } else {
    timeLeft = {
      hours: '00',
      minutes: '00',
      seconds: '00',
    }
  }

  return timeLeft
}

const FlipClockDigit = ({ digit }) => (
  <View style={styles.flipDigit}>
    <Text style={styles.digitText}>{digit}</Text>
  </View>
)

const FlashSale = () => {
  const router = useRouter()
  const expiryDate = '2025-01-01T23:59:59'
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(expiryDate))

  const { data: flashSaleProducts, isLoading } = useGetProductsQuery({
    flashsale: true,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expiryDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const renderProduct = product => {
    const mainPrice = product?.price.toLocaleString().slice(0, -3)
    const smallDigits = product?.price.toLocaleString().slice(-3)

    return (
      <TouchableOpacity
        onPress={() => router.push(`/ads/${product._id}`)}
        key={product._id}
        style={styles.productContainer}
      >
        {/* Discount Badge */}
        <View style={styles.badgeContainer}>
          <Text style={styles.discountBadge}>-{product.discount.value}%</Text>
        </View>
        <Image
          source={
            product?.thumbnail
              ? { uri: product.thumbnail }
              : require('@/assets/placeholder.png')
          }
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text ellipsis={1} style={styles.productTitle}>
            {product.title}
          </Text>
          <Text bold style={styles.productPrice}>
            UGX {mainPrice}
            <Text style={styles.smallDigits}>{smallDigits}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderSkeleton = () => (
    <View style={{ flexDirection: 'row' }}>
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </View>
  )

  if (
    !isLoading &&
    (!flashSaleProducts?.data || flashSaleProducts?.data?.docs?.length === 0)
  ) {
    return null
  }

  return (
    <View
      style={{
        borderBottomWidth: 10,
        paddingLeft: 7,
        paddingHorizontal: 15,
        paddingBottom: 15,
        borderColor: colors.grey[200],
      }}
    >
      <View style={styles.layout}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: colors.orange[500] },
              ]}
            >
              <Lightning color="white" weight="fill" size={20} />
            </View>
            <View>
              <Text style={styles.flashSaleTitle}>Flash Sale</Text>
              {/* <Text style={styles.flashSaleSubtitle}>Limited time offer.</Text> */}
            </View>
          </View>
          <View style={styles.countdown}>
            <FlipClockDigit digit={timeLeft.hours} />
            <Text style={styles.colon}>:</Text>
            <FlipClockDigit digit={timeLeft.minutes} />
            <Text style={styles.colon}>:</Text>
            <FlipClockDigit digit={timeLeft.seconds} />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {isLoading
            ? renderSkeleton()
            : flashSaleProducts?.data?.docs?.map(renderProduct)}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  layout: {
    marginVertical: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  iconWrapper: {
    padding: 4,
    borderRadius: 10,
    marginLeft: 7,
  },
  flashSaleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  flashSaleSubtitle: {
    fontSize: 14,
    color: '#555',
  },
  countdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flipDigit: {
    width: 28,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 2,
  },
  digitText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  colon: {
    fontSize: 24,
    color: 'black',
    marginHorizontal: 2,
  },
  productContainer: {
    width: 115,
    paddingVertical: 0,
    paddingHorizontal: 4,
    borderRadius: 3,
    marginHorizontal: 5,
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: 5,
    right: 4,
    backgroundColor: colors.orange[50],
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 5,
    zIndex: 1,
  },
  discountBadge: {
    color: colors.orange[500],
    fontSize: 10,
    fontWeight: 'bold',
  },
  productImage: {
    height: 100,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#ddd',
  },
  productDetails: {
    gap: 3,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  smallDigits: {
    fontSize: 10,
    fontWeight: 'bold',
    verticalAlign: 'top',
  },
  // Skeleton styles
  skeletonProductContainer: {
    width: 115,
    paddingVertical: 0,
    paddingHorizontal: 4,
    borderRadius: 3,
    marginHorizontal: 5,
  },
  skeletonImage: {
    height: 100,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#ddd',
  },
  skeletonText: {
    height: 15,
    width: '70%',
    backgroundColor: '#ccc',
    marginTop: 5,
    borderRadius: 3,
  },
  productTitle: {
    fontSize: 12,
    color: '#777',
  },
})

export default FlashSale
