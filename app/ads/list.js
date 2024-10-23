import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import AdsList from '@/components/products/AdsList'
import AppHeader from '@/components/_global/AppHeader'
import { Layout } from '@ui-kitten/components'

const Ads = () => {
  const { category } = useLocalSearchParams()

  return (
    <>
      <AppHeader title={category} />
      <Layout style={styles.safeArea}>
        <AdsList />
      </Layout>
    </>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default Ads
