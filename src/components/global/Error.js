import React from 'react'
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import { Text } from '@/components/@ui/Text'
import { Button } from '@/components/@ui/Button'
import { ArrowClockwise } from 'phosphor-react-native'

// Get the device height
const { height: deviceHeight } = Dimensions.get('window')

const ErrorScreen = ({ refetch }) => {
  return (
    <View style={styles.errorContainer}>
      <Image
        source={require('@/assets/images/error.png')}
        style={styles.errorImg}
      />
      <Text secondary style={styles.errorText}>
        An unknown error occurred. Please try again later.
      </Text>
      <Button
        iconLeft={<ArrowClockwise size={13} color={'white'} weight="bold" />}
        onPress={refetch}
        style={styles.retryButton}
        title="Retry"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    backgroundColor: 'white',
    height: deviceHeight - 100,
  },
  errorText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 10,
  },
  errorImg: {
    width: 160,
    height: 160,
    marginBottom: 10,
  },
})

export default ErrorScreen
