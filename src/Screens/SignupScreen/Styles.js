import { StyleSheet, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { backgroundColor, blueColor } from 'Utils/ThemeColors';

const Styles = StyleSheet.create({
    containerStyle:{
        paddingHorizontal:wp(4),
        flex:1,
        backgroundColor:backgroundColor,
        position:'relative'
    },
    dividerStyle:{
        marginVertical:hp(3),
        shadowColor: 'white',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6
    },
    floatedCircle:{
        position:'absolute',
        bottom:-wp(10),
        right:-wp(10),
        width:wp(30),
        height:wp(30),
        backgroundColor:blueColor,
        borderRadius:hp(15)
    },
    floatedCircle1:{
        position:'absolute',
        top:-wp(10),
        left:-wp(10),
        width:wp(30),
        height:wp(30),
        backgroundColor:blueColor,
        borderRadius:hp(15)
    }
})

export default Styles