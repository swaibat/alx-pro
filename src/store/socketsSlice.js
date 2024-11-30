import { api } from '@/api'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
  socket: null,
}

const socketsSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload
    },
    setSocket: (state, action) => {
      state.socket = action.payload
    },
    addMessage: (state, action) => {
      state.messages?.docs?.unshift(action.payload)
    },
  },
  extraReducers: builder => {
    // Handle the success case when `getMessages` is successful
    builder.addMatcher(
      api.endpoints.getMessages.matchFulfilled,
      (state, action) => {
        state.messages = action.payload.data // Update messages when data is fetched
      }
    )
  },
})

export const { setMessages, setSocket, addMessage } = socketsSlice.actions
export default socketsSlice.reducer
