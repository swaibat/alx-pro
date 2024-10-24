import React from 'react'
import { Layout, Text, Input, Button, useTheme } from '@ui-kitten/components'
import { ScrollView, View, ImageBackground } from 'react-native'
import { MagnifyingGlass, Sliders, Globe } from 'phosphor-react-native'
import CategoryGridView from '@/components/categories/GridView'
import FlashSale from '@/components/products/FlashSale'
import AdsList from '@/components/products/AdsList'
import { useRouter } from 'expo-router'
import Logo from '../../assets/Logo'

const HomeScreen = () => {
  const theme = useTheme()
  const router = useRouter()

  return (
    <Layout style={{ flex: 1 }}>
      <Layout
        style={{
          backgroundColor: theme['color-primary-default'],
          height: 180,
          paddingVertical: 40,
          paddingHorizontal: 10,
        }}
      >
        <Layout
          style={{
            flexDirection: 'row',
            backgroundColor: 'transparent',
            justifyContent: 'space-between',
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'transparent',
              alignItems: 'center',
              width: 70,
              height: 30,
            }}
          >
            <Logo />
          </View>
          <Layout
            style={{
              flexDirection: 'row',
              gap: 3,
              backgroundColor: 'transparent',
            }}
          >
            <Globe size={24} weight="fill" color="gainsboro" />
            <Text appearance="alternative" category="s1">
              Uganda
            </Text>
          </Layout>
        </Layout>
        {/* Search Bar */}
        <Layout
          style={{
            flexDirection: 'row',
            backgroundColor: 'transparent',
            padding: 10,
          }}
        >
          <Input
            placeholder="Search"
            style={{ flex: 1 }}
            onFocus={() => router.push('/search')}
            accessoryLeft={() => <MagnifyingGlass size={24} />}
            accessoryRight={() => <Sliders size={24} />}
          />
        </Layout>
      </Layout>
      <Layout
        style={{
          borderBottomWidth: 10,
          marginTop: -50,
          backgroundColor: 'transparent',
          zIndex: 100,
          padding: 15,
          borderColor: theme['color-basic-400'],
        }}
      >
        <View style={{ marginVertical: 8 }}>
          <ImageBackground
            source={require('@/assets/images/prom.png')}
            style={{ height: 140, justifyContent: 'center' }}
            imageStyle={{ borderRadius: 8 }}
          >
            <Layout
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
              <Layout style={{ backgroundColor: 'transparent' }}>
                <Text category="label" appearance="alternative">
                  Limited Time!
                </Text>
                <Text category="h6" appearance="alternative">
                  Get Special Offer
                </Text>
                <Text category="h4" appearance="alternative">
                  Up to 40%
                </Text>
              </Layout>
              <Button
                onPress={() => router.push('category')}
                size="small"
                appearance="filled"
              >
                Shop Now
              </Button>
            </Layout>
          </ImageBackground>
        </View>
      </Layout>

      <ScrollView>
        <Layout
          style={{
            borderBottomWidth: 10,
            padding: 15,
            borderColor: theme['color-basic-400'],
          }}
        >
          <CategoryGridView />
        </Layout>

        <Layout
          style={{
            borderBottomWidth: 10,
            paddingLeft: 7,
            padding: 15,
            borderColor: theme['color-basic-400'],
          }}
        >
          <FlashSale />
        </Layout>

        <Layout style={{ padding: 15 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 15,
            }}
          >
            Popular Products
          </Text>
          <Layout style={{ margin: -10 }}>
            <AdsList />
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  )
}

export default HomeScreen
