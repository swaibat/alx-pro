import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  useSendOtpMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
} from '@/api'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Eye, EyeClosed } from 'phosphor-react-native'
import { useSnackbar } from '@/hooks/useSnackbar'
import { Text } from '@/components/@ui/Text'
import { Button } from '@/components/@ui/Button'
import PhoneInput from '@/components/@ui/PhoneInput'
import Divider from '@/components/@ui/Divider'
import Input from '@/components/@ui/Input'

const PasswordResetScreen = () => {
  const router = useRouter()
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

  useEffect(() => {
    let intervalId

    if (step === 2 && timer > 0) {
      intervalId = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(intervalId)
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [step, timer])

  const handleOtpRequest = async () => {
    if (!phoneNumber || !phoneValidationRegex.test(phoneNumber)) {
      triggerSnackbar('Please enter a valid phone number.', 'error')
      return
    }

    try {
      const res = await sendOtp({
        phoneNumber,
        type: 'password_reset',
      }).unwrap()
      setPhoneNumber(res.phoneNumber)
      setStep(2)
      router.push(`/forgot_password?step=2&phoneNumber=${res.phoneNumber}`)
      setTimer(30) // reset timer when OTP is requested
      setCanResend(false)
    } catch (error) {
      triggerSnackbar(
        error?.data?.message || 'Failed to send OTP. Please try again.',
        'error'
      )
    }
  }

  const handleResendOtp = async () => {
    if (!phoneNumber) return

    try {
      await sendOtp({ phoneNumber, type: 'password_reset' }).unwrap()
      triggerSnackbar('OTP has been resent successfully.', 'success')
      setTimer(30) // reset timer when OTP is resent
      setCanResend(false)
    } catch (error) {
      triggerSnackbar(
        error?.data?.message || 'Failed to send OTP. Please try again.',
        'error'
      )
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
        triggerSnackbar('Code verified successfully!', 'success')
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

  const handlePasswordReset = async () => {
    if (!password) {
      triggerSnackbar('Please enter a new password.', 'error')
      return
    }

    try {
      const response = await resetPassword({
        code: otp,
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
      triggerSnackbar(
        error?.data?.message || 'Error resetting password.',
        'error'
      )
    }
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {step === 1 && (
              <>
                <Text style={styles.title}>Enter Phone Number</Text>
                <Text secondary style={styles.description}>
                  Please enter the phone number you used to register, so we can
                  send you the OTP.
                </Text>
                <PhoneInput
                  style={styles.input}
                  placeholder="Phone Number"
                  onChangeText={setPhoneNumber}
                  testID="phoneInput"
                />
                <Button
                  style={styles.button}
                  onPress={handleOtpRequest}
                  isLoading={isSendingOtp}
                  title={'Send OTP'}
                  isDisabled={
                    !phoneNumber ||
                    !phoneValidationRegex.test(phoneNumber) ||
                    isSendingOtp
                  }
                />
              </>
            )}

            {step === 2 && (
              <>
                <Text style={styles.title}>Enter OTP Code</Text>
                <Text secondary style={styles.description}>
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
                  isDisabled={otp.length !== 4 || isVerifyingOtp}
                  isLoading={isVerifyingOtp}
                  title="Continue"
                />
                <Divider
                  type="horizontal"
                  color="gray"
                  dashed
                  align="center"
                  fontSize={14}
                  style={{ marginVertical: 15 }}
                >
                  {canResend
                    ? 'You can resend the OTP now.'
                    : `Resend OTP in ${timer} seconds`}
                </Divider>
                <Button
                  onPress={handleResendOtp}
                  isDisabled={!canResend}
                  outline
                  size="small"
                  title="Resend OTP"
                />
                <Divider
                  type="horizontal"
                  color="gray"
                  dashed
                  align="center"
                  fontSize={14}
                  style={{ marginVertical: 15 }}
                >
                  Don’t have an account?
                </Divider>
                <Button
                  onPress={() => {
                    setStep(1)
                    setPhoneNumber('')
                    setOtp('')
                  }}
                  secondary
                  title="Change Number"
                />
              </>
            )}

            {step === 3 && (
              <>
                <Text style={styles.title}>Reset Password</Text>
                <Text secondary style={styles.description}>
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
                  onPress={handlePasswordReset}
                  isLoading={isResettingPassword}
                  isDisabled={isResettingPassword || password.length < 4}
                  title="Reset Password"
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
  container: {
    flex: 1,
    paddingHorizontal: 50,
    paddingVertical: 100,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18,
  },
  description: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 14,
  },
  input: {
    marginBottom: 15,
  },
  otpInput: {
    width: 250,
    marginHorizontal: 'auto',
    marginBottom: 15,
  },
  button: {
    marginVertical: 20,
  },
})

export default PasswordResetScreen
