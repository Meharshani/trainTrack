import { StyleSheet, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { backgroundColor, backgroundColor1 } from "../../Utils/ThemeColors";

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
  },
  section1: {
    container: {
      alignItems: "center",
      paddingTop: hp(2),
    },
    view1: {
      width: "100%",
      flexDirection: "row",
      paddingHorizontal: wp(3.5),
      marginTop: hp(1),
    },
    view2: {
      width: "100%",
      flexDirection: "row",
      marginVertical: hp(1),
      paddingHorizontal: wp(3.5),
      borderRadius: wp(3),
    },
    dividerStyle: {
      marginVertical: hp(1),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    view3: {
      width: "100%",
      flexDirection: "row",
      paddingHorizontal: wp(3.5),
      marginTop: hp(1),
    },
    view4: {
      marginTop: hp(4),
      width: "100%",
      backgroundColor: backgroundColor1,
      paddingVertical: hp(1),
      borderRadius: wp(3),
    },
  },
});

export default Styles;
