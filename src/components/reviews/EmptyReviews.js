import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Chats } from 'phosphor-react-native'
import { colors } from '@/constants/theme'

const EmptyReviews = ({ reviews }) => {
  if (reviews?.totalDocs) return
  return (
    <View style={styles.card}>
      <Chats size={30} color={colors.grey[400]} weight="light" />
      <Text style={styles.noReviewsText}>No ratings yet</Text>
    </View>
  )
}

export default EmptyReviews

const styles = StyleSheet.create({
  card: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noReviewsText: {
    fontSize: 13,
    color: colors.grey[400],
    textAlign: 'center',
  },
})
