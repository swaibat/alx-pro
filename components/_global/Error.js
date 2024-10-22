import { Text } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';

const ErrorScreen = ({ refetch }) => {
    return (
        <View style={styles.errorContainer}>
            <Image source={require('@/assets/images/error.png')} style={{ width: 160, height: 160, marginBottom: 10 }} />
            <Text category="s1" appearance='hint' style={styles.errorText}>An unknown error occurred. Please try again later.</Text>
            <Button mode="contained" onPress={refetch} style={styles.retryButton}>
                Retry
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
        backgroundColor: 'white'
    },
    errorText: {
        marginBottom: 20,
        textAlign: 'center',
    },
    retryButton: {
        marginTop: 10,
    },
});

export default ErrorScreen;