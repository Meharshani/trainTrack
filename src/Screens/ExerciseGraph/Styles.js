import { StyleSheet,Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { backgroundColor } from 'Utils/ThemeColors';

const Styles = StyleSheet.create({
    containerStyle:{
        paddingHorizontal:wp(4),
        backgroundColor:backgroundColor,
        flex:1
    },
    header:{
        container:{
            flexDirection:'row',
            justifyContent:'space-between',
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
            marginRight:wp(3),
            backgroundColor:'black'
        }
    },
    section1:{
        container:{
            alignItems:'center',
            marginTop:hp(3)
        },
    },
    dividerStyle:{
        marginVertical:hp(1.5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6
    },
})

export default Styles