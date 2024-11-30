import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { HandCoins } from 'phosphor-react-native'
import { theme } from '@/constants/theme'

const TextSlider = ({ installments, price }) => {
  const messages = [
    `Total. UGX ${price.toLocaleString()}`,
    `Pay Bal. in ${installments?.duration} Months`,
  ]

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      // Cycle through messages
      setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length)
    }, 5000) // Change text every 3 seconds

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Static Icon */}
        <HandCoins
          size={20}
          color={theme.colors.amber[600]}
          weight="fill"
          style={styles.icon}
        />
        {/* Dynamic Text */}
        <Text style={styles.text}>{messages[currentMessageIndex]}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 3,
  },
  text: {
    fontSize: 12,
    color: '#333',
  },
})

export default TextSlider
