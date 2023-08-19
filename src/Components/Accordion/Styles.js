import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { blueColor1 } from 'Utils/ThemeColors';

const AccordionStyle = StyleSheet.create({
    accordionContainer:{
        width:'100%'
    },
    headerContainer:{
        width:'100%',
        height:hp(3),
        flexDirection:'row',
        alignItems:'center'
    },
    headerView1:{
        width:'90%'
    },
    headerView2:{
        width:'10%',
        alignItems:'flex-end'
    },
    headerButton:{
        width:wp(4),
        height:wp(4),
        borderRadius:wp(2),
        backgroundColor:blueColor1,
        alignItems:'center',
        justifyContent:'center'
    },
    bodyContainer:{
        width:'100%',
        marginTop:hp(0.5)
    }
})

export default AccordionStyle