import { StyleSheet, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { backgroundColor } from "../../Utils/ThemeColors";

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
      marginBottom: hp(1.8),
      marginTop: Platform.OS === "android" ? hp(2) : 0,
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
      paddingVertical: hp(3),
    },
    workoutCard: {
      width: wp(90),
      height: hp(9),
      borderRadius: hp(4),
      paddingVertical: hp(3),
      paddingLeft: wp(6),
      paddingRight: wp(2),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: hp(2),
    },
  },
  section2: {
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
  },
});

export default Styles;
