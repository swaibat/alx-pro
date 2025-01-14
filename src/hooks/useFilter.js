import { useState, useEffect, useRef } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router'

const ITEMS_PER_PAGE = 50

const useFilter = (isLoading, isSuccess, data, isFetching) => {
  const router = useRouter()
  const params = useLocalSearchParams()
  const [visible, setFilterModalVisible] = useState(false)
  const [filterState, setFilterState] = useState({
    discount: 'All',
    minPrice: '',
    maxPrice: '',
    shipping: 'All',
    rating: 'All',
    isLocalStore: 'All',
  })

  const prevDataRef = useRef(data)

  const toggleFilterModal = () => setFilterModalVisible(!visible)

  const handleDiscountSelect = label => {
    setFilterState(prev => ({ ...prev, discount: label }))
  }

  const handleLocalStoreSelect = label => {
    setFilterState(prev => ({ ...prev, isLocalStore: label }))
  }

  const handlePriceChange = (type, value) => {
    setFilterState(prev => ({ ...prev, [type]: value }))
  }

  const handleShippingSelect = selectedShipping => {
    setFilterState(prev => ({ ...prev, shipping: selectedShipping }))
  }

  const handleRatingSelect = selectedRating => {
    setFilterState(prev => ({ ...prev, rating: selectedRating }))
  }

  const hasFilters = () => {
    return (
      filterState.discount !== 'All' ||
      filterState.minPrice ||
      filterState.maxPrice ||
      filterState.shipping !== 'All' ||
      filterState.rating !== 'All' ||
      filterState.isLocalStore !== 'All'
    )
  }

  useEffect(() => {
    if (isSuccess && visible && prevDataRef.current !== data && hasFilters()) {
      toggleFilterModal()
    }
    prevDataRef.current = data
  }, [data, isSuccess, visible, filterState])

  const applyFilter = () => {
    const paramsData = {
      ...params,
      ...filterState,
      limit: ITEMS_PER_PAGE,
    }
    Object.keys(paramsData).forEach(key => {
      if (!paramsData[key] || paramsData[key] === 'All') {
        delete paramsData[key]
      }
    })
    router.push({
      pathname: 'ads/list',
      params: paramsData,
    })
  }

  const handleClearFilters = () => {
    const filterKeys = [
      'discount',
      'minPrice',
      'maxPrice',
      'shipping',
      'rating',
      'isLocalStore',
    ]
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([key]) => !filterKeys.includes(key))
    )

    setFilterState({
      discount: 'All',
      minPrice: '',
      maxPrice: '',
      shipping: 'All',
      rating: null,
      isLocalStore: 'All',
    })
    router.push({ pathname: 'ads/list', params: filteredParams })
  }

  return {
    visible,
    setFilterModalVisible,
    filterState,
    toggleFilterModal,
    handleDiscountSelect,
    handleLocalStoreSelect,
    handlePriceChange,
    handleShippingSelect,
    handleRatingSelect,
    applyFilter,
    handleClearFilters,
    hasFilters,
    isLoading,
    isFetching,
  }
}

export default useFilter
