import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@/components/@ui/Text' // Adjust this import based on your project structure

const JustBought = ({ name = 'doe' }) => {
  const randomColor = getRandomDullColor()

  return (
    <View style={styles.container}>
      <View style={[styles.avatarContainer, { backgroundColor: randomColor }]}>
        <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
      </View>
      <Text
        style={styles.justBoughtText}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {`just bought`}
      </Text>
    </View>
  )
}

// Function to generate a random dull color
const getRandomDullColor = () => {
  const r = Math.floor(Math.random() * 128) // Range 0-127 for dull colors
  const g = Math.floor(Math.random() * 128) // Range 0-127 for dull colors
  const b = Math.floor(Math.random() * 128) // Range 0-127 for dull colors
  return `rgb(${r}, ${g}, ${b})`
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5, // Space between this and other elements
  },
  avatarContainer: {
    width: 15, // Avatar size
    height: 15, // Avatar size
    borderRadius: 12, // Circle shape
    backgroundColor: '#d1d1d1', // Background color for the avatar
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5, // Space between avatar and text
  },
  avatarText: {
    fontSize: 8, // Tiny size for avatar text
    color: '#fff', // Text color for contrast
    fontWeight: 'bold',
    lineHeight: 14,
    // marginLeft: 2,
  },
  justBoughtText: {
    fontSize: 10, // Adjust size for the main text
    fontWeight: 'light', // Bold for emphasis
  },
})

export default JustBought
