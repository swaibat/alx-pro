import React, { useState, useRef } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { X, IconContext, Eye, EyeClosed } from 'phosphor-react-native'
import { Text } from '@/components/@ui/Text'
import { colors } from '@/constants/theme'
import { theme } from '@/constants/theme'

const Input = ({
  label,
  placeholder,
  prefix,
  suffix,
  onChangeText = () => {},
  value = '',
  clearable = false,
  style,
  onFocus = () => {},
  onBlur = () => {},
  secureTextEntry = false,
  maxLength,
  keyboardType,
  size = 'medium',
  textStyle,
  ...props
}) => {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [secureText, setSecureText] = useState(secureTextEntry)

  const handleFocus = () => {
    setIsFocused(true)
    onFocus()
  }

  const handleBlur = () => {
    setIsFocused(false)
    onBlur()
  }

  const clear = () => {
    onChangeText('')
  }

  const renderSuffix = () => {
    if (clearable && value) {
      return (
        <TouchableOpacity onPress={clear} style={styles.clearIcon}>
          <X size={20} color="#aaa" />
        </TouchableOpacity>
      )
    }
    if (secureTextEntry) {
      return (
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          {secureText ? <EyeClosed size={20} /> : <Eye size={20} />}
        </TouchableOpacity>
      )
    }
    return suffix ? (
      <IconContext.Provider value={{ size: 24, color: theme.colors.grey[400] }}>
        <View style={styles.suffix}>{suffix}</View>
      </IconContext.Provider>
    ) : null
  }

  return (
    <View style={[{ marginVertical: 7 }, style]}>
      {label && (
        <Text bold style={styles.label}>
          {label}
        </Text>
      )}

      <View
        style={[styles.container, style, isFocused && styles.focusedContainer]}
      >
        {prefix && (
          <IconContext.Provider
            value={{ size: 24, color: isFocused ? '#6200ea' : '#aaa' }}
          >
            <View style={styles.prefix}>{prefix}</View>
          </IconContext.Provider>
        )}

        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            prefix && { paddingLeft: 40 },
            (suffix || (clearable && value)) && { paddingRight: 40 },
            styles.mediumInput,
            size === 'large' && styles.largeInput,
            size === 'small' && styles.smallInput,
            textStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.grey[500]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureText}
          maxLength={maxLength}
          keyboardType={keyboardType}
          {...props}
        />

        {renderSuffix()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.9,
    borderColor: '#ced4da',
    borderRadius: 4,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(247, 249, 252)',
  },
  focusedContainer: {
    borderColor: colors.orange[200],
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    backgroundColor: 'rgba(0, 0, 0, 0.00)',
    outlineWidth: 0,
    border: 0,
  },
  mediumInput: {
    fontSize: 14,
    // letterSpacing: 20,
    // textAlign: 'center',
  },
  largeInput: {
    fontSize: 40,
    letterSpacing: 20,
    textAlign: 'center',
  },
  smallInput: {
    fontSize: 12, // Decreased font size for smaller input
    paddingVertical: 5, // Reduced padding for compact size
    paddingHorizontal: 10, // Reduced horizontal padding
  },
  prefix: {
    // position styling as needed
    marginBottom: -2,
  },
  suffix: {
    // position styling as needed
  },
  clearIcon: {
    position: 'absolute',
    right: 10,
  },
})

export default Input
