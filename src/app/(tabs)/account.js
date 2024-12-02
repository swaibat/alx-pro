import React, { useState } from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import {
  House,
  Headset,
  SealQuestion,
  FileText,
  Package,
  LockOpen,
  SignOut,
  CaretRight,
} from 'phosphor-react-native'
import { useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import SecureRoute from '@/components/global/SecureRoute'
import { Text } from '@/components/@ui/Text'
import LogoutModal from '@/components/account/LogoutModal'
import { colors } from '@/constants/theme'

export default function Component() {
  const router = useRouter()
  const { user } = useSelector(state => state.auth)
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false)

  const closeLogoutModal = () => {
    setIsLogoutModalVisible(false)
  }

  const avatarText = user ? user?.name.charAt(0).toUpperCase() : 'G'

  const menuData = [
    {
      title: 'My Orders',
      icon: <Package size={20} color={colors.grey[700]} />,
      link: '/orders',
    },
    {
      title: 'Address Book',
      icon: <House size={20} color={colors.grey[700]} />,
      link: '/address',
    },
    {
      title: 'Change Password',
      icon: <LockOpen size={20} color={colors.grey[700]} />,
      link: '/forgot_password',
    },
    {
      title: 'Service Center',
      icon: <Headset size={20} color={colors.grey[700]} />,
      link: '/help',
    },
    {
      title: 'Terms of Service',
      icon: <FileText size={20} color={colors.grey[700]} />,
      link: '/terms_of_service',
    },
    {
      title: 'Privacy Policy',
      icon: <FileText size={20} color={colors.grey[700]} />,
      link: '/privacy_policy',
    },
    {
      title: 'FAQ',
      icon: <SealQuestion size={20} color={colors.grey[700]} />,
      link: '/FAQ',
    },
  ]

  const handleNavigation = link => {
    router.push(link)
  }

  return (
    <SecureRoute>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{avatarText}</Text>
          </View>
          <View>
            <Text style={styles.userNameText}>{user?.name || 'Guest'}</Text>
            <Text style={{ color: colors.grey[700] }}>
              {user?.phoneNumber || 'Guest'}
            </Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          {menuData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleNavigation(item.link)}
              style={styles.optionItem}
              activeOpacity={0.7}
            >
              <View style={styles.optionContent}>
                {item.icon}
                <Text style={styles.optionText}>{item.title}</Text>
              </View>
              <CaretRight size={16} weight="light" color={colors.borderColor} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.dangerZoneContainer}>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => setIsLogoutModalVisible(true)}
          >
            <SignOut size={20} color={colors.red[500]} />
            <Text style={styles.dangerOptionText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <LogoutModal
          isModalVisible={isLogoutModalVisible}
          closeModal={closeLogoutModal}
        />
      </ScrollView>
    </SecureRoute>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
    borderWidth: 2,
    backgroundColor: '#ccc',
    borderColor: '#6200ea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  avatarText: {
    color: '#444',
    fontWeight: 'bold',
    fontSize: 24,
  },
  userNameText: {
    color: '#333',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 18,
    marginTop: 10,
  },
  cardContainer: {
    marginBottom: 10,
    padding: 15,
    borderBottomColor: colors.borderColor,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 0.7,
    borderBottomColor: colors.borderColor,
    justifyContent: 'space-between',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 15,
    marginLeft: 7,
  },
  dangerZoneContainer: {
    paddingHorizontal: 15,
    borderRadius: 5,
    gap: 10,
  },
  dangerOptionText: {
    fontSize: 15,
    marginLeft: 7,
    color: colors.red[500],
  },
  logoutBtn: { flexDirection: 'row', padding: 5 },
}
