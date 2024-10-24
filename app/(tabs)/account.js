import React, { useEffect, useState } from 'react'
import { Layout, Text, useTheme, Modal } from '@ui-kitten/components'
import { ScrollView, View } from 'react-native'
import {
  Clock,
  House,
  Headset,
  Power,
  SealQuestion,
  FileText,
  Package,
  LockOpen,
} from 'phosphor-react-native'
import { Link, useRouter } from 'expo-router'
import { Button } from 'react-native-paper'
import { TouchableOpacity } from 'react-native'
import { clearAuthState } from '@/scripts/asyncStorage'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/store/authSlice'
import SecureRoute from '@/components/_global/SecureRoute'
import AppHeader from '../../components/_global/AppHeader'

export default function Component() {
  const router = useRouter()
  const theme = useTheme()
  const [userName, setUserName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (user?.user) {
      setUserName(user.user.name)
      setPhoneNumber(user.user.phoneNumber)
    }
  }, [])

  const handleLogout = async () => {
    await clearAuthState()
    dispatch(logout())
    setModalVisible(false)
    router.push('/')
  }

  const avatarText = userName ? userName.charAt(0).toUpperCase() : 'G'

  return (
    <SecureRoute>
      <AppHeader title="Account" headerStyle={'dark'} />
      <Layout style={styles.container}>
        <Layout style={styles.headerContainer(theme)} />

        <View style={{ marginTop: -50, alignItems: 'center' }}>
          <View>
            <View style={styles.avatar(theme)}>
              <Text style={styles.avatarText(theme)}>{avatarText}</Text>
            </View>
            <Text style={styles.userNameText(theme)}>
              {userName || 'Guest'}
            </Text>
            <Text appearance="hint" style={{ textAlign: 'center' }}>
              {phoneNumber || 'Guest'}
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.cardContainer(theme)}>
            <Link href={'/orders'}>
              <View style={styles.optionItem}>
                <Package size={20} color={theme['text-basic-color']} />
                <Text style={styles.optionText(theme)}>My Orders</Text>
              </View>
            </Link>
            <Link href={'/viewed'}>
              <View style={styles.optionItem}>
                <Clock size={20} color={theme['text-basic-color']} />
                <Text style={styles.optionText(theme)}>Recently Viewed</Text>
              </View>
            </Link>
            <Link href={'/addressBook'}>
              <View style={styles.optionItem}>
                <House size={20} color={theme['text-basic-color']} />
                <Text style={styles.optionText(theme)}>My Address</Text>
              </View>
            </Link>
            <Link href={'/orders'}>
              <View style={styles.optionItem}>
                <LockOpen size={20} color={theme['text-basic-color']} />
                <Text style={styles.optionText(theme)}>Change Password</Text>
              </View>
            </Link>
          </View>

          <View style={styles.cardContainer(theme)}>
            <Link href={'/help'}>
              <View style={styles.optionItem}>
                <Headset size={20} color={theme['text-basic-color']} />
                <Text style={styles.optionText(theme)}>Service Center</Text>
              </View>
            </Link>
            <Link href={'/terms_of_service'}>
              <View style={styles.optionItem}>
                <FileText size={20} color={theme['text-basic-color']} />
                <Text style={styles.optionText(theme)}>Terms of service</Text>
              </View>
            </Link>
            <Link href={'/privacy_policy'}>
              <View style={styles.optionItem}>
                <FileText size={20} color={theme['text-basic-color']} />
                <Text style={styles.optionText(theme)}>Privacy Policy</Text>
              </View>
            </Link>
            <Link href={'/FAQ'}>
              <View style={styles.optionItem}>
                <SealQuestion size={20} color={theme['text-basic-color']} />
                <Text style={styles.optionText(theme)}>FAQ</Text>
              </View>
            </Link>
          </View>
          <TouchableOpacity
            style={[
              styles.optionItem,
              { paddingHorizontal: 16, paddingTop: 20 },
            ]}
            onPress={() => setModalVisible(true)}
          >
            <Power size={20} color={theme['color-primary-default']} />
            <Text style={styles.optionTextLogout(theme)}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </Layout>

      <Modal
        visible={modalVisible}
        style={styles.modal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text category="h6" style={{ textAlign: 'center' }}>
            Confirm Logout
          </Text>
          <Text style={{ textAlign: 'center' }}>
            Are you sure you want to logout?
          </Text>
          <View style={{ marginVertical: 20, flexDirection: 'row', gap: 10 }}>
            <Button
              mode="contained-tonal"
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleLogout}
              style={styles.modalButton}
            >
              Logout
            </Button>
          </View>
        </View>
      </Modal>
    </SecureRoute>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: theme => ({
    alignItems: 'center',
    backgroundColor: theme['color-primary-700'],
    height: 20,
    borderBottomColor: theme['color-primary-500'],
  }),
  avatar: theme => ({
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    backgroundColor: theme['color-basic-400'],
    borderColor: theme['color-basic-500'],
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  }),
  avatarText: theme => ({
    color: theme['color-basic-700'],
    fontWeight: 'bold',
    fontSize: 24,
  }),
  userNameText: theme => ({
    color: theme['color-basic-700'],
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  }),
  cardContainer: theme => ({
    backgroundColor: theme['background-basic-color-1'],
    borderRadius: 8,
    marginBottom: 10,
    padding: 15,
    borderBottomWidth: 10,
    borderBottomColor: theme['color-basic-400'],
    shadowColor: theme['color-basic-transparent-300'],
  }),
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 25,
  },
  optionText: theme => ({
    fontSize: 14,
    color: theme['text-basic-color'],
    fontWeight: '600',
  }),
  optionTextLogout: theme => ({
    fontSize: 14,
    color: theme['color-primary-default'],
    fontWeight: '600',
  }),
  modal: {
    width: '80%',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalButton: {
    flex: 1,
  },
}
