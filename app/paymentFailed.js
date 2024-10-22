import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { XCircle } from 'phosphor-react-native';

const OrderFailedScreen = () => {
    const router = useRouter();

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <XCircle size={100} color="gray" weight="fill" />
                <Text style={styles.title}>Order Failed</Text>
                <Text style={styles.description}>Something went wrong with your payment.</Text>

                <Button
                    mode="contained"
                    onPress={() => router.push('/orders')} // Navigate to orders page
                    style={styles.button}
                >
                    View Orders
                </Button>
                <Button
                    mode="outlined"
                    onPress={() => router.push('/')} // Navigate to shopping page
                    style={styles.button}
                >
                    Continue Shopping
                </Button>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginVertical: 16,
    },
    description: {
        fontSize: 16,
        color: 'gray',
    },
    button: {
        marginTop: 16,
        width: '80%',
    },
});

export default OrderFailedScreen;
