import { createSlice } from '@reduxjs/toolkit'
import { api } from '@/api'

const initialState = {
  defaultAddress: null,
}

const addressSlice = createSlice({
  name: 'address',
  initialState,
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.getAddress.matchFulfilled,
      (state, action) => {
        const fetchedAddresses = action.payload.data
        const defaultAddress = fetchedAddresses.find(
          address => address.isDefault
        )
        state.defaultAddress = defaultAddress || null
      }
    )
  },
})

export const { setDefaultAddress } = addressSlice.actions

export default addressSlice.reducer
