import React, { useState, useEffect } from 'react'
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native'
import { Star } from 'phosphor-react-native'
import { colors } from '@/constants/theme'
import { Button } from '@/components/@ui/Button'
import { Text } from '@/components/@ui/Text'
import { useCreateReviewMutation } from '@/api'

const ReviewModal = ({ product, order }) => {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [visible, setVisible] = useState(false)

  const [createReview, { isLoading: isCreating }] = useCreateReviewMutation()
  const [currentItemIndex, setCurrentItemIndex] = useState(0)

  const handleReviewSubmit = async () => {
    const currentProduct = order.items[currentItemIndex]
    await createReview({
      productId: currentProduct._id,
      reviewData: { comment, rating },
    })

    // Move to the next item if there are more items to review
    if (currentItemIndex < order.items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1)
    } else {
      setVisible(false) // Close modal when all items are reviewed
      setCurrentItemIndex(0)
    }

    setComment('')
    setRating(0)
  }

  const showReviewButton =
    (order?.status === 'ORDER_DELIVERED' ||
      order?.status === 'ORDER_COMPLETED') &&
    order?.items.some(item => !item.myReview)

  useEffect(() => {
    if (order && showReviewButton) {
      setVisible(true)
    }
  }, [order])

  const isSubmitDisabled = comment.length < 10 || rating === 0

  return (
    <>
      {showReviewButton && (
        <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => setVisible(true)}
        >
          <Text category="h6" style={styles.reviewButtonText}>
            Add Review
          </Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Display Product Image and Title */}
            <View style={styles.productInfo}>
              <Image
                source={
                  product?.thumbnail
                    ? { uri: product.thumbnail }
                    : require('@/assets/placeholder.png')
                }
                style={styles.productImage}
              />
              <Text category="h6" style={styles.productTitle}>
                {product?.title}
              </Text>
            </View>

            <Text category="h5" style={styles.modalTitle}>
              Add Your Review
            </Text>
            <Text style={styles.modalText}>
              Your order has been successfully completed. We would appreciate it
              if you could take a moment to review your experience.
            </Text>

            <Text style={styles.modalText}>Rate your experience:</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map(num => (
                <TouchableOpacity
                  key={`star-${num}`}
                  onPress={() => setRating(num)}
                >
                  <Star
                    size={50}
                    color={num <= rating ? colors.amber[500] : colors.grey[300]}
                    weight={num <= rating ? 'fill' : 'regular'}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.input}
              multiline
              value={comment}
              onChangeText={setComment}
              placeholder="Write your review here"
            />
            <View style={styles.buttonContainer}>
              <Button
                outline
                onPress={() => setVisible(false)}
                style={styles.cancelButton}
                title="Cancel"
              />
              <Button
                onPress={handleReviewSubmit}
                isLoading={isCreating}
                isDisabled={isSubmitDisabled}
                style={styles.submitButton}
                title="Submit"
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    width: '100%',
  },
  productInfo: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText: {
    marginVertical: 10,
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginVertical: 7,
    borderColor: colors.grey[600],
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.orange[50],
  },
  submitButton: {
    flex: 1,
  },
})

export default ReviewModal
