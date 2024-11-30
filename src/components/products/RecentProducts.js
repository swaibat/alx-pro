import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MasonryFlashList } from '@shopify/flash-list' // Import MasonryFlashList
import { useGetProductsQuery } from '@/api'
import productsStateLayout from './states/handleStates'
import AdCard from './AdCard'
import { Button } from '@/components/@ui/Button'
import { useRouter } from 'expo-router'

const RecentProducts = () => {
  const router = useRouter()
  const { data, isLoading, error, refetch } = useGetProductsQuery(
    {},
    {
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  )

  const stateLayout = productsStateLayout({ data, isLoading, error, refetch })

  if (stateLayout) {
    return <View style={styles.container}>{stateLayout}</View>
  }

  const products = data?.data?.docs || []

  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={products}
        renderItem={({ item }) => (
          <AdCard key={item._id} product={item} style={styles.adCard} />
        )}
        keyExtractor={item => item._id}
        numColumns={2}
        estimatedItemSize={100}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          <View style={styles.loadMoreButtonContainer}>
            <Button
              secondary
              style={{ flex: 1, width: '100%' }}
              onPress={() => router.push('/ads/list')}
              title="Load More"
            />
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  adCard: {
    marginBottom: 10,
  },
  loadMoreButtonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
})

export default RecentProducts
