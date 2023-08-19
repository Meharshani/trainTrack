import React from 'react'
import { Animated } from 'react-native'
import Styles from './Styles'

export default function Body({height,children}) {
  return (
    <Animated.View style={[Styles.bodyContainer,{height:height}]}>
      {children}
    </Animated.View>
  )
}