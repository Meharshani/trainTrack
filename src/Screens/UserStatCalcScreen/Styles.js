import { StyleSheet, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { backgroundColor } from 'Utils/ThemeColors';

const Styles = StyleSheet.create({
    containerStyle:{
        paddingHorizontal:wp(4),
        flex:1,
        backgroundColor:backgroundColor
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
            marginTop:hp(2),
        },
        buttonTextStyle:{
            fontSize:wp(3.5)
        },
        buttonsContainerStyle:{
            width:wp(43),
            height:hp(6.5),
            borderRadius: hp(3.25)
        },
        buttonInnserStyle:{
            width:wp(39),
            height:hp(5),
            borderRadius: hp(2.5)
        }
    },
    dividerStyle:{
        marginVertical:hp(2),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6
    },  
    section2:{
    },
})

export default Styles