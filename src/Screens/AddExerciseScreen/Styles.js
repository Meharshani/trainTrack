import { StyleSheet, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { backgroundColor } from 'Utils/ThemeColors';

const Styles = StyleSheet.create({
    containerStyle:{
        paddingHorizontal:wp(4),
        paddingVertical:hp(2),
        flex:1,
        backgroundColor:backgroundColor
    },
    header:{
        container:{
            flexDirection:'row',
            justifyContent:'space-between',
            marginBottom:hp(1.8),
            marginTop:Platform.OS === 'android' ? hp(4) : 0
        },
        innerContainer:{
            flexDirection:'row',
            alignItems:'center'
        },
        logoContainer:{
            width:wp(14),
            height:wp(14),
            borderRadius:wp(3),
            marginRight:wp(3)
        }
    }
})

export default Styles