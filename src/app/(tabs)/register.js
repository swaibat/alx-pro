import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSnackbar } from '@/hooks/useSnackbar'
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useRegisterMutation,
} from '@/api'
import LoginIllustration from '@/assets/LoginIllustration'
import { useLocalSearchParams, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from '@/components/@ui/Text'
import { Button } from '@/components/@ui/Button'
import Divider from '@/components/@ui/Divider'
import PhoneInput from '@/components/@ui/PhoneInput'
import Input from '@/components/@ui/Input'
import { colors } from '@/constants/theme'
import { useTimer } from '@/hooks/useTimer'
import {
  Eye,
  EyeClosed,
  User,
  Phone,
  Envelope,
  Lock,
} from 'phosphor-react-native'

const OtpRegisterScreen = () => {
  const router = useRouter()
  const { triggerSnackbar } = useSnackbar()
  const { step: initialStep, phoneNumber: initialPhoneNumber } =
    useLocalSearchParams()
  const { time: timer, isRunning, startTimer } = useTimer(30)

  const [step, setStep] = useState(Number(initialStep) || 1)
  const [tab, setTab] = useState('phoneNumber') // Added for tab control
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || '')
  const [otp, setOtp] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const phoneValidationRegex = /^(75|74|70|78|77|76|3|2)\d{7}$/
  const emailValidationRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation()
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation()
  const [register, { isLoading: isRegistering }] = useRegisterMutation()

  const resetFields = () => {
    setStep(Number(initialStep) || 1)
    setTab('phoneNumber') // Reset to default tab
    setPhoneNumber(initialPhoneNumber || '')
    setOtp('')
    setFullName('')
    setPassword('')
    setEmail('')
  }

  const handleOtpRequest = async () => {
    if (tab === 'phoneNumber') {
      if (!phoneNumber || !phoneValidationRegex.test(phoneNumber)) {
        triggerSnackbar(
          'Please enter a valid phone number (format: 75XXXXXXX, 74XXXXXXX, etc.)',
          'error'
        )
        return
      }
      try {
        const res = await sendOtp({
          payload: phoneNumber,
          type: 'register',
        }).unwrap()
        setPhoneNumber(res.phoneNumber)
        triggerSnackbar(res.message, 'success')
        setStep(2)
        router.push(`/register?step=2&phoneNumber=${res.phoneNumber}`)
        startTimer()
      } catch (error) {
        triggerSnackbar(
          error?.data?.message || 'Failed to send OTP. Please try again.',
          'error'
        )
      }
    } else if (tab === 'email') {
      if (!email || !emailValidationRegex.test(email)) {
        triggerSnackbar('Please enter a valid email address.', 'error')
        return
      }
      try {
        const res = await sendOtp({
          payload: email,
          type: 'register',
        }).unwrap()
        triggerSnackbar(res.message, 'success')
        setStep(2)
        router.push(`/register?step=2&email=${res.email}`)
        startTimer()
      } catch (error) {
        triggerSnackbar(
          error?.data?.message || 'Failed to send OTP. Please try again.',
          'error'
        )
      }
    }
  }

  const handleOtpVerification = async () => {
    if (otp.length !== 4) {
      triggerSnackbar('Please enter a valid 4-digit OTP', 'error')
      return
    }
    try {
      const response = await verifyOtp({
        authId: tab === 'email' ? email : phoneNumber,
        code: otp,
      }).unwrap()
      if (response.status === 200) {
        setPhoneNumber(response.data.phoneNumber)
        setFullName(response.data.names)
        setStep(3)
      } else {
        triggerSnackbar(
          'Failed to verify OTP. Please check your code.',
          'error'
        )
      }
    } catch (error) {
      triggerSnackbar(
        error?.data?.message || 'Failed to verify OTP. Please check your code.',
        'error'
      )
    }
  }

  const handleResendOtp = async () => {
    if (!isRunning) {
      await handleOtpRequest()
    }
  }

  const handleChangePhoneNumber = text => {
    if (text.length <= 9) {
      setPhoneNumber(text)
    }
  }

  const handleChangeOtp = text => {
    if (text.length <= 4) {
      setOtp(text)
    }
  }

  const handleRegistration = async () => {
    if (!fullName || !password || !email) {
      triggerSnackbar('Please fill in all fields.', 'error')
      return
    }

    if (!emailValidationRegex.test(email)) {
      triggerSnackbar('Please enter a valid email address.', 'error')
      return
    }

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
      triggerSnackbar('Registration failed. Please try again.', error)
    }
  }

  useEffect(() => {
    let intervalId
    if (step === 2) {
      intervalId = startTimer()
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [step])

  const handleWrongNumber = () => {
    setStep(1)
    router.replace('/register?step=1')
  }

  return (
    <>
      <View style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {step === 1 && (
              <>
                <LoginIllustration />

                <View style={styles.tabContainer}>
                  <TouchableOpacity
                    style={
                      tab === 'phoneNumber' ? styles.activeTab : styles.tab
                    }
                    onPress={() => setTab('phoneNumber')}
                  >
                    <Text style={styles.tabText}>Phone</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tab === 'email' ? styles.activeTab : styles.tab}
                    onPress={() => setTab('email')}
                  >
                    <Text style={styles.tabText}>Email</Text>
                  </TouchableOpacity>
                </View>

                {tab === 'phoneNumber' && (
                  <>
                    <Text bold style={styles.title} testID="title">
                      Enter Phone Number
                    </Text>
                    <Text style={styles.description} testID="description">
                      We will send you a one-time password to your mobile
                      number.
                    </Text>
                    <PhoneInput
                      style={styles.input}
                      placeholder="Phone Number"
                      dismissIfValid
                      value={phoneNumber}
                      onChangeText={handleChangePhoneNumber}
                      testID="phoneInput"
                    />
                    <Button
                      style={styles.button}
                      mode="contained"
                      onPress={handleOtpRequest}
                      isDisabled={
                        !phoneNumber ||
                        !phoneValidationRegex.test(phoneNumber) ||
                        isSendingOtp
                      }
                      isLoading={isSendingOtp}
                      testID="sendOtpButton"
                      title="Send OTP"
                    />
                  </>
                )}

                {tab === 'email' && (
                  <>
                    <Text bold style={styles.title} testID="title">
                      Enter Email Address
                    </Text>
                    <Text style={styles.description} testID="description">
                      We will send you a one-time password to your email
                      address.
                    </Text>
                    <Input
                      style={styles.input}
                      placeholder="Email Address"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      testID="emailInput"
                    />
                    <Button
                      style={styles.button}
                      mode="contained"
                      onPress={handleOtpRequest}
                      isDisabled={!email || isSendingOtp}
                      isLoading={isSendingOtp}
                      testID="sendOtpButton"
                      title="Send OTP"
                    />
                  </>
                )}
                <Divider
                  type="horizontal"
                  color="gray"
                  dashed
                  align="center"
                  fontSize={14}
                  style={styles.divider}
                >
                  Have an account?
                </Divider>
                <Button
                  outline
                  onPress={() => router.push('/login')}
                  testID="loginButton"
                  title="Login"
                />
              </>
            )}

            {step === 2 && (
              <>
                <LoginIllustration />
                <Text category="h5" style={styles.title} testID="otpTitle">
                  Enter OTP Code
                </Text>
                <Text style={styles.description} testID="otpDescription">
                  We have sent a verification code to your mobile number 0
                  {phoneNumber}.
                </Text>
                <Input
                  style={styles.otpInput}
                  textStyle={styles.otpTextStyle}
                  value={otp}
                  size="large"
                  onChangeText={handleChangeOtp}
                  keyboardType="numeric"
                  maxLength={4}
                  textAlign="center"
                  placeholder="XXXX"
                  testID="otpInput"
                />
                <View style={styles.resendContainer}>
                  <Text style={styles.description} testID="resendOtpText">
                    Didn’t receive the OTP?
                  </Text>
                  <TouchableOpacity onPress={handleResendOtp}>
                    <Text
                      style={
                        !isRunning ? styles.resendText : styles.resendDisabled
                      }
                      testID="resendOtpButton"
                    >
                      {!isRunning ? ' Resend' : ` 00:${timer}`}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={handleOtpVerification}
                  isLoading={isVerifyingOtp}
                  isDisabled={otp.length !== 4 || isVerifyingOtp}
                  testID="verifyOtpButton"
                  title="Verify OTP"
                />
                <View style={styles.wrongNumberContainer}>
                  <Text style={styles.registerText} testID="wrongNumberText">
                    Wrong Number?
                  </Text>
                  <TouchableOpacity onPress={handleWrongNumber}>
                    <Text style={styles.link}> Change</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {step === 3 && (
              <>
                <LoginIllustration />
                <Text bold style={styles.title} testID="registerTitle">
                  Create Your Account
                </Text>
                <Input
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  label="Full Name"
                  accessoryLeft={<User size={20} />}
                  testID="fullNameInput"
                />
                <Input
                  style={styles.input}
                  accessoryLeft={<Phone size={20} />}
                  readOnly
                  label="Phone Number"
                  value={phoneNumber}
                  testID="phoneNumberInput"
                />
                <Input
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  label="Email Address"
                  placeholder="Email Address"
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
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Eye size={20} />
                      ) : (
                        <EyeClosed size={20} />
                      )}
                    </TouchableOpacity>
                  }
                  testID="passwordInput"
                />
                <Button
                  style={styles.button}
                  onPress={handleRegistration}
                  isDisabled={!fullName || !password || isRegistering}
                  testID="registerButton"
                  title="Register"
                  isLoading={isRegistering}
                />
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    width: '85%',
    maxWidth: 400,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  otpInput: {
    marginBottom: 10,
  },
  otpTextStyle: {
    fontSize: 40,
    textAlign: 'center',
    width: '100%',
    letterSpacing: 20,
  },
  button: {
    marginTop: 10,
  },
  resendText: {
    color: colors.orange[300],
  },
  resendDisabled: {
    color: 'gray',
  },
  registerText: {
    textAlign: 'center',
  },
  link: {
    color: colors.orange[300],
  },
  resendContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 'auto',
  },
  wrongNumberContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 'auto',
  },
  divider: {
    marginVertical: 25,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 7,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  activeTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 7,
    marginHorizontal: 5,
    backgroundColor: colors.orange[300],
    borderRadius: 5,
  },
  tabText: {
    color: 'black',
    fontWeight: 'bold',
  },
})

export default OtpRegisterScreen
