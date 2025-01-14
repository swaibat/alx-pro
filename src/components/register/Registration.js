import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '@/components/@ui/Text'
import Input from '@/components/@ui/Input'
import { Button } from '@/components/@ui/Button'
import {
  User,
  Envelope,
  Lock,
  Phone,
  EyeClosed,
  Eye,
} from 'phosphor-react-native'
import { useRegisterMutation } from '@/api'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Registration = ({ name, authId }) => {
  const [fullName, setFullName] = useState(name || '')
  const [phoneNumber, setPhoneNumber] = useState(
    !authId?.match('@') ? authId : ''
  )
  const [email, setEmail] = useState(authId?.match('@') ? authId : '')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [register, { isLoading: isRegistering }] = useRegisterMutation()
  const { triggerSnackbar } = useSnackbar()
  const router = useRouter()

  const emailValidationRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  const validateForm = () => {
    if (!fullName || !password) {
      triggerSnackbar('Please fill in all fields.', 'error')
      return false
    }
    if (!emailValidationRegex.test(email)) {
      triggerSnackbar('Please enter a valid email address.', 'error')
      return false
    }
    if (password.length < 6) {
      triggerSnackbar('Password must be at least 6 characters long.', 'error')
      return false
    }
    return true
  }

  const handleRegistration = async () => {
    if (!validateForm()) return

    try {
      const registrationResponse = await register({
        name: fullName,
        phoneNumber,
        password,
        code: otp,
        email,
      }).unwrap()

      if (registrationResponse.status === 201) {
        await AsyncStorage.setItem(
          '@user',
          JSON.stringify({ user: registrationResponse.user })
        )
        triggerSnackbar('Registration successful!', 'success')
        resetFields()
        router.push('/login')
      } else {
        triggerSnackbar('Registration failed. Please try again.', 'error')
      }
    } catch (error) {
      triggerSnackbar(
        error?.data?.message || 'Registration failed. Please try again.',
        'error'
      )
    }
  }

  const resetFields = () => {
    setFullName('')
    setPhoneNumber('')
    setEmail('')
    setPassword('')
    setOtp('')
  }

  return (
    <>
      <Text bold style={styles.title} testID="registerTitle">
        Create Your Account
      </Text>
      <Input
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        readOnly={name}
        disabled
        label="Full Name"
        accessoryLeft={<User size={20} />}
        testID="fullNameInput"
      />
      {!authId?.match('@') && (
        <Input
          style={styles.input}
          accessoryLeft={<Phone size={20} />}
          label="Phone Number"
          readOnly={authId && !authId?.match('@')}
          value={phoneNumber}
          testID="phoneNumberInput"
        />
      )}
      <Input
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        label="Email Address"
        placeholder="Email Address"
        readOnly={authId?.match('@')}
        keyboardType="email-address"
        accessoryLeft={<Envelope size={20} />}
        testID="emailInput"
      />
      <Input
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        label="Password"
        secureTextEntry={!showPassword}
        accessoryLeft={<Lock size={20} />}
        accessoryRight={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
          </TouchableOpacity>
        }
      />
      <Button
        style={styles.button}
        onPress={handleRegistration}
        isDisabled={!fullName || !email || !password || isRegistering}
        title="Register"
        isLoading={isRegistering}
      />
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },
})

export default Registration
