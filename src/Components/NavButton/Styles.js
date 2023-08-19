import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { backgroundColor1, buttonColor } from 'Utils/ThemeColors';

export default Styles = StyleSheet.create({
    drawerContainer:{
        shadowRadius: 2.5,
        backgroundColor: backgroundColor1,
        justifyContent:'center',
        width:'100%',
        height:hp(80),
        borderRadius:wp(15),
        position:'relative'
    },
    innerContainer:{
        height:'100%',
        width:'25%',
        justifyContent:'center',
        alignItems:'center'
    },
    navButton:{
        shadowRadius: wp(0.3),
        backgroundColor: buttonColor,
        justifyContent:'center',
        alignItems:'center'
    }
})