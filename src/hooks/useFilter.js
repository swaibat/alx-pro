import { useState, useCallback } from 'react'

const useFilter = (initialFilter = {}) => {
  const [filter, setFilter] = useState(initialFilter)
  const [selectedFilter, setSelectedFilter] = useState({
    discount: null,
    minPrice: '',
    maxPrice: '',
    shipping: null,
    rating: null,
  })

  const applyFilter = useCallback(() => {
    const filters = {}
    if (selectedFilter.discount) {
      filters.discount = selectedFilter.discount
    }
    if (selectedFilter.minPrice) {
      filters.minPrice = parseFloat(selectedFilter.minPrice)
    }
    if (selectedFilter.maxPrice) {
      filters.maxPrice = parseFloat(selectedFilter.maxPrice)
    }
    if (selectedFilter.shipping) {
      filters.shipping = selectedFilter.shipping
    }
    if (selectedFilter.rating) {
      filters.rating = selectedFilter.rating
    }

    setFilter(filters)
  }, [selectedFilter])

  const resetFilter = () => {
    setFilter({})
    setSelectedFilter({
      discount: null,
      minPrice: '',
      maxPrice: '',
      shipping: null,
      rating: null,
    })
  }

  return {
    filter,
    selectedFilter,
    setSelectedFilter,
    applyFilter,
    resetFilter,
  }
}

export default useFilter
