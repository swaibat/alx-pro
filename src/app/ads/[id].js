import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Share } from 'react-native'
import { useGetProductQuery } from '@/api'
import { ShareFat } from 'phosphor-react-native'
import { useLocalSearchParams } from 'expo-router'
import RelatedProducts from '@/components/products/RelatedProducts'
import ReviewsScreen from '@/components/products/reviews/ReviewsOverView'
import { Text } from '@/components/@ui/Text'
import ProductSpecifications from '@/components/products/ProductSpecs'
import { colors } from '@/constants/theme'
import Loading from '@/components/global/Loading'
import ProductImageCarousel from '@/components/products/productDetails/ProductImageCarousel'
import Section from '@/components/@ui/Section'
import FreeShippingBadge from '@/components/@ui/FreeShippingBadge'
import PaymentPlanInfo from '@/components/@ui/PaymentPlanInfo'
import ShippedFromAbroadBadge from '@/components/@ui/ShippedFromAbroadBadge'
import PriceDisplay from '@/components/@ui/PriceDisplay'
import RatingChip from '@/components/@ui/RatingChip'
import BottomTabs from '@/components/products/productDetails/BottomTabs'
import { Button } from '@/components/@ui/Button'
import DeliveryReturnInfo from '@/components/products/productDetails/DeliveryReturnInfo'
import VariantSelector from '@/components/products/productDetails/VariantSelector'
import ErrorScreen from '@/components/global/Error'
import { useSnackbar } from '@/hooks/useSnackbar'
import TopNavFloat from '@/components/products/productDetails/TopNavFloat'

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const { triggerSnackbar } = useSnackbar()
  const { data, isLoading, isError, refetch } = useGetProductQuery(id, {
    skip: !id,
  })
  const product = data?.data

  const [selectedOptions, setSelectedOptions] = useState({})

  const formattedPrice = product?.acceptInstallments
    ? (
        product?.price *
        (product?.installments.firstPayment / 100)
      ).toLocaleString()
    : product?.price?.toLocaleString()

  const handleShare = async () => {
    try {
      const shareContent = {
        title: 'Product Share',
        message: `${product?.title}\n\nPrice: UGX ${formattedPrice}`,
        url: product?.thumbnail,
      }
      await Share.share(shareContent)
    } catch (error) {
      triggerSnackbar('Error sharing the product')
    }
  }

  if (!product || isLoading) return <Loading text={'Loading Ad details'} />
  if (isError) return <ErrorScreen refetch={refetch} />

  return (
    <>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.content}>
          <TopNavFloat />
          <ProductImageCarousel images={product?.files} />
          <VariantSelector
            variants={product?.variants}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
          <View style={styles.productDetails}>
            <View style={styles.infoCard}>
              <View style={styles.infoCardContent}>
                <View style={styles.priceContainer}>
                  <PriceDisplay product={product} />
                  <ShippedFromAbroadBadge isLocalStore={product.isLocalStore} />
                </View>
                <View style={styles.productTitleContainer}>
                  <Text style={styles.productTitle}>{product?.title}</Text>
                  <Button
                    ghost
                    iconRight={
                      <ShareFat
                        color={colors.orange[500]}
                        weight="thin"
                        size={24}
                      />
                    }
                    onPress={handleShare}
                  />
                </View>
                <RatingChip reviews={product?.reviews} />
                <PaymentPlanInfo product={product} />
                <FreeShippingBadge freeShipping={product?.freeShipping} />
              </View>
            </View>
            <View>
              <Section title="Description">
                <Text style={styles.productDescription}>
                  {product?.description}
                </Text>
              </Section>
              <Section title="Specifications">
                <ProductSpecifications specs={data?.data?.specifications} />
              </Section>
              <Section title="Delivery & Return">
                <DeliveryReturnInfo specs={data?.data?.specifications} />
              </Section>
              <Section title="Reviews">
                <ReviewsScreen reviews={product?.reviews} />
              </Section>
            </View>
          </View>
        </View>
        <Section title="You may also like" borderBottom={0}>
          <RelatedProducts productId={id} />
        </Section>
      </ScrollView>
      <BottomTabs product={product} selectedOptions={selectedOptions} />
    </>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 10,
  },
  scrollView: {
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  productDetails: {
    marginVertical: 15,
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  infoCardContent: {
    flex: 1,
    gap: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey[200],
    padding: 10,
    gap: 10,
  },
  productTitleContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  productTitle: {
    flex: 1,
  },
  productDescription: {
    fontSize: 12,
  },
})

export default ProductDetailsScreen
