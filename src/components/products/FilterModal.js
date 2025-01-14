import React from 'react'
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
import Divider from '@/components/@ui/Divider'
import { Button } from '@/components/@ui/Button'
import { colors } from '@/constants/theme'
import useFilter from '@/hooks/useFilter'

const FilterModal = ({ isLoading, isSuccess, data, isFetching }) => {
  const {
    visible,
    // setFilterModalVisible,
    filterState,
    toggleFilterModal,
    handleDiscountSelect,
    handleLocalStoreSelect,
    handlePriceChange,
    handleShippingSelect,
    handleRatingSelect,
    applyFilter,
    handleClearFilters,
    hasFilters,
  } = useFilter(isLoading, isSuccess, data, isFetching)

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

            <Text style={styles.filterSubtitle}>Discount:</Text>
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

            <Text style={styles.filterSubtitle}>Local Store:</Text>
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

            <Text style={styles.filterSubtitle}>Price Range:</Text>
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

            <Text style={styles.filterSubtitle}>Shipping:</Text>
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

            <Text style={styles.filterSubtitle}>Product Ratings:</Text>
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
                style={styles.flex1}
                onPress={handleClearFilters}
              />
              <Button
                title="Apply Filter"
                primary
                isLoading={data && isFetching}
                style={styles.flex1}
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
  filterSubtitle: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 3,
  },
  flex1: {
    paddingVertical: 3,
  },
})

export default React.memo(FilterModal)
