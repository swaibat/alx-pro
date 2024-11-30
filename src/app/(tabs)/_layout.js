import React, { useEffect } from 'react'
import { Tabs, useRouter } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthState } from '@/store/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from '@/components/@ui/Text'
import TabBar from '@/components/@ui/TabBar'
import {
  ShoppingCart,
  MagnifyingGlass,
  CaretCircleLeft,
} from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { colors } from '@/constants/theme'
import { useSocket } from '@/hooks/useSocket'
import { usePushNotifications } from '@/scripts/NotificationsService'

const CustomHeaderTitle = ({ title, onBackPress, isCentered = false }) => {
  return (
    <View
      style={[
        styles.headerTitleContainer,
        isCentered && { justifyContent: 'center' },
      ]}
    >
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress}>
          <CaretCircleLeft size={30} color="black" />
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  )
}

export default function TabLayout() {
  usePushNotifications()
  useSocket()
  const router = useRouter()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const cartCount = useSelector(({ cart }) => cart?.length)

  useEffect(() => {
    console.log('===cartCount===', cartCount)
  }, [cartCount])

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await AsyncStorage.getItem('@user')
        if (data) {
          dispatch(setAuthState({ user: JSON.parse(data).user }))
        }
      } catch (error) {
        console.error('Failed to load user from storage', error)
      }
    }
    if (!user) {
      loadUser()
    }
  }, [user, dispatch])

  return (
    <Tabs tabBar={props => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Home', headerShown: false }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerStyle: { height: 100 },
          headerShadowVisible: false,
          headerTitle: () => (
            <Text
              style={[styles.headerTitle, { fontSize: 25, marginTop: 'auto' }]}
            >
              Cart
            </Text>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 'auto',
                paddingRight: 30,
                gap: 20,
              }}
            >
              <TouchableOpacity>
                <MagnifyingGlass size={24} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: 'Categories',
          headerStyle: {
            backgroundColor: colors.grey[200],
          },
          headerShadowVisible: false,
          headerRight: () => (
            <View style={{ flexDirection: 'row', paddingRight: 30, gap: 20 }}>
              <TouchableOpacity onPress={() => router.push('/search')}>
                <MagnifyingGlass size={24} />
              </TouchableOpacity>
              <TouchableOpacity>
                <>
                  <ShoppingCart size={24} />
                  {cartCount >= 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{cartCount}</Text>
                    </View>
                  )}
                </>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          headerShown: false,
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerTitle: () => (
            <CustomHeaderTitle
              title="Account"
              onBackPress={() => router.push('/account')}
            />
          ),
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="orders/index"
        options={{
          title: '',
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: () => (
            <CustomHeaderTitle
              title="My Orders"
              onBackPress={() => router.push('/account')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'register',
          headerShadowVisible: false,
          headerTitleStyle: {
            textTransform: 'capitalize',
          }, // Reusable header title style
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'login',
          headerShadowVisible: false,
          headerTitleStyle: {
            textTransform: 'capitalize',
          }, // Reusable header title style
        }}
      />
      <Tabs.Screen
        name="orders/[id]"
        options={{
          title: '',
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: () => (
            <CustomHeaderTitle
              title="Order Details"
              onBackPress={() => router.push('/orders')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="address/index"
        options={{
          title: 'Address Book',
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="address/create"
        options={{
          title: 'Address',
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    color: 'black',
    fontWeight: 'semibold',
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -3,
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
})
