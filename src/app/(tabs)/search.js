import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  View,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Clock, MagnifyingGlass, Tilde, X } from 'phosphor-react-native'
import { useGetProductsQuery } from '@/api'
import { useRouter } from 'expo-router'
import { Text } from '@/components/@ui/Text'
import Input from '@/components/@ui/Input'
import { Button } from '@/components/@ui/Button'
import { theme } from '@/constants/theme'
import RecentlyViewed from '@/components/products/RecentlyViewed'

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()

  // Fetch products based on search query, skipping the request if the query is empty
  const { data: productData, isLoading: productLoading } = useGetProductsQuery(
    searchQuery ? { name: searchQuery } : {},
    { skip: !searchQuery }
  )

  const searchSuggestions = productData?.data?.docs || []

  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const savedSearches = await AsyncStorage.getItem('recentSearches')
        if (savedSearches) {
          setRecentSearches(JSON.parse(savedSearches))
        }
      } catch (error) {
        console.error('Failed to load recent searches', error)
      }
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
    setShowSuggestions(query.trim() !== '')
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

  const highlightMatch = title => {
    if (!searchQuery) return title
    const regex = new RegExp(`(${searchQuery})`, 'gi')
    const parts = title.split(regex)
    return parts.map((part, index) =>
      regex.test(part) ? (
        <Text key={index} style={{ fontWeight: 'bold', color: '#FF6B00' }}>
          {part}
        </Text>
      ) : (
        <Text key={index}>{part}</Text>
      )
    )
  }

  const renderSearchSuggestion = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSearch(item)}
      style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}
    >
      <View
        style={{
          padding: 5,
          backgroundColor: 'gainsboro',
          marginRight: 10,
          borderRadius: 5,
        }}
      >
        <MagnifyingGlass size={15} color="gray" />
      </View>
      <View>
        <Text>{highlightMatch(item.title)}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Tilde size={15} color="gray" />
          <Text style={{ fontStyle: 'italic', fontSize: 11 }}>
            {item?.categoryName}
          </Text>
        </View>
      </View>
      {item?.files && (
        <Image
          source={{ uri: item.files[0] }}
          style={{ width: 40, height: 40, borderRadius: 5, marginLeft: 'auto' }}
        />
      )}
    </TouchableOpacity>
  )

  const renderRecentSearch = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 7,
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity onPress={() => setSearchQuery(item)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Clock size={20} color="#687076" weight="fill" />
          <Text style={{ marginLeft: 10 }}>{item}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeSearch(item)}>
        <X size={16} color="#687076" />
      </TouchableOpacity>
    </View>
  )

  const handleSearchButton = () => {
    if (searchQuery.trim()) {
      router.push({ pathname: `/ads/list`, params: { name: searchQuery } })
      updateRecentSearches(searchQuery)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingHorizontal: 18,
          paddingTop: 15,
        }}
      >
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <Input
            placeholder="Search"
            style={{ flexGrow: 1 }}
            textStyle={{ fontSize: 14 }}
            suffix={
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: theme.spacing.md,
                }}
              >
                {productLoading && (
                  <ActivityIndicator
                    size="small"
                    color="grey"
                    style={{ marginLeft: 8 }}
                  />
                )}
                {!productLoading && searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <X size={18} style={{ marginLeft: 8 }} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={{
                    margin: 'auto',
                    backgroundColor: 'black',
                    paddingVertical: theme.spacing.sm,
                    paddingHorizontal: theme.spacing.md,
                    borderRadius: theme.borderRadius.sm,
                    marginRight: -3,
                  }}
                  onPress={handleSearchButton}
                >
                  <Text style={{ color: '#FFFFFF', marginTop: -2 }}>
                    Search
                  </Text>
                </TouchableOpacity>
              </View>
            }
            value={searchQuery}
            onChangeText={onChangeSearch}
          />
        </View>
      </View>

      {/* Show suggestions if search query is present */}
      {showSuggestions && searchSuggestions.length > 0 && (
        <FlatList
          data={searchSuggestions}
          keyExtractor={item => item._id?.toString()}
          renderItem={renderSearchSuggestion}
          style={{
            marginBottom: 20,
            backgroundColor: 'white',
            borderRadius: 8,
            minHeight: 250,
            padding: 10,
          }}
        />
      )}

      {recentSearches.length > 0 && (
        <View style={{ paddingVertical: 16 }}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 3,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              fontWeight="medium"
              style={{ textTransform: 'uppercase', fontSize: 12 }}
            >
              Recent Searches
            </Text>
            <Button
              title="Clear All"
              outline
              size="tiny"
              onPress={clearAllRecentSearches}
            />
          </View>

          <FlatList
            data={recentSearches}
            keyExtractor={item => item}
            renderItem={renderRecentSearch}
            style={{
              marginBottom: 20,
              minHeight: 100,
            }}
          />
        </View>
      )}

      <RecentlyViewed showAll />
    </SafeAreaView>
  )
}

export default SearchScreen
