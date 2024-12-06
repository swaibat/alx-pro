import React from 'react'
import { View } from 'react-native'
import CategoryGridView from '@/components/categories/GridView'
import FlashSale from '@/components/products/FlashSale'
import RecentlyViewed from '@/components/products/RecentlyViewed'
import RecentProducts from '@/components/products/RecentProducts'
import ParallaxScrollView from '@/components/global/ParallaxScrollView'
import { colors } from '@/constants/theme'
import AppBanner from '@/components/global/AppBanner'
import Section from '@/components/@ui/Section'

const HomeScreen = () => {
  return (
    <>
      <ParallaxScrollView headerImage={<AppBanner />}>
        <View
          style={{
            borderBottomWidth: 10,
            backgroundColor: 'white',
            paddingHorizontal: 15,
            borderColor: colors.grey[300],
          }}
        >
          <CategoryGridView />
        </View>

        <FlashSale />

        <Section large title="Recently Viewed">
          <RecentlyViewed />
        </Section>
        <Section large paddingHorizontal={1} title="Explore">
          <RecentProducts />
        </Section>
      </ParallaxScrollView>
    </>
  )
}

export default HomeScreen
