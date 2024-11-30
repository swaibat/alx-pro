import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@/components/@ui/Text'
import { ClipboardText } from 'phosphor-react-native'
import { colors } from '@/constants/theme'

const ProductSpecifications = ({ specs = {} }) => {
  if (Object.keys(specs).length === 0) {
    return (
      <View style={styles.noSpecsContainer}>
        <ClipboardText size={30} color={colors.grey[400]} weight="light" />
        <Text style={styles.noSpecsText}>No product specs</Text>
      </View>
    )
  }

  return (
    <View style={styles.specification}>
      {Object.entries(specs).map(([key, value]) => (
        <View key={key} style={styles.row}>
          <Text style={styles.label}>{key}</Text>
          <Text style={styles.value}>{value?.toString()}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
  },
  specification: {
    borderWidth: 0.5,
    borderBottomColor: colors.grey[400],
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 0.5,
  },
  label: {
    width: 170,
    paddingHorizontal: 5,
    fontSize: 13,
    backgroundColor: colors.grey[300],
    fontWeight: '400',
    borderBottomWidth: 0.5,
    textTransform: 'capitalize',
    borderBottomColor: colors.grey[500],
  },
  value: {
    fontSize: 11,
    paddingHorizontal: 4,
    flex: 1,
    marginRight: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grey[400],
  },
  noSpecsContainer: {
    borderColor: colors.grey[400],
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    minHeight: 70,
  },
  noSpecsText: {
    fontSize: 13,
    color: colors.grey[400],
  },
})

export default ProductSpecifications
