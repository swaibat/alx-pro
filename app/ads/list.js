import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AdsList from '@/components/products/AdsList';
import AppHeader from '@/components/_global/AppHeader';


const Ads = () => {
    const { category } = useLocalSearchParams();

    return (
        <>
            <AppHeader title={category} />
            <SafeAreaView style={styles.safeArea}>
                <AdsList />
            </SafeAreaView>
        </>
    );
};


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },

});

export default Ads;
