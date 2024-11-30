import Divider from '@/components/@ui/Divider'
import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Animated, Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width

const AddressItemsLoader = () => {
  const shimmerValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const startShimmer = () => {
      shimmerValue.setValue(0)
      Animated.loop(
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start()
    }
    startShimmer()
  }, [shimmerValue])

  // Set max translateX based on the width of the placeholder
  const shimmerAnimation = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth, screenWidth],
  })

  const renderShimmerPlaceholder = () => (
    <View style={styles.card}>
      <View style={styles.addressRow}>
        <View style={styles.iconPlaceholder}>
          <Animated.View
            style={[
              styles.shimmerOverlay,
              { transform: [{ translateX: shimmerAnimation }] },
            ]}
          />
        </View>
        <View style={styles.textPlaceholder}>
          <Animated.View
            style={[
              styles.shimmerOverlay,
              { transform: [{ translateX: shimmerAnimation }] },
            ]}
          />
        </View>
        <View style={styles.labelPlaceholder}>
          <Animated.View
            style={[
              styles.shimmerOverlay,
              { transform: [{ translateX: shimmerAnimation }] },
            ]}
          />
        </View>
        <View style={styles.radioPlaceholder}>
          <Animated.View
            style={[
              styles.shimmerOverlay,
              { transform: [{ translateX: shimmerAnimation }] },
            ]}
          />
        </View>
      </View>
      <Divider style={{ marginTop: 5 }} />
      <View style={styles.actionRow}>
        <View>
          <View style={styles.infoRow}>
            <View style={styles.iconPlaceholder}>
              <Animated.View
                style={[
                  styles.shimmerOverlay,
                  { transform: [{ translateX: shimmerAnimation }] },
                ]}
              />
            </View>
            <View style={styles.infoTextPlaceholder}>
              <Animated.View
                style={[
                  styles.shimmerOverlay,
                  { transform: [{ translateX: shimmerAnimation }] },
                ]}
              />
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.iconPlaceholder}>
              <Animated.View
                style={[
                  styles.shimmerOverlay,
                  { transform: [{ translateX: shimmerAnimation }] },
                ]}
              />
            </View>
            <View style={styles.infoTextPlaceholder}>
              <Animated.View
                style={[
                  styles.shimmerOverlay,
                  { transform: [{ translateX: shimmerAnimation }] },
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )

  return (
    <View>
      {[...Array(3)].map((_, index) => (
        <View key={index} style={styles.itemContainer}>
          {renderShimmerPlaceholder()}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
  },
  card: {
    padding: 10,
    borderRadius: 5,
    // marginVertical: 7,
    borderWidth: 1,
    borderColor: '#E4E9F2',
    backgroundColor: '#FFFFFF',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E4E9F2',
    overflow: 'hidden',
    marginRight: 10,
  },
  textPlaceholder: {
    width: '60%',
    height: 15,
    backgroundColor: '#E4E9F2',
    borderRadius: 5,
    overflow: 'hidden',
  },
  labelPlaceholder: {
    width: 50,
    height: 20,
    backgroundColor: '#E4E9F2',
    borderRadius: 6,
    marginLeft: 'auto',
    overflow: 'hidden',
  },
  radioPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E4E9F2',
    marginLeft: 10,
    overflow: 'hidden',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  infoTextPlaceholder: {
    width: '80%',
    height: 15,
    backgroundColor: '#E4E9F2',
    borderRadius: 5,
    marginLeft: 10,
    overflow: 'hidden',
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.4)',
    opacity: 0.7,
  },
})

export default AddressItemsLoader
