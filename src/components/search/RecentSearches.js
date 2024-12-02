import React from 'react'
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from '@/components/@ui/Text'
import { Clock, X } from 'phosphor-react-native'
import { Button } from '@/components/@ui/Button'

const RecentSearches = ({
  recentSearches,
  setSearchQuery,
  clearAllRecentSearches,
}) => {
  const removeSearch = async item => {
    const updatedSearches = recentSearches.filter(search => search !== item)
    setRecentSearches(updatedSearches)
    await AsyncStorage.setItem(
      'recentSearches',
      JSON.stringify(updatedSearches)
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recent Searches</Text>
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
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <TouchableOpacity onPress={() => setSearchQuery(item)}>
              <View style={styles.itemContent}>
                <Clock size={20} color="#687076" weight="fill" />
                <Text style={styles.itemText}>{item}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeSearch(item)}>
              <X size={16} color="#687076" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )

  const styles = StyleSheet.create({
    container: { paddingVertical: 16 },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
    },
    headerText: { textTransform: 'uppercase', fontSize: 12 },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
    },
    itemContent: { flexDirection: 'row', alignItems: 'center' },
    itemText: { marginLeft: 10 },
  })
}

export default RecentSearches
