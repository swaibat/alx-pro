import React from 'react'
import { View, StyleSheet } from 'react-native'
import PagerView from 'react-native-pager-view'
import Placeholder from '@/assets/Placeholder'
import { colors } from '@/constants/theme'
import AppImg from '@/components/@ui/AppImg'

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
    <View style={styles.carouselContainer}>
      <PagerView
        style={styles.viewPager}
        onPageSelected={handlePageChange}
        initialPage={0}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <AppImg src={image} style={styles.image} />
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
  carouselContainer: {
    position: 'relative',
    // height: 400,
    width: '100%',
  },
  viewPager: {
    height: 400,
    width: '100%',
    borderBottomWidth: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  dotsContainer: {
    position: 'absolute',
    backgroundColor: colors.grey[200],
    borderWidth: 5,
    borderColor: 'white',

    bottom: -5,
    left: -5,
    width: 'auto',
    padding: 10,
    // borderRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#ccc',
  },
  activeDot: {
    backgroundColor: '#000',
    width: 20,
  },
  inactiveDot: {
    backgroundColor: colors.grey[500],
  },
})

export default ProductImageCarousel
