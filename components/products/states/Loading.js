import { useTheme, Layout } from '@ui-kitten/components'
import { View, StyleSheet } from 'react-native'
import Placeholder from '@/assets/Placeholder'

const CategorySkeletonLoader = () => {
  const theme = useTheme()
  return (
    <Layout style={styles.safeArea}>
      {[...Array(6)].map((_, index) => (
        <View style={styles.skeletonCard} key={index}>
          <View
            style={[
              styles.skeletonImageContainer,
              { backgroundColor: theme['color-basic-400'] },
            ]}
          >
            <Placeholder />
          </View>
          <View
            style={[
              styles.skeletonText,
              { backgroundColor: theme['color-basic-400'] },
            ]}
          />
          <View
            style={[
              styles.skeletonTextSmall,
              { backgroundColor: theme['color-basic-400'] },
            ]}
          />
          <View
            style={[
              styles.skeletonPrice,
              { backgroundColor: theme['color-basic-400'] },
            ]}
          />
        </View>
      ))}
    </Layout>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  skeletonCard: {
    width: '48%',
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  skeletonImageContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
    height: 180,
  },
  skeletonImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  skeletonText: {
    width: '80%',
    height: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 5,
  },
  skeletonTextSmall: {
    width: '60%',
    height: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginBottom: 5,
  },
  skeletonPrice: {
    width: '50%',
    height: 14,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
})

export default CategorySkeletonLoader
