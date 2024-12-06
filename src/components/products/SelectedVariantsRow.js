import { colors } from '@/constants/theme'
import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'

const SelectedVariantsRow = ({ selectedVariants }) => {
  const variantKeys = selectedVariants ? Object.keys(selectedVariants) : []
  const hasVariants = variantKeys.length > 0

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {hasVariants ? (
        variantKeys.map((key, index) => (
          <React.Fragment key={key}>
            <View style={styles.variantItem}>
              <Text style={styles.variantName}>{key.split('(')[0]}:</Text>
              {isImageUri(selectedVariants[key]) ? (
                <Image
                  source={{ uri: selectedVariants[key] }}
                  style={styles.variantImage}
                />
              ) : (
                <Text style={styles.variantValue}>{selectedVariants[key]}</Text>
              )}
            </View>
            {index < variantKeys.length - 1 && (
              <View style={styles.verticalDivider} />
            )}
          </React.Fragment>
        ))
      ) : (
        <Text style={styles.variantValue}>Default option</Text>
      )}
    </ScrollView>
  )
}

const isImageUri = value => {
  return typeof value === 'string' && value.startsWith('http')
}

const styles = StyleSheet.create({
  scrollContainer: {
    marginVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 3,
    backgroundColor: colors.grey[100],
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  variantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: 8,
  },
  variantName: {
    fontWeight: '500',
    marginRight: 4,
  },
  variantValue: {
    color: colors.grey[700],
    fontSize: 12,
  },
  variantImage: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  verticalDivider: {
    width: 1,
    height: '70%',
    backgroundColor: '#ddd',
    marginHorizontal: 8,
  },
})

export default SelectedVariantsRow
