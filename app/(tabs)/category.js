import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useGetCategoriesQuery } from '@/api';
import { useRouter } from 'expo-router';
import { Layout, Menu, MenuGroup, MenuItem, Drawer, DrawerItem, Divider, useTheme } from '@ui-kitten/components';
import { Stack } from 'expo-router';
import { Appbar, Button } from 'react-native-paper';
import { MagnifyingGlass, ShoppingCart } from 'phosphor-react-native';


// Skeleton Loader Component
const SkeletonLoader = () => {
    const getRandomWidth = () => `${Math.floor(Math.random() * 71) + 30}%`; // Generate random widths between 20% and 90%
    const theme = useTheme()
    return (
        <View style={styles.skeletonContainer}>
            {/* Simulate skeleton for the category items */}
            <View style={styles.sidebar}>
                {[...Array(15)].map((_, index) => (
                    <View key={index} style={[styles.skeletonCategory, { backgroundColor: theme['color-basic-400'] }]} />
                ))}
            </View>
            {/* Simulate skeleton for the subcategory items */}
            <View style={styles.skeletonSubcategories}>
                {[...Array(10)].map((_, index) => (
                    <View key={index} style={[styles.skeletonSubcategory, { backgroundColor: theme['color-basic-400'], width: getRandomWidth() }]} />
                ))}
            </View>
        </View>
    );
};
const CategorySreen = ({ route }) => {
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [expandedSubcategory, setExpandedSubcategory] = useState(null);
    const { data, isLoading, error, refetch } = useGetCategoriesQuery();
    const [selectedIndex, setSelectedIndex] = useState({ row: route?.params?.index || 0 });
    const router = useRouter();

    useEffect(() => {
        if (route?.params?.category) {
            setExpandedCategory(route.params.category);
        } else if (data?.data && data.data.length > 0) {
            // Set the first category as the default expanded category
            setExpandedCategory(data.data[0].id);
        }
    }, [route?.params, data]);

    const toggleCategory = (categoryId) => {
        setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
        setExpandedSubcategory(null); // Reset subcategory state when changing categories
    };

    const renderSubcategories = (category) => {
        if (!category || !category.children) return null;

        return category.children.map((subcategory) => (
            <MenuItem
                title={subcategory.name}
                key={subcategory.id}
                onPress={() => router.push({ pathname: `/ads/list`, params: { categoryId: subcategory.id, category: subcategory.name } })}
            />
        ));
    };

    return (
        <>
            <Appbar.Header style={{ backgroundColor: "white", borderBottomWidth: 1, borderBottomColor: 'gainsboro' }}>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Categories" />
                <Appbar.Action
                    icon={({ color }) => (
                        <View style={styles.iconContainer}>
                            <MagnifyingGlass size={24} color={color} />
                        </View>
                    )}
                    onPress={() => router.push('search')}
                />

            </Appbar.Header>
            {error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Error fetching categories. Please try again.</Text>
                    <Button mode="contained" onPress={refetch} >Retry</Button>
                </View>
            ) : isLoading ? (
                <SkeletonLoader />
            ) : (
                <View style={styles.container}>
                    <Layout style={styles.sidebar}>
                        {data?.data && (
                            <Drawer
                                selectedIndex={selectedIndex}
                                onSelect={(index) => setSelectedIndex(index)}
                            >
                                {data.data.map((item) => (
                                    <DrawerItem
                                        style={styles.categoryItem}
                                        key={item.id}
                                        title={item.name}
                                        onPress={() => toggleCategory(item.id)}
                                    />
                                ))}
                            </Drawer>
                        )}
                    </Layout>
                    <Menu style={styles.subcategoryView}>
                        {expandedCategory && renderSubcategories(data.data.find((category) => category.id === expandedCategory))}
                    </Menu>
                </View>
            )}
        </>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    sidebar: {
        width: 130,
        padding: 10,
        backgroundColor: '#fff',
        borderRightWidth: 1,
        borderRightColor: '#ddd',
    },
    categoryItem: {
        paddingVertical: 10,
    },
    subcategoryView: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    // Skeleton Loader Styles
    skeletonContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    skeletonCategory: {
        width: '100%',
        height: 40,
        marginBottom: 10,
        borderRadius: 5,
    },
    skeletonSubcategories: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    skeletonSubcategory: {
        height: 20,
        marginBottom: 10,
        borderRadius: 5,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        marginBottom: 10,
    },
});

export default CategorySreen;
