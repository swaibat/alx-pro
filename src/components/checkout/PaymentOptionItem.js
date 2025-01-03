import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { colors } from '@/constants/theme'
import { CheckCircle, Circle } from 'phosphor-react-native'
import AppImg from '../@ui/AppImg'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const PaymentOptionItem = ({ option, selectedOption, onSelect }) => {
  const isSelected = selectedOption === option

  const getImageData = () => {
    const imageMap = {
      flutter: {
        src: require('@/assets/images/flutter.png'),
        style: { height: 50, width: 150 },
      },
      stripe: {
        src: require('@/assets/images/stripe.png'),
        style: { height: 40, width: 80 },
      },
      default: {
        src: require('@/assets/images/placeholder.png'),
        style: { height: 30, width: 30 },
      },
    }

    return imageMap[option.toLowerCase()] || imageMap.default
  }

  const { src, style } = getImageData()

  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={() => onSelect(option)}
    >
      <View style={styles.iconContainer}>
        {isSelected ? (
          <MaterialCommunityIcons
            name="radiobox-marked"
            size={24}
            color={colors.primary}
          />
        ) : (
          <MaterialCommunityIcons
            name="radiobox-blank"
            size={24}
            color="black"
          />
        )}
      </View>
      <AppImg style={[styles.image, style]} resizeMode="contain" src={src} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  selectedContainer: {
    borderColor: colors.primary,
  },
  iconContainer: {
    marginRight: 15,
  },
})

export default PaymentOptionItem
