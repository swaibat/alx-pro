import React from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  PaperPlaneRight,
  Camera,
  MapPin,
  X,
  Image as ImgIcon,
} from 'phosphor-react-native'
import { colors, theme } from '@/constants/theme'
import Divider from '@/components/@ui/Divider'
import { Text } from '../@ui/Text'
import { Image } from 'react-native'

const InputContainer = ({
  setNewMessage,
  newMessage,
  handleSendMessage,
  handleSendLocation,
  handleSendImage,
  replyingTo,
  clearReplyingTo,
}) => {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {replyingTo?.type && (
        <View
          style={{
            backgroundColor: colors.grey[300],
            borderTopColor: colors.grey[400],
            borderTopWidth: 0.8,
            paddingHorizontal: 15,
            paddingVertical: 7,
          }}
        >
          <View style={styles.replyingContainer}>
            {replyingTo?.type === 'image' ? (
              <View
                style={[
                  styles.imageGrid,
                  {
                    backgroundColor: colors.grey[50],
                    flexWrap: 'nowrap',
                    gap: 10,
                    flex: 1,
                    padding: 7,
                    borderRadius: 5,
                  },
                ]}
              >
                <View>
                  <Text bold style={{ color: colors.primary }}>
                    {replyingTo.to ? 'Support Team' : 'You'}
                  </Text>
                  <View style={styles.replyHeader}>
                    <ImgIcon size={18} style={styles.replyIcon} />
                    <Text style={styles.replyLabel}>Photo</Text>
                  </View>
                </View>

                {/* Display images */}
                <View style={{ flexDirection: 'row', gap: 3 }}>
                  {JSON.parse(replyingTo?.message).map((url, index) => (
                    <Image
                      key={index}
                      source={{ uri: url }}
                      style={styles.replyPreviewImage}
                    />
                  ))}
                </View>
              </View>
            ) : replyingTo?.type === 'location' ? (
              <View
                style={[
                  styles.imageGrid,
                  {
                    flexWrap: 'nowrap',
                    backgroundColor: colors.grey[50],
                    flex: 1,
                    padding: 7,
                    borderRadius: 5,

                    gap: 10,
                  },
                ]}
              >
                <View>
                  <Text bold style={{ color: colors.primary }}>
                    {replyingTo.to ? 'Support Team' : 'You'}
                  </Text>
                  <View style={styles.replyHeader}>
                    <MapPin size={18} style={styles.replyIcon} />
                    <Text style={styles.replyLabel}>Location</Text>
                  </View>
                </View>

                {/* Display images */}
                <Image
                  source={{ uri: replyingTo?.message }}
                  style={styles.replyPreviewImage}
                />
              </View>
            ) : replyingTo?.type === 'product' ? (
              <View
                style={[
                  {
                    flexWrap: 'nowrap',
                    backgroundColor: colors.grey[50],
                    flex: 1,
                    padding: 7,
                    borderRadius: 5,
                    flexDirection: 'row',
                    gap: 10,
                  },
                ]}
              >
                <Image
                  source={
                    replyingTo?.message?.thumbnail
                      ? { uri: replyingTo.message.thumbnail }
                      : require('@/assets/images/placeholder.png')
                  }
                  style={styles.replyPreviewImage}
                />
                <View style={{ gap: 4 }}>
                  <Text numberOfLines={1}>{replyingTo.message.title}</Text>
                  <View style={styles.replyHeader}>
                    <Text bold style={{ color: colors.primary }}>
                      UGX {replyingTo.message.price}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={[
                  styles.replyingTo,
                  {
                    backgroundColor: colors.grey[50],
                    flex: 1,
                    padding: 7,
                    borderRadius: 5,
                  },
                ]}
              >
                <Text style={styles.replyingToText}>{replyingTo.message}</Text>
              </View>
            )}
            {/* X Icon to revoke reply */}
            <TouchableOpacity
              onPress={clearReplyingTo}
              style={styles.clearReplyButton}
            >
              <X size={15} weight="light" color={theme.colors.grey[50]} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.inputContainer}>
        {/* Location Button */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 20,
            paddingHorizontal: 7,
            backgroundColor: '#f0f0f0',
          }}
        >
          <TouchableOpacity
            onPress={handleSendLocation}
            style={styles.iconButton}
          >
            <MapPin size={24} color={theme.colors.grey[700]} />
          </TouchableOpacity>
          <Divider
            type="vertical"
            color={theme.colors.grey[700]}
            style={{ height: 20, marginHorizontal: 4 }}
          />

          <TextInput
            style={styles.input}
            value={newMessage}
            multiline
            placeholderTextColor={theme.colors.grey[700]}
            onChangeText={setNewMessage}
            keyboardAppearance="dark"
            placeholder="Type a message..."
          />
          <TouchableOpacity onPress={handleSendImage} style={styles.iconButton}>
            <Camera size={24} color={theme.colors.grey[700]} />
          </TouchableOpacity>
        </View>

        {/* Send Message Button */}
        <TouchableOpacity
          onPress={handleSendMessage}
          disabled={!newMessage.trim()}
          style={[
            styles.sendButton,
            !newMessage.trim() && styles.sendButtonDisabled,
          ]}
        >
          <PaperPlaneRight size={22} color="white" weight="fill" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopWidth: 0.8,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 'auto',
    minHeight: 40,
    borderRadius: 20,
    paddingHorizontal: 3,
    backgroundColor: '#f0f0f0',
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  iconButton: {
    padding: 2,
  },
  replyContainer: { marginBottom: 5 },
  replyText: { color: '#555' },
  replyingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  replyingTo: {
    flex: 1,
  },
  replyingToText: { fontSize: 14 },
  clearReplyButton: {
    backgroundColor: theme.colors.grey[700],
    position: 'absolute',
    right: -7,
    top: -5,
    // marginLeft: 10,
    padding: 2,
    borderRadius: 3,
  },
  imageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  replyPreviewImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 5,
  },
  sendButtonDisabled: {
    backgroundColor: colors.orange[400],
    opacity: 0.6,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 5,
  },
})

export default InputContainer
