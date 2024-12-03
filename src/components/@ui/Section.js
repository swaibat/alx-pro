import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@/components/@ui/Text'
import { colors } from '@/constants/theme'

const Section = ({
  title,
  borderBottom = true,
  borderTop,
  children,
  actionBtn,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomWidth: borderBottom ? 10 : 0,
          borderTopWidth: borderTop ? 10 : 0,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <View>{actionBtn}</View>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.grey[200],
    borderTopColor: colors.grey[200],
    paddingVertical: 7,
  },
  header: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 5,
    borderBottomWidth: 0.7,
    borderBottomColor: colors.grey[300],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    textTransform: 'capitalize',
    fontSize: 13,
    fontWeight: '500',
  },
  content: {
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
})

export default Section
