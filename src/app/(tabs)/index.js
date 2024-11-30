import React from 'react'
import { ImageBackground, View } from 'react-native'
import CategoryGridView from '@/components/categories/GridView'
import FlashSale from '@/components/products/FlashSale'
import { useRouter } from 'expo-router'
import RecentlyViewed from '@/components/products/RecentlyViewed'
import { Text } from '@/components/@ui/Text'
import RecentProducts from '@/components/products/RecentProducts'
import ParallaxScrollView from '@/components/global/ParallaxScrollView'
import { Button } from '@/components/@ui/Button'
import { colors } from '@/constants/theme'

const HomeScreen = () => {
  const router = useRouter()

  return (
    <>
      <ParallaxScrollView
        headerImage={
          <View style={{ backgroundColor: 'white', paddingHorizontal: 5 }}>
            <ImageBackground
              source={require('@/assets/images/prom.png')}
              style={{
                height: 140,
                justifyContent: 'center',
              }}
              imageStyle={{ borderRadius: 8 }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  height: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 15,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: 8,
                }}
              >
                <View style={{ backgroundColor: 'transparent' }}>
                  <Text bold style={{ color: 'white' }}>
                    Limited Time!
                  </Text>
                  <Text fontWeight="lightItalic" style={{ color: 'white' }}>
                    Get Special Offer
                  </Text>
                  <Text bold style={{ fontSize: 30, color: 'white' }}>
                    Up to 40%
                  </Text>
                </View>
                <Button
                  onPress={() => router.push('/ads/list')}
                  size="small"
                  title="Shop Now"
                />
              </View>
            </ImageBackground>
          </View>
        }
      >
        <View
          style={{
            borderBottomWidth: 10,
            backgroundColor: 'white',
            padding: 15,
            borderColor: colors.grey[300],
          }}
        >
          <CategoryGridView />
        </View>

        <FlashSale />

        <RecentlyViewed />

        <View style={{ padding: 15 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 15,
            }}
          >
            Popular Products
          </Text>
          <View style={{ margin: -10 }}>
            <RecentProducts />
          </View>
        </View>
      </ParallaxScrollView>
    </>
  )
}

export default HomeScreen
