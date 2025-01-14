import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Input from '@/components/@ui/Input'
import { colors } from '@/constants/theme'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useSendOtpMutation, useVerifyOtpMutation } from '@/api'
import { Button } from '../@ui/Button'
import { useRouter } from 'expo-router'
import { useTimer } from '@/hooks/useTimer'

const OtpVerification = ({ step, authId }) => {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [sendOtp] = useSendOtpMutation()
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation()
  const { triggerSnackbar } = useSnackbar()
  const { time: timer, isRunning, startTimer } = useTimer(30)

  const handleResendOtp = async () => {
    if (!isRunning) {
      await handleOtpRequest()
    }
  }

  const handleChangeOtp = text => {
    if (text.length <= 4) {
      setOtp(text)
    }
  }

  const handleWrongNumber = () => {
    // setStep(1)
    router.replace('/register?step=1')
  }

  useEffect(() => {
    let intervalId
    if (step == 2) {
      intervalId = startTimer()
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [step])

  const handleOtpRequest = async () => {
    try {
      const res = await sendOtp({
        authId,
        type: 'register',
      }).unwrap()
      triggerSnackbar(res.message, 'success')
      router.push(`/register?step=2&authId=${authId}`)
      startTimer()
    } catch (error) {
      triggerSnackbar(
        error?.data?.message || 'Failed to send OTP. Please try again.',
        'error'
      )
    }
  }

  const handleOtpVerification = async () => {
    if (otp?.length !== 4) {
      triggerSnackbar('Please enter a valid 4-digit OTP', 'error')
      return
    }
    try {
      const response = await verifyOtp({
        authId,
        code: otp,
      }).unwrap()
      if (response.status === 200) {
        router.push({
          pathname: '/register',
          params: { step: 3, authId, name: response?.data?.names },
        })
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

  return (
    <>
      <Text category="h5" style={styles.title} testID="otpTitle">
        Enter OTP Code
      </Text>
      <Text style={styles.description} testID="otpDescription">
        We have sent a verification code to {authId}.
      </Text>
      <Input
        style={styles.otpInput}
        textStyle={styles.otpTextStyle}
        size="large"
        onChangeText={handleChangeOtp}
        keyboardType="numeric"
        maxLength={4}
        textAlign="center"
        placeholder="XXXX"
      />
      <View style={styles.resendContainer}>
        <Text style={styles.description} testID="resendOtpText">
          Didn’t receive the OTP?
        </Text>
        <TouchableOpacity onPress={handleResendOtp}>
          <Text style={!isRunning ? styles.resendText : styles.resendDisabled}>
            {!isRunning ? ' Resend' : ` 00:${timer}`}
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Verify OTP"
        onPress={handleOtpVerification}
        isLoading={isVerifyingOtp}
        isDisabled={otp.length !== 4 || isVerifyingOtp}
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
  )
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  otpInput: {
    marginBottom: 10,
  },
  otpTextStyle: {
    fontSize: 45,
    textAlign: 'center',
    width: '100%',
    letterSpacing: 20,
  },
  resendText: {
    color: colors.orange[300],
  },
  resendDisabled: {
    color: 'gray',
  },
  wrongNumberContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 'auto',
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
})

export default OtpVerification
