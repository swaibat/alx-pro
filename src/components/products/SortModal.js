import React, { useState, useEffect, useRef } from 'react'
import {
  Modal,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Text } from '@/components/@ui/Text'
import {
  CaretUpDown,
  CheckCircle,
  Circle,
  ClockCountdown,
  SortAscending,
  SortDescending,
  X,
} from 'phosphor-react-native'
import { Button } from '@/components/@ui/Button'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Divider from '@/components/@ui/Divider'
import { colors, theme } from '@/constants/theme'

const SortModal = ({ isLoading, isSuccess, data, isFetching }) => {
  const [isSortModalVisible, setSortModalVisible] = useState(false)
  const toggleSortModal = () => setSortModalVisible(!isSortModalVisible)
  const [selectedSort, setSelectedSort] = useState({})
  const params = useLocalSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (isSortModalVisible) {
      const existingSortKey = Object.keys(params).find(key =>
        key.startsWith('sort[')
      )
      if (existingSortKey) {
        const sortValue = params[existingSortKey]
        const sortKey = existingSortKey.match(/sort\[(.*?)\]/)?.[1]
        if (sortKey && sortValue) {
          setSelectedSort({ [`sort[${sortKey}]`]: sortValue })
        }
      } else {
        setSelectedSort({})
      }
    }
  }, [isSortModalVisible])

  const prevDataRef = useRef(data)

  useEffect(() => {
    if (
      isSuccess &&
      isSortModalVisible &&
      prevDataRef.current !== data &&
      selectedSort
    ) {
      toggleSortModal()
    }
    prevDataRef.current = data
  }, [data, isSuccess, isSortModalVisible, selectedSort, toggleSortModal])

  const handleSortSelection = option => {
    setSelectedSort({ [`sort[${option.key}]`]: option.value })
  }

  const handleClearSort = () => {
    setSelectedSort({})
  }

  const handleApplySort = () => {
    const filteredParams = Object.keys(params).reduce((acc, key) => {
      if (!key.startsWith('sort[')) {
        acc[key] = params[key]
      }
      return acc
    }, {})
    router.push({
      pathname: 'ads/list',
      params: { ...filteredParams, ...selectedSort },
    })
    if (!isLoading) {
      toggleSortModal()
    }
  }

  return (
    <>
      <TouchableOpacity
        disabled={isLoading || isFetching}
        style={styles.button}
        onPress={toggleSortModal}
      >
        <SortAscending size={20} />
        <Text style={styles.buttonText}>Sort</Text>
        {isLoading || isFetching ? (
          <ClockCountdown size={16} />
        ) : (
          <CaretUpDown size={16} />
        )}
      </TouchableOpacity>

      <Modal visible={isSortModalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Sorting</Text>
            {/* Close Icon Button */}
            <TouchableOpacity
              style={styles.closeIconButton}
              onPress={toggleSortModal}
            >
              <X size={24} color="#333" />
            </TouchableOpacity>

            {/* Sort Options */}
            <Divider />
            <ScrollView contentContainerStyle={styles.optionGroup}>
              {[
                {
                  label: 'Highest Price',
                  key: 'price',
                  value: 'desc',
                  icon: <SortDescending size={20} color="#333" />,
                },
                {
                  label: 'Lowest Price',
                  key: 'price',
                  value: 'asc',
                  icon: <SortAscending size={20} color="#333" />,
                },
                {
                  label: 'Best Rating',
                  key: 'rating',
                  value: 'desc',
                  icon: <SortDescending size={20} color="#333" />,
                },
                {
                  label: 'Best Discounts',
                  key: 'discount',
                  value: 'desc',
                  icon: <SortDescending size={20} color="#333" />,
                },
              ].map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleSortSelection(option)}
                >
                  <View style={styles.checkboxContainer}>
                    {option.icon}
                    <Text style={styles.optionText}>{option.label}</Text>
                    {JSON.stringify(selectedSort) ===
                    JSON.stringify({
                      [`sort[${option.key}]`]: option.value,
                    }) ? (
                      <CheckCircle
                        size={23}
                        color={colors.primary}
                        weight="fill"
                        style={styles.checkIcon}
                      />
                    ) : (
                      <Circle
                        size={23}
                        color={colors.grey[600]}
                        weight="light"
                        style={styles.checkIcon}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.modalActions}>
              <Button
                title="Clear Sort"
                secondary
                appearance="secondary"
                onPress={handleClearSort}
              />
              <Button
                title="Apply Sort"
                style={{ flex: 1 }}
                isLoading={isFetching}
                onPress={handleApplySort}
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
    position: 'relative',
  },
  closeIconButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 18,
  },
  optionGroup: {
    paddingVertical: 5,
  },
  optionButton: {
    borderBottomWidth: 0.8,
    borderColor: theme.colors.grey[300],
    paddingVertical: 10,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  optionText: {
    marginLeft: 10,
    // fontSize: 16,
    flex: 1,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  buttonText: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    flex: 1,
    gap: 5,
  },
})

export default React.memo(SortModal)
