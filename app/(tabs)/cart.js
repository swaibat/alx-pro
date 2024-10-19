import React from 'react';
import { ScrollView, View, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { Minus, Plus, Backspace, ShoppingCart, Phone } from 'phosphor-react-native'; // Import Phone icon from Phosphor
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateItemQuantity } from '@/store/cartSlice';
import useLogin from '@/hooks/useLogin';
import { useRouter } from 'expo-router';
import { Appbar, useTheme, Button } from 'react-native-paper'; // Import Appbar from Native Paper

const CartScreen = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const router = useRouter();
    const isLoggedIn = useLogin();

    // Get cart items from Redux store
    const cartItems = useSelector(state => state.cart.items);

    // Handle quantity changes for items in the cart
    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateItemQuantity({ id: item._id, quantity: newQuantity }));
        } else {
            handleRemoveItem(item);
        }
    };

    // Handle removing an item from the cart
    const handleRemoveItem = (item) => {
        dispatch(removeFromCart(item._id));
    };

    // Calculate the total price of selected items
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
        }, 0);
    };

    const renderCartItem = (item) => (
        <Layout style={{ marginBottom: 8, borderWidth: 1, borderColor: 'rgb(228, 233, 242)', borderRadius: 5, padding: 10 }} key={item._id}>
            <View style={styles.cartItem}>
                <Image
                    source={item.file ? { uri: item.file } : require('@/assets/placeholder.png')}
                    style={styles.productImage}
                />
                <View style={styles.productInfo}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 14, flexGrow: 1 }} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
                        <TouchableOpacity style={styles.removeIcon} onPress={() => handleRemoveItem(item)}>
                            <Backspace size={25} color={theme['color-basic-600']} />
                        </TouchableOpacity>
                    </View>
                    <Text appearance='hint' style={{ marginVertical: 2 }}>{`Qty: ${item.quantity || 1}`}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text category='s1' style={[styles.price, { color: theme.colors.primary }]}>UGX {item.price.toLocaleString()}</Text>
                        <View style={styles.quantityContainer}>
                            <Button
                                icon={'minus'}
                                // style={styles.quantityButton}
                                compact={true}
                                mode="outlined"
                                onPress={() => handleQuantityChange(item, item.quantity - 1)}  // Decrease quantity
                            />
                            <Text style={styles.quantity}>{item.quantity || 1}</Text>
                            <Button
                                mode="outlined"
                                icon={'plus'}
                                compact={true}
                                onPress={() => handleQuantityChange(item, item.quantity + 1)}  // Increase quantity
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Layout>
    );

    const renderEmptyCartMessage = () => (
        <View style={styles.emptyCartContainer}>
            <ShoppingCart size={48} color={theme['color-primary-default']} />
            <Text category='s1' style={styles.emptyCartText}>Your cart is empty!</Text>
            <Button mode="contained" onPress={() => router.push('/')}>
                Shop Now
            </Button>
        </View>
    );

    // Function to call support
    const callSupport = () => {
        const phoneNumber = 'tel:0200922167'; // Replace with the actual support phone number
        Linking.openURL(phoneNumber).catch(err => console.error("Error calling support:", err));
    };

    return (
        <Layout style={styles.container}>
            <Appbar.Header style={{  paddingRight: 15 }}>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title={<Text style={{fontSize:18}}>My Cart</Text>} />
                <View style={styles.contactContainer}>
                    <Phone
                        size={24}
                        // color={theme.colors.primary}
                        onPress={() => callSupport()}
                    />
                    <Text style={styles.contactText} >0200922167</Text>
                </View>
            </Appbar.Header>

            {cartItems.length === 0 ? (
                renderEmptyCartMessage()
            ) : (
                <>
                    <ScrollView style={{ padding: 15 }}>
                        {cartItems.map(renderCartItem)}
                    </ScrollView>
                    <Layout style={styles.footer}>
                        <View>
                            <Text category='s1'>Total</Text>
                            <Text category='h6' style={{ color: theme.colors.primary }}>
                                UGX {getTotalPrice().toLocaleString()}
                            </Text>
                        </View>
                        <Button mode="contained" style={styles.checkoutButton} onPress={() => router.push(isLoggedIn ? 'checkout' : {pathname:'login',params:{ref:'checkout'}})}>
                            Checkout
                        </Button>
                    </Layout>
                </>
            )}
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    appbar: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gainsboro'
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
        position: 'relative',
    },
    removeIcon: {
        marginLeft: 10,
        zIndex: 1,
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 16,
        borderRadius: 5,
    },
    productInfo: {
        flex: 1,
    },
    price: {
        fontWeight: 'bold',
        marginTop: 4,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 1,
    },
    quantityButton: {
        width: 20,
        borderRadius:3,
        justifyContent:'center',
        alignItems: 'center',
        height: 25,
    },
    quantity: {
        marginHorizontal: 16,
        fontWeight: 'bold'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#EDF1F7',
    },
    checkoutButton: {
        width: 120,
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyCartText: {
        marginTop: 16,
        marginBottom: 32,
        fontSize: 18,
        color: '#8F9BB3',
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CartScreen;
