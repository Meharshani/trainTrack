import { StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { backgroundColor, blueColor } from 'Utils/ThemeColors';

export default Styles = StyleSheet.create({
    container:{
        padding:wp(3),
        borderColor:'#373737',
        borderRadius:wp(5),
        backgroundColor:backgroundColor,
        flex:0,
        shadowColor:'#373737',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10
    }
})