import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useGetOrderDetailsQuery } from '@/api'
import AddressItem from '@/components/address/AddressItem'
import SecureRoute from '@/components/global/SecureRoute'
import StatusBadge from '@/components/orders/StatusBadge'
import ReviewModal from '@/components/orders/ReviewModal'
import Loading from '@/components/global/Loading'
import Section from '@/components/@ui/Section'
import ShippingOptionItem from '@/components/checkout/ShippingOptionItem'
import ActivitySection from '@/components/orders/ActivitySection'
import OrderItemsList from '@/components/orders/OrderItems'
import OrderSummary from '@/components/orders/OrderSummary'
import ErrorScreen from '@/components/global/Error'

const OrderDetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const { data, isLoading, isFetching, refetch, isError } =
    useGetOrderDetailsQuery({ id })
  const order = data?.order || {}

  if (isLoading || isFetching) return <Loading text="Loading details ... " />
  if (isError) return <ErrorScreen refetch={refetch} />

  return (
    <SecureRoute>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Section
          title="Activity"
          borderTop
          actionBtn={<StatusBadge type={order.status} />}
        >
          <OrderSummary order={order} />
        </Section>
        <Section title="Address">
          <AddressItem address={order.address} viewOnly={true} />
        </Section>
        <Section title="Items">
          <OrderItemsList items={order.items} />
        </Section>
        <Section title="Shipping Method">
          <ShippingOptionItem option={order.shippingOption} />
        </Section>
        <Section title="Activity">
          <ActivitySection activities={order.activity} />
        </Section>
      </ScrollView>
      <ReviewModal order={order} />
    </SecureRoute>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default OrderDetailsScreen
