import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { blueColor } from 'Utils/ThemeColors';

export default Styles = StyleSheet.create({
    container:{
        width:wp(3),
        height:hp(14),
        borderTopLeftRadius:wp(3),
        borderBottomLeftRadius:wp(3),
        backgroundColor:blueColor,
        position:'absolute',
        bottom:0,
        alignSelf:'center',
        zIndex:1000
    },
})