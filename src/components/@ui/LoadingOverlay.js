// LoadingOverlay.js
import React from 'react'
import { Modal, View, ActivityIndicator, StyleSheet } from 'react-native'
import { Text } from '@/components/@ui/Text'
import { colors } from '@/constants/theme'

const LoadingOverlay = ({ visible }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      hardwareAccelerated
    >
      <View style={styles.overlay}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.orange[500]} />
          <Text style={styles.text}>Please wait...</Text>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    color: 'white',
  },
})

export default LoadingOverlay
