import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppImg from '@/components/@ui/AppImg'
import { Linking } from 'react-native'
import { colors } from '@/constants/theme'
import { MapPin } from 'phosphor-react-native'
import { Text } from '@/components/@ui/Text'

const LocationContent = ({ to, message, replyToMessage }) => {
  if (
    !(
      replyToMessage?.message?.startsWith('https') ||
      message?.startsWith('https')
    )
  ) {
    return null
  }

  return (
    <View>
      {replyToMessage?.type === 'location' ? (
        <View style={styles.replyContainer}>
          <View>
            <Text style={styles.replySender}>
              {replyToMessage?.to ? 'Support Team' : 'You'}
            </Text>
            <View
              style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }}
            >
              <MapPin
                size={16}
                color={to ? colors.grey[900] : colors.grey[400]}
                weight="duotone"
              />
              <Text style={{ color: to ? colors.grey[900] : colors.grey[400] }}>
                Location
              </Text>
            </View>
          </View>
          <View style={[styles.locationContainer, { width: 40, height: 40 }]}>
            <AppImg
              src={replyToMessage.message}
              style={[
                styles.locationImage,
                { borderRadius: 7, width: 40, height: 40 },
              ]}
            />
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => Linking.openURL(message)}
          style={styles.locationContainer}
        >
          <AppImg src={message} style={styles.locationImage} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default LocationContent

const styles = StyleSheet.create({
  locationContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  locationImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  messageText: {
    color: 'black',
    fontSize: 14,
  },
  myMessageText: {
    color: 'grey',
    fontSize: 14,
  },
  replySender: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  replyContainer: {
    flexDirection: 'row',
    minWidth: 150,
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    padding: 5,
    paddingHorizontal: 10,
    maxWidth: '100%',
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginBottom: 5,
  },
})
