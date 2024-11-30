import React from 'react'
import ErrorScreen from '@/components/global/Error'
import SkeletonLoader from '@/components/products/states/Loading'
import EmptyScreen from '@/components/products/states/Empty'

const productsStateLayout = ({ isLoading, data, error, refetch }) => {
  if (error) {
    return <ErrorScreen refetch={refetch} />
  } else if (isLoading) {
    return <SkeletonLoader />
  } else if (data?.data?.docs?.length === 0) {
    return <EmptyScreen />
  }
}

export default productsStateLayout
