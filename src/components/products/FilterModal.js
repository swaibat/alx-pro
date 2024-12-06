import React, { useEffect, useRef, useState } from 'react'
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native'
import { Text } from '@/components/@ui/Text'
import {
  CaretUpDown,
  ClockCountdown,
  FunnelSimple,
  Star,
  X,
} from 'phosphor-react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Divider from '@/components/@ui/Divider'
import { Button } from '@/components/@ui/Button'
import { colors } from '@/constants/theme'

const ITEMS_PER_PAGE = 50

const FilterModal = ({ isLoading, isSuccess, data, isFetching }) => {
  const [visible, setFilterModalVisible] = useState(false)
  const router = useRouter()
  const params = useLocalSearchParams()
  const [filterState, setFilterState] = useState({
    discount: 'All',
    minPrice: '',
    maxPrice: '',
    shipping: 'All',
    rating: 'All',
    isLocalStore: 'All',
  })

  const toggleFilterModal = () => setFilterModalVisible(!visible)

  const handleDiscountSelect = label => {
    setFilterState(prev => ({ ...prev, discount: label }))
  }

  const handleLocalStoreSelect = label => {
    setFilterState(prev => ({ ...prev, isLocalStore: label }))
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

  const hasFilters = () => {
    return (
      filterState.discount !== 'All' ||
      filterState.minPrice ||
      filterState.maxPrice ||
      filterState.shipping !== 'All' ||
      filterState.rating !== 'All' ||
      filterState.isLocalStore !== 'All'
    )
  }

  const prevDataRef = useRef(data)

  useEffect(() => {
    if (isSuccess && visible && prevDataRef.current !== data && hasFilters()) {
      toggleFilterModal()
    }
    prevDataRef.current = data
  }, [data, isSuccess, visible, filterState, toggleFilterModal])

  const applyFilter = () => {
    const paramsData = {
      ...params,
      ...filterState,
      limit: ITEMS_PER_PAGE,
    }
    Object.keys(paramsData).forEach(key => {
      if (!paramsData[key] || paramsData[key] === 'All') {
        delete paramsData[key]
      }
    })
    router.push({
      pathname: 'ads/list',
      params: paramsData,
    })
  }

  const handleClearFilters = () => {
    const filterKeys = [
      'discount',
      'minPrice',
      'maxPrice',
      'shipping',
      'rating',
      'isLocalStore',
    ]
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([key]) => !filterKeys.includes(key))
    )

    setFilterState({
      discount: 'All',
      minPrice: '',
      maxPrice: '',
      shipping: 'All',
      rating: null,
      isLocalStore: 'All',
    })
    router.push({ pathname: 'ads/list', params: filteredParams })
  }
  //TODO:
  // if (
  //   !data?.data?.docs?.length &&
  //   !hasFilters() &&
  //   params.categoryId &&
  //   !isLoading &&
  //   !isFetching
  // ) {
  //   return null
  // }

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        disabled={isLoading || isFetching}
        onPress={toggleFilterModal}
      >
        <FunnelSimple size={20} />
        <Text style={styles.buttonText}>Filter</Text>
        {isLoading || isFetching ? (
          <ClockCountdown size={16} />
        ) : (
          <CaretUpDown size={16} />
        )}
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={toggleFilterModal}
            >
              <X size={24} color="#000" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Filters</Text>
            <Divider />

            {/* Discount Filter */}
            <View style={{ paddingVertical: 3 }}>
              <Text
                fontWeight="medium"
                style={{ textTransform: 'uppercase', fontSize: 12 }}
              >
                Discount:
              </Text>
            </View>
            <ScrollView horizontal contentContainerStyle={styles.optionGroup}>
              {[
                'All',
                '50% & Above',
                '40% & Above',
                '30% & Above',
                '20% & Above',
                '10% & Above',
              ].map((label, index) => (
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
                      filterState.discount === label &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Local Store Filter */}
            <View style={{ paddingVertical: 3 }}>
              <Text
                fontWeight="medium"
                style={{ textTransform: 'uppercase', fontSize: 12 }}
              >
                Local Store:
              </Text>
            </View>
            <ScrollView horizontal contentContainerStyle={styles.optionGroup}>
              {['All', 'Local Store', 'From Abroad'].map((label, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    filterState.isLocalStore === label && styles.selectedOption,
                  ]}
                  onPress={() => handleLocalStoreSelect(label)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      filterState.isLocalStore === label &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Price Range Filter */}
            <View style={{ paddingVertical: 3 }}>
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
            <View style={{ paddingVertical: 3 }}>
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

            {/* Product Ratings */}
            <View style={{ paddingVertical: 3, marginBottom: 10 }}>
              <Text
                fontWeight="medium"
                style={{ textTransform: 'uppercase', fontSize: 12 }}
              >
                Product Ratings:
              </Text>
            </View>
            <ScrollView horizontal contentContainerStyle={styles.optionGroup}>
              {['All', 4, 3, 2, 1].map((ratingOption, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    filterState.rating === ratingOption &&
                      styles.selectedOption,
                  ]}
                  onPress={() => handleRatingSelect(ratingOption)}
                >
                  {ratingOption === 'All' ? (
                    <Text
                      style={[
                        styles.optionText,
                        filterState.rating === ratingOption &&
                          styles.selectedOptionText,
                      ]}
                    >
                      All
                    </Text>
                  ) : (
                    <View style={styles.starContainer}>
                      <Star
                        size={16}
                        color={
                          filterState.rating === ratingOption
                            ? '#FF6B00'
                            : '#687076'
                        }
                        weight={
                          filterState.rating === ratingOption
                            ? 'fill'
                            : 'duotone'
                        }
                      />
                      <Text
                        style={[
                          styles.optionText,
                          filterState.rating === ratingOption &&
                            styles.selectedOptionText,
                        ]}
                      >
                        {ratingOption} & Up
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.modalActions}>
              <Button
                title="Clear Filters"
                secondary
                style={{ flex: 1 }}
                onPress={handleClearFilters}
              />
              <Button
                title="Apply Filter"
                primary
                isLoading={data && isFetching}
                style={{ flex: 1 }}
                onPress={applyFilter}
                isDisabled={!hasFilters()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
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
    borderColor: colors.grey[300],
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 30,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  selectedOption: {
    borderColor: colors.orange[500],
    color: colors.orange[500],
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  priceInput: {
    borderWidth: 0.9,
    borderColor: colors.grey[400],
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    flex: 1,
    gap: 5,
  },
  buttonText: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
})

export default React.memo(FilterModal)
