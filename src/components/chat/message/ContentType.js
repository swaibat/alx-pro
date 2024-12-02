import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native'
import React from 'react'
import AppImg from '@/components/@ui/AppImg'
import { colors } from '@/constants/theme'

const ContentType = ({ item }) => {
  const { type, message, to } = item

  const renderImageContent = () => {
    const imageUrls = JSON.parse(message)
    return (
      <View>
        <View style={styles.imageGrid}>
          {imageUrls.map((url, index) => (
            <Image key={index} source={{ uri: url }} style={styles.image} />
          ))}
        </View>
        <Text style={[to ? styles.messageText : styles.myMessageText]}>
          {message}
        </Text>
      </View>
    )
  }

  const renderLocationContent = () => (
    <View>
      <TouchableOpacity
        onPress={() => Linking.openURL(message)}
        style={styles.locationContainer}
      >
        <Image source={{ uri: message }} style={styles.locationImage} />
      </TouchableOpacity>
      <Text style={[to ? styles.messageText : styles.myMessageText]}>
        {message}
      </Text>
    </View>
  )

  const renderTextContent = () => (
    <View style={{ paddingHorizontal: 7, paddingVertical: 3 }}>
      {item?.replyToMessage?.type === 'text' && (
        <View
          style={{
            flexWrap: 'nowrap',
            padding: 7,
            maxWidth: '100%',
            borderRadius: 15,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            minWidth: 100,
          }}
        >
          <Text style={{ fontWeight: 'bold', color: colors.primary }}>
            {item.replyToMessage?.to ? 'Support Team' : 'You'}
          </Text>
          <Text style={{ color: colors.grey[300] }}>
            {item.replyToMessage?.message}
          </Text>
        </View>
      )}
      <Text style={[to ? styles.messageText : styles.myMessageText]}>
        {message}
      </Text>
    </View>
  )
  const renderProductContent = () => (
    <View>
      <View
        style={[
          {
            flexWrap: 'nowrap',
            padding: 7,
            maxWidth: '85%',
            borderRadius: 15,
            flexDirection: 'row',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            minWidth: 250,
            gap: 10,
          },
        ]}
      >
        <AppImg
          src={item.replyToProductDetails?.thumbnail}
          style={styles.replyPreviewImage}
        />
        <View style={{ gap: 4, flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{ fontSize: 12, color: colors.grey[300] }}
          >
            {item.replyToProductDetails.title}
          </Text>
          <View style={styles.replyHeader}>
            <Text bold style={{ color: colors.primary }}>
              UGX {item.replyToProductDetails.price}
            </Text>
          </View>
        </View>
      </View>
      <Text style={[to ? styles.messageText : styles.myMessageText]}>
        {message}
      </Text>
    </View>
  )

  // Render based on the message type
  if (type === 'image') return renderImageContent()
  if (type === 'location') return renderLocationContent()
  if (item?.replyToProductDetails) return renderProductContent()
  return renderTextContent()
}

const styles = StyleSheet.create({
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  locationImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  messageText: {
    color: 'black',
    fontSize: 14,
  },
  myMessageText: {
    color: colors.grey[300],
    fontSize: 14,
  },
  replyPreviewImage: {
    width: 45,
    height: 45,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
})

export default ContentType
