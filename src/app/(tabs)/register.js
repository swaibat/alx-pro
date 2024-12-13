import React from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  View,
} from 'react-native'
import LoginIllustration from '@/assets/LoginIllustration'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Text } from '@/components/@ui/Text'
import { colors } from '@/constants/theme'
import TopNav from '@/components/@ui/TopNav'
import Registration from '@/components/register/Registration'
import Step1AuthId from '@/components/register/Step1AuthId'
import OtpVerification from '@/components/register/OtpVerification'
import { Platform } from 'react-native'

const OtpRegisterScreen = () => {
  const router = useRouter()
  const { step = 1, authId, name } = useLocalSearchParams()

  return (
    <>
      <TopNav />
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <LoginIllustration />
              {step == 1 && <Step1AuthId />}
              {step == 2 && <OtpVerification authId={authId} />}
              {step == 3 && <Registration name={name} authId={authId} />}
              <Text style={styles.accountStatusWrapper}>
                Have an account?
                <TouchableOpacity onPress={() => router.push('/login')}>
                  <Text style={styles.accountStatus}>Login</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    marginTop: 50,
    width: '85%',
    maxWidth: 400,
  },
  accountStatusWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: 15,
  },
  accountStatus: {
    color: colors.orange[300],
    textDecorationLine: 'underline',
    marginBottom: -5,
    marginLeft: 5,
  },
})

export default OtpRegisterScreen
