import React, { useState, useEffect } from 'react'
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Star } from 'phosphor-react-native'
import { colors } from '@/constants/theme'
import { Button } from '@/components/@ui/Button'
import { Text } from '@/components/@ui/Text'
import { useCreateReviewMutation } from '@/api'
import AppImg from '../@ui/AppImg'

const ReviewModal = ({ order }) => {
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

    if (currentItemIndex < order.items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1)
    } else {
      setVisible(false)
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
        <Button
          title="Add Review"
          style={styles.reviewBtn}
          onPress={() => setVisible(true)}
        />
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
              <AppImg
                src={order?.items?.[currentItemIndex]?.thumbnail}
                style={styles.productImage}
              />
              <Text style={styles.productTitle}>
                {order?.items?.[currentItemIndex]?.title}
              </Text>
            </View>

            <Text style={styles.modalTitle}>Add Your Review</Text>
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
                    size={40}
                    color={num <= rating ? colors.amber[500] : colors.grey[500]}
                    weight={num <= rating ? 'fill' : 'thin'}
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
    width: 45,
    height: 45,
    borderRadius: 8,
    marginRight: 10,
  },
  productTitle: {
    fontSize: 13,
    fontWeight: '400',
    color: 'black',
    flex: 1,
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
    borderWidth: 0.8,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginVertical: 7,
    borderColor: colors.grey[500],
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
  reviewBtn: { borderRadius: 0 },
})

export default ReviewModal
