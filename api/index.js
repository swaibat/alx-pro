import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  EXPO_PUSH_TOKEN_STORAGE_KEY,
  getDeviceId,
} from '@/scripts/NotificationsService'

export const customMiddleware = () => next => async action => {
  if (action.type.endsWith('rejected')) {
    const errorMessage = action.error.message
    console.log(errorMessage)
  }
  return next(action)
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://alx.up.railway.app/api/v1/',
    prepareHeaders: async headers => {
      const storedCookies = await AsyncStorage.getItem('@user')
      const token = await AsyncStorage.getItem(EXPO_PUSH_TOKEN_STORAGE_KEY)
      const deviceId = getDeviceId()
      console.log('===', JSON.parse(storedCookies).token)
      if (token) {
        headers.set('device_id', deviceId)
        headers.set('fcm_token', token)
      }
      if (storedCookies) {
        headers.set('access_token', JSON.parse(storedCookies).token)
      }
      return headers
    },
  }),

  endpoints: builder => ({
    getProductFilters: builder.query({
      query: () => 'products/filters/all',
    }),
    getProductFeatures: builder.query({
      query: () => 'products/features/cars',
    }),
    getStoreDetails: builder.query({
      query: params => `shops/domain/${params}`,
    }),
    getProducts: builder.query({
      query: params => `products?${new URLSearchParams(params)}`,
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/category`,
      }),
    }),
    getProduct: builder.query({
      query: productId => ({
        url: `/products/${productId}`,
      }),
    }),
    getViewedProducts: builder.query({
      query: () => ({ url: `/recently-viewed` }),
    }),
    getRelatedProducts: builder.query({
      query: productId => `products/related/${productId}`,
    }),
    getDraftProduct: builder.query({
      query: () => `draft-ad`,
    }),
    getFlashSales: builder.query({
      query: () => `flash-Sales`,
    }),
    uploadFile: builder.mutation({
      query: formData => ({
        url: 'files',
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    deleteFile: builder.mutation({
      query: fileId => ({
        url: `files/${fileId}`,
        method: 'DELETE',
      }),
    }),
    createProduct: builder.mutation({
      query: productData => ({
        url: 'products',
        method: 'POST',
        body: productData,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: ({ phoneNumber, password }) => ({
        url: 'auth/login',
        method: 'POST',
        body: { phoneNumber, password },
      }),
    }),
    getAddress: builder.query({
      query: () => 'address',
    }),
    createAddress: builder.mutation({
      query: addressData => ({
        url: 'address',
        method: 'POST',
        body: addressData,
      }),
    }),
    deleteAddress: builder.mutation({
      query: addressId => ({
        url: `address/${addressId}`,
        method: 'DELETE',
      }),
    }),
    updateAddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `address/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    makePayment: builder.mutation({
      query: data => ({
        url: '/payments/momo',
        method: 'POST',
        body: data,
      }),
    }),
    validatePhoneNumber: builder.query({
      query: msisdn => `/payments/validate/${msisdn}`,
    }),
    sendOtp: builder.mutation({
      query: msisdn => ({
        url: `/sms/otp/send/${msisdn}`,
        method: 'POST',
      }),
    }),
    verifyOtp: builder.mutation({
      query: data => ({
        url: '/sms/otp/verify',
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: data => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    getOrders: builder.query({
      query: () => `/orders/me`,
    }),
    getOrderDetails: builder.query({
      query: orderId => `/orders/${orderId}`,
    }),
    createOrder: builder.mutation({
      query: data => ({
        url: '/orders',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ phoneNumber, newPassword }) => ({
        url: `auth/password-reset`,
        method: 'POST',
        body: { phoneNumber, newPassword },
      }),
    }),
  }),
})

export const {
  useGetProductFiltersQuery,
  useGetProductFeaturesQuery,
  useGetStoreDetailsQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetViewedProductsQuery,
  useGetRelatedProductsQuery,
  useGetFlashSalesQuery,
  useGetCategoriesQuery,
  useUploadFileMutation,
  useDeleteFileMutation,
  useCreateProductMutation,
  useGetDraftProductQuery,
  useUpdateProductMutation,
  useLoginMutation,
  useGetAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useMakePaymentMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useRegisterMutation,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useResetPasswordMutation,
} = api
