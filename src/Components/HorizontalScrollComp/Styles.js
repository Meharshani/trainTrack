import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const CalendarStyle = StyleSheet.create({

    headerContainer:{
        width:wp(90),
        paddingHorizontal:wp(4.5),
        flexDirection:'row',
        justifyContent:'space-between',
        height:hp(11),
        borderRadius:hp(5.5)
    },
    buttonInnserStyle:{
        width:wp(10),
        height:wp(10),
        borderRadius: hp(5)
    },
})

export default CalendarStyle