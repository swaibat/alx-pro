import React, { useState } from 'react'
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  StatusBar,
} from 'react-native'
import { Layout, Input, Text } from '@ui-kitten/components'
import { Appbar, Button, Divider, Snackbar, useTheme } from 'react-native-paper'
import { useLoginMutation } from '@/api'
import { Eye, EyeSlash } from 'phosphor-react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import LoginIllustration from '@/assets/LoginIllustration'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = () => {
  const router = useRouter()
  const theme = useTheme()

  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [snackVisible, setSnackVisible] = useState(false)
  const [snackMessage, setSnackMessage] = useState('')
  const [login, { isLoading }] = useLoginMutation()
  const { ref } = useLocalSearchParams()

  const phoneValidationRegex = /^(75|74|70|78|77|76|3|2)\d{7}$/

  const handleSnackOpen = message => {
    setSnackMessage(message)
    setSnackVisible(true)
  }

  const handleLogin = async () => {
    if (!phoneNumber || !phoneValidationRegex.test(phoneNumber)) {
      handleSnackOpen(
        'Please enter a valid phone number (format: 75XXXXXXX, 74XXXXXXX, etc.)'
      )
      return
    }
    if (!password) {
      handleSnackOpen('Please enter your password')
      return
    }

    try {
      const response = await login({ phoneNumber, password }).unwrap()
      if (response.status === 200) {
        console.log('response.data', response.data)
        await AsyncStorage.setItem('@user', JSON.stringify(response.data))
        router.push(ref || '/')
      } else {
        handleSnackOpen(response.message || 'Login failed. Please try again.')
      }
    } catch (error) {
      handleSnackOpen(error?.data?.message || 'Login failed. Please try again.')
      console.error('Login Error:', error)
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Appbar.Header
        style={{
          paddingRight: 25,
          backgroundColor: '#111b2d',
          borderBottomColor: 'red',
          borderBottomWidth: 2,
        }}
      >
        <Appbar.BackAction
          color={theme.colors.outlineVariant}
          onPress={() => router.push('/')}
        />
        <Appbar.Content
          color={theme.colors.outlineVariant}
          title={
            <Text style={{ color: theme.colors.outlineVariant, fontSize: 18 }}>
              Login
            </Text>
          }
        />
      </Appbar.Header>
      <Layout style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Layout style={styles.container}>
            {/* Illustration at the top */}
            <LoginIllustration />

            <Input
              style={styles.input}
              label="Phone Number"
              placeholder="Enter phone number"
              onChangeText={text => setPhoneNumber(text)}
              accessoryLeft={() => <Text style={styles.countryCode}>+256</Text>}
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
                  {showPassword ? (
                    <Eye size={24} weight="bold" />
                  ) : (
                    <EyeSlash size={24} weight="bold" />
                  )}
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity onPress={() => router.push('/forgot-password')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              style={styles.button}
              mode="contained"
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>

            <Text style={styles.registerText}>
              By continuing, you agree to our{' '}
              <Text style={styles.linkText}>Terms of use</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
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
              {' '}
              Register
            </Button>
          </Layout>
        </TouchableWithoutFeedback>

        {/* Snackbar for Error Messages */}
        <Snackbar
          visible={snackVisible}
          onDismiss={() => setSnackVisible(false)}
          duration={3000}
          action={{
            label: 'Dismiss',
            onPress: () => setSnackVisible(false),
          }}
        >
          {snackMessage}
        </Snackbar>
      </Layout>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
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
    marginTop: 20,
    fontSize: 14,
  },
  linkText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
})

export default LoginScreen
