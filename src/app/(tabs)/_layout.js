import React, { useEffect } from 'react'
import { Tabs, useRouter } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthState } from '@/store/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from '@/components/@ui/Text'
import TabBar from '@/components/@ui/TabBar'
import { MagnifyingGlass, CaretCircleLeft } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import { colors } from '@/constants/theme'
import { useSocket } from '@/hooks/useSocket'
import { usePushNotifications } from '@/scripts/NotificationsService'
import { useSnackbar } from '@/hooks/useSnackbar'

const CustomHeaderTitle = ({ title, onBackPress, isCentered = false }) => {
  return (
    <View
      style={[styles.headerTitleContainer, isCentered && styles.centeredHeader]}
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
  const { triggerSnackbar } = useSnackbar()

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await AsyncStorage.getItem('@user')
        if (data) {
          dispatch(setAuthState({ user: JSON.parse(data).user }))
        }
      } catch (error) {
        triggerSnackbar('Failed to load user from storage')
        return error
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
          headerStyle: styles.headerStyle,
          headerShadowVisible: false,
          headerTitle: () => <Text style={styles.cartHeaderTitle}>Cart</Text>,
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity onPress={() => router.push('/search')}>
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
          headerStyle: styles.categoryHeaderStyle,
          headerShadowVisible: false,
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity onPress={() => router.push('/search')}>
                <MagnifyingGlass size={24} />
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
          title: 'Register',
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          headerShadowVisible: false,
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
    </Tabs>
  )
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centeredHeader: {
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
    color: 'black',
    fontWeight: 'semibold',
  },
  cartHeaderTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 'auto',
  },
  headerStyle: {
    height: 100,
    backgroundColor: colors.grey[200],
  },
  headerRightContainer: {
    flexDirection: 'row',
    marginTop: 'auto',
    paddingRight: 30,
    marginBottom: 15,
  },
  categoryHeaderStyle: {
    backgroundColor: colors.grey[200],
  },
  headerIconBackground: {
    position: 'absolute',
    top: 0,
    // left: 0,
    // right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.1,
    overflow: 'hidden',
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
  capitalizeHeaderTitle: {
    textTransform: 'capitalize',
  },
})
