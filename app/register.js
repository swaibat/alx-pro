import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  StatusBar,
  View,
} from 'react-native'
import { Layout, Input, Text } from '@ui-kitten/components'
import { Appbar, Snackbar, useTheme, Button, Divider } from 'react-native-paper'
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useRegisterMutation,
} from '@/api'
import LoginIllustration from '@/assets/LoginIllustration'
import { useLocalSearchParams, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Eye, EyeClosed } from 'phosphor-react-native'
import { usePushNotifications } from '@/scripts/NotificationsService'

const OtpRegisterScreen = () => {
  const router = useRouter()
  const theme = useTheme()
  const { step: initialStep, phoneNumber: initialPhoneNumber } =
    useLocalSearchParams()
  const { expoPushToken } = usePushNotifications()

  const [step, setStep] = useState(Number(initialStep) || 1)
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || '')
  const [otp, setOtp] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [timer, setTimer] = useState(20)
  const [canResend, setCanResend] = useState(false)

  const [snackVisible, setSnackVisible] = useState(false)
  const [snackMessage, setSnackMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const phoneValidationRegex = /^(75|74|70|78|77|76|3|2)\d{7}$/
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation()
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation()
  const [register, { isLoading: isRegistering }] = useRegisterMutation()

  const startTimer = () => {
    setTimer(30)
    setCanResend(false)
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return interval
  }

  const handleSnackOpen = message => {
    setSnackMessage(message)
    setSnackVisible(true)
  }

  const handleOtpRequest = async () => {
    if (!phoneNumber || !phoneValidationRegex.test(phoneNumber)) {
      handleSnackOpen(
        'Please enter a valid phone number (format: 75XXXXXXX, 74XXXXXXX, etc.)'
      )
      return
    }

    try {
      const res = await sendOtp(phoneNumber).unwrap()
      setPhoneNumber(res.phoneNumber)
      setStep(2)
      router.push(`/register?step=2&phoneNumber=${res.phoneNumber}`)
      startTimer()
    } catch (error) {
      handleSnackOpen(
        error?.data?.message || 'Failed to send OTP. Please try again.'
      )
      console.error('Send OTP Error:', error)
    }
  }

  const handleOtpVerification = async () => {
    if (otp.length !== 4) {
      handleSnackOpen('Please enter a valid 4-digit OTP')
      return
    }

    try {
      const response = await verifyOtp({
        phoneNumber: phoneNumber,
        code: otp,
      }).unwrap()
      if (response.status === 200) {
        setPhoneNumber(response.data.phoneNumber)
        setFullName(response.data.names)
        setStep(3)
      } else {
        handleSnackOpen('Failed to verify OTP. Please check your code.')
      }
    } catch (error) {
      handleSnackOpen(
        error?.data?.message || 'Failed to verify OTP. Please check your code.'
      )
      console.error('Verify OTP Error:', error)
    }
  }

  const handleResendOtp = async () => {
    if (canResend) {
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
    if (!fullName || !email || !password) {
      handleSnackOpen('Please fill in all fields.')
      return
    }

    try {
      const registrationResponse = await register({
        name: fullName,
        phoneNumber,
        email,
        password,
        expoPushToken,
      }).unwrap()
      if (registrationResponse.status === 201) {
        console.log(registrationResponse.user)

        await AsyncStorage.setItem(
          '@user',
          JSON.stringify({ user: registrationResponse.user })
        )
        handleSnackOpen('Registration successful!')
        // router.push('/'); // Navigate to the home screen
      } else {
        handleSnackOpen('Registration failed. Please try again.')
      }
    } catch (error) {
      handleSnackOpen('Registration failed. Please try again.')
      console.error('Registration Error:', error)
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
    router.replace(`/register?step=1`)
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
          onPress={() => router.push('/login')}
        />
        <Appbar.Content
          color={theme.colors.outlineVariant}
          title={
            <Text style={{ color: theme.colors.outlineVariant, fontSize: 18 }}>
              Register
            </Text>
          }
        />
      </Appbar.Header>
      <Layout style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Layout style={styles.container}>
            {step === 1 && (
              <>
                <LoginIllustration />
                <Text category="h5" style={styles.title}>
                  Enter Phone Number
                </Text>
                <Text
                  category="s1"
                  appearance="hint"
                  style={styles.description}
                >
                  We will send you a one-time password to your mobile number.
                </Text>
                <Input
                  style={styles.input}
                  placeholder="Phone Number"
                  onChangeText={handleChangePhoneNumber}
                  accessoryLeft={() => (
                    <Text style={styles.countryCode}>+256</Text>
                  )}
                  keyboardType="numeric"
                />
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={handleOtpRequest}
                  loading={isSendingOtp}
                  disabled={
                    !phoneNumber ||
                    !phoneValidationRegex.test(phoneNumber) ||
                    isSendingOtp
                  }
                >
                  {isSendingOtp ? 'Sending...' : 'Send OTP'}
                </Button>
                <Divider style={{ marginVertical: 15 }} />
                <Text
                  style={[
                    styles.registerText,
                    { marginBottom: 15, marginTop: 0 },
                  ]}
                >
                  Have an account?
                </Text>
                <Button
                  mode="contained-tonal"
                  onPress={() => router.push('/login')}
                >
                  Login
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <LoginIllustration />
                <Text category="h5" style={styles.title}>
                  Enter OTP Code
                </Text>
                <Text
                  category="s1"
                  appearance="hint"
                  style={styles.description}
                >
                  We have sent a verification code to your mobile number 0
                  {phoneNumber}.
                </Text>
                <Input
                  style={styles.otpInput}
                  textStyle={{
                    fontSize: 40,
                    textAlign: 'center',
                    width: '100%',
                    letterSpacing: 20,
                  }}
                  value={otp}
                  size="large"
                  onChangeText={handleChangeOtp}
                  keyboardType="numeric"
                  maxLength={4}
                  textAlign="center"
                  placeholder="XXXX"
                />
                <Text
                  category="s1"
                  appearance="hint"
                  style={styles.description}
                >
                  Didn’t receive the OTP?
                  <TouchableOpacity onPress={handleResendOtp}>
                    <Text
                      style={
                        canResend ? styles.resendText : styles.disabledText
                      }
                    >
                      {' '}
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                </Text>
                {timer > 0 && (
                  <Text style={styles.timerText}>
                    {timer} seconds remaining
                  </Text>
                )}
                <Button
                  style={styles.button}
                  onPress={handleOtpVerification}
                  mode="contained"
                  loading={isVerifyingOtp}
                  disabled={otp.length !== 4 || isVerifyingOtp}
                >
                  {isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
                </Button>

                <TouchableOpacity onPress={handleWrongNumber}>
                  <Text style={styles.wrongNumberText}>
                    Wrong Number? Go Back
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {step === 3 && (
              <>
                <LoginIllustration />
                <Text category="h5" style={styles.title}>
                  Complete Registration
                </Text>
                <Text category="s1" style={styles.label}>
                  Full Name
                </Text>
                <Input
                  style={styles.input}
                  placeholder="Enter your full name"
                  value={fullName}
                  onChangeText={setFullName}
                />

                <Text category="s1" style={styles.label}>
                  Phone Number
                </Text>
                <Input
                  style={styles.input}
                  value={phoneNumber}
                  disabled={true}
                />

                <Text category="s1" style={styles.label}>
                  Email
                </Text>
                <Input
                  style={styles.input}
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                />

                <Text category="s1" style={styles.label}>
                  Password
                </Text>
                <Input
                  style={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword} // Use the state for password visibility
                  accessoryRight={() => (
                    <TouchableOpacity
                      onPress={() => setShowPassword(prev => !prev)}
                    >
                      {showPassword ? (
                        <Eye size={24} weight="bold" />
                      ) : (
                        <EyeClosed size={24} weight="bold" />
                      )}
                    </TouchableOpacity>
                  )}
                />

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
                  <TouchableOpacity
                    onPress={() => router.push('terms_of_service')}
                  >
                    <Text style={styles.linkText}>Terms of use</Text>
                  </TouchableOpacity>
                  <Text style={styles.registerText}>and</Text>
                  <TouchableOpacity
                    onPress={() => router.push('privacy_policy')}
                  >
                    <Text style={styles.linkText}>Privacy Policy</Text>
                  </TouchableOpacity>
                </View>

                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={handleRegistration}
                  loading={isRegistering}
                  disabled={isRegistering}
                >
                  {isRegistering ? 'Registering...' : 'Complete Registration'}
                </Button>
              </>
            )}
          </Layout>
        </TouchableWithoutFeedback>
        <Snackbar
          visible={snackVisible}
          onDismiss={() => setSnackVisible(false)}
          duration={3000}
          action={{
            label: 'Dismiss', // Button label
            onPress: () => setSnackVisible(false), // Dismiss the Snackbar when pressed
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
    marginTop: 24,
  },
  title: {
    textAlign: 'center',
    marginVertical: 15,
  },
  description: {
    marginVertical: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginVertical: 10,
  },
  otpInput: {
    width: '80%',
    marginHorizontal: 'auto',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 65,
    textAlign: 'center',
    marginVertical: 20,
  },
  countryCode: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  resendText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  disabledText: {
    color: '#ccc',
    textDecorationLine: 'underline',
  },
  timerText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#666',
  },
  wrongNumberText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#FF0000',
    textDecorationLine: 'underline',
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  termsText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#666',
  },
  termsLink: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  haveAccountText: {
    marginTop: 20,
    textAlign: 'center',
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

export default OtpRegisterScreen
