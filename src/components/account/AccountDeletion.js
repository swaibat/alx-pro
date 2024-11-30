import React, { useState } from 'react'
import { Modal, View, Image, StyleSheet } from 'react-native'
import { Text } from '@/components/@ui/Text'
import { Button } from '@/components/@ui/Button'
import Input from '@/components/@ui/Input'
import { useSnackbar } from '@/hooks/useSnackbar'

const AccountDeletion = ({ user, isModalVisible, closeModal }) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false)
  const { triggerSnackbar } = useSnackbar()

  const phoneValidationRegex = /^(75|74|70|78|77|76|3|2)\d{7}$/ // Updated phone number validation regex

  const validatePhoneNumber = phone => {
    return phoneValidationRegex.test(phone) // Validate using the provided regex
  }

  const handlePhoneNumberChange = text => {
    setPhoneNumber(text)
    setIsPhoneNumberValid(validatePhoneNumber(text)) // Validate phone number as the user types
  }

  const confirmDeletion = () => {
    if (phoneNumber === user?.phoneNumber?.split('+256')[1]) {
      closeModal()
      triggerSnackbar('Account deleted successfully.')
    } else {
      triggerSnackbar('Phone number does not match.', 'error')
    }
  }

  // Disabling the confirm button if the phone number is invalid
  const isButtonDisabled = !isPhoneNumberValid || phoneNumber === ''

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
      onBackdropPress={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Account Deletion</Text>
          <Text style={styles.modalText}>
            Please enter your <Text bold>Phone Number</Text> to confirm account
            deletion.
          </Text>
          <Input
            style={styles.phoneInput}
            prefix={
              <View style={{ flexDirection: 'row', gap: 5, width: 40 }}>
                <View style={{ height: 20, width: 30, alignItems: 'center' }}>
                  <Image
                    source={require('@/assets/images/ug_flag.png')}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
                <Text bold style={{ fontSize: 15, marginTop: -2 }}>
                  +256
                </Text>
              </View>
            }
            placeholder="Enter phone number"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
          />
          <View style={{ width: '100%', gap: 10 }}>
            <Button
              title="Confirm Deletion"
              color="#D9534F"
              style={{ width: '100%' }}
              onPress={confirmDeletion}
              isDisabled={isButtonDisabled} // Disable button based on phone number validation
            />
            <Button
              title="Cancel"
              style={{ width: '100%' }}
              ghost
              onPress={closeModal}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D9534F',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  phoneInput: {
    marginBottom: 20,
    width: '100%',
  },
})

export default AccountDeletion
