import React from 'react'
import { View } from 'react-native'
import Styles from './Styles'

export default function Header({children}) {
  return (
    <View style={Styles.headerContainer}>
      {children}
    </View>
  )
}