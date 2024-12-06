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
        // Find the group for the current date
        const dateGroup = state.messages.docs.find(group => {
          console.log('======', group.date, messageDate)
          return group.date === messageDate
        })

        // console.log('======', dateGroup)

        if (dateGroup) {
          // If the date group exists, add the new message to that group
          dateGroup.messages.docs.push(newMessage) // Adds the message at the beginning (most recent)
        } else {
          // If no group for this date exists, create a new one and add the message
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
