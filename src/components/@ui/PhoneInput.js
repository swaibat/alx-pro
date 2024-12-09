import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Keyboard } from 'react-native'
import { Text } from '@/components/@ui/Text'
import Input from './Input'
import AppImg from './AppImg'

const PhoneInput = ({
  label,
  value,
  onChangeText,
  style,
  placeholder,
  dismissIfValid,
}) => {
  const [inputValue, setInputValue] = useState(value || '')

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
    setInputValue(text)
    if (onChangeText) {
      onChangeText(text)
    }
    if (dismissIfValid && isPhoneNumberValid(text)) {
      Keyboard.dismiss()
    }
  }

  return (
    <View style={styles.container}>
      {label && (
        <Text bold style={styles.label}>
          {label}
        </Text>
      )}
      <Input
        style={style}
        prefix={
          <View style={styles.prefixContainer}>
            <View style={styles.flagContainer}>
              <AppImg
                src={require('@/assets/images/ug_flag.png')}
                resizeMode="cover"
                style={styles.flagImage}
              />
            </View>
            <Text bold style={styles.countryCode}>
              +256
            </Text>
          </View>
        }
        placeholder={placeholder}
        value={inputValue}
        textStyle={styles.inputText}
        onChangeText={handleChange}
        keyboardType="phone-pad"
      />
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
    gap: 5,
    width: 45,
  },
  flagContainer: {
    height: 20,
    width: 30,
    alignItems: 'center',
  },
  flagImage: {
    width: '100%',
    height: '100%',
  },
  countryCode: {
    fontSize: 14,
    marginTop: -2,
  },
  inputText: {
    fontSize: 14,
  },
})

export default PhoneInput
