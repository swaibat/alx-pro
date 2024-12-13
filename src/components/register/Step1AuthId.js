import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button } from '@/components/@ui/Button'
import PhoneInput from '@/components/@ui/PhoneInput'
import Input from '@/components/@ui/Input'
import { colors } from '@/constants/theme'
import { useSnackbar } from '@/hooks/useSnackbar'
import { useSendOtpMutation } from '@/api'
import { useRouter } from 'expo-router'
import { useAuthIdValidator } from '@/hooks/useAuthIdValidator'

const Step1AuthId = () => {
  const [tab, setTab] = useState('phoneNumber')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const authId = tab === 'email' ? email : phoneNumber

  const { triggerSnackbar } = useSnackbar()
  const router = useRouter()
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation()
  const isAuthIdInvalid = useAuthIdValidator()

  const handleOtpRequest = async () => {
    try {
      const response = await sendOtp({
        authId,
        type: 'register',
      }).unwrap()
      triggerSnackbar(response.message, 'success')
      router.push({
        pathname: '/register',
        params: { step: 2, authId },
      })
    } catch (error) {
      triggerSnackbar(
        error?.data?.message || 'Failed to send OTP. Please try again.',
        'error'
      )
    }
  }

  const handlePhoneNumberChange = text => {
    if (text.length <= 9) setPhoneNumber(text)
  }

  return (
    <View>
      <TabSelector tab={tab} setTab={setTab} />
      {tab === 'phoneNumber' ? (
        <PhoneForm
          phoneNumber={phoneNumber}
          onChangePhoneNumber={handlePhoneNumberChange}
        />
      ) : (
        <EmailForm email={email} onChangeEmail={setEmail} />
      )}
      <Button
        style={styles.button}
        onPress={handleOtpRequest}
        isDisabled={isAuthIdInvalid(authId) || isSendingOtp}
        isLoading={isSendingOtp}
        title="Send OTP"
      />
    </View>
  )
}

const TabSelector = ({ tab, setTab }) => (
  <View style={styles.tabContainer}>
    <TouchableOpacity
      style={tab === 'phoneNumber' ? styles.activeTab : styles.tab}
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
)

const PhoneForm = ({ phoneNumber, onChangePhoneNumber }) => (
  <View>
    <Text style={styles.title}>Enter Phone Number</Text>
    <Text style={styles.description}>
      We will send you a one-time password to your mobile number.
    </Text>
    <PhoneInput
      style={styles.input}
      placeholder="Phone Number"
      value={phoneNumber}
      onChangeText={onChangePhoneNumber}
    />
  </View>
)

const EmailForm = ({ email, onChangeEmail }) => (
  <View>
    <Text style={styles.title}>Enter Email Address</Text>
    <Text style={styles.description}>
      We will send you a one-time password to your email address.
    </Text>
    <Input
      style={styles.input}
      placeholder="Email Address"
      value={email}
      onChangeText={onChangeEmail}
      keyboardType="email-address"
    />
  </View>
)

export default Step1AuthId

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
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
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
