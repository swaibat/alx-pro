import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGetProductsQuery } from '@/api'
import { useRouter } from 'expo-router'
import RecentlyViewed from '@/components/products/RecentlyViewed'
import { Text } from '@/components/@ui/Text'
import RecentSearches from '@/components/search/RecentSearches'
import ShowSuggestions from '@/components/search/ShowSuggestions'
import SearchInputContainer from '@/components/search/SearchInputContainer'

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()

  const { data: productData, isLoading: productLoading } = useGetProductsQuery(
    searchQuery ? { name: searchQuery } : {},
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

  const handleSearch = item => {
    setSearchQuery(item.title)
    setShowSuggestions(false)
    updateRecentSearches(item.title)
  }

  const removeSearch = async item => {
    const updatedSearches = recentSearches.filter(search => search !== item)
    setRecentSearches(updatedSearches)
    await AsyncStorage.setItem(
      'recentSearches',
      JSON.stringify(updatedSearches)
    )
  }

  const clearAllRecentSearches = async () => {
    setRecentSearches([])
    await AsyncStorage.removeItem('recentSearches')
  }

  const onChangeSearch = query => {
    setSearchQuery(query)
    setShowSuggestions(query.trim() !== '')
  }

  const clearSearchQuery = () => setSearchQuery('')

  const handleSearchButton = () => {
    if (searchQuery.trim()) {
      router.push({ pathname: `/ads/list`, params: { name: searchQuery } })
      updateRecentSearches(searchQuery)
    }
  }

  const highlightMatch = title => {
    if (!searchQuery) return title
    const regex = new RegExp(`(${searchQuery})`, 'gi')
    const parts = title.split(regex)
    return parts.map((part, index) =>
      regex.test(part) ? (
        <Text key={index} style={styles.highlight}>
          {part}
        </Text>
      ) : (
        <Text key={index}>{part}</Text>
      )
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchInputContainer
        searchQuery={searchQuery}
        onChangeSearch={onChangeSearch}
        handleSearchButton={handleSearchButton}
        productLoading={productLoading}
        clearSearchQuery={clearSearchQuery}
      />
      {showSuggestions && searchSuggestions.length > 0 && (
        <ShowSuggestions
          searchSuggestions={searchSuggestions}
          handleSearch={handleSearch}
          highlightMatch={highlightMatch}
        />
      )}
      {recentSearches.length > 0 && (
        <RecentSearches
          recentSearches={recentSearches}
          setSearchQuery={setSearchQuery}
          removeSearch={removeSearch}
          clearAllRecentSearches={clearAllRecentSearches}
        />
      )}
      <RecentlyViewed showAll />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#FF6B00',
  },
})

export default SearchScreen
