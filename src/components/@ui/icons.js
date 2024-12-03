import React from 'react'
import {
  House,
  User,
  CirclesFour,
  ChatCircleDots,
  ShoppingCartSimple,
} from 'phosphor-react-native'

export const icons = {
  index: props => (
    <House
      size={25}
      {...props}
      weight={!props.isFocused ? 'light' : 'regular'}
    />
  ),
  category: props => (
    <CirclesFour
      size={24}
      {...props}
      weight={!props.isFocused ? 'light' : 'regular'}
    />
  ),
  cart: props => (
    <ShoppingCartSimple
      size={24}
      {...props}
      weight={!props.isFocused ? 'light' : 'regular'}
    />
  ),
  account: props => (
    <User
      size={24}
      {...props}
      weight={!props.isFocused ? 'light' : 'regular'}
    />
  ),
  chat: props => (
    <ChatCircleDots
      size={24}
      {...props}
      weight={!props.isFocused ? 'light' : 'regular'}
    />
  ),
}
