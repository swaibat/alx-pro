import React from 'react'
import { StyleSheet, View, Dimensions, FlatList } from 'react-native'
import { useGetAddressQuery } from '@/api'
import { useLocalSearchParams, useRouter } from 'expo-router'
import AddressItem from '@/components/address/AddressItem'
import SecureRoute from '@/components/global/SecureRoute'
import { FlashList } from '@shopify/flash-list'
import { colors, theme } from '@/constants/theme'
import { Button } from '@/components/@ui/Button'
import { ActivityIndicator } from 'react-native'
import EmptyAddressScreen from '@/components/address/states/Empty'
import { Text } from '@/components/@ui/Text'
import { RefreshControl } from 'react-native'
import CreateAddressModal from '@/components/address/CreateAddressModal'

const screenHeight = Dimensions.get('window').height
const adjustedHeight = screenHeight - 250

const AddressComponent = () => {
  const { data, isLoading, refetch, isFetching } = useGetAddressQuery()
  const { edit } = useLocalSearchParams()
  const router = useRouter()

  return (
    <SecureRoute>
      <View style={styles.container}>
        <FlatList
          data={data?.data}
          renderItem={({ item }) => (
            <AddressItem
              address={item}
              isFetching={isFetching}
              refetch={refetch}
              renderSelectComponent={
                !isLoading &&
                data?.data?.length &&
                edit && (
                  <Button
                    isDisabled={item.isDefault}
                    size="small"
                    onPress={() => router.push('/checkout')}
                    title="Select"
                  />
                )
              }
            />
          )}
          estimatedItemSize={100}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={!isLoading && <EmptyAddressScreen />}
          refreshControl={
            <RefreshControl refreshing={!isLoading && isFetching} />
          }
          ListFooterComponent={
            isLoading && (
              <View style={styles.footer}>
                <ActivityIndicator size="small" color={colors.orange[500]} />
                <Text style={styles.loadingText}>Loading addresses...</Text>
              </View>
            )
          }
        />
      </View>
      <CreateAddressModal refetch={refetch} />
    </SecureRoute>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingBottom: 16,
    gap: 15,
  },
  footer: {
    justifyContent: 'center',
    height: adjustedHeight,
    paddingVertical: 16,
  },
  loadingText: {
    marginTop: 8,
    color: theme.colors.grey[900],
    textAlign: 'center',
    fontSize: 14,
  },
})

export default AddressComponent
