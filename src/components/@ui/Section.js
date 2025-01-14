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
  large,
  paddingHorizontal,
}) => {
  return (
    <View style={styles.container({ borderBottom, borderTop })}>
      <View style={styles.header(title)}>
        <Text
          style={[
            styles.headerText,
            large ? styles.largeHeader : styles.smallHeader,
          ]}
        >
          {title}
        </Text>
        <View>{actionBtn}</View>
      </View>
      <View
        style={[styles.content, { paddingHorizontal: paddingHorizontal || 15 }]}
      >
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: ({ borderBottom, borderTop }) => ({
    borderBottomColor: colors.grey[200],
    borderTopColor: colors.grey[200],
    paddingVertical: 7,

    borderBottomWidth: borderBottom ? 10 : 0,
    borderTopWidth: borderTop ? 10 : 0,
  }),
  header: title => ({
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 5,
    borderBottomWidth: 0.7,
    borderBottomColor: colors.grey[300],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    minHeight: title ? 26 : 0,
  }),
  headerText: {
    textTransform: 'capitalize',
    fontSize: 13,
    fontWeight: '500',
  },
  largeHeader: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  smallHeader: {
    fontSize: 13,
    fontWeight: '500',
  },
  content: {
    paddingVertical: 15,
    // paddingHorizontal: 15,
  },
})

export default Section
