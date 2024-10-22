import React from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import { ShoppingCart, MagnifyingGlass, X } from 'phosphor-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { Appbar } from 'react-native-paper';

const AppHeader = ({ name, title }) => {
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
            <StatusBar barStyle={'dark-content'} />
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => router.back()} />
                {name ? (
                    <Input
                        placeholder="Search"
                        style={{ flex: 1 }}
                        accessoryLeft={() => <MagnifyingGlass size={20} />}
                        accessoryRight={() => (
                            <TouchableOpacity onPress={() => router.push('search')}>
                                <X size={20} color="grey" style={{ marginLeft: 8 }} />
                            </TouchableOpacity>
                        )}
                        value={name}
                    />
                ) : (
                    <>
                        <Appbar.Content title={title} />
                        <Appbar.Action
                            icon={({ color }) => (
                                <View style={styles.iconContainer}>
                                    <MagnifyingGlass size={24} color={color} />
                                </View>
                            )}
                            onPress={() => router.push('search')}
                        />
                    </>
                )}
                <Appbar.Action
                    icon={({ color }) => (
                        <View style={styles.iconContainer}>
                            <CartIconWithBadge />
                        </View>
                    )}
                    onPress={() => router.push('cart')}
                />
            </Appbar.Header>
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
    header: {
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: 'gainsboro',
    },
});

export default AppHeader;
