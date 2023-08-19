import { StyleSheet, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { backgroundColor, backgroundColor1 } from "../../Utils/ThemeColors";

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
      marginBottom: hp(1.8),
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
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: hp(2),
    },
    view1: {
      width: "58%",
    },
    view2: {
      width: "38%",
    },
  },
  section2: {
    container: {
      width: "100%",
      marginTop: hp(2),
    },
    dividerStyle: {
      marginVertical: hp(0.7),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
    },
  },
  section3: {
    container: {
      marginTop: hp(1),
      width: "100%",
    },
    innerContainer: {
      marginTop: hp(1),
      width: "100%",
      backgroundColor: backgroundColor1,
      paddingVertical: hp(1),
      borderRadius: wp(3),
    },
  },

  buttonInnserStyle: {
    width: wp(10),
    height: wp(10),
    borderRadius: hp(5),
  },
});

export default Styles;
