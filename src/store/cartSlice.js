import { generateUniqueKey } from '@/scripts/cartItemId'
import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const uniqueKey = generateUniqueKey(item)
      const existingItem = state.find(
        cartItem => cartItem.uniqueKey === uniqueKey
      )

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.push({
          ...item,
          quantity: 1,
          uniqueKey,
        })
      }
    },

    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload

      const item = state.find(cartItem => cartItem.uniqueKey === id)

      if (item) {
        item.quantity = quantity
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload
      return state.filter(cartItem => cartItem.uniqueKey !== id)
    },

    clearCart: () => {
      return []
    },
  },
})

export const { addToCart, updateItemQuantity, removeFromCart, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
