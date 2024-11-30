import React, { useState, useEffect } from 'react'
import { View, Image, Keyboard } from 'react-native'
import { Text } from '@/components/@ui/Text'
import Input from './Input'

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
    <View style={{ width: '100%' }}>
      {label && (
        <Text bold style={{ fontSize: 14 }}>
          {label}
        </Text>
      )}
      <Input
        style={style}
        prefix={
          <View style={{ flexDirection: 'row', gap: 5, width: 45 }}>
            <View style={{ height: 20, width: 30, alignItems: 'center' }}>
              <Image
                source={require('@/assets/images/ug_flag.png')}
                resizeMode="cover"
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            <Text bold style={{ fontSize: 14, marginTop: -2 }}>
              +256
            </Text>
          </View>
        }
        placeholder={placeholder}
        value={inputValue}
        textStyle={{ fontSize: 14 }}
        onChangeText={handleChange}
        keyboardType="phone-pad"
      />
    </View>
  )
}

export default PhoneInput
