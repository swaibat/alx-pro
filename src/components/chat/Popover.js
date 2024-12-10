import React from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native'
import { Text } from '@/components/@ui/Text'
// import { Icon } from 'phosphor-react-native' // Ensure you have this library installed

const CustomPopover = ({ visible, onClose, options, anchorPosition }) => {
  if (!visible) return null

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
  const popoverWidth = 200 // Set a width for the popover
  const popoverHeight = options.length * 50 // Estimate height based on options
  let top = anchorPosition.y
  let left = anchorPosition.x

  // Adjust position to stay within the screen bounds
  if (top + popoverHeight > screenHeight) {
    top = screenHeight - popoverHeight - 10 // Add some margin from the bottom
  }
  if (left + popoverWidth > screenWidth) {
    left = screenWidth - popoverWidth - 10 // Add some margin from the right
  }

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <View
          style={[styles.popoverContainer, { top, left, width: popoverWidth }]}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.popoverOption}
              onPress={() => {
                option.action()
                onClose()
              }}
            >
              <View style={styles.popoverIcon}>{option.icon}</View>
              <Text style={styles.popoverText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: { flex: 1 },
  popoverContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 8,
    elevation: 10,
    padding: 2,
    width: 600,
  },
  popoverOption: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  popoverIcon: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: 'gainsboro',
  },
  popoverText: {
    fontSize: 11,
    color: '#007AFF',
  },
})

export default CustomPopover
