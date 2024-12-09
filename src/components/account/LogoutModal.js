import React from 'react'
import { StyleSheet, View, Modal } from 'react-native'
import { clearAuthState } from '@/scripts/asyncStorage'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/authSlice'
import { useRouter } from 'expo-router'
import { Text } from '@/components/@ui/Text'
import { Button } from '@/components/@ui/Button'

export default function LogoutModal({ isModalVisible, closeModal }) {
  const dispatch = useDispatch()
  const router = useRouter()

  // Handles the logout process
  const handleLogout = async () => {
    await clearAuthState()
    dispatch(logout())
    closeModal()
    router.push('/')
  }

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
      onBackdropPress={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text bold style={styles.modalTitle}>
            Confirm Logout
          </Text>
          <Text style={styles.modalText}>Are you sure you want to logout?</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.actionBtns}>
              <Button
                title="Cancel"
                secondary
                style={styles.cancelButton}
                onPress={closeModal}
              />
              <Button
                title="Logout"
                style={styles.logoutButton}
                onPress={handleLogout}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
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
    textAlign: 'center',
    fontSize: 17,
  },
  modalText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  actionBtns: { width: '100%', gap: 10, flexDirection: 'row' },
  cancelButton: {
    flex: 1,
  },
  logoutButton: {
    flex: 1,
  },
})
