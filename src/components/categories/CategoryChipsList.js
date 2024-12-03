import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Modal,
} from 'react-native'
import { useGetCategoriesQuery } from '@/api'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { X } from 'phosphor-react-native'
import { colors } from '@/constants/theme'
import { Image } from 'react-native'

const CategoryChipsList = () => {
  const searchParams = useLocalSearchParams()
  if (searchParams?.categoryId) {
    return null
  }

  const { data, isLoading } = useGetCategoriesQuery()
  const router = useRouter()
  const initialCategoryId = searchParams.categoryId || ''

  const [activeChip, setActiveChip] = useState(initialCategoryId)
  const [currentCategories, setCurrentCategories] = useState([])
  const [parentCategory, setParentCategory] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [childrenCategories, setChildrenCategories] = useState([])

  useEffect(() => {
    if (data?.data) {
      setCurrentCategories(data.data)
    }
  }, [data])

  useEffect(() => {
    setActiveChip(initialCategoryId)
    if (initialCategoryId) {
      const category = data?.data?.find(cat => cat.id === initialCategoryId)
      if (category && category.children) {
        setCurrentCategories(category.children)
        setParentCategory(category)
      } else {
        setCurrentCategories(data.data)
      }
    }
  }, [initialCategoryId, data])

  const handleChipPress = categoryId => {
    setActiveChip(categoryId)
    const category =
      currentCategories.find(cat => cat.id === categoryId) ||
      data?.data?.find(cat => cat.id === categoryId)

    if (category && category.children && category.children.length > 0) {
      setChildrenCategories(category.children)
      setIsModalVisible(true)
    } else {
      const categoryName = category?.name || 'All'
      router.push(`/ads/list?categoryId=${categoryId}&category=${categoryName}`)
    }
  }

  const handleCategorySelect = categoryId => {
    setIsModalVisible(false)
    const category = childrenCategories.find(cat => cat.id === categoryId)
    if (category) {
      router.push(
        `/ads/list?categoryId=${categoryId}&category=${category.name}`
      )
    }
  }

  const handleBackToParent = () => {
    if (parentCategory) {
      setCurrentCategories(data.data)
      setParentCategory(null)
      setActiveChip('')
      router.push(`/ads/list`)
    }
  }

  if (isLoading) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsContainer}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <View key={index} style={styles.chipPlaceholder} />
        ))}
      </ScrollView>
    )
  }

  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsContainer}
      >
        {parentCategory && (
          <TouchableOpacity style={styles.chip} onPress={handleBackToParent}>
            <Text style={styles.chipText}>Back</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.chip, activeChip === '' && styles.activeChip]}
          onPress={() => handleChipPress('')}
        >
          <Text
            style={[
              styles.chipText,
              activeChip === '' && styles.activeChipText,
            ]}
          >
            ALL
          </Text>
        </TouchableOpacity>

        {currentCategories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.chip,
              activeChip === category.id && styles.activeChip,
            ]}
            onPress={() => handleChipPress(category.id)}
          >
            <Image source={{ uri: category.imageUrl }} />
            <Text
              style={[
                styles.chipText,
                activeChip === category.id && styles.activeChipText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Built-in Modal for subcategory selection */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <X size={24} weight="bold" />
            </TouchableOpacity>

            <ScrollView style={styles.modalList}>
              {childrenCategories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.modalItem}
                  onPress={() => handleCategorySelect(category.id)}
                >
                  <Text style={styles.modalItemText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  chipsContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    height: 40,
    maxHeight: 40,
  },
  chip: {
    backgroundColor: colors.grey[200],
    paddingHorizontal: 15,
    height: 27,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  chipText: {
    fontSize: 12,
    marginVertical: 'auto',
    color: colors.grey[900],
  },
  activeChip: {
    backgroundColor: colors.orange[500],
  },
  activeChipText: {
    color: '#fff',
  },
  chipPlaceholder: {
    backgroundColor: '#E1E9EE',
    width: 60,
    height: 30,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    position: 'relative', // Allow positioning of the close button
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalList: {
    minHeight: 200,
    maxHeight: '100%', // Limit the height of the list
    width: '100%', // Ensure the list takes full width
  },
  modalItem: {
    paddingVertical: 10, // Increased padding for better spacing
    borderBottomWidth: 0.8, // Add a bottom border to create separation
    borderBottomColor: colors.grey[300], // Light gray border color
  },
  modalItemText: {
    fontSize: 15,
    color: '#333',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
  },
})

export default CategoryChipsList
