import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useGetOrdersQuery } from '@/api';
import OrderCard from '@/components/orders/OrderCard';
import ordersStateLayout from '@/components/orders/states/handleStates';
import AppHeader from '@/components/_global/AppHeader';

const OrdersScreen = () => {
    const { data: ordersData, isLoading, error, refetch } = useGetOrdersQuery();
    const renderState = ordersStateLayout({ orders, isLoading, error, refetch })
    const orders = ordersData?.data || [];

    return (
        <>
            <AppHeader title="Orders" backgroundColor="#111b2d" headerStyle="dark" />
            <ScrollView style={styles.container}>
                {renderState || orders.map((order) => <OrderCard key={order._id} order={order} />)}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    noOrdersText: {
        textAlign: 'center',
        marginTop: 20,
    },
});

export default OrdersScreen;
