import React from 'react'
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { Text } from '@/components/@ui/Text'
import { theme } from '@/constants/theme'

const { height: deviceHeight } = Dimensions.get('window')

const Loading = ({ text }) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="small" color={theme.colors.orange[500]} />
      <Text style={styles.loadingText}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'white',
    height: deviceHeight - 150,
  },
  loadingText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 12,
  },
  retryButton: {
    marginTop: 10,
  },
})

export default Loading
