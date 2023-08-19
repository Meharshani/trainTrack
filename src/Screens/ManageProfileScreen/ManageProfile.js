import React, { useEffect, useState } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { NeomorphFlexView,NeomorphView } from "../../Components/NeomorphView/NeomorphView";
import { backIcon, circleLogo, userIcon, userImage } from "../../Utils/ImagesPath";
import Text from "../../Components/TextComp/Text";
import Input from "InputComp/Input";
import Styles from "./Styles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ImageComp from "../../Components/ImageComp/Image";
import {
  backgroundColor,
  backgroundColor1,
  blueColor,
  borderColor,
  buttonTextColor,
  redColor,
} from "../../Utils/ThemeColors";
import { Button1 } from "../../Components/Buttons/Buttons";
import Avatar from "../../Components/AvatarComp/Avatar";
import { addProfile, editProfile } from "../../realm/index";
import realm from "../../realm/index";
import { useRoute } from "@react-navigation/native";

export default function ManageProfile({ navigation: { goBack } }) {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [selGender, setSelGender] = useState("male");
  const { params } = useRoute();

  useEffect(() => {
    if (params?.profileData) {
      setUsername(params?.profileData?.name);
      setAge((params?.profileData?.age).toString());
      setSelGender((params?.profileData?.gender).toLowerCase());
    }
  }, []);

  //add profile
  const addProfileHandler = () => {
    if (username === "") {
      return;
    }
    if (age === "") {
      return;
    }

    const profileData = realm.objects("profile");
    let _id = 0;
    if (profileData.length > 0) {
      _id = realm.objects("profile").max("_id") + 1;
    }
    addProfile(_id, username, selGender, parseInt(age));
    goBack();
  };

  //edit profile details
  const editProfileHandler = () => {
    editProfile(
      params?.profileData?._id,
      username,
      selGender,
      parseInt(age),
      new Date(Date.now())
    );
    goBack();
  };

  return (
    <View style={Styles.containerStyle}>
      <SafeAreaView>
        <View View style={Styles.header.container}>
          <View style={Styles.header.innerContainer}>
            <NeomorphFlexView viewStyle={Styles.header.logoContainer}>
              <ImageComp
                source={circleLogo}
                imageStyle={{
                  resizeMode: "contain",
                  width: wp(12),
                  height: wp(12),
                }}
              />
            </NeomorphFlexView>
            <Text
              text="MANAGE PROFILE"
              textStyle={{ fontSize: wp(5.5), fontFamily: "OpenSans-Bold" }}
            />
          </View>
          <Button1
            onPress={() => goBack()}
            buttonText=""
            isIcon={true}
            isText={false}
            buttonIcon={backIcon}
            tintColor={blueColor}
            buttonContainer={{
              width: wp(14),
              height: wp(14),
              borderRadius: wp(7),
            }}
            buttonInnerContainer={{
              width: wp(10),
              height: wp(10),
              borderRadius: wp(5),
            }}
          />
        </View>
        <View
          style={{
            marginTop: hp(6),
            paddingHorizontal: wp(4),
            alignItems: "center",
          }}
        >
          <Avatar
            image={userIcon}
            showIcon={false}
            avatarContainer={Styles.avatarContainer}
            avatarInnerContainer={Styles.avatarInnerContainer}
          />
          <Input
            value={username}
            onchange={(text) => setUsername(text)}
            placeholder="USER NAME"
            viewStyle={{
              height: hp(7.5),
              borderBottomWidth: 1,
              borderBottomColor: borderColor,
            }}
            inputStyle={{ fontSize: wp(4), fontFamily: "OpenSans-Semibold" }}
          />
          <Input
            keyboardType="numeric"
            value={age}
            onchange={(text) => setAge(text)}
            placeholder="AGE"
            viewStyle={{
              marginTop: hp(2.5),
              height: hp(7.5),
              borderBottomWidth: 1,
              borderBottomColor: borderColor,
            }}
            inputStyle={{ fontSize: wp(4), fontFamily: "OpenSans-Semibold" }}
          />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: hp(2.5),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelGender("male");
              }}
            >
              <NeomorphView
                viewStyle={{
                  height: hp(5),
                  width: wp(40),
                  borderRadius: hp(2.5),
                  backgroundColor:
                    selGender === "male" ? blueColor : backgroundColor1,
                }}
              >
                <Text
                  text="MALE"
                  textStyle={{
                    fontFamily: "OpenSans-Semibold",
                    fontSize: wp(3.5),
                    color: selGender === "male" ? "white" : buttonTextColor,
                  }}
                />
              </NeomorphView>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setSelGender("female");
              }}
            >
              <NeomorphView
                viewStyle={{
                  height: hp(5),
                  width: wp(40),
                  borderRadius: hp(2.5),
                  backgroundColor:
                    selGender === "female" ? blueColor : backgroundColor1,
                }}
              >
                <Text
                  text="FEMALE"
                  textStyle={{
                    fontFamily: "OpenSans-Semibold",
                    fontSize: wp(3.5),
                    color: selGender === "female" ? "white" : buttonTextColor,
                  }}
                />
              </NeomorphView>
            </TouchableOpacity>
          </View>

          <Button1
            onPress={
              params?.profileData ? editProfileHandler : addProfileHandler
            }
            isText={true}
            buttonText={params?.profileData ? "EDIT PROFILE " : "ADD PROFILE"}
            buttonTextStyle={{
              color: blueColor,
              textAlign: "center",
              fontSize: wp(3.2),
              fontFamily: "OpenSans-Semibold",
            }}
            isIcon={true}
            buttonIcon={null}
            buttonContainer={{
              marginTop: hp(6),
              width: wp(54),
              height: hp(7.5),
              borderRadius: hp(3.75),
            }}
            buttonInnerContainer={{
              width: wp(50),
              height: hp(6),
              borderRadius: hp(3),
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
