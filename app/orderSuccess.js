import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { CheckCircle } from 'phosphor-react-native';
import { Text } from '@ui-kitten/components';

const OrderSuccessScreen = () => {
    const router = useRouter();

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <CheckCircle size={100} color="green" weight="fill" />
                <Text style={styles.title}>Success!</Text>
                <Text appearance='hint' style={styles.description}>
                    Thank you for your purchase! Your order has been successfully placed and will be processed shortly.
                </Text>

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
        marginVertical: 10,
        textAlign: 'center'
    },
    button: {
        marginTop: 16,
        width: '80%',
    },
});

export default OrderSuccessScreen;
