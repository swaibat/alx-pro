import React, { useState } from 'react'
import PaymentOption from '@/components/PaymentOptions'
import { View, Keyboard, Text, StyleSheet, StatusBar } from 'react-native'
import { Layout, Input, useTheme } from '@ui-kitten/components'
import { Phone, CheckCircle, Question } from 'phosphor-react-native' // Import CheckCircle and Question icons
import DraggableButton from '@/components/ConfirmRepay'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Appbar } from 'react-native-paper'

const PaymentOptions = () => {
  const [selected, setSelected] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const theme = useTheme()
  const router = useRouter()
  const { amount, orderId } = useLocalSearchParams()

  // Phone number validation
  const validNum = v => v.match(/^(?:0)?(?:75|74|70|78|77|76|3|2)\d{7}$/)

  const handleChange = val => {
    setPhoneNumber(val)

    // Exclude leading '0' and handle AIRTEL/MTN selection
    const phoneWithoutZero = val.startsWith('0') ? val.slice(1) : val

    if (phoneWithoutZero.match(/^(75|74|70|2)/)) {
      setSelected('AIRTEL')
    }
    if (phoneWithoutZero.match(/^(78|77|76|3)/)) {
      setSelected('MTN')
    }

    if (validNum(phoneWithoutZero)) {
      Keyboard.dismiss()
    }
  }

  const isPhoneNumberValid = validNum(phoneNumber)

  const renderPhoneAccessoryRight = () =>
    isPhoneNumberValid ? (
      <CheckCircle size={20} weight="fill" color={theme['color-success-500']} /> // Check icon for valid phone number
    ) : (
      <Question size={20} weight="fill" color={theme['color-basic-600']} /> // Question mark for invalid number
    )

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Appbar.Header
        dark={true}
        mode="small"
        elevated
        style={{ paddingRight: 15, backgroundColor: '#0C2233' }}
      >
        <Appbar.BackAction onPress={() => router.push('checkout')} />
        <Appbar.Content title="Payments" />
        <View style={styles.contactContainer}>
          <Phone
            size={24}
            color={'#ffffff'}
            onPress={() => {
              // Implement the functionality to contact support
              console.log('Contact Support: +256123456789')
            }}
          />
          <Text style={styles.contactText}>0200922167</Text>
        </View>
      </Appbar.Header>
      <Layout style={{ flex: 1, paddingHorizontal: 20 }}>
        <View>
          <View
            style={{
              height: 100,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme['color-basic-300'],
              borderWidth: 1,
              borderColor: theme['color-basic-500'],
              flexDirection: 'row',
              borderRadius: 3,
              marginVertical: 15,
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: theme['color-primary-default'],
                textAlign: 'center',
                fontWeight: '600',
                marginRight: 2,
              }}
            >
              {Number(amount).toLocaleString()} /-
            </Text>
          </View>

          <View style={{ width: '100%', marginVertical: 5 }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '100%',
              }}
            >
              <PaymentOption type="MTN" selected={selected === 'MTN'} />
              <PaymentOption type="AIRTEL" selected={selected === 'AIRTEL'} />
            </View>
          </View>
        </View>

        <View style={{ marginVertical: 20 }}>
          <Input
            label="Enter your Phone Number"
            onChangeText={handleChange}
            keyboardType="phone-pad"
            placeholder="7## ### ###"
            accessoryLeft={() => (
              <Text
                style={{
                  fontWeight: 'bold',
                  backgroundColor: 'gainsboro',
                  padding: 5,
                  paddingHorizontal: 15,
                  borderEndStartRadius: 15,
                }}
              >
                +256
              </Text>
            )}
            accessoryRight={renderPhoneAccessoryRight}
          />
        </View>

        <View style={{ marginBottom: 30 }}>
          <DraggableButton
            onSlideConfirmed={() =>
              router.push({
                pathname: 'processing',
                params: {
                  orderId,
                  amount: amount,
                  msisdn: phoneNumber,
                },
              })
            }
            disabled={!isPhoneNumberValid}
          />
        </View>
      </Layout>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    // padding: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F7F9FC',
    borderTopWidth: 1,
    borderColor: '#E4E9F2',
  },
  totalPrice: {
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginLeft: 16,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#ffffff',
  },
})

export default PaymentOptions
