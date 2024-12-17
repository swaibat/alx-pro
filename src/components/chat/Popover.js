import React from 'react'
import { View, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import { Text } from '@/components/@ui/Text'

const CustomPopover = ({ visible, onClose, options }) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <View style={styles.popoverContainer}>
          <View style={styles.optionsContainer}>
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
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popoverContainer: {
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-around',
  },
  popoverOption: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 5,
    marginBottom: 10,
  },
  popoverIcon: {
    padding: 5,
    borderRadius: 50,
    backgroundColor: 'gainsboro',
  },
  popoverText: {
    fontSize: 13,
    marginTop: 6,
  },
})

export default CustomPopover
