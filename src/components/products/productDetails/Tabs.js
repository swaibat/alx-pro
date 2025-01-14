import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Text } from '@/components/@ui/Text'
import ProductSpecifications from '@/components/products/ProductSpecs'
import ReviewsScreen from '@/components/products/reviews/ReviewsOverView'

const Tabs = ({ activeTab, setActiveTab, product }) => (
  <View>
    <View style={styles.tabContainer}>
      {['overview', 'reviews'].map(tab => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => setActiveTab(tab)}
        >
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.tabContent}>
      {activeTab === 'overview' && <ProductSpecifications product={product} />}
      {activeTab === 'reviews' && <ReviewsScreen data={product?.review} />}
    </View>
  </View>
)

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  tab: { padding: 10 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: 'blue' },
  tabText: { fontSize: 16 },
  activeTabText: { color: 'blue' },
  tabContent: { padding: 10 },
})

export default Tabs
