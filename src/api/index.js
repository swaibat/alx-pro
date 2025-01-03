import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  EXPO_PUSH_TOKEN_STORAGE_KEY,
  getDeviceId,
} from '@/scripts/NotificationsService'
import axios from 'axios'
import Constants from 'expo-constants'

export const apiClient = axios.create({
  baseURL: Constants.expoConfig.extra.SERVER_URL1,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const customMiddleware = () => next => async action => {
  if (action.type.endsWith('rejected')) {
    // const errorMessage = action.error.message
  }
  return next(action)
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${Constants.expoConfig.extra.SERVER_URL_1}/api/v1/`,
    prepareHeaders: async headers => {
      const storedCookies = await AsyncStorage.getItem('@user')
      const token = await AsyncStorage.getItem(EXPO_PUSH_TOKEN_STORAGE_KEY)
      const deviceId = getDeviceId()
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
      query: params => {
        return `products?${new URLSearchParams(params)}`
      },
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
      query: () => ({ url: `/viewed` }),
      keepUnusedDataFor: 100,
    }),
    getRelatedProducts: builder.query({
      query: productId => `products/related/${productId}`,
    }),
    getDraftProduct: builder.query({
      query: () => `draft-ad`,
    }),
    uploadFile: builder.mutation({
      query: ({ formData, type }) => ({
        url: `files/?type=${type}`,
        method: 'POST',
        body: formData,
        formData: true,
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
      query: payload => ({
        url: 'auth/login',
        method: 'POST',
        body: payload,
      }),
    }),
    getAddress: builder.query({
      query: () => 'address',
    }),
    getMyProfile: builder.query({
      query: () => 'user/me',
    }),
    getReviews: builder.query({
      query: () => 'user/me',
    }),
    createAddress: builder.mutation({
      query: addressData => ({
        url: 'address',
        method: 'POST',
        body: addressData,
      }),
    }),
    makeDefaultAddress: builder.mutation({
      query: addressId => ({
        url: `address/default/${addressId}`,
        method: 'PATCH',
      }),
    }),
    deleteAddress: builder.mutation({
      query: addressId => ({
        url: `address/${addressId}`,
        method: 'DELETE',
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
    getProductReviews: builder.query({
      query: ({ productId, limit }) =>
        `/reviews/product/${productId}?limit=${limit}`,
    }),
    sendOtp: builder.mutation({
      query: ({ authId, type }) => ({
        url: `/sms/otp/send/${authId}?type=${type}`,
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
      query: ({ id }) => `/orders/${id}`,
    }),
    createOrder: builder.mutation({
      query: data => ({
        url: '/orders',
        method: 'POST',
        body: data,
      }),
    }),
    updateOrder: builder.mutation({
      query: data => ({
        url: `/orders/${data.orderId}`,
        method: 'PUT',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ phoneNumber, newPassword, code }) => ({
        url: `auth/password-reset`,
        method: 'POST',
        body: { phoneNumber, newPassword, code },
      }),
    }),
    getShippingByRegion: builder.query({
      query: ({ region }) => `shipping?region=${region}`,
    }),
    processPayment: builder.mutation({
      query: paymentData => ({
        url: '/payments/flutter/card',
        method: 'POST',
        body: paymentData,
      }),
    }),
    getFlutterKeys: builder.query({
      query: () => `/payment_keys`,
    }),
    createReview: builder.mutation({
      query: ({ productId, reviewData }) => ({
        url: `reviews/${productId}`,
        method: 'POST',
        body: reviewData,
      }),
    }),
    getMessages: builder.query({
      query: params => `messages?${new URLSearchParams(params)}`,
    }),
    getFlashSales: builder.query({
      query: () => `flash-sales`,
    }),
    stripePaymentSheet: builder.mutation({
      query: data => ({
        url: 'payment-sheet',
        method: 'POST',
        body: data,
      }),
    }),
    sendMessage: builder.mutation({
      query: newMessage => ({
        url: 'messages',
        method: 'POST',
        body: newMessage,
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
  useDeleteAddressMutation,
  useMakePaymentMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useRegisterMutation,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useResetPasswordMutation,
  useGetMyProfileQuery,
  useGetReviewsQuery,
  useGetShippingByRegionQuery,
  useProcessPaymentMutation,
  useUpdateOrderMutation,
  useGetFlutterKeysQuery,
  useCreateReviewMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useMakeDefaultAddressMutation,
  useGetProductReviewsQuery,
  useStripePaymentSheetMutation,
} = api
