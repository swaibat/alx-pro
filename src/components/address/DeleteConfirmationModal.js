import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useDeleteAddressMutation } from '@/api'
import { TrashSimple } from 'phosphor-react-native'
import { Text } from '@/components/@ui/Text'
import { Button } from '@/components/@ui/Button'
import { Modal } from 'react-native'

const DeleteConfirmationModal = ({ address, refetch }) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = React.useState(false)
  const [deleteAddress, { error: deleteError, isLoading: isDeleting }] =
    useDeleteAddressMutation()

  const handleDeleteAddress = async () => {
    try {
      await deleteAddress(address._id).unwrap()
      setDeleteModalVisible(false)
      refetch()
    } catch (error) {
      console.error('Error deleting address:', error, deleteError)
    }
  }

  return (
    <>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => setDeleteModalVisible(true)}
      >
        <TrashSimple color="#8F9BB3" size={18} />
      </TouchableOpacity>
      <Modal
        visible={isDeleteModalVisible}
        transparent={true}
        animationType="slide"
        onBackdropPress={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to delete this address?
            </Text>

            <View style={styles.modalActions}>
              <Button
                secondary
                style={styles.button}
                onPress={() => setDeleteModalVisible(false)}
                title="Cancel"
              />
              <Button
                style={styles.button}
                isLoading={isDeleting}
                onPress={handleDeleteAddress}
                title="Delete"
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 30,
    // height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  modalMessage: {
    marginBottom: 20,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
  iconButton: {
    // padding: 5,
    // marginLeft: 5,
  },
})

export default DeleteConfirmationModal
