import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useLoginMutation } from '@/api'
import { Eye, EyeClosed, CheckCircle, Question } from 'phosphor-react-native'
import { usePathname, useRouter } from 'expo-router'
import LoginIllustration from '@/assets/LoginIllustration'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useDispatch } from 'react-redux'
import { setAuthState } from '@/store/authSlice'
import { Text } from '@/components/@ui/Text'
import { Button } from '@/components/@ui/Button'
import Input from '@/components/@ui/Input'
import PhoneInput from '@/components/@ui/PhoneInput'
import { colors } from '@/constants/theme'
import TopNav from '@/components/@ui/TopNav'

const LoginScreen = () => {
  const router = useRouter()
  const route = usePathname()
  const dispatch = useDispatch()
  const { triggerSnackbar } = useSnackbar()
  const [activeTab, setActiveTab] = useState('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [login, { isLoading }] = useLoginMutation()

  const phoneValidationRegex = /^(75|74|70|78|77|76|3|2)\d{7}$/
  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleLogin = async () => {
    if (activeTab === 'phone') {
      if (!phoneNumber || !phoneValidationRegex.test(phoneNumber)) {
        triggerSnackbar('Please enter a valid phone number', 'error')
        return
      }
    } else {
      if (!email || !emailValidationRegex.test(email)) {
        triggerSnackbar('Please enter a valid email address', 'error')
        return
      }
    }
    if (!password) {
      triggerSnackbar('Please enter your password', 'error')
      return
    }
    try {
      const credentials =
        activeTab === 'phone' ? { phoneNumber, password } : { email, password }
      const response = await login(credentials).unwrap()
      if (response.status === 200) {
        await AsyncStorage.setItem('@user', JSON.stringify(response.data))
        dispatch(setAuthState({ user: response?.data.user }))
        triggerSnackbar('Login Successful!', 'success')
        if (route.match('login')) {
          router.push('/')
        }
      } else {
        triggerSnackbar(
          response.message || 'Login failed. Please try again.',
          'error'
        )
      }
    } catch (error) {
      triggerSnackbar(
        error?.data?.message || 'Login failed. Please try again.',
        'error'
      )
    }
  }

  const isPhoneNumberValid = phoneValidationRegex.test(phoneNumber)
  const isEmailValid = emailValidationRegex.test(email)
  const isFormFilled =
    activeTab === 'phone'
      ? phoneNumber.length > 0 && password.length > 0
      : email.length > 0 && password.length > 0

  const renderPhoneAccessoryRight = () =>
    isPhoneNumberValid ? (
      <CheckCircle size={24} weight="fill" />
    ) : (
      <Question size={24} weight="fill" />
    )

  const renderEmailAccessoryRight = () =>
    isEmailValid ? (
      <CheckCircle size={24} weight="fill" />
    ) : (
      <Question size={24} weight="fill" />
    )

  return (
    <>
      <TopNav />
      <View style={styles.loginContainer}>
        <View style={styles.container}>
          <View>
            <LoginIllustration />
            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={
                  activeTab === 'phone' ? styles.activeTab : styles.inactiveTab
                }
                onPress={() => setActiveTab('phone')}
              >
                <Text style={styles.tabText}>Phone</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  activeTab === 'email' ? styles.activeTab : styles.inactiveTab
                }
                onPress={() => setActiveTab('email')}
              >
                <Text style={styles.tabText}>Email</Text>
              </TouchableOpacity>
            </View>
            {activeTab === 'phone' ? (
              <PhoneInput
                label="Phone Number"
                testID="phone"
                placeholder="Enter phone number"
                onChangeText={text => setPhoneNumber(text)}
                accessoryLeft={() => (
                  <Text style={styles.countryCode}>+256</Text>
                )}
                accessoryRight={renderPhoneAccessoryRight}
                keyboardType="numeric"
              />
            ) : (
              <Input
                label="Email"
                testID="email"
                placeholder="Enter email"
                value={email}
                onChangeText={setEmail}
                accessoryRight={renderEmailAccessoryRight}
                keyboardType="email-address"
              />
            )}
            <Input
              label="Password"
              testID="password"
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              accessoryRight={() => (
                <TouchableOpacity
                  onPress={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <Eye size={24} /> : <EyeClosed size={24} />}
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => router.push('/forgot_password')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              style={styles.button}
              onPress={handleLogin}
              isLoading={isLoading}
              title={'Login'}
              isDisabled={
                isLoading ||
                !isFormFilled ||
                (activeTab === 'phone' && !isPhoneNumberValid) ||
                (activeTab === 'email' && !isEmailValid)
              }
            />
            <Text style={styles.accountStatusWrapper}>
              Don’t have an account?
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.accountStatus}>Register</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  loginContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
    marginTop: 50,
    width: '80%',
    maxWidth: 400,
  },
  countryCode: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  // button: {
  //   marginVertical: 10,
  // },
  accountStatusWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: 15,
  },
  forgotPasswordText: {
    textAlign: 'right',
    color: colors.orange[300],
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  accountStatus: {
    color: colors.orange[300],
    textDecorationLine: 'underline',
    marginBottom: -5,
    marginLeft: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  activeTab: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.orange[300],
    alignItems: 'center',
  },
  inactiveTab: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignItems: 'center',
  },
  tabText: {
    fontWeight: 'bold',
  },
})

export default LoginScreen
