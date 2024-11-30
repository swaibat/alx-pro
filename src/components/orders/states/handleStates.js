import React from 'react'
import ErrorScreen from '@/components/global/Error'
import SkeletonLoader from '@/components/orders/states/Loading'
import EmptyScreen from '@/components/orders/states/Empty'

const ordersStateLayout = ({ isLoading, orders, error, refetch }) => {
  if (error) {
    return <ErrorScreen refetch={refetch} />
  } else if (isLoading) {
    return <SkeletonLoader />
  } else if (orders?.length === 0) {
    return <EmptyScreen />
  }
}

export default ordersStateLayout
