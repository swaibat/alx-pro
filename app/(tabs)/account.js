import React, { useState } from 'react'
import { Layout, Text, useTheme, Modal } from '@ui-kitten/components'
import { ScrollView, View, StyleSheet, StatusBar } from 'react-native'
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
import { Link, useFocusEffect, useRouter } from 'expo-router'
import { Appbar, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity } from 'react-native'

export default function Component() {
  const router = useRouter()
  const theme = useTheme()
  const [userName, setUserName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const fetchUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@user')
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        if (userData.user) {
          setUserName(userData.user.name)
          setPhoneNumber(userData.user.phoneNumber)
        } else {
          router.push('login')
        }
      } else {
        router.push('login')
      }
    } catch (error) {
      console.error('Error fetching user data from local storage:', error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData()
    }, [])
  )

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem('@user', '')
      setModalVisible(false)
      router.replace('/')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    headerContainer: {
      alignItems: 'center',
      backgroundColor: '#003449',
      height: 20,
      borderBottomColor: theme['color-primary-500'],
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 2,
      backgroundColor: theme['color-basic-400'],
      borderColor: theme['color-basic-500'],
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
    },
    avatarText: {
      color: theme['color-basic-700'],
      fontWeight: 'bold',
      fontSize: 24,
    },
    userNameText: {
      color: theme['color-basic-700'],
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
      marginTop: 10,
    },
    cardContainer: {
      backgroundColor: theme['background-basic-color-1'],
      borderRadius: 8,
      marginBottom: 10,
      shadowColor: theme['color-basic-transparent-300'],
    },
    sectionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      padding: 15,
    },
    orderStatusContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 16,
      borderBottomWidth: 10,
      padding: 15,
      borderBottomColor: theme['color-basic-400'],
    },
    orderItem: {
      alignItems: 'center',
      width: '23%',
    },
    orderText: {
      marginTop: 8,
      flexWrap: 'wrap',
      textAlign: 'center',
      fontSize: 12,
      color: theme['text-hint-color'],
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingBottom: 25,
    },
    optionText: {
      fontSize: 14,
      color: theme['text-basic-color'],
    },
    modal: {
      margin: 0,
      justifyContent: 'flex-end',
      height: '100%',
      width: '100%',
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      padding: 30,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      backgroundColor: 'white',
      maxHeight: 400,
      width: '100%',
    },
    modalButton: {
      flexGrow: 1,
      gap: 5,
      marginTop: 10,
    },
  })

  const avatarText = userName ? userName.charAt(0).toUpperCase() : 'G'

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Layout style={styles.container}>
        <Appbar.Header style={{ paddingRight: 15, backgroundColor: '#003449' }}>
          <Appbar.BackAction
            color={theme['color-basic-200']}
            onPress={() => router.back()}
          />
          <Appbar.Content
            color={theme['color-basic-100']}
            title={
              <Text style={{ color: theme['color-basic-100'], fontSize: 18 }}>
                Account
              </Text>
            }
          />
        </Appbar.Header>

        <Layout style={styles.headerContainer} />

        <View style={{ marginTop: -50, alignItems: 'center' }}>
          <View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{avatarText}</Text>
            </View>
            <Text style={styles.userNameText}>{userName || 'Guest'}</Text>
            <Text appearance="hint" style={{ textAlign: 'center' }}>
              {phoneNumber || 'Guest'}
            </Text>
          </View>
        </View>

        <ScrollView>
          <View
            style={[
              styles.cardContainer,
              {
                padding: 15,
                borderBottomWidth: 10,
                borderBottomColor: theme['color-basic-400'],
              },
            ]}
          >
            <Link href={'/orders'}>
              <View style={styles.optionItem}>
                <Package size={20} color={theme['text-basic-color']} />
                <Text style={styles.optionText}>My Orders</Text>
              </View>
            </Link>
            <Link href={'/viewed'}>
              <View style={styles.optionItem}>
                <Clock size={20} color={theme['text-basic-color']} />
                <Text style={styles.optionText}>Recently Viewed</Text>
              </View>
            </Link>
            <Link href={'/addressBook'}>
              <View style={styles.optionItem}>
                <House size={20} color={theme['text-basic-color']} />
                <Text style={styles.optionText}>My Address</Text>
              </View>
            </Link>
            <Link href={'/orders'}>
              <View style={styles.optionItem}>
                <LockOpen size={20} color={theme['text-basic-color']} />
                <Text style={styles.optionText}>Change Password</Text>
              </View>
            </Link>
          </View>

          <View
            style={[
              styles.cardContainer,
              {
                padding: 15,
                borderBottomWidth: 10,
                borderBottomColor: theme['color-basic-400'],
              },
            ]}
          >
            <Link href={'/help'}>
              <View style={styles.optionItem}>
                <Headset size={20} color={theme['text-basic-color']} />
                <Text style={styles.optionText}>Service Center</Text>
              </View>
            </Link>
            <Link href={'/terms_of_service'}>
              <View style={styles.optionItem}>
                <FileText size={20} color={theme['text-basic-color']} />
                <Text style={styles.optionText}>Terms of service</Text>
              </View>
            </Link>
            <Link href={'/privacy_policy'}>
              <View style={styles.optionItem}>
                <FileText size={20} color={theme['text-basic-color']} />
                <Text style={styles.optionText}>Privacy Policy</Text>
              </View>
            </Link>
            <Link href={'/FAQ'}>
              <View style={styles.optionItem}>
                <SealQuestion size={20} color={theme['text-basic-color']} />
                <Text style={styles.optionText}>FAQ</Text>
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
            <Text
              style={[
                styles.optionText,
                { color: theme['color-primary-default'] },
              ]}
            >
              Logout
            </Text>
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
    </>
  )
}
