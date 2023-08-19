import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

const CalendarStyle = StyleSheet.create({
    calendarContainer:{
        width:wp(90)
    },
    dayContainer:{
        width:wp(10),
        height:wp(10),
        borderRadius:wp(5),
        marginTop:-9
    },
    dayText:{
        fontSize:wp(4),
        color:'white',
        fontFamily:'OpenSans-Semibold'
    },
    headerContainer:{
        width:wp(90),
        paddingHorizontal:wp(3.5),
        flexDirection:'row',
        justifyContent:'space-between',
        height:wp(15),
        borderRadius:wp(8.5),
        marginBottom:hp(1.5)
    },
    buttonInnserStyle:{
        width:wp(10),
        height:wp(10),
        borderRadius: hp(5)
    }
})

export default CalendarStyle