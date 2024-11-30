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
import Divider from '@/components/@ui/Divider'
import Input from '@/components/@ui/Input'
import PhoneInput from '@/components/@ui/PhoneInput'
import { colors } from '@/constants/theme'

const LoginScreen = () => {
  const router = useRouter()
  const route = usePathname()
  const dispatch = useDispatch()
  const { triggerSnackbar } = useSnackbar()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [login, { isLoading }] = useLoginMutation()

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
  const isFormFilled = phoneNumber.length > 0 && password.length > 0 // Check if both fields are filled

  const renderPhoneAccessoryRight = () =>
    isPhoneNumberValid ? (
      <CheckCircle size={24} weight="fill" />
    ) : (
      <Question size={24} weight="fill" />
    )

  return (
    <>
      <View
        style={{
          flexGrow: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={styles.container}>
          <View>
            <LoginIllustration />
            <PhoneInput
              style={styles.input}
              label="Phone Number"
              testID="phone"
              placeholder="Enter phone number"
              onChangeText={text => setPhoneNumber(text)}
              accessoryLeft={() => <Text style={styles.countryCode}>+256</Text>}
              accessoryRight={renderPhoneAccessoryRight}
              keyboardType="numeric"
            />
            <Input
              style={styles.input}
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
            <TouchableOpacity
              testID="forgot-btn"
              onPress={() => router.push('/forgot_password')}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              style={styles.button}
              testID="login-btn"
              mode="contained"
              onPress={handleLogin}
              isLoading={isLoading}
              title={'Login'}
              isDisabled={isLoading || !isFormFilled || !isPhoneNumberValid}
            />

            <Divider
              type="horizontal"
              color="gray"
              dashed
              align="center"
              fontSize={14}
              style={{ marginVertical: 25 }}
            >
              Don’t have an account?
            </Divider>
            <Button
              outline
              testID="register-btn"
              onPress={() => router.push('/register')}
              title="Register"
            />
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 50,
    width: '80%',
    maxWidth: 400,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  input: {
    // marginBottom: 15,
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
    color: colors.orange[300],
    marginBottom: 15,
    textDecorationLine: 'underline',
  },
  registerText: {
    textAlign: 'center',
    fontSize: 14,
    marginHorizontal: 5,
  },
  linkText: {
    color: colors.orange[300],
    textDecorationLine: 'underline',
  },
})

export default LoginScreen
