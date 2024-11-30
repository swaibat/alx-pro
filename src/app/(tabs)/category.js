import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native'
import { useGetCategoriesQuery } from '@/api'
import { CaretDoubleLeft, CaretRight } from 'phosphor-react-native'
import { Text } from '@/components/@ui/Text'
import { useRouter } from 'expo-router'
import { Button } from '@/components/@ui/Button'
import Loading from '@/components/global/Loading'
import { colors } from '@/constants/theme'

const CategoryScreen = () => {
  const { data, isLoading } = useGetCategoriesQuery()
  const [expandedCategory, setExpandedCategory] = useState(null)
  const [parentCategory, setParentCategory] = useState(null)
  const router = useRouter()

  const handleCategoryPress = (categoryId, categoryName) => {
    setParentCategory({ id: categoryId, name: categoryName })
    setExpandedCategory(categoryId)
  }

  const handleBackToParent = () => {
    setExpandedCategory(null)
    setParentCategory(null)
  }

  const renderSubcategories = category => {
    if (!category?.children) return null
    return (
      <FlatList
        data={category.children}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.subcategoryItem, styles.borderStyle]}
            onPress={() =>
              router.push({
                pathname: '/ads/list',
                params: {
                  categoryId: item.id,
                  category: item.name,
                },
              })
            }
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    )
  }

  if (isLoading) return <Loading text="Loading Categories" />

  return (
    <SafeAreaView style={styles.container}>
      {expandedCategory && parentCategory && (
        <Button
          title={parentCategory.name}
          onPress={handleBackToParent}
          secondary
          style={{ borderRadius: 0 }}
          size="small"
          iconLeft={<CaretDoubleLeft size={15} />}
        />
      )}

      <View style={styles.body}>
        {!expandedCategory && data?.data && (
          <FlatList
            data={data?.data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  expandedCategory === item.id && styles.selectedCategory,
                ]}
                onPress={() =>
                  handleCategoryPress(item.id, item.name, item.children)
                }
              >
                <Text>{item.name}</Text>
                <CaretRight size={16} />
              </TouchableOpacity>
            )}
          />
        )}

        {expandedCategory &&
          renderSubcategories(
            data.data.find(category => category.id === expandedCategory)
          )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.8,
    borderBottomColor: colors.borderColor,
  },
  subcategoryItem: {
    paddingVertical: 8,
    paddingLeft: 16,
  },
  borderStyle: {
    borderBottomWidth: 0.8,
    borderBottomColor: colors.borderColor,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 16,
  },
  selectedCategory: {
    backgroundColor: '#f0f0f0',
  },
})

export default CategoryScreen
