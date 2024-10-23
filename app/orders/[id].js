import React from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native'
import { Text, Card, useTheme } from '@ui-kitten/components'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Appbar, Divider } from 'react-native-paper'
import { CheckCircle, XCircle, Clock } from 'phosphor-react-native'
import { useGetOrderDetailsQuery } from '@/api'
import AddressItem from '@/components/address/AddressItem'

const activityTypeEnum = {
  ORDER_CREATED: {
    description: 'The order has been created.',
    icon: <Clock size={24} />,
  },
  PAYMENT_SUCCESS: {
    description: 'Payment was successful.',
    icon: <CheckCircle size={24} color="#4caf50" />,
  },
  PAYMENT_FAILED: {
    description: 'Payment failed.',
    icon: <XCircle size={24} color="#f44336" />,
  },
  PROCESSING: {
    description: 'Your order is being processed.',
    icon: <Clock size={24} />,
  },
  ORDER_CANCELLED: {
    description: 'The order has been cancelled.',
    icon: <XCircle size={24} color="#f44336" />,
  },
  ORDER_SHIPPED: {
    description: 'The order has been shipped.',
    icon: <CheckCircle size={24} color="#4caf50" />,
  },
  ORDER_DELIVERED: {
    description: 'The order has been delivered.',
    icon: <CheckCircle size={24} color="#4caf50" />,
  },
  ORDER_COMPLETED: {
    description: 'The order has been completed.',
    icon: <CheckCircle size={24} color="#4caf50" />,
  },
  REFUND_REQUESTED: {
    description: 'A refund has been requested.',
    icon: <XCircle size={24} color="#f44336" />,
  },
  REFUND_COMPLETED: {
    description: 'The refund has been completed.',
    icon: <CheckCircle size={24} color="#4caf50" />,
  },
}

const OrderDetailsScreen = () => {
  const { id } = useLocalSearchParams() // Get the order ID from route params
  const router = useRouter()
  const theme = useTheme()

  const { data: orderData, isLoading, isError } = useGetOrderDetailsQuery(id)

  const order = orderData?.order

  return (
    <>
      <Appbar.Header style={{ paddingRight: 15, backgroundColor: '#111b2d' }}>
        <Appbar.BackAction
          color={theme['color-basic-100']}
          onPress={() => router.push('orders')}
        />
        <Appbar.Content
          color={theme['color-basic-100']}
          title={
            <Text style={{ color: theme['color-basic-100'], fontSize: 18 }}>
              Order Details
            </Text>
          }
        />
      </Appbar.Header>
      <Divider />

      <ScrollView style={styles.container}>
        {isLoading && (
          <View style={styles.errorContainer}>
            <ActivityIndicator
              size="large"
              color={theme['color-primary-default']}
              style={styles.loader}
            />
          </View>
        )}
        {isError && (
          <View style={styles.errorContainer}>
            <Text category="h6" style={styles.errorText}>
              Error fetching order details.
            </Text>
          </View>
        )}
        {order && (
          <>
            <View style={styles.card}>
              <Text category="h5" style={{ marginBottom: 5 }}>
                Order #{order._id?.slice(-7)}
              </Text>
              <Text category="s1" style={{ marginBottom: 5 }} appearance="hint">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </Text>
              <Text category="s1" style={{ marginBottom: 5 }} appearance="hint">
                {order.status}
              </Text>
            </View>

            {/* Items */}
            <View style={styles.card}>
              <Text category="h6" style={{ marginBottom: 5 }}>
                Items:
              </Text>
              {order.items.map(item => (
                <View key={item.productId} style={styles.itemCard}>
                  <View style={styles.itemContainer}>
                    <Image
                      source={
                        item.file
                          ? { uri: item.file }
                          : require('@/assets/placeholder.png')
                      }
                      style={[
                        styles.itemImage,
                        { backgroundColor: theme['color-basic-300'] },
                      ]}
                    />
                    <View style={styles.itemDetails}>
                      <Text category="s1" numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text
                        category="p2"
                        appearance="hint"
                        numberOfLines={1}
                        style={{ marginBottom: 4 }}
                      >
                        {item.description}
                      </Text>
                      <Text
                        category="s2"
                        appearance="hint"
                        style={{ marginBottom: 4 }}
                      >
                        Qty: {item.quantity}
                      </Text>
                      <Text category="s2" appearance="hint">
                        Price: UGX {item.price.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.card}>
              <Text category="h6" style={{ marginVertical: 10 }}>
                Shipping Address:
              </Text>
              <AddressItem address={order.address} viewOnly={true} />
            </View>

            <Text category="h6" style={{ marginVertical: 10 }}>
              Payment Method:
            </Text>
            <Card style={styles.card}>
              <Text category="s1" appearance="hint">
                {order.paymentType}
              </Text>
            </Card>

            <Text category="h6" style={{ marginVertical: 10 }}>
              Order Activity:
            </Text>
            <View style={styles.activityCard}>
              {order.activity.map(activity => (
                <View key={activity._id} style={styles.activityContainer}>
                  <View style={styles.activityText}>
                    {activityTypeEnum[activity.type]?.icon}
                    <View>
                      <Text
                        category="s1"
                        style={{ textTransform: 'capitalize' }}
                      >
                        {activity.type.replace('_', ' ').toLowerCase()}
                      </Text>
                      <Text category="s2" appearance="hint">
                        {activityTypeEnum[activity.type]?.description}
                      </Text>
                    </View>
                  </View>
                  <Text
                    category="c1"
                    appearance="hint"
                    style={{ textAlign: 'right', fontSize: 10, width: 100 }}
                  >
                    {new Date(activity.timestamp).toLocaleString()}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  card: {
    marginBottom: 5,
  },
  itemCard: {
    marginBottom: 8,
    padding: 10,
    borderColor: 'gainsboro',
    borderBottomWidth: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: '#f1f1f1f1',
  },
  itemDetails: {
    flex: 1,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  contactText: {
    marginLeft: 8,
    fontSize: 16,
  },
  button: {
    marginTop: 16,
  },
  activityCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'space-between',
    marginVertical: 8,
    flex: 1,
  },
  activityText: {
    marginLeft: 8,
    flexDirection: 'row',
    gap: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default OrderDetailsScreen
