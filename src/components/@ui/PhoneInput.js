import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import countries from '@/assets/countries.json'
import useLocationData from '@/hooks/useLocationData'
import { Keyboard } from 'react-native'
import Input from './Input'
import { CaretDown } from 'phosphor-react-native'
import { colors } from '@/constants/theme'

const PhoneInput = ({
  label,
  value,
  onChangeText,
  style,
  placeholder,
  dismissIfValid,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value || '')
  const [currentCountry, setCurrentCountry] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const localeData = useLocationData()

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value)
    }
  }, [value])

  const isPhoneNumberValid = phone => {
    const phoneRegex = /^(75|74|70|78|77|76|3|2)\d{7}$/
    return phoneRegex.test(phone)
  }

  const handleChange = text => {
    let formattedText = text.startsWith('+') ? text : '+' + text

    formattedText = formattedText.replace(/[^+\d]/g, '')

    setInputValue(formattedText)

    if (onChangeText) {
      onChangeText(formattedText)
    }

    if (dismissIfValid && isPhoneNumberValid(formattedText)) {
      Keyboard.dismiss()
    }
  }

  const toggleModal = () => setModalVisible(!isModalVisible)

  const handleCountrySelect = country => {
    setCurrentCountry(country)
    setInputValue(country.dial_code)
    toggleModal()
  }

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <View style={styles.container}>
      {label && (
        <Text bold style={styles.label}>
          {label}
        </Text>
      )}
      <Input
        style={style}
        {...props}
        prefix={
          <TouchableOpacity
            onPress={toggleModal}
            style={styles.prefixContainer}
          >
            <Text style={styles.emoji}>
              {currentCountry?.emoji || localeData?.emoji}
            </Text>
            <CaretDown size={15} weight="fill" />
          </TouchableOpacity>
        }
        placeholder={placeholder}
        value={inputValue ? inputValue : localeData?.dial_code}
        textStyle={styles.inputText}
        onChangeText={handleChange}
        keyboardType="phone-pad"
      />

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Input
            style={styles.searchInput}
            placeholder="Search country"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FlatList
            data={filteredCountries}
            keyExtractor={item => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.countryItem}
                onPress={() => handleCountrySelect(item)}
              >
                <Text style={styles.countryText}>
                  {item.emoji} {item.name} ({item.dial_code})
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
  },
  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 45,
  },
  emoji: {
    fontSize: 18,
    marginTop: -3,
    marginRight: 3,
  },
  inputText: {
    fontSize: 15,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },

  countryItem: {
    paddingVertical: 7,
    borderBottomWidth: 0.7,
    borderBottomColor: colors.grey[300],
  },
  countryText: {
    fontSize: 14,
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: colors.orange[500],
  },
})

export default PhoneInput
