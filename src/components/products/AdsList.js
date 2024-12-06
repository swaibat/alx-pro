import React, { useCallback } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { MasonryFlashList } from '@shopify/flash-list'
import { useGetProductsQuery } from '@/api'
import AdCard from './AdCard'
import SortBtn from './SortModal'
import FilterBtn from './FilterModal'
import CategoryChipsList from '../categories/CategoryChipsList'
import { theme } from '@/constants/theme'
import EmptyAdsScreen from './states/Empty'
import AdsSkeletonLoader from './states/Loading'
import { useLocalSearchParams } from 'expo-router'
import { useRouter } from 'expo-router'

const ITEMS_PER_PAGE = 50

const AdsList = () => {
  const router = useRouter()
  const { category, __EXPO_ROUTER_key, ...params } = useLocalSearchParams()
  const { data, isLoading, isFetching, isSuccess } = useGetProductsQuery(
    params,
    { refetchOnMountOrArgChange: true }
  )

  const loadMoreProducts = useCallback(() => {
    if (data?.data?.hasNextPage && !isFetching) {
      router.push({
        pathname: 'ads/list',
        params: { ...params, limit: data?.data.limit + ITEMS_PER_PAGE },
      })
    }
  }, [data, isFetching])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CategoryChipsList />
        <MasonryFlashList
          ListHeaderComponent={
            <View style={{ paddingHorizontal: 5 }}>
              <View style={styles.buttonGroup}>
                <FilterBtn
                  isSuccess={isSuccess}
                  data={data}
                  isLoading={isLoading}
                  isFetching={isFetching}
                />
                <View style={styles.divider} />
                <SortBtn
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                  data={data}
                  isFetching={isFetching}
                />
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
  divider: {
    width: 1,
    height: 30,
    backgroundColor: theme.colors.grey[400],
    marginHorizontal: 10,
  },
  masonryContent: {
    paddingBottom: 10,
  },
})

export default React.memo(AdsList)
