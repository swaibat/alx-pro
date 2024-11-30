import React from 'react'
import {
  House,
  ShoppingCart,
  User,
  CirclesFour,
  Chat,
  ChatCircleDots,
} from 'phosphor-react-native'

export const icons = {
  index: props => (
    <House
      size={25}
      {...props}
      weight={!props.isFocused ? 'regular' : 'fill'}
    />
  ),
  category: props => (
    <CirclesFour
      size={24}
      {...props}
      weight={!props.isFocused ? 'regular' : 'fill'}
    />
  ),
  cart: props => (
    <ShoppingCart
      size={24}
      {...props}
      weight={!props.isFocused ? 'regular' : 'fill'}
    />
  ),
  account: props => (
    <User size={24} {...props} weight={!props.isFocused ? 'regular' : 'fill'} />
  ),
  chat: props => (
    <ChatCircleDots
      size={24}
      {...props}
      weight={!props.isFocused ? 'regular' : 'fill'}
    />
  ),
}
