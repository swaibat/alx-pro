// OrderCard.js
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Card, Button } from '@ui-kitten/components'
import { activityTypeEnum } from './ActivityTypeEnum' // Adjust the path as needed
import { useRouter } from 'expo-router'
import { Divider } from 'react-native-paper'

const OrderCard = ({ order }) => {
  const router = useRouter()

  const formatDate = dateString => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  const getStatusStyle = status => {
    const statusEnum = activityTypeEnum[status] || {}
    return {
      color: statusEnum.color || '#000',
      icon: statusEnum.icon || null,
      description: statusEnum.description || 'Unknown Status',
    }
  }

  const statusInfo = getStatusStyle(order.status)

  return (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <Text category="s1" style={styles.orderNumber}>
          Order № #{order._id?.slice(-7)}
        </Text>
        <Text category="c1" appearance="hint" style={styles.orderDate}>
          {formatDate(order.createdAt)}
        </Text>
      </View>

      <View style={styles.cardDetails}>
        <Text category="c1">
          Quantity:{' '}
          <Text category="c1" style={styles.boldText}>
            {order.items[0].quantity}
          </Text>
        </Text>
        <Text category="c1">
          Total Amount:{' '}
          <Text category="c1" style={styles.boldText}>
            {order.total} UGX
          </Text>
        </Text>
      </View>

      <View style={styles.cardDetails}>
        <Text category="c1">
          Payment Type:{' '}
          <Text category="c1" style={styles.boldText}>
            {order.paymentType}
          </Text>
        </Text>
        <Text category="c1">
          Paid:{' '}
          <Text category="c1" style={styles.boldText}>
            {order.paid ? 'Yes' : 'No'}
          </Text>
        </Text>
      </View>
      <Divider style={{ marginVertical: 10 }} />
      <View style={styles.cardFooter}>
        <View style={styles.statusContainer}>
          {statusInfo.icon}
          <Text
            category="c1"
            style={[styles.status, { color: statusInfo.color }]}
          >
            {order.status?.replace('_', ' ')}
          </Text>
        </View>
        <Button size="tiny" onPress={() => router.push(`orders/${order._id}`)}>
          Details
        </Button>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    marginLeft: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
})

export default OrderCard
