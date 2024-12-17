import React from 'react'
import { Dimensions, StyleSheet, View, ScrollView } from 'react-native'
import Input from '@/components/@ui/Input'
import { useRouter } from 'expo-router'
import Logo from '@/assets/Logo'
import { Text } from '@/components/@ui/Text'
import { colors, theme } from '@/constants/theme'
import useLocationData from '@/hooks/useLocationData'

const HEADER_HEIGHT = 150
const SCREEN_WIDTH = Dimensions.get('window').width

export default function ParallaxScrollView({ children, headerImage }) {
  const router = useRouter()
  const localeData = useLocationData()

  return (
    <View style={styles.container}>
      {/* Static Header */}
      <View style={styles.inputContainer}>
        <View style={styles.xBackground}>
          <View style={styles.xDiagonal} />
          <View style={[styles.xDiagonal, styles.xDiagonalReverse]} />
        </View>
        <View style={styles.headerRow}>
          <View style={styles.logoContainer}>
            <Logo />
          </View>
          {localeData && (
            <View style={styles.location}>
              <Text style={styles.emoji}>{localeData?.emoji}</Text>
              <Text style={styles.locationText}>{localeData?.name}</Text>
            </View>
          )}
        </View>
        <Input
          placeholder="Search..."
          onFocus={() => router.push('/search')}
          textStyle={styles.inputText}
          suffix={
            <View style={styles.suffixContainer}>
              <View style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
              </View>
            </View>
          }
          style={styles.inputStyle}
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.header}>{headerImage}</View>
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: colors.orange[500],
    zIndex: 1,
    paddingHorizontal: 15,
    paddingBottom: 5,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    paddingTop: 30,
  },
  logoContainer: {
    width: 40,
  },
  location: {
    backgroundColor: colors.orange[400],
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 3,
    borderWidth: 0.9,
    borderColor: colors.orange[700],
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.sm,
  },
  locationText: {
    color: colors.grey[200],
    // lineHeight: 14,
  },
  suffixContainer: {
    flexDirection: 'row',
    marginRight: -2,
    gap: theme.spacing.sm,
  },
  searchButton: {
    backgroundColor: 'black',
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    paddingHorizontal: 10,
  },
  searchButtonText: {
    color: 'white',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '95%',
    marginHorizontal: 'auto',
    borderRadius: 10,
    marginTop: 20,
  },
  content: {
    flex: 1,
    gap: 16,
    overflow: 'hidden',
  },
  xBackground: {
    position: 'absolute',
    width: SCREEN_WIDTH * 2,
    height: HEADER_HEIGHT * 2,
    top: -HEADER_HEIGHT / 2,
    left: -SCREEN_WIDTH / 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  xDiagonal: {
    position: 'absolute',
    width: '150%',
    height: 80,
    backgroundColor: colors.orange[900],
    transform: [{ rotate: '45deg' }],
  },
  xDiagonalReverse: {
    transform: [{ rotate: '-45deg' }],
  },
  inputText: {
    fontSize: 15,
    color: 'black',
  },
  inputStyle: {
    borderColor: 'white',
  },
  scrollContentContainer: {
    paddingTop: HEADER_HEIGHT,
    flexGrow: 1,
  },
})
