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
      flexDirection: "row",
      alignItems: "center",
      marginTop: hp(2),
    },
    avatarContainer: {
      width: wp(30),
      height: wp(30),
      borderRadius: wp(30) / 2,
    },
    avatarInnerContainer: {
      width: wp(26),
      height: wp(26),
      borderRadius: wp(30) / 2,
      overFlow: "hidden",
    },
    detailViewContainer: {
      marginLeft: wp(2.5),
    },
    view1: {
      width: wp(59),
      height: hp(7),
      borderRadius: hp(3.5),
    },
    view2: {
      width: wp(59),
      height: hp(5.5),
      borderRadius: hp(2.75),
      marginTop: hp(1),
    },
  },
  dividerStyle: {
    marginVertical: hp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  section2: {
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
});

export default Styles;
