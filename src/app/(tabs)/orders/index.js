import React from 'react'
import { StyleSheet, FlatList, RefreshControl } from 'react-native'
import { useGetOrdersQuery } from '@/api'
import OrderCard from '@/components/orders/OrderCard'
import ordersStateLayout from '@/components/orders/states/handleStates'
import SecureRoute from '@/components/global/SecureRoute'

const OrdersScreen = () => {
  const {
    data: ordersData,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  })
  const orders = ordersData?.data || []
  const renderState = ordersStateLayout({ orders, isLoading, error, refetch })

  return (
    <SecureRoute>
      {renderState || (
        <FlatList
          data={orders}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <OrderCard key={item._id} order={item} />}
          contentContainerStyle={styles.container}
          refreshControl={<RefreshControl refreshing={isFetching} />}
        />
      )}
    </SecureRoute>
  )
}

const styles = StyleSheet.create({
  noOrdersText: {
    textAlign: 'center',
    marginTop: 20,
  },
})

export default OrdersScreen