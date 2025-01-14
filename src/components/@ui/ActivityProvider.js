import React from 'react'
import { useFocusEffect } from 'expo-router'

const ActivityProvider = () => {
  useFocusEffect(() => {
    console.log('Screen focused11')
  })
}

export default ActivityProvider
