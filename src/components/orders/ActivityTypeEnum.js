import {
  CheckCircle,
  XCircle,
  Truck,
  Clock,
  CurrencyDollarSimple,
  ArrowCounterClockwise,
  ClockCountdown,
  WarningCircle,
} from 'phosphor-react-native'

export const activityTypeEnum = {
  AWAITING_PAYMENT: {
    type: 'AWAITING_PAYMENT',
    description: 'The order has been created.',
    color: '#FF9800',
    icon: <Clock size={18} color="#FF9800" weight="fill" />,
  },
  'Awaiting Payment': {
    type: 'Awaiting Payment',
    description: 'The order has been created.',
    color: '#FF9800',
    icon: <Clock size={18} color="#FF9800" />,
  },
  'Payment Failed': {
    type: 'Payment Failed',
    description: 'The order has been created.',
    color: 'red',
    icon: <WarningCircle size={18} color="red" weight="fill" />,
  },
  ORDER_CREATED: {
    type: 'ORDER_CREATED',
    description: 'The order has been created.',
    color: '#2196F3',
    icon: <ClockCountdown size={18} color="#2196F3" weight="fill" />,
  },
  PAYMENT_SUCCESS: {
    type: 'PAYMENT_SUCCESS',
    description: 'Payment was successful.',
    color: '#4CAF50',
    icon: <CheckCircle size={18} color="#4CAF50" weight="fill" />,
  },
  PAYMENT_FAILED: {
    type: 'PAYMENT_FAILED',
    description: 'Payment failed.',
    color: '#F44336',
    icon: <XCircle size={18} color="#F44336" weight="fill" />,
  },
  PROCESSING: {
    type: 'PROCESSING',
    description: 'Your order is being processed.',
    color: '#FF9800',
    icon: <Clock size={18} color="#FF9800" weight="fill" />,
  },
  ORDER_CANCELLED: {
    type: 'ORDER_CANCELLED',
    description: 'The order was cancelled.',
    color: '#F44336',
    icon: <XCircle size={18} color="#F44336" weight="fill" />,
  },
  ORDER_SHIPPED: {
    type: 'ORDER_SHIPPED',
    description: 'The order has been shipped.',
    color: '#2196F3',
    icon: <Truck size={18} color="#2196F3" weight="fill" />,
  },
  ORDER_DELIVERED: {
    type: 'ORDER_DELIVERED',
    description: 'The order has been delivered.',
    color: '#4CAF50',
    icon: <CheckCircle size={16} color="#4CAF50" weight="fill" />,
  },
  ORDER_COMPLETED: {
    type: 'ORDER_COMPLETED',
    description: 'The order has been completed.',
    color: '#4CAF50',
    icon: <CheckCircle size={16} color="#4CAF50" weight="fill" />,
  },
  REFUND_REQUESTED: {
    type: 'REFUND_REQUESTED',
    description: 'A refund has been requested.',
    color: '#FF9800',
    icon: <ArrowCounterClockwise size={16} color="#FF9800" weight="fill" />,
  },
  REFUND_COMPLETED: {
    type: 'REFUND_COMPLETED',
    description: 'The refund has been completed.',
    color: '#4CAF50',
    icon: <CurrencyDollarSimple size={16} color="#4CAF50" weight="fill" />,
  },
}
