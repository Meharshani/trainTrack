import React from 'react'
import { TouchableOpacity} from 'react-native'
import Styles from './Styles'

export default function DrawerButton({top,right,left,onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={[Styles.container,{top:top,right:right,left:left}]}>
    </TouchableOpacity>
  )
}