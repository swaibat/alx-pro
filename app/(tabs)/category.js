import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useGetCategoriesQuery } from '@/api'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {
  Layout,
  Menu,
  MenuItem,
  Drawer,
  DrawerItem,
} from '@ui-kitten/components'
import AppHeader from '@/components/_global/AppHeader'
import categoryStateLayout from '@/components/categories/states/handleStates'

const CategoryScreen = () => {
  const [expandedCategory, setExpandedCategory] = useState(null)
  const { data, isLoading, error, refetch } = useGetCategoriesQuery()
  const params = useLocalSearchParams()
  const [selectedIndex, setSelectedIndex] = useState({ row: 0 })
  const router = useRouter()

  useEffect(() => {
    if (params?.index) {
      setSelectedIndex({ row: parseInt(params.index) })
    }
    if (params?.category) {
      setExpandedCategory(params.category)
    } else if (data?.data?.length > 0) {
      setExpandedCategory(data.data[0].id)
    }
  }, [params, data])

  const toggleCategory = categoryId => {
    setExpandedCategory(prev => (prev === categoryId ? null : categoryId))
  }

  const renderSubcategories = category => {
    if (!category?.children) return null
    return category.children.map(subcategory => (
      <MenuItem
        title={subcategory.name}
        key={subcategory.id}
        onPress={() =>
          router.push({
            pathname: `/ads/list`,
            params: { categoryId: subcategory.id, category: subcategory.name },
          })
        }
      />
    ))
  }

  const stateLayout = categoryStateLayout({ data, isLoading, error, refetch })

  return (
    <>
      <AppHeader title="Categories" />
      <View style={styles.container}>
        {stateLayout || (
          <>
            <Layout style={styles.sidebar}>
              <Drawer
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}
              >
                {data.data.map(item => (
                  <DrawerItem
                    style={styles.categoryItem}
                    key={item.id}
                    title={item.name}
                    onPress={() => toggleCategory(item.id)}
                  />
                ))}
              </Drawer>
            </Layout>
            <Menu style={styles.subcategoryView}>
              {expandedCategory &&
                renderSubcategories(
                  data.data.find(category => category.id === expandedCategory)
                )}
            </Menu>
          </>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  sidebar: {
    width: 130,
    padding: 10,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  categoryItem: {
    paddingVertical: 10,
  },
  subcategoryView: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default CategoryScreen
