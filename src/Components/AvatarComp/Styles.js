import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
export const AvatarStyles = StyleSheet.create({
    innerView:{
        width:wp('23%'),
        height:wp('23%'),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:wp('23%')/2,
        position:'relative',
    },
})