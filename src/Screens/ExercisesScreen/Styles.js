import { StyleSheet, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { backgroundColor } from "../../Utils/ThemeColors";

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
  section2: {
    container: {
      paddingVertical: hp(2),
    },
    exercisesCard: {
      width: wp(90),
      borderRadius: wp(5),
      height: "auto",
      paddingVertical: 10,
    },
  },
});

export default Styles;
