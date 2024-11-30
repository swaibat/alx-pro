import { colors } from '@/constants/theme'
import { View, StyleSheet } from 'react-native'

const CategorySkeletonLoader = () => {
  const getRandomWidth = () => `${Math.floor(Math.random() * 71) + 30}%`
  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.sidebar}>
        {[...Array(15)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.skeletonCategory,
              { backgroundColor: colors.grey[300] },
            ]}
          />
        ))}
      </View>
      <View style={styles.skeletonSubcategories}>
        {[...Array(10)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.skeletonSubcategory,
              {
                backgroundColor: colors.grey[300],
                width: getRandomWidth(),
              },
            ]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  sidebar: {
    width: 130,
    padding: 10,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
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
})

export default CategorySkeletonLoader
