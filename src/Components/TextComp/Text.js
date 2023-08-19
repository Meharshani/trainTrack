import React from 'react'
import { Text } from 'react-native'
import {TextStyle} from './Styles'

export default function TextComp({text,textStyle}) {
  return <Text allowFontScaling={false} style={[TextStyle.textStyle,textStyle]}>{text}</Text>
}
