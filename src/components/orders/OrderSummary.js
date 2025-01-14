import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@/components/@ui/Text'

const OrderSummary = ({ order }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text bold style={styles.orderIdText}>
          Order #{order._id?.slice(-7)}
        </Text>
      </View>
      <Text style={styles.dateText}>
        Date: {new Date(order.createdAt).toLocaleString()}
      </Text>
      <Text>Payment Method: {order.paymentType || 'N/A'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderIdText: {
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  dateText: {
    marginBottom: 5,
    fontSize: 12,
  },
})

export default OrderSummary
