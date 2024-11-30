import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native'
import { colors } from '@/constants/theme'
import { Button } from '@/components/@ui/Button'
import { CaretDoubleRight } from 'phosphor-react-native'

const VariantSelector = ({ variants, selectedOptions, setSelectedOptions }) => {
  if (!variants.length) return null

  const [modalVisible, setModalVisible] = useState(false)

  const handleSelect = (variantName, optionValue) => {
    setSelectedOptions(prev => ({
      ...prev,
      [variantName]: optionValue,
    }))
    setModalVisible(false)
  }

  const openModal = () => {
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      {variants
        .filter(variant =>
          variant.options.some(option => option.type === 'image')
        )
        .map(variant => (
          <View key={variant.name} style={styles.variantSection}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                paddingTop: 10,
              }}
            >
              <View style={styles.optionsContainer}>
                {variant.options.slice(0, 4).map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.option,
                      selectedOptions[variant.name] === option.value &&
                        styles.selectedOption,
                    ]}
                    onPress={() => handleSelect(variant.name, option.value)}
                  >
                    {option.type === 'image' ? (
                      <Image
                        source={{ uri: option.value }}
                        style={styles.optionImage}
                      />
                    ) : null}
                  </TouchableOpacity>
                ))}
              </View>
              <Button
                title="View All"
                ghost
                onPress={() => openModal(variant)}
                iconRight={
                  <CaretDoubleRight size={15} color={colors.primary} />
                }
              />
            </View>
          </View>
        ))}

      {/* Bottom Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>All Variants</Text>
            <ScrollView contentContainerStyle={styles.modalOptionsContainer}>
              {variants.map(variant => (
                <View key={variant.name} style={styles.variantSection}>
                  <Text style={styles.variantName}>{variant.name}</Text>
                  <View style={styles.modalOptions}>
                    {variant.options.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.modalOption,
                          selectedOptions[variant.name] === option.value &&
                            styles.selectedOption,
                        ]}
                        onPress={() => handleSelect(variant.name, option.value)}
                      >
                        {option.type === 'image' ? (
                          <Image
                            source={{ uri: option.value }}
                            // defaultSource={}
                            style={styles.modalOptionImage}
                          />
                        ) : (
                          <Text
                            style={[
                              styles.optionText,
                              selectedOptions[variant.name] === option.value &&
                                styles.selectedOptionText,
                            ]}
                          >
                            {option.value}
                          </Text>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  variantSection: {
    marginBottom: 15,
  },
  variantName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  option: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOption: {
    borderColor: colors.primary,
  },
  optionImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  seeMoreButton: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seeMoreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalOptionsContainer: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    gap: 10,
    // justifyContent: 'center',
  },
  modalOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  modalOption: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 2,
  },
  modalOptionImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  modalCloseButton: {
    marginTop: 15,
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default VariantSelector
