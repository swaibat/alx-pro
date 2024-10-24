import React, { useState } from 'react'
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native'
import { Layout, Input, Text, useTheme } from '@ui-kitten/components'
import { Button, Divider } from 'react-native-paper'
import { useLoginMutation } from '@/api'
import { Eye, EyeClosed, CheckCircle, Question } from 'phosphor-react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import LoginIllustration from '@/assets/LoginIllustration'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useDispatch } from 'react-redux'
import { setAuthState } from '@/store/authSlice'
import AppHeader from '@/components/_global/AppHeader'

const LoginScreen = () => {
  const router = useRouter()
  const theme = useTheme()
  const dispatch = useDispatch()
  const { triggerSnackbar } = useSnackbar()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [login, { isLoading }] = useLoginMutation()
  const { ref } = useLocalSearchParams()

  const phoneValidationRegex = /^(75|74|70|78|77|76|3|2)\d{7}$/

  const handleLogin = async () => {
    if (!phoneNumber || !phoneValidationRegex.test(phoneNumber)) {
      triggerSnackbar('Please enter a valid phone number', 'error')
      return
    }
    if (!password) {
      triggerSnackbar('Please enter your password', 'error')
      return
    }
    try {
      const response = await login({ phoneNumber, password }).unwrap()
      if (response.status === 200) {
        dispatch(setAuthState({ user: response.data }))
        await AsyncStorage.setItem('@user', JSON.stringify(response.data))
        router.push(ref || '/')
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

  const renderPhoneAccessoryRight = () =>
    isPhoneNumberValid ? (
      <CheckCircle size={24} weight="fill" color={theme['color-success-500']} />
    ) : (
      <Question size={24} weight="fill" color={theme['color-basic-700']} />
    )
  return (
    <>
      <AppHeader title={'Login'} headerStyle="dark" />
      <Layout style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Layout style={styles.container}>
            <LoginIllustration />
            <Input
              style={styles.input}
              label="Phone Number"
              placeholder="Enter phone number"
              onChangeText={text => setPhoneNumber(text)}
              accessoryLeft={() => <Text style={styles.countryCode}>+256</Text>}
              accessoryRight={renderPhoneAccessoryRight}
              keyboardType="numeric"
            />
            <Input
              style={styles.input}
              label="Password"
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
              mode="contained"
              onPress={handleLogin}
              disabled={isLoading || !isPhoneNumberValid} // Disable button if phone is invalid
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.registerText}>
                By continuing, you agree to our
              </Text>
              <TouchableOpacity onPress={() => router.push('terms_of_service')}>
                <Text style={styles.linkText}>Terms of use</Text>
              </TouchableOpacity>
              <Text style={styles.registerText}>and</Text>
              <TouchableOpacity onPress={() => router.push('privacy_policy')}>
                <Text style={styles.linkText}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
            <Divider style={{ marginVertical: 15 }} />
            <Text
              style={[styles.registerText, { marginBottom: 15, marginTop: 0 }]}
            >
              Don’t have an account?
            </Text>
            <Button
              mode="contained-tonal"
              onPress={() => router.push('/register')}
            >
              Register
            </Button>
          </Layout>
        </TouchableWithoutFeedback>
      </Layout>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
  },
  title: {
    textAlign: 'center',
    marginVertical: 5,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  input: {
    marginBottom: 15,
  },
  countryCode: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  button: {
    marginVertical: 10,
  },
  forgotPasswordText: {
    textAlign: 'right',
    color: '#007BFF',
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  registerText: {
    textAlign: 'center',
    fontSize: 14,
    marginHorizontal: 5,
  },
  linkText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
})

export default LoginScreen
