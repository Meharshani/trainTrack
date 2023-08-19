import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {buttonTextColor} from 'Utils/ThemeColors'

export const TextStyle = StyleSheet.create({
    textStyle:{
        color:buttonTextColor,
        fontSize:wp(5)
    }
})