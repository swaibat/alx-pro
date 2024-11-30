import React from 'react'
import ErrorScreen from '@/components/global/Error'
import CategorySkeletonLoader from '@/components/categories/states/Loading'
import EmptyCategoryScreen from '@/components/categories/states/Empty'

const renderCategoryStateLayout = ({ isLoading, data, error, refetch }) => {
  if (error) {
    return <ErrorScreen refetch={refetch} />
  } else if (isLoading) {
    return <CategorySkeletonLoader />
  } else if (data?.data?.length === 0) {
    return <EmptyCategoryScreen />
  }
}

export default renderCategoryStateLayout
