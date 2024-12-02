import React, { useEffect } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { colors } from '@/constants/theme'
import { useGetShippingByRegionQuery } from '@/api'
import ShippingOptionItem from './ShippingOptionItem'

const ShippingOptions = ({
  address,
  selectedShipping,
  setSelectedShipping,
}) => {
  const { data, isLoading } = useGetShippingByRegionQuery(
    { region: address?.state?.split(' ')?.[0]?.toLowerCase() },
    { skip: !address?._id }
  )

  useEffect(() => {
    if (data?.data && !selectedShipping) {
      setSelectedShipping(data?.data[0])
    }
  }, [data, selectedShipping, setSelectedShipping])

  const handleSelectOption = option => {
    setSelectedShipping(option)
  }

  console.log(data?.data)

  return (
    <FlatList
      data={data?.data}
      keyExtractor={item => item._id}
      renderItem={({ item: options }) => (
        <ShippingOptionItem
          option={options}
          selectedShipping={selectedShipping}
          onSelect={handleSelectOption}
        />
      )}
      contentContainerStyle={styles.listContent}
      ListFooterComponent={
        isLoading && (
          <View style={styles.loadingFooter}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )
      }
    />
  )
}

const styles = StyleSheet.create({
  listContent: {
    gap: 15,
  },
  loadingFooter: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderStyle: 'dashed',
    borderWidth: 0.8,
    borderColor: colors.borderColor,
  },
})

export default ShippingOptions
