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
import Section from '../@ui/Section'
import { useRouter } from 'expo-router'
import { colors } from '@/constants/theme'

const ShowSuggestions = ({
  searchSuggestions,
  updateRecentSearches,
  searchQuery,
}) => {
  if (!searchSuggestions?.length) return
  const router = useRouter()

  const handleSearch = item => {
    router.push({ pathname: `/ads/list`, params: { name: item.title } })
    updateRecentSearches(item.title)
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
    <Section>
      <FlatList
        data={searchSuggestions}
        contentContainerStyle={{ paddingBottom: 20, maxHeight: 400 }}
        keyExtractor={item => item._id?.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <TouchableOpacity
              style={styles.itemContent}
              onPress={() => handleSearch(item)}
            >
              <MagnifyingGlass size={20} />
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={styles.itemText}>
                  {highlightMatch(item.title)}
                </Text>
                <View style={styles.categoryRow}>
                  <Tilde size={15} color={colors.grey[600]} />
                  <Text style={styles.categoryText}>{item.categoryName}</Text>
                </View>
              </View>
            </TouchableOpacity>
            {item?.files && (
              <Image source={{ uri: item.files[0] }} style={styles.itemImage} />
            )}
          </View>
        )}
        style={styles.list}
      />
    </Section>
  )
}

const styles = StyleSheet.create({
  list: { backgroundColor: 'white', borderRadius: 8, padding: 10 },
  highlight: {
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  itemText: {
    paddingHorizontal: 10,
    fontSize: 13,
    flexShrink: 1,
    flexGrow: 1,
    overflow: 'hidden',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  iconContainer: {
    padding: 5,
    marginRight: 10,
    borderRadius: 5,
  },
  categoryRow: { flexDirection: 'row', alignItems: 'center' },
  categoryText: { fontStyle: 'italic', fontSize: 11, color: colors.grey[600] },
  itemImage: { width: 40, height: 40, borderRadius: 5, marginLeft: 'auto' },
})

export default ShowSuggestions
