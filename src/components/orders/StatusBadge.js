import React from 'react'
import { View } from 'react-native'
import {
  Clock,
  CheckCircle,
  XCircle,
  ClockCountdown,
} from 'phosphor-react-native'
import { Text } from '@/components/@ui/Text'
import { StyleSheet } from 'react-native'

const StatusBadge = ({ type, size = 14 }) => {
  const icons = {
    ORDER_CREATED: {
      color: '#4caf50',
      icon: <Clock size={size} color="#4caf50" weight="fill" />,
    },
    PAYMENT_SUCCESS: {
      color: '#4caf50',
      icon: <CheckCircle size={size} color="#4caf50" weight="fill" />,
    },
    PAYMENT_FAILED: {
      color: '#f44336',
      icon: <XCircle size={size} color="#f44336" />,
    },
    PROCESSING: {
      color: 'orange',
      icon: <ClockCountdown size={size} color="orange" weight="fill" />,
    },
    ORDER_CANCELLED: {
      color: '#f44336',
      icon: <XCircle size={size} color="#f44336" />,
    },
    ORDER_SHIPPED: {
      color: '#4caf50',
      icon: <CheckCircle size={size} color="#4caf50" />,
    },
    ORDER_DELIVERED: {
      color: '#4caf50',
      icon: <CheckCircle size={size} color="#4caf50" />,
    },
    ORDER_COMPLETED: {
      color: '#4caf50',
      icon: <CheckCircle size={size} color="#4caf50" />,
    },
    REFUND_REQUESTED: {
      color: '#f44336',
      icon: <XCircle size={size} color="#f44336" />,
    },
    REFUND_COMPLETED: {
      color: '#4caf50',
      icon: <CheckCircle size={size} color="#4caf50" />,
    },
  }

  const status = icons[type] || { icon: null, color: 'gray' }

  return (
    <View style={styles.badgeContainer(status)}>
      {status.icon}
      <Text style={styles.badgeText(status)}>{type.replace('_', ' ')}</Text>
    </View>
  )
}

export default StatusBadge

const styles = StyleSheet.create({
  badgeContainer: status => ({
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    fontSize: 8,
    whiteSpace: 'nowrap',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: status.color,
  }),
  badgeText: status => ({
    fontSize: 10,
    color: status.color,
  }),
})
