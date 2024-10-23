import React from 'react'
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useGetRelatedProductsQuery } from '@/api'
import { useNavigation } from '@react-navigation/native'
import Placeholder from '@/assets/Placeholder'
import { useTheme } from '@ui-kitten/components'

const ProductCard = ({ imageUrl, id, name, price, location }) => {
  const router = useNavigation()
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => router.navigate(`AdDetails`, { id })}
      >
        <Image
          source={
            imageUrl ? { uri: imageUrl } : require('@/assets/placeholder.png')
          }
          style={styles.image}
        />
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <Text style={styles.price} numberOfLines={1}>
            UGX {price?.toLocaleString()}
          </Text>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.location}>{location?.streetName || '224'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const LoadingGridCard = ({ theme }) => (
  <View style={[styles.card, { flexDirection: 'row', width: 300 }]}>
    <View
      style={[
        styles.imagePlaceholder,
        { backgroundColor: theme['color-basic-300'] },
      ]}
    >
      <Placeholder />
    </View>
    <View style={{ flex: 1, padding: 10 }}>
      <View
        style={[
          styles.textPlaceholder,
          {
            width: '95%',
            height: 30,
            backgroundColor: theme['color-basic-300'],
          },
        ]}
      />
      <View
        style={[
          styles.textPlaceholder,
          { width: '50%', backgroundColor: theme['color-basic-300'] },
        ]}
      />
      <View
        style={[
          styles.textPlaceholder,
          { width: '30%', backgroundColor: theme['color-basic-300'] },
        ]}
      />
    </View>
  </View>
)

const RelatedProducts = ({ productId }) => {
  const { data, isLoading, error } = useGetRelatedProductsQuery(productId)
  const theme = useTheme()

  if (!isLoading) {
    return (
      <View style={{ paddingHorizontal: 15 }}>
        <Text style={styles.heading}>You may also like</Text>
        <FlatList
          data={Array(4).fill(0)} // Render 4 skeleton loaders
          keyExtractor={(item, index) => `skeleton-${index}`}
          renderItem={() => <LoadingGridCard theme={theme} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    )
  }

  return (
    <View style={{ paddingHorizontal: 15 }}>
      <Text style={styles.heading}>You may also like</Text>
      <FlatList
        data={data?.data}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <ProductCard
            imageUrl={item.imageUrl}
            id={item._id}
            name={item.title}
            price={item.price}
            location={item.store?.location}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 10,
    height: 140,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 10,
  },
  image: {
    height: 120,
    width: 120,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  location: {
    fontSize: 12,
    color: '#777',
  },
  imagePlaceholder: {
    height: 120,
    width: 120,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 10,
  },
  textPlaceholder: {
    height: 20,
    width: '80%',
    borderRadius: 5,
    marginBottom: 5,
  },
})

export default RelatedProducts
