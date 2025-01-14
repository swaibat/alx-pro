import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native'
import { Button } from '@/components/@ui/Button'
import Input from '@/components/@ui/Input'
import { House, Briefcase, Circle, Plus } from 'phosphor-react-native'
import { Text } from '@/components/@ui/Text'
import { useCreateAddressMutation } from '@/api'
import PlacesAutocomplete from '@/components/address/GoogleAutoComplete'
import { useSelector } from 'react-redux'
import { theme } from '@/constants/theme'
import Divider from '@/components/@ui/Divider'
import { useSnackbar } from '@/hooks/useSnackbar'

const CreateAddressModal = ({ refetch }) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [form, setForm] = useState({
    phoneNumber: '',
    email: '',
    name: '',
    addressName: '',
    city: '',
    region: '',
    addressLabel: 'Home',
    isDefault: true,
  })

  const user = useSelector(({ auth }) => auth.user)

  const [createAddress, { isLoading }] = useCreateAddressMutation()
  const { triggerSnackbar } = useSnackbar()

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value })
  }

  const handleCreateAddress = async () => {
    try {
      await createAddress(form).unwrap()
      refetch()
      setModalVisible(false)
    } catch (error) {
      triggerSnackbar('Error creating address')
    }
  }

  const handlePlaceSelected = info => {
    setForm({
      ...form,
      ...info,
    })
  }

  React.useEffect(() => {
    if (user) {
      setForm({
        ...form,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      })
    }
  }, [user])

  return (
    <>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Plus size={24} weight="bold" color="#fff" />
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back press (Android)
      >
        <ScrollView contentContainerStyle={styles.modalContent}>
          <View>
            <Text style={styles.createText}>Create Address</Text>
            <Text style={styles.descriptionText}>
              Your address has been pre-filled. Feel free to update.
            </Text>
          </View>
          <Divider />
          <PlacesAutocomplete onPress={handlePlaceSelected} />
          <View style={styles.checkboxRow}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                form.addressLabel === 'Home' && styles.checkboxSelected,
              ]}
              onPress={() => handleInputChange('addressLabel', 'Home')}
            >
              <House
                size={18}
                color={
                  form.addressLabel === 'Home'
                    ? theme.colors.orange[500]
                    : '#000'
                }
              />
              <Text
                style={[
                  styles.checkboxLabel,
                  styles.selected(form.addressLabel === 'Home'),
                ]}
              >
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.checkbox,
                form.addressLabel === 'Office' && styles.checkboxSelected,
              ]}
              onPress={() => handleInputChange('addressLabel', 'Office')}
            >
              <Briefcase
                size={20}
                color={
                  form.addressLabel === 'Office'
                    ? theme.colors.orange[500]
                    : '#000'
                }
              />
              <Text
                style={[
                  styles.checkboxLabel,
                  styles.selected(form.addressLabel === 'Office'),
                ]}
              >
                Office
              </Text>
            </TouchableOpacity>
          </View>

          <Input
            label="Phone Number"
            value={form.phoneNumber}
            onChangeText={value => handleInputChange('phoneNumber', value)}
            placeholder="Enter phone number"
          />

          <Input
            label="Names"
            value={form.name}
            onChangeText={value => handleInputChange('name', value)}
            placeholder="Enter full name"
          />

          <View style={styles.checkboxRow}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                form.isDefault && styles.checkboxSelected,
              ]}
              onPress={() => handleInputChange('isDefault', !form.isDefault)}
            >
              <Circle
                size={20}
                weight={form.isDefault ? 'fill' : 'regular'}
                color={form.isDefault ? theme.colors.orange[500] : '#000'}
              />
              <Text
                style={[styles.checkboxLabel, styles.selected(form.isDefault)]}
              >
                Set as Default
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              style={styles.flex1}
              isDisabled={isLoading}
              isLoading={isLoading}
              onPress={handleCreateAddress}
              title={'Submit'}
            />
          </View>

          <Button
            title="Close"
            ghost
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          />
        </ScrollView>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20, // Rounded top left corner
    borderTopRightRadius: 20, // Rounded top right corner
  },
  checkboxRow: {
    flexDirection: 'row',
    gap: 5,
    marginVertical: 10,
  },
  checkbox: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  checkboxSelected: {
    borderColor: theme.colors.orange[500],
    backgroundColor: theme.colors.orange[50],
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
  },
  selected: yes => ({
    color: yes ? theme.colors.orange[500] : '#000',
  }),
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    marginTop: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: theme.colors.orange[500],
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  createText: { fontSize: 17, fontWeight: 'bold', marginBottom: 2 },
  descriptionText: { fontSize: 12 },
  flex1: {
    flex: 1,
  },
})

export default CreateAddressModal
