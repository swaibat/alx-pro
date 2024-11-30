import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import PagerView from 'react-native-pager-view'
import Placeholder from '@/assets/Placeholder'

const ProductImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const handlePageChange = event => {
    setCurrentIndex(event.nativeEvent.position)
  }

  const renderDots = () => {
    return images.map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          index === currentIndex ? styles.activeDot : styles.inactiveDot,
        ]}
      />
    ))
  }
  return images.length ? (
    <View>
      <PagerView
        style={styles.viewPager}
        onPageSelected={handlePageChange}
        initialPage={0}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ))}
      </PagerView>
      <View style={styles.dotsContainer}>{renderDots()}</View>
    </View>
  ) : (
    <View style={styles.placeholder}>
      <Placeholder />
    </View>
  )
}

const styles = StyleSheet.create({
  viewPager: { height: 300, width: '100%' },
  imageContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  placeholder: { height: 300, justifyContent: 'center', alignItems: 'center' },
  dotsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopRightRadius: 10,
    padding: 10,
    paddingVertical: 5,
    bottom: 20,
    right: 0,
  },
})

export default ProductImageCarousel
