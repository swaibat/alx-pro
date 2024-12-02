import React from 'react'
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native'
import { Text } from '@/components/@ui/Text'
import { MagnifyingGlass, Tilde } from 'phosphor-react-native'

const ShowSuggestions = ({ searchSuggestions, handleSearch, searchQuery }) => {
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
    <FlatList
      data={searchSuggestions}
      keyExtractor={item => item._id?.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handleSearch(item)}
        >
          <View style={styles.iconContainer}>
            <MagnifyingGlass size={15} />
          </View>
          <View>
            <Text>{highlightMatch(item.title)}</Text>
            <View style={styles.categoryRow}>
              <Tilde size={15} />
              <Text style={styles.categoryText}>{item.categoryName}</Text>
            </View>
          </View>
          {item?.files && (
            <Image source={{ uri: item.files[0] }} style={styles.itemImage} />
          )}
        </TouchableOpacity>
      )}
      style={styles.list}
    />
  )
}

const styles = StyleSheet.create({
  list: { backgroundColor: 'white', borderRadius: 8, padding: 10 },
  itemContainer: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  iconContainer: {
    padding: 5,
    marginRight: 10,
    borderRadius: 5,
  },
  categoryRow: { flexDirection: 'row', alignItems: 'center' },
  categoryText: { fontStyle: 'italic', fontSize: 11 },
  itemImage: { width: 40, height: 40, borderRadius: 5, marginLeft: 'auto' },
})

export default ShowSuggestions
