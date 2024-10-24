import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  StatusBar,
} from 'react-native'
import { Layout, Input, Text } from '@ui-kitten/components'
import { Appbar, useTheme, Button } from 'react-native-paper'
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} from '@/api'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Eye, EyeClosed } from 'phosphor-react-native'
import { useSnackbar } from '@/hooks/useSnackbar'

const PasswordResetScreen = () => {
  const router = useRouter()
  const theme = useTheme()
  const { step: initialStep, phoneNumber: initialPhoneNumber } =
    useLocalSearchParams()
  const { triggerSnackbar } = useSnackbar()
  const [step, setStep] = useState(Number(initialStep) || 1)
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || '')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [timer, setTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const phoneValidationRegex = /^(75|74|70|78|77|76|3|2)\d{7}$/
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation()
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation()
  const [resetPassword, { isLoading: isResettingPassword }] =
    useResetPasswordMutation()

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

  const handleOtpRequest = async () => {
    if (!phoneNumber || !phoneValidationRegex.test(phoneNumber)) {
      triggerSnackbar('Please enter a valid phone number.', 'error')
      return
    }

    try {
      const res = await sendOtp(phoneNumber).unwrap()
      setPhoneNumber(res.phoneNumber)
      setStep(2)
      router.push(`/forgot_password?step=2&phoneNumber=${res.phoneNumber}`)
      startTimer()
    } catch (error) {
      triggerSnackbar('Failed to send OTP. Please try again.', 'error')
      console.log(error)
    }
  }

  const handleResendOtp = async () => {
    if (!phoneNumber) return
    try {
      await sendOtp(phoneNumber).unwrap()
      triggerSnackbar('OTP has been resent successfully.', 'success')
      startTimer()
    } catch (error) {
      triggerSnackbar('Failed to resend OTP. Please try again.', 'error')
      console.log('error', error)
    }
  }

  const handleOtpVerification = async () => {
    if (otp.length !== 4) {
      triggerSnackbar('Please enter a valid 4-digit OTP', 'error')
      return
    }

    try {
      const response = await verifyOtp({ phoneNumber, code: otp }).unwrap()
      if (response.status === 200) {
        setStep(3)
      } else {
        triggerSnackbar(
          'Failed to verify OTP. Please check your code.',
          'error'
        )
      }
    } catch (error) {
      triggerSnackbar('Failed to verify OTP. Please try again.', 'error')
      console.log('error', error)
    }
  }

  const handlePasswordReset = async () => {
    if (!password) {
      triggerSnackbar('Please enter a new password.', 'error')
      return
    }

    try {
      const response = await resetPassword({
        phoneNumber,
        newPassword: password,
      }).unwrap()
      if (response.status === 200) {
        triggerSnackbar('Password reset successful!', 'success')
        router.push('/login')
      } else {
        triggerSnackbar('Failed to reset password. Please try again.', 'error')
      }
    } catch (error) {
      triggerSnackbar('Error resetting password.', 'error')
      console.log(error)
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

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Appbar.Header style={{ paddingRight: 25, backgroundColor: '#111b2d' }}>
        <Appbar.BackAction
          color={theme.colors.outlineVariant}
          onPress={() => router.push('/login')}
        />
        <Appbar.Content
          title={
            <Text style={{ color: theme.colors.outlineVariant, fontSize: 18 }}>
              Reset Password
            </Text>
          }
        />
      </Appbar.Header>
      <Layout style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Layout style={styles.container}>
            {step === 1 && (
              <>
                <Text category="h5" style={styles.title}>
                  Enter Phone Number
                </Text>
                <Text appearance="hint" style={styles.description}>
                  Please enter the phone number you used to register, so we can
                  send you the OTP.
                </Text>
                <Input
                  style={styles.input}
                  placeholder="Phone Number"
                  onChangeText={setPhoneNumber}
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
              </>
            )}

            {step === 2 && (
              <>
                <Text category="h5" style={styles.title}>
                  Enter OTP Code
                </Text>
                <Text appearance="hint" style={styles.description}>
                  A 4-digit OTP code has been sent to your phone. Please enter
                  it below to verify your phone number.
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
                  onChangeText={setOtp}
                  keyboardType="numeric"
                  maxLength={4}
                  placeholder="XXXX"
                />
                <Button
                  style={styles.button}
                  onPress={handleOtpVerification}
                  mode="contained"
                  loading={isVerifyingOtp}
                  disabled={otp.length !== 4 || isVerifyingOtp}
                >
                  {isVerifyingOtp ? 'Verifying...' : 'Verify OTP'}
                </Button>
                <Text style={styles.resendText}>
                  {canResend
                    ? 'You can resend the OTP now.'
                    : `Resend OTP in ${timer} seconds`}
                </Text>
                <Button
                  style={styles.resendButton}
                  onPress={handleResendOtp}
                  disabled={!canResend}
                  mode="outlined"
                >
                  Resend OTP
                </Button>
              </>
            )}

            {step === 3 && (
              <>
                <Text category="h5" style={styles.title}>
                  Reset Password
                </Text>
                <Text appearance="hint" style={styles.description}>
                  Create a new password that you will use to log in to your
                  account.
                </Text>
                <Input
                  style={styles.input}
                  placeholder="Enter new password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  accessoryRight={() => (
                    <TouchableOpacity
                      onPress={() => setShowPassword(prev => !prev)}
                    >
                      {showPassword ? (
                        <Eye size={24} />
                      ) : (
                        <EyeClosed size={24} />
                      )}
                    </TouchableOpacity>
                  )}
                />
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={handlePasswordReset}
                  loading={isResettingPassword}
                  disabled={isResettingPassword}
                >
                  {isResettingPassword ? 'Resetting...' : 'Reset Password'}
                </Button>
              </>
            )}
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
    paddingVertical: 100,
    // justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
  },
  otpInput: {
    fontSize: 36,
    width: '80%',
    marginHorizontal: 'auto',
    minWidth: 200,
    marginBottom: 30,
  },
  button: {
    marginBottom: 10,
  },
  resendText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  resendButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
})

export default PasswordResetScreen
