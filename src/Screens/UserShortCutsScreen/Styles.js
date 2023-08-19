import { StyleSheet, Platform } from "react-native";
import {
  backgroundColor,
  backgroundColor1,
  blueColor1,
} from "../../Utils/ThemeColors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: wp(4),
    flex: 1,
    backgroundColor: backgroundColor,
  },
  header: {
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: Platform.OS === "android" ? hp(4) : 0,
    },
    innerContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    logoContainer: {
      width: wp(14),
      height: wp(14),
      borderRadius: wp(3),
      marginRight: wp(3),
      backgroundColor: "black",
    },
    iconContainer: {
      width: wp(6),
      justifyContent: "center",
      alignItems: "center",
      marginRight: wp(1.5),
      height: wp(6),
      borderRadius: wp(3),
      backgroundColor: blueColor1,
    },
  },
  section1: {
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: hp(2),
    },
    avatarContainer: {
      width: wp(30),
      height: wp(30),
      borderRadius: wp(16.5),
    },
    avatarInnerContainer: {
      width: wp(26),
      height: wp(26),
      borderRadius: wp(13.5),
    },
    detailViewContainer: {
      marginLeft: wp(2.5),
    },
    view1: {
      width: wp(60),
      height: hp(7),
      borderRadius: hp(3.5),
    },
    view2: {
      width: wp(60),
      height: hp(5.5),
      borderRadius: hp(2.75),
      marginTop: hp(1),
    },
  },
  section2: {
    container: {
      width: wp(92),
      height: hp(7),
      borderRadius: hp(3.5),
      marginTop: hp(1.8),
    },
    innerView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: wp(4),
      paddingRight: wp(3),
      width: "100%",
    },
    buttonInnerContainer: {
      width: wp(32),
      height: hp(4),
      borderRadius: hp(2),
    },
  },
  section3: {
    container: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: hp(2.5),
    },
    dot: {
      width: wp(2.5),
      height: wp(2.5),
      borderRadius: wp(1.75),
      backgroundColor: blueColor1,
    },
  },
  section4: {
    container: {
      width: "100%",
        // minHeight:hp(50),
        // flexDirection: "row",
      marginTop: hp(2.5),
      display:'flex'
    },
    view1: {
      width: '100%',
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'space-between',
      height:hp(60)
    },
    view2: {
      container: {
        width: wp(43),
        alignItems: "flex-end",
        alignSelf:'flex-end',
        position:'absolute',
      },
      innerContainer: {
        borderWidth: wp(0.2),
        borderColor: "#151617",
        borderRadius: wp(8),
        backgroundColor: backgroundColor1,
        // height:hp(50),
      },
    },
  },
});

export default Styles;
