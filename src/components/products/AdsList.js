/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useCallback } from 'react'
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from 'react-native'
import { MasonryFlashList } from '@shopify/flash-list'
import { useGetProductsQuery } from '@/api'
import AdCard from './AdCard'
import { CaretUpDown, FunnelSimple, SortAscending } from 'phosphor-react-native'
import { Text } from '@/components/@ui/Text'
import SortModal from './SortModal'
import FilterModal from './FilterModal'
import CategoryChipsList from '../categories/CategoryChipsList'
import { theme } from '@/constants/theme'
import EmptyAdsScreen from './states/Empty'
import AdsSkeletonLoader from './states/Loading'
import { useLocalSearchParams } from 'expo-router'

const ITEMS_PER_PAGE = 50

const AdsList = () => {
  const { category, ...params } = useLocalSearchParams()
  const [isFilterModalVisible, setFilterModalVisible] = useState(false)
  const [isSortModalVisible, setSortModalVisible] = useState(false)
  const [pageLimit, setPageLimit] = useState(ITEMS_PER_PAGE)

  const queryParams = useMemo(() => {
    const baseParams = { ...params, limit: pageLimit }
    return Object.fromEntries(
      Object.entries(baseParams).filter(([_, value]) => value)
    )
  }, [params, pageLimit])

  const { data, isLoading, isFetching, refetch } = useGetProductsQuery(
    queryParams,
    {
      refetchOnMountOrArgChange: true,
    }
  )

  const loadMoreProducts = useCallback(() => {
    if (data?.data?.hasNextPage && !isFetching) {
      setPageLimit(data?.data?.limit + ITEMS_PER_PAGE)
      refetch()
    }
  }, [data, isFetching, refetch])

  const toggleFilterModal = () => setFilterModalVisible(!isFilterModalVisible)
  const toggleSortModal = () => setSortModalVisible(!isSortModalVisible)

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CategoryChipsList />

        <MasonryFlashList
          ListHeaderComponent={
            <View style={{ paddingHorizontal: 5 }}>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={toggleFilterModal}
                >
                  <FunnelSimple size={20} />
                  <Text style={styles.buttonText}>Filter</Text>
                  <CaretUpDown size={16} />
                </TouchableOpacity>
                <View style={styles.divider} />
                <TouchableOpacity
                  style={styles.button}
                  onPress={toggleSortModal}
                >
                  <SortAscending size={20} />
                  <Text style={styles.buttonText}>Sort</Text>
                  <CaretUpDown size={16} />
                </TouchableOpacity>
              </View>
            </View>
          }
          data={data?.data?.docs}
          disableAutoLayout={true}
          renderItem={({ item }) => <AdCard product={item} />}
          ListFooterComponentStyle={{ paddingVertical: 10, marginBottom: 10 }}
          keyExtractor={item => item?._id}
          ListEmptyComponent={!isLoading && <EmptyAdsScreen />}
          estimatedItemSize={250}
          removeClippedSubviews={false}
          numColumns={2}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading || isFetching ? <AdsSkeletonLoader /> : null
          }
          contentContainerStyle={styles.masonryContent}
        />
      </View>
      <FilterModal visible={isFilterModalVisible} onClose={toggleFilterModal} />
      <SortModal
        visible={isSortModalVisible}
        isLoading={isLoading}
        onClose={toggleSortModal}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: theme.spacing.md,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    borderColor: theme.colors.grey[400],
    borderWidth: 0.8,
    borderRadius: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 7,
    flex: 1,
    gap: 5,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: theme.colors.grey[400],
    marginHorizontal: 10,
  },
  masonryContent: {
    paddingBottom: 10,
  },
  buttonText: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
})

export default React.memo(AdsList)
