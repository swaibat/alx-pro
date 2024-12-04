import React from 'react'
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from '@/components/@ui/Text'
import { Clock, X } from 'phosphor-react-native'
import { Button } from '@/components/@ui/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Section from '../@ui/Section'

const RecentSearches = ({
  recentSearches,
  setRecentSearches,
  setSearchQuery,
}) => {
  if (!recentSearches.length) return null

  const clearAllRecentSearches = async () => {
    setRecentSearches([])
    await AsyncStorage.removeItem('recentSearches')
  }

  const removeSearch = async item => {
    const updatedSearches = recentSearches.filter(search => search !== item)
    setRecentSearches(updatedSearches)
    await AsyncStorage.setItem(
      'recentSearches',
      JSON.stringify(updatedSearches)
    )
  }

  return (
    <Section
      title="Recent Searches"
      actionBtn={
        <Button
          title="Clear All"
          ghost
          size="tiny"
          onPress={clearAllRecentSearches}
        />
      }
    >
      <FlatList
        data={recentSearches}
        keyExtractor={item => item}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <TouchableOpacity
              style={styles.itemContent}
              onPress={() => setSearchQuery(item)}
            >
              <Clock size={20} color="#687076" weight="light" />
              <Text
                style={styles.itemText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeSearch(item)}>
              <X size={16} color="#687076" />
            </TouchableOpacity>
          </View>
        )}
      />
    </Section>
  )
}

export default RecentSearches

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemText: {
    // marginLeft: 10,
    paddingHorizontal: 10,
    fontSize: 13,
    flexShrink: 1,
    flexGrow: 1,
    overflow: 'hidden',
  },
})
