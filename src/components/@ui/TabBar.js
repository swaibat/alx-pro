import { View, StyleSheet } from 'react-native'
import React from 'react'
import TabBarButton from './TabBarButton'
import { colors } from '@/constants/theme'

const TabBar = ({ state, descriptors, navigation }) => {
  // Check if the active route is 'chat', if so return null immediately
  if (state.routes[state.index]?.name === 'chat') return null
  if (state.routes[state.index]?.name === 'register') return null

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name

        // Only render for these routes
        if (
          !['index', 'category', 'cart', 'chat', 'account'].includes(route.name)
        )
          return null

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? colors.orange[500] : colors.grey[600]}
            label={label}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabbar: {
    borderTopColor: colors.grey['300'],
    borderTopWidth: 0.9,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 25,
    borderRadius: 0,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
})

export default TabBar
