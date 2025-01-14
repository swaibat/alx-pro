import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import PaymentOptionItem from './PaymentOptionItem'

const PaymentOptions = ({ options, selectedOption, setPaymentOption }) => {
  const handleSelectOption = option => {
    setPaymentOption(option)
  }

  return (
    <FlatList
      data={options}
      keyExtractor={item => item._id}
      renderItem={({ item: option }) => (
        <PaymentOptionItem
          option={option}
          selectedOption={selectedOption}
          onSelect={handleSelectOption}
        />
      )}
      contentContainerStyle={styles.listContent}
    />
  )
}

const styles = StyleSheet.create({
  listContent: {
    gap: 15,
  },
})

export default PaymentOptions
