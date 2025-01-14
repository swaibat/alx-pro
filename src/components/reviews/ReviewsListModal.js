import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { X } from 'phosphor-react-native'
import { useGetProductReviewsQuery } from '@/api'
import { useLocalSearchParams } from 'expo-router'
import { Button } from '../@ui/Button'
import ReviewItem from './ReviewItem'
import RatingsOverview from './RatingsOverview'
import Loading from '../global/Loading'

const ReviewsListModal = ({ modalVisible, setModalVisible }) => {
  const initialLimit = 2
  const [limit, setLimit] = useState(initialLimit)
  const { id } = useLocalSearchParams()
  const { data, isLoading, isFetching } = useGetProductReviewsQuery({
    productId: id,
    limit,
  })

  const handleLoadMore = () => {
    if (!isLoading && data?.data?.hasNextPage) {
      setLimit(prevLimit => prevLimit + initialLimit)
    }
  }

  if (isLoading) return <Loading text="Loading Reviews..." />

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContent}>
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.modalTitle}>All Reviews</Text>
              <Button
                size="small"
                ghost
                iconLeft={<X size={24} />}
                onPress={() => setModalVisible(false)}
              />
            </View>
            <RatingsOverview reviews={data?.data} />
          </View>
          <FlashList
            data={data?.data?.docs || []}
            keyExtractor={item => item._id}
            estimatedItemSize={100}
            renderItem={({ item }) => <ReviewItem item={item} />}
            contentContainerStyle={styles.contentContainer}
            ListFooterComponentStyle={styles.footerContainer}
          />
          {!isLoading && data?.data?.hasNextPage && (
            <Button
              onPress={handleLoadMore}
              isLoading={isFetching}
              title="Load More"
            />
          )}
        </View>
      </View>
    </Modal>
  )
}

export default ReviewsListModal

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    height: '90%',
  },
  contentContainer: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
})
