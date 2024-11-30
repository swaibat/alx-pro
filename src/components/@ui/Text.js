import React, { useMemo } from 'react'
import { Text as RNText, StyleSheet } from 'react-native'
import { colors } from '@/constants/theme'

export const Text = ({
  style,
  fontWeight = 'normal',
  ellipsis = false,
  secondary,
  success,
  primary,
  warning,
  danger,
  disabled,
  mark,
  underline,
  delete: del,
  bold,
  italic,
  ...rest
}) => {
  const dynamicStyle = useMemo(() => {
    const baseStyle = {
      fontSize: 14,
      fontWeight,
      color: colors?.text,
    }

    const conditionalStyles = {
      ...(primary && { color: colors.orange[500] }),
      ...(secondary && { color: '#6e7a7f' }),
      ...(success && { color: colors.success[500] }),
      ...(warning && { color: '#faad14' }),
      ...(danger && { color: '#f5222d' }),
      ...(disabled && { color: '#d9d9d9' }),
      ...(mark && { backgroundColor: '#ffe58f' }),
      ...(underline && { textDecorationLine: 'underline' }),
      ...(del && { textDecorationLine: 'line-through' }),
      ...(bold && { fontWeight: 'bold' }),
    }

    return StyleSheet.flatten([baseStyle, conditionalStyles])
  }, [
    colors?.text,
    fontWeight,
    primary,
    secondary,
    success,
    warning,
    danger,
    disabled,
    mark,
    underline,
    del,
    bold,
    italic,
  ])

  return (
    <RNText
      style={[dynamicStyle, style]} // Apply styles directly without fontWeight
      numberOfLines={ellipsis ? 1 : undefined}
      ellipsizeMode={ellipsis ? 'tail' : undefined}
      {...rest}
    />
  )
}
