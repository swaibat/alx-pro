import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ArrowLeft } from 'phosphor-react-native'
import { colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
import { Platform, StatusBar as RNStatusBar } from 'react-native'

const TopNav = ({ title }) => {
  const router = useRouter()
  const statusBarHeight =
    Platform.OS === 'android' ? RNStatusBar.currentHeight : 0

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.black} weight="bold" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>{title}</Text>
      </View>
    </View>
  )
}

export default TopNav

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    backgroundColor: 'white',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
})
