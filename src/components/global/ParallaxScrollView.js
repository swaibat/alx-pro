import React from 'react';
import { Dimensions, StyleSheet, View, ScrollView } from 'react-native';
import Input from '@/components/@ui/Input';
import { useRouter } from 'expo-router';
import Logo from '@/assets/Logo';
import { Text } from '@/components/@ui/Text';
import { colors, theme } from '@/constants/theme';

const HEADER_HEIGHT = 150;
const MIN_HEADER_HEIGHT = 95;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ParallaxScrollView({ children, headerImage }) {
  const router = useRouter();

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
          <View style={styles.location}>
            <Text style={styles.locationText}>uganda</Text>
          </View>
        </View>
        <Input
          placeholder="Search..."
          onFocus={() => router.push('/search')}
          textStyle={{ fontSize: 15, color: 'black' }}
          suffix={
            <View style={styles.suffixContainer}>
              <View style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
              </View>
            </View>
          }
          style={{ borderColor: 'white' }}
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT, flexGrow: 1 }}
      >
        <View style={styles.header}>{headerImage}</View>
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </View>
  );
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
    height: HEADER_HEIGHT, // Fixed height
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
    paddingTop: 15,
  },
  logoContainer: {
    width: 40,
  },
  location: {
    backgroundColor: colors.orange[400],
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 5,
    justifyContent: 'center',
    borderRadius: theme.borderRadius.sm,
  },
  locationText: {
    color: colors.grey[200],
    lineHeight: 14,
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
    width: SCREEN_WIDTH * 2, // Extend beyond the screen for visibility
    height: HEADER_HEIGHT * 2,
    top: -HEADER_HEIGHT / 2,
    left: -SCREEN_WIDTH / 5, // Center the "X"
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1, // Ensure it appears above the input container
  },
  xDiagonal: {
    position: 'absolute',
    width: '150%',
    height: 80, // Wide stroke
    backgroundColor: colors.orange[900], // Translucent white
    transform: [{ rotate: '45deg' }],
  },
  xDiagonalReverse: {
    transform: [{ rotate: '-45deg' }],
  },
});
