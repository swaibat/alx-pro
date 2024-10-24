import { configureStore } from '@reduxjs/toolkit'
import { api } from '@/api'
import authReducer from './authSlice'
import cartReducer from './cartSlice'
import snackbarReducer from './snackbarSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    snackbar: snackbarReducer,
    [api.reducerPath]: api.reducer,
    // other reducers if any
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
})
