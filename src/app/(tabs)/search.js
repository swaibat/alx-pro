import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGetProductsQuery } from '@/api'
import { useRouter } from 'expo-router'
import RecentSearches from '@/components/search/RecentSearches'
import ShowSuggestions from '@/components/search/ShowSuggestions'
import SearchInputContainer from '@/components/search/SearchInputContainer'

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState([])
  const router = useRouter()

  const { data: productData, isLoading: productLoading } = useGetProductsQuery(
    searchQuery ? { name: searchQuery, limit: 10 } : {},
    { skip: !searchQuery }
  )

  const searchSuggestions = productData?.data?.docs || []

  useEffect(() => {
    const loadRecentSearches = async () => {
      const savedSearches = await AsyncStorage.getItem('recentSearches')
      if (savedSearches) setRecentSearches(JSON.parse(savedSearches))
    }
    loadRecentSearches()
  }, [])

  const updateRecentSearches = async newSearch => {
    if (!recentSearches.includes(newSearch)) {
      const updatedSearches = [newSearch, ...recentSearches]
      setRecentSearches(updatedSearches)
      await AsyncStorage.setItem(
        'recentSearches',
        JSON.stringify(updatedSearches)
      )
    }
  }

  const onChangeSearch = query => {
    setSearchQuery(query)
  }

  const clearSearchQuery = () => setSearchQuery('')

  const handleSearchButton = () => {
    if (searchQuery.trim()) {
      router.push({ pathname: `/ads/list`, params: { name: searchQuery } })
      updateRecentSearches(searchQuery)
    }
  }

  return (
    <View style={styles.container}>
      <SearchInputContainer
        searchQuery={searchQuery}
        onChangeSearch={onChangeSearch}
        handleSearchButton={handleSearchButton}
        productLoading={productLoading}
        clearSearchQuery={clearSearchQuery}
      />

      <ShowSuggestions
        searchSuggestions={searchSuggestions}
        updateRecentSearches={updateRecentSearches}
        searchQuery={searchQuery}
      />
      <RecentSearches
        recentSearches={recentSearches}
        setRecentSearches={setRecentSearches}
        setSearchQuery={setSearchQuery}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default SearchScreen
