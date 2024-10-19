import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import { ShoppingCart, MagnifyingGlass, XCircle } from 'phosphor-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { Appbar } from 'react-native-paper';
import AdsList from '@/components/products/GridView';


const Ads = () => {
    const { id, category, name } = useLocalSearchParams();
    console.log(name, id, category)
    const router = useRouter();

    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.length;

    const CartIconWithBadge = () => (
        <TouchableOpacity onPress={() => router.push('/cart')}>
            <View style={styles.cartIconContainer}>
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                    <View style={styles.cartCount}>
                        <Text style={styles.cartCountText}>{cartCount}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <Appbar.Header style={{ backgroundColor: "white", borderBottomWidth: 1, borderBottomColor: 'gainsboro' }}>
                <Appbar.BackAction onPress={() => router.back()} />
                {name ? <Input
                    placeholder="Search"
                    size='small'
                    style={{ flex: 1 }}
                    accessoryLeft={() => <MagnifyingGlass size={20} />}
                    accessoryRight={() => (
                        <TouchableOpacity onPress={() => router.push('search')}>
                            <XCircle size={20} color="grey" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>

                    )}
                    value={name}
                /> :
                    <>
                        <Appbar.Content title={category} />
                        <Appbar.Action
                            icon={({ color }) => (
                                <View style={styles.iconContainer}>
                                    <MagnifyingGlass size={24} color={color} />
                                </View>
                            )}
                            onPress={() => router.push('search')}
                        />
                    </>}
                <Appbar.Action
                    icon={({ color }) => (
                        <View style={styles.iconContainer}>
                            <CartIconWithBadge />
                        </View>
                    )}
                    onPress={() => { /* Handle shopping action */ }}
                />
            </Appbar.Header>

            <SafeAreaView style={styles.safeArea}>
                <AdsList />
            </SafeAreaView>
        </>
    );
};


const styles = StyleSheet.create({
    cartIconContainer: {
        position: 'relative',
    },
    cartCount: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#d32f2f',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartCountText: {
        color: 'white',
        fontSize: 12,
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        marginRight: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalTitle: {
        marginBottom: 10,
    },
    filterLabel: {
        marginTop: 15,
        marginBottom: 5,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioText: {
        marginLeft: 10,
        fontSize: 16,
    },
    priceRangeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priceInput: {
        width: '48%',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    productsContainer: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productCard: {
        width: '50%',
        backgroundColor: 'white',
        marginBottom: 2,
        borderRadius: 8,
        padding: 4,
    },
    productTitle: {
        fontSize: 15,
        // fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF5656',
        marginVertical: 5,
    },
    ratingContainer: {
        marginVertical: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'orange',
        marginLeft: 5,
    },
    soldText: {
        fontSize: 11,
        backgroundColor: 'gainsboro',
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 5,
        marginRight: 15,
    },

    filterButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 10,
        gap: 7,
        paddingVertical: 3,
        paddingBottom: 10,
        backgroundColor: 'white',
    },
    filterButton: {
        flex: 1,
        // marginHorizontal: 5,
    },
});

export default Ads;
