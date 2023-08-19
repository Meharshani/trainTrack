import ImageComp from "../ImageComp/Image";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Neomorph } from "react-native-neomorph-shadows";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import TextComp from "../TextComp/Text";
import { editIcon, userIcon } from "../../Utils/ImagesPath";
import {
  backgroundColor1,
  blueColor,
  buttonTextColor,
} from "../../Utils/ThemeColors";

export default ViewProfileComp = ({ data, navigation }) => {
  return (
    <Neomorph
      inner
      style={{
        shadowRadius: 1.5,
        backgroundColor: backgroundColor1,
        justifyContent: "center",
        alignItems: "center",
        width: wp(40),
        height: wp(40),
        borderRadius: wp(5),
        marginBottom: hp(2),
        position: "relative",
      }}
    >
      <ImageComp
        source={userIcon}
        imageStyle={{ width: wp(20), height: wp(20) }}
        tintColor="#545454"
      />
      <TextComp
        text={data.name}
        textStyle={{ fontSize: wp(3.5), marginTop: hp(1) }}
      />

      <TouchableOpacity
        style={{ position: "absolute", top: hp(1.5), right: wp(3) }}
        onPress={() =>
          navigation("ManageProfile", {
            profileData: data,
          })
        }
      >
        <ImageComp
          source={editIcon}
          imageStyle={{ width: wp(4), height: wp(4) }}
          tintColor={blueColor}
        />
      </TouchableOpacity>
    </Neomorph>
  );
};
