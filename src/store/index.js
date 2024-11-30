import { configureStore } from '@reduxjs/toolkit'
import { api } from '@/api'
import authReducer from './authSlice'
import cartReducer from './cartSlice'
import snackbarReducer from './snackbarSlice'
import socketsSlice from './socketsSlice'
import addressReducer from './addressSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    snackbar: snackbarReducer,
    chat: socketsSlice,
    address: addressReducer,
    [api.reducerPath]: api.reducer,
    // other reducers if any
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the SerializableStateInvariantMiddleware
    }).concat(api.middleware),
})
