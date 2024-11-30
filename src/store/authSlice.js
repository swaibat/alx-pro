import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.user = action.payload.user
    },
    logout: state => {
      state.user = null
    },
  },
})

export const { setAuthState, logout } = authSlice.actions
export default authSlice.reducer
