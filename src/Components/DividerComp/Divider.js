import React from 'react'
import { View } from 'react-native'

export const Divider = ({width,height,color,style}) => {
  return (
    <View style={{...style,width:width || 1,height:height || 1,backgroundColor:color || 'black'}} ></View>
  )
}
