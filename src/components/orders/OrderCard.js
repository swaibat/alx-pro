// OrderCard.js
import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { activityTypeEnum } from './ActivityTypeEnum'
import { useRouter } from 'expo-router'
import { Text } from '@/components/@ui/Text'
import { colors } from '@/constants/theme'
import { Button } from '@/components/@ui/Button'
import Divider from '@/components/@ui/Divider'
import DeliveryLogo from '../checkout/DeliveryLogo'

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
  const totalQuantity = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderNumber}>Order № #{order._id?.slice(-7)}</Text>
        <Text style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.cardBody}>
        <Image
          style={styles.image}
          source={
            order.items[0]?.thumbnail
              ? { uri: order.items[0]?.thumbnail }
              : require('@/assets/placeholder.png')
          }
        />
        <View style={styles.cardDetails}>
          <View
            style={[
              styles.detailRow,
              {
                justifyContent: 'space-between',
                flex: 1,
              },
            ]}
          >
            <View style={styles.detailRow}>
              <Text> Items:</Text>
              <Text style={styles.boldText}>{totalQuantity}</Text>
            </View>
            <DeliveryLogo type={order.shippingOption.shippingType} />
          </View>
          <View style={styles.detailRow}>
            <Text> Total:</Text>
            <Text style={styles.boldText}>{order.total} UGX</Text>
          </View>
          <View
            style={[
              styles.detailRow,
              {
                justifyContent: 'space-between',
                flex: 1,
              },
            ]}
          >
            <View style={styles.detailRow}>
              <Text> Mode:</Text>
              <Text style={styles.boldText}>{order.paymentType}</Text>
            </View>
          </View>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.cardFooter}>
        <View style={styles.statusContainer}>
          {statusInfo.icon}
          <Text style={[styles.status, { color: statusInfo.color }]}>
            {order.status?.replace('_', ' ')}
          </Text>
        </View>
        <Button
          size="small"
          onPress={() => router.push(`orders/${order._id}`)}
          title={'Details'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    borderWidth: 0.8,
    borderColor: colors.borderColor,
    borderRadius: colors.borderRadius,
    padding: 10,
    backgroundColor: 'white',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderNumber: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  orderDate: {
    fontSize: 10,
  },
  divider: {
    marginVertical: 10,
  },
  cardBody: {
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: colors.grey[200],
    borderRadius: 4,
  },
  cardDetails: {
    marginLeft: 10,
    justifyContent: 'space-between',
    marginBottom: 5,
    gap: 5,
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 10,
  },
  boldText: {
    fontWeight: '500',
    fontSize: 13,
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
    fontSize: 10,
  },
})

export default OrderCard
