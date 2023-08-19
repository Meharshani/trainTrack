import { StyleSheet } from 'react-native';
import {backgroundColor1,buttonColor} from 'Utils/ThemeColors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

export const Button1Style = StyleSheet.create({
    innerView:{
        width:'100%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25
    },
    button2MainContainer:{
        shadowRadius: 2,
        borderRadius: hp(2.5),
        backgroundColor: buttonColor,
        width: wp(35),
        height: hp(5)
    }
})