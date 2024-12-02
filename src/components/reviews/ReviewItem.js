import { View, Text } from 'react-native'
import React from 'react'
import { Star } from 'phosphor-react-native'
import { StyleSheet } from 'react-native'

const maskedName = name => {
  const nameParts = name.split(' ')
  const firstLetter = nameParts[0]?.charAt(0).toUpperCase()
  const lastLetter = nameParts[nameParts.length - 1]?.charAt(0).toUpperCase()
  return `${firstLetter}****${lastLetter}`
}

const renderStars = count =>
  [...Array(5)].map((_, i) => (
    <Star
      key={i}
      size={15}
      color={i < count ? '#FFCC00' : '#A9A9A9'}
      weight={i < count ? 'fill' : 'regular'}
    />
  ))

const ReviewItem = ({ item }) => {
  return (
    <View style={sx.reviewContainer} key={item._id}>
      <View style={sx.avatar}>
        <Text bold style={sx.avatarText}>
          {item.user?.name[0]}
        </Text>
      </View>
      <View style={sx.reviewContent}>
        <Text style={sx.username}>{maskedName(item.user.name)}</Text>
        <View style={sx.ratingContainer}>{renderStars(item.rating)}</View>
        <Text style={sx.reviewText}>{item.comment}</Text>
      </View>
    </View>
  )
}

export default ReviewItem

const sx = StyleSheet.create({
  reviewContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reviewContent: {
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontWeight: '500',
    fontSize: 14,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  reviewText: {
    fontSize: 13,
    color: '#333',
    marginBottom: 10,
  },
})
