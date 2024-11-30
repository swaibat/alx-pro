import React, { useState } from 'react'
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native'
import { Text } from '@/components/@ui/Text'
import { Star, X } from 'phosphor-react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Divider from '@/components/@ui/Divider'
import { Button } from '@/components/@ui/Button'
import { theme } from '@/constants/theme'

const FilterModal = ({ visible, onClose }) => {
  const router = useRouter()
  const params = useLocalSearchParams()
  const [filterState, setFilterState] = useState({
    discount: '',
    minPrice: '',
    maxPrice: '',
    shipping: '',
    rating: null,
  })

  const handleDiscountSelect = label => {
    setFilterState(prev => ({ ...prev, discount: label }))
  }

  const handlePriceChange = (type, value) => {
    setFilterState(prev => ({ ...prev, [type]: value }))
  }

  const handleShippingSelect = selectedShipping => {
    setFilterState(prev => ({ ...prev, shipping: selectedShipping }))
  }

  const handleRatingSelect = selectedRating => {
    setFilterState(prev => ({ ...prev, rating: selectedRating }))
  }

  const applyFilter = () => {
    const paramsData = {
      ...(filterState.discount && { discount: filterState.discount }),
      ...(filterState.minPrice && { minPrice: filterState.minPrice }),
      ...(filterState.maxPrice && { maxPrice: filterState.maxPrice }),
      ...(filterState.shipping && { shipping: filterState.shipping }),
      ...(filterState.rating && { rating: filterState.rating }),
    }

    router.push({ pathname: 'ads/list', params: { ...params, ...paramsData } })
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Close Icon */}
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <X size={24} color="#000" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Filters</Text>
          <Divider />
          <View
            style={{
              paddingVertical: 3,
            }}
          >
            <Text
              fontWeight="medium"
              style={{ textTransform: 'uppercase', fontSize: 12 }}
            >
              Discount:
            </Text>
          </View>
          <ScrollView horizontal contentContainerStyle={styles.optionGroup}>
            {['50%', '40%', '30%', '20%', '10%'].map((label, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  filterState.discount === label && styles.selectedOption,
                ]}
                onPress={() => handleDiscountSelect(label)}
              >
                <Text
                  style={[
                    styles.optionText,
                    filterState.discount === label && styles.selectedOptionText,
                  ]}
                >
                  {label} or More
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Price Range Filter */}
          <View
            style={{
              paddingVertical: 3,
            }}
          >
            <Text
              fontWeight="medium"
              style={{ textTransform: 'uppercase', fontSize: 12 }}
            >
              Price Range:
            </Text>
          </View>
          <View style={styles.priceRangeContainer}>
            <TextInput
              style={styles.priceInput}
              placeholder="Min Price"
              keyboardType="numeric"
              value={filterState.minPrice}
              onChangeText={value => handlePriceChange('minPrice', value)}
            />
            <Text style={styles.toText}>to</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="Max Price"
              keyboardType="numeric"
              value={filterState.maxPrice}
              onChangeText={value => handlePriceChange('maxPrice', value)}
            />
          </View>

          {/* Shipping Filter */}
          <View
            style={{
              paddingVertical: 3,
            }}
          >
            <Text
              fontWeight="medium"
              style={{ textTransform: 'uppercase', fontSize: 12 }}
            >
              Shipping:
            </Text>
          </View>
          <ScrollView horizontal contentContainerStyle={styles.optionGroup}>
            {['All', 'Free', 'Paid'].map((shippingOption, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  filterState.shipping === shippingOption &&
                    styles.selectedOption,
                ]}
                onPress={() => handleShippingSelect(shippingOption)}
              >
                <Text
                  style={[
                    styles.optionText,
                    filterState.shipping === shippingOption &&
                      styles.selectedOptionText,
                  ]}
                >
                  {shippingOption}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View
            style={{
              paddingVertical: 3,
              marginBottom: 10,
            }}
          >
            <Text
              fontWeight="medium"
              style={{ textTransform: 'uppercase', fontSize: 12 }}
            >
              Product Ratings:
            </Text>
          </View>
          <ScrollView horizontal contentContainerStyle={styles.optionGroup}>
            {[4, 3, 2, 1].map((ratingOption, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  filterState.rating === ratingOption && styles.selectedOption,
                ]}
                onPress={() => handleRatingSelect(ratingOption)}
              >
                <View style={styles.starContainer}>
                  <Star
                    size={16}
                    color={
                      filterState.rating === ratingOption
                        ? '#FF6B00'
                        : '#687076'
                    }
                    weight={
                      filterState.rating === ratingOption ? 'fill' : 'duotone'
                    }
                  />
                  <Text
                    style={[
                      styles.optionText,
                      filterState.rating === ratingOption &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {ratingOption}
                  </Text>
                  <Text
                    style={[
                      styles.optionText,
                      filterState.rating === ratingOption &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {' '}
                    & Up
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.modalActions}>
            <Button
              title="Clear Filters"
              secondary
              style={{ flex: 1 }}
              onPress={() =>
                setFilterState({
                  discount: '',
                  minPrice: '',
                  maxPrice: '',
                  shipping: '',
                  rating: null,
                })
              }
            />
            <Button
              title="Apply Filter"
              style={{ flex: 1 }}
              onPress={applyFilter}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 15,
  },
  modalText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
  optionGroup: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  optionButton: {
    borderWidth: 0.8,
    borderColor: theme.colors.grey[300],
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 30,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  selectedOption: {
    borderColor: theme.colors.orange[500],
    color: theme.colors.orange[500],
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  priceInput: {
    borderWidth: 0.9,
    borderColor: theme.colors.grey[400],
    borderRadius: 3,
    flex: 1,
    padding: 8,
    width: '40%',
    textAlign: 'center',
  },
  toText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  selectedOptionText: {
    color: '#FF6B00',
  },
})

export default React.memo(FilterModal)
