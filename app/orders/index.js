import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, useTheme, Button } from '@ui-kitten/components';
import { useGetOrdersQuery } from '@/api'; // Adjust the path to your API file
import { useRouter } from 'expo-router';
import { Appbar, Divider } from 'react-native-paper';
import { CheckCircle, XCircle, Truck, Clock, CurrencyDollarSimple, ArrowCounterClockwise, ClockCountdown, WarningCircle } from 'phosphor-react-native';

const activityTypeEnum = {
    'AWAITING_PAYMENT': { type: 'AWAITING_PAYMENT', description: 'The order has been created.', color: '#FF9800', icon: <Clock size={18} color="#FF9800" /> },
    'Awaiting Payment': { type: 'Awaiting Payment', description: 'The order has been created.', color: '#FF9800', icon: <Clock size={18} color="#FF9800" /> },
    'PAYMENT_FAILED': { type: 'PAYMENT_FAILED', description: 'The order has been created.', color: 'red', icon: <WarningCircle size={18} color="red" /> },
    'Payment Failed': { type: 'Payment Failed', description: 'The order has been created.', color: 'red', icon: <WarningCircle size={18} color="red" /> },
    ORDER_CREATED: { type: 'ORDER_CREATED', description: 'The order has been created.', color: '#2196F3', icon: <ClockCountdown size={18} color="#2196F3" /> },
    PAYMENT_SUCCESS: { type: 'PAYMENT_SUCCESS', description: 'Payment was successful.', color: '#4CAF50', icon: <CheckCircle size={18} color="#4CAF50" /> },
    PAYMENT_FAILED: { type: 'PAYMENT_FAILED', description: 'Payment failed.', color: '#F44336', icon: <XCircle size={18} color="#F44336" /> },
    PROCESSING: { type: 'PROCESSING', description: 'Your order is being processed.', color: '#FF9800', icon: <Clock size={18} color="#FF9800" /> },
    ORDER_CANCELLED: { type: 'ORDER_CANCELLED', description: 'The order was cancelled.', color: '#F44336', icon: <XCircle size={18} color="#F44336" /> },
    ORDER_SHIPPED: { type: 'ORDER_SHIPPED', description: 'The order has been shipped.', color: '#2196F3', icon: <Truck size={18} color="#2196F3" /> },
    ORDER_DELIVERED: { type: 'ORDER_DELIVERED', description: 'The order has been delivered.', color: '#4CAF50', icon: <CheckCircle size={18} color="#4CAF50" /> },
    ORDER_COMPLETED: { type: 'ORDER_COMPLETED', description: 'The order has been completed.', color: '#4CAF50', icon: <CheckCircle size={18} color="#4CAF50" /> },
    REFUND_REQUESTED: { type: 'REFUND_REQUESTED', description: 'A refund has been requested.', color: '#FF9800', icon: <ArrowCounterClockwise size={18} color="#FF9800" /> },
    REFUND_COMPLETED: { type: 'REFUND_COMPLETED', description: 'The refund has been completed.', color: '#4CAF50', icon: <CurrencyDollarSimple size={18} color="#4CAF50" /> },
};

const OrderCard = ({ order }) => {
    const theme = useTheme();
    const router = useRouter();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    const getStatusStyle = (status) => {
        const statusEnum = activityTypeEnum[status] || {};
        return {
            color: statusEnum.color || '#000',
            icon: statusEnum.icon || null,
            description: statusEnum.description || 'Unknown Status',
        };
    };

    const statusInfo = getStatusStyle(order.status);

    return (
        <Card style={[styles.card, { borderColor: theme['color-basic-500'] }]}>
            <View style={styles.cardHeader}>
                <Text category='s1' style={styles.orderNumber}>Order № #{order._id?.slice(-7)}</Text>
                <Text category='c1' appearance='hint' style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
            </View>

            <View style={styles.cardDetails}>
                <Text category='c1'>Quantity: <Text category='c1' style={styles.boldText}>{order.items[0].quantity}</Text></Text>
                <Text category='c1'>Total Amount: <Text category='c1' style={styles.boldText}>{order.total} UGX</Text></Text>
            </View>

            <View style={styles.cardDetails}>
                <Text category='c1'>Payment Type: <Text category='c1' style={styles.boldText}>{order.paymentType}</Text></Text>
                <Text category='c1'>Paid: <Text category='c1' style={styles.boldText}>{order.paid ? 'Yes' : 'No'}</Text></Text>
            </View>
            <Divider style={{ marginVertical: 10 }} />
            <View style={styles.cardFooter}>
                <View style={styles.statusContainer}>
                    {statusInfo.icon}
                    <Text category='c1' style={[styles.status, { color: statusInfo.color }]}>{order.status?.replace('_', ' ')}</Text>
                </View>
                <Button appearance="outline" size='tiny' onPress={() => router.push({
                    pathname: `orders/${order._id}`,
                })} >Details</Button>

            </View>
        </Card>
    );
};

const SkeletonLoader = () => {
    return (
        <View style={styles.skeletonCard}>
            <View style={styles.skeletonHeader} />
            <View style={styles.skeletonDetails} />
            <View style={styles.skeletonDetails} />
            <View style={styles.skeletonFooter} />
        </View>
    );
};

const OrdersScreen = () => {
    const router = useRouter();
    const theme = useTheme();
    const { data: ordersData, isLoading, isError } = useGetOrdersQuery();

    const orders = ordersData?.data || [];

    return (
        <>
            <Appbar.Header style={{ paddingRight: 15, backgroundColor: '#111b2d' }}>
                <Appbar.BackAction color={theme['color-basic-100']} onPress={() => router.push('account')} />
                <Appbar.Content color={theme['color-basic-100']} title={<Text style={{ color: theme['color-basic-100'], fontSize: 18 }}>Orders</Text>} />
            </Appbar.Header>
            <Divider />
            <ScrollView style={[styles.container, { backgroundColor: theme['color-basic-200'] }]}>
                {/* Error State */}
                {isError && (
                    <Text style={styles.errorText}>Error fetching orders</Text>
                )}

                {/* Loading State */}
                {isLoading && (
                    <>
                        <SkeletonLoader />
                        <SkeletonLoader />
                        <SkeletonLoader />
                    </>
                )}

                {/* Orders List */}
                {!isLoading && !isError && orders.length > 0 ? (
                    orders.map((order) => <OrderCard key={order._id} order={order} />)
                ) : !isLoading && !isError && (
                    <Text category='h5' style={styles.noOrdersText}>No Orders Available</Text>
                )}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
    },
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
    noOrdersText: {
        textAlign: 'center',
        marginTop: 20,
    },
    // Skeleton styles
    skeletonCard: {
        backgroundColor: '#e0e0e0',
        height: 150,
        borderRadius: 8,
        marginVertical: 8,
        padding: 10,
    },
    skeletonHeader: {
        height: 20,
        backgroundColor: '#c0c0c0',
        marginBottom: 10,
        borderRadius: 4,
    },
    skeletonDetails: {
        height: 15,
        backgroundColor: '#d0d0d0',
        marginBottom: 10,
        borderRadius: 4,
    },
    skeletonFooter: {
        height: 25,
        backgroundColor: '#c0c0c0',
        borderRadius: 4,
    },
});

export default OrdersScreen;
