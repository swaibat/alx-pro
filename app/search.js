import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, ScrollView, TouchableOpacity, Image, ActivityIndicator, View, StatusBar } from 'react-native';
import { Appbar, Searchbar, List, Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cross, Dot, LineSegment, Link, MagnifyingGlass, Tilde, XCircle } from 'phosphor-react-native';
import { useGetProductsQuery, useGetViewedProductsQuery } from '@/api'; // Import the query hooks
import { Input, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native'; // Assuming you're using React Navigation
import { useRouter } from 'expo-router';

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const theme = useTheme();
    const navigation = useNavigation(); // Navigation hook
    const router = useRouter();

    const { data: productData, isLoading: productLoading } = useGetProductsQuery(
        searchQuery ? { name: searchQuery } : {},
        { skip: !searchQuery }
    );

    const searchSuggestions = productData?.data?.docs || [];

    const { data: recentlyViewedData, isLoading: recentlyViewedLoading } = useGetViewedProductsQuery();
    const recentlyViewedProducts = recentlyViewedData?.data?.docs || [];

    useEffect(() => {
        const loadRecentSearches = async () => {
            try {
                const savedSearches = await AsyncStorage.getItem('recentSearches');
                if (savedSearches) {
                    setRecentSearches(JSON.parse(savedSearches));
                }
            } catch (error) {
                console.error('Failed to load recent searches', error);
            }
        };
        loadRecentSearches();
    }, []);

    const updateRecentSearches = async (newSearch) => {
        if (!recentSearches.includes(newSearch)) {
            const updatedSearches = [newSearch, ...recentSearches];
            setRecentSearches(updatedSearches);
            await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        }
    };

    const onChangeSearch = (query) => {
        setSearchQuery(query);
        if (query.trim()) {
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSearch = (item) => {
        setSearchQuery(item.title);
        setShowSuggestions(false);
        updateRecentSearches(item.title);
    };

    const removeSearch = async (item) => {
        const updatedSearches = recentSearches.filter(search => search !== item);
        setRecentSearches(updatedSearches);
        await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    const highlightMatch = (title) => {
        if (!searchQuery) return title;

        const regex = new RegExp(`(${searchQuery})`, 'gi');
        const parts = title.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? (
                <Text key={index} style={{ fontWeight: 'bold', color: theme.colors.primary }}>{part}</Text>
            ) : (
                <Text key={index}>{part}</Text>
            )
        );
    };

    const renderSearchSuggestion = ({ item }) => (
        <List.Item
            title={() => (
                <View style={{ flexDirection: 'row', alignItems:'center' }}>
                    <View style={{ padding: 5, backgroundColor: 'gainsboro', marginRight: 10, borderRadius: 5 }}>
                        <MagnifyingGlass size={15} color="gray" />
                    </View>
                    <Text>{highlightMatch(item.title)} </Text>
                    <Tilde size={15} color="gray" />
                    <Text appearance="hint" style={{ fontSize: 11 }}>
                        {item?.categoryList?.length && item?.categoryList[item.categoryList.length - 1].name}
                    </Text>
                </View>
            )}
            onPress={() => handleSearch(item)}
            right={() => (
                item?.files?.length ? (
                    <Image
                        source={{ uri: item.files[0].url }}
                        style={{ width: 40, height: 40, borderRadius: 5 }}
                    />
                ) : null
            )}
            style={{ paddingVertical: 3 }}
        />
    );

    const renderRecentSearch = ({ item }) => (
        <List.Item
            title={item}
            left={() => <MagnifyingGlass size={20} />}
            right={() => (
                <TouchableOpacity onPress={() => removeSearch(item)}>
                    <XCircle size={24} />
                </TouchableOpacity>
            )}
            onPress={() => setSearchQuery(item)}
        />
    );

    // Navigate to search results screen when the search button is pressed
    const handleSearchButton = () => {
        if (searchQuery.trim()) {
            router.push({ pathname: `/ads/list`, params: { name: searchQuery } })
            updateRecentSearches(searchQuery);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="default" />
            <Appbar.Header style={{backgroundColor: '#111b2d'}}>
                <Appbar.BackAction  color={theme.colors.outlineVariant} onPress={()=>router.back()}/>
                <Input
                    placeholder="Search"
                    style={{ flex: 1 }}
                    accessoryLeft={() => <MagnifyingGlass size={24} />}
                    accessoryRight={() => (
                        productLoading ? (
                            <ActivityIndicator size="small" color="grey" style={{ marginLeft: 8 }} />
                        ) : searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <XCircle size={24} color="grey" style={{ marginLeft: 8 }} />
                            </TouchableOpacity>
                        )
                    )}
                    value={searchQuery}
                    onChangeText={onChangeSearch}
                />
                <Button onPress={handleSearchButton}>Search</Button>
            </Appbar.Header>

            {/* Autocomplete Suggestions */}
            {showSuggestions && searchSuggestions.length > 0 && (
                <FlatList
                    data={searchSuggestions}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={renderSearchSuggestion}
                    style={{ marginBottom: 20, backgroundColor: 'white', borderRadius: 8, padding: 10 }}
                />
            )}

            <View style={{ padding: 16 }}>
                {/* Recent Searches Section */}
                <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 18 }}>
                    Recent Searches
                </Text>
                {recentSearches.length > 0 ? (
                    <FlatList
                        data={recentSearches}
                        keyExtractor={(item) => item}
                        renderItem={renderRecentSearch}
                        style={{ marginBottom: 20 }}
                    />
                ) : (
                    <Text>No recent searches</Text>
                )}
            </View>
        </SafeAreaView>
    );
};

export default SearchScreen;
