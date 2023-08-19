import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { backgroundColor, blueColor1 } from "../../Utils/ThemeColors";

const Styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: wp(4),
    backgroundColor: backgroundColor,
    flex: 1,
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
    },
    view1: {
      height: hp(5),
      width: wp(90),
      borderRadius: hp(3),
      paddingHorizontal: "2%",
      marginTop: hp(1),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    view2: {
      height: hp(5),
      width: wp(90),
      borderRadius: hp(3),
      marginTop: hp(1.5),
      paddingHorizontal: "6%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  section2: {
    container: {
      alignItems: "center",
    },
    view1: {
      width: wp(90),
      borderRadius: hp(2),
      marginTop: hp(1),
    },
    view2: {
      height: hp(5),
      width: wp(90),
      borderRadius: hp(3),
      marginTop: hp(1.25),
      paddingHorizontal: "6%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  section3: {
    container: {
      alignItems: "center",
    },
    view1: {
      width: wp(90),
      paddingHorizontal: wp(5),
      paddingVertical: hp(1.5),
      borderRadius: hp(2),
      marginTop: hp(1),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    view2: {
      height: hp(6),
      width: wp(90),
      borderRadius: hp(3),
      marginTop: hp(1.5),
      paddingHorizontal: "6%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  section4: {
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: hp(1),
      paddingHorizontal: wp(2.5),
    },
    iconContainer: {
      width: wp(7),
      justifyContent: "center",
      alignItems: "center",
      marginRight: wp(1.5),
      height: wp(7),
      borderRadius: wp(3.5),
      backgroundColor: blueColor1,
    },
  },
  section5: {
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: hp(1.5),
    },
    view1: {
      height: hp(4.5),
      width: wp(40),
      borderRadius: hp(2.25),
      alignItems: "center",
      justifyContent: "center",
    },
    view2: {
      height: hp(4.5),
      width: wp(40),
      borderRadius: hp(2),
      alignItems: "center",
      justifyContent: "center",
    },
  },
});

export default Styles;
