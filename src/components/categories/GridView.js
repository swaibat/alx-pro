import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useGetCategoriesQuery } from '@/api'
import { useRouter } from 'expo-router'
import { Text } from '@/components/@ui/Text'
import AppImg from '@/components/@ui/AppImg'

const PlaceholderItem = () => {
  return (
    <View style={styles.item}>
      <View style={styles.placeholderImage} />
      <View style={styles.placeholderText} />
    </View>
  )
}

const GridScreen = () => {
  const { data, isLoading, error } = useGetCategoriesQuery()

  const router = useRouter()

  const renderItem = item => (
    <TouchableOpacity
      key={item.id}
      style={styles.item}
      onPress={() =>
        router.replace(`/category?id=${item.id}&name=${item.name.trim()}`)
      }
    >
      <AppImg src={item.imageUrl} style={styles.image} />
      <Text style={styles.itemText} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>
    </TouchableOpacity>
  )

  const renderPlaceholderItems = () => {
    return [...Array(8)].map((_, index) => <PlaceholderItem key={index} />)
  }

  const renderGrid = () => {
    return (
      <View style={styles.gridContainer}>
        {(data?.data?.slice(0, 8) || []).map(renderItem)}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Categories</Text>
        <TouchableOpacity onPress={() => router.push('category')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.gridContainer}>{renderPlaceholderItems()}</View>
      ) : (
        renderGrid()
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAllText: {
    color: 'red',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 12,
    textAlign: 'center',
  },
  placeholderImage: {
    width: 40,
    height: 40,
    backgroundColor: '#E1E9EE',
    marginBottom: 8,
    borderRadius: 5,
  },
  placeholderText: {
    width: 40,
    height: 15,
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
  },
})

export default GridScreen
