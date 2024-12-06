import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Minus, Plus } from 'phosphor-react-native'
import { Text } from '@/components/@ui/Text'
import { colors } from '@/constants/theme'
import { useDispatch } from 'react-redux'
import { updateItemQuantity, removeFromCart } from '@/store/cartSlice'
import { generateUniqueKey } from '@/scripts/cartItemId'

const QuantityControls = ({ item, editable }) => {
  const dispatch = useDispatch()

  const uniqueKey = generateUniqueKey(item)

  const handleIncrease = () => {
    dispatch(
      updateItemQuantity({
        id: uniqueKey,
        quantity: item.quantity + 1,
      })
    )
  }

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(
        updateItemQuantity({
          id: uniqueKey,
          quantity: item.quantity - 1,
        })
      )
    } else {
      dispatch(removeFromCart(uniqueKey))
    }
  }

  return (
    <View
      style={[
        styles.container,
        editable ? { marginBottom: 'auto' } : { marginTop: 'auto' },
      ]}
    >
      {editable ? (
        <View style={{ gap: 5 }}>
          <TouchableOpacity style={styles.button} onPress={handleIncrease}>
            <Plus size={15} />
          </TouchableOpacity>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantity}>{item.quantity || 1}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleDecrease}>
            <Minus size={15} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.quantityContainer}>
          <Text style={styles.quantity}>{item.quantity || 1}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.8,
    borderColor: colors.borderColor,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  button: {
    width: 25,
    height: 25,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.borderColor,
  },
  quantityContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 18,
  },
  quantity: {
    fontWeight: 'bold',
    lineHeight: 17,
  },
})

export default QuantityControls
