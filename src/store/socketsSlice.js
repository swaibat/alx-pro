import { api } from '@/api'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: {},
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
      const newMessage = action.payload
      const messageDate = new Date().toLocaleDateString('en-CA')
      if (state?.messages?.docs) {
        const dateGroup = state.messages.docs.find(group => {
          return group.date === messageDate
        })
        if (dateGroup) {
          dateGroup.messages.docs.push(newMessage)
        } else {
          state.messages.docs.push({
            date: messageDate,
            messages: [newMessage],
          })
        }
      }
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
