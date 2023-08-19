import React, { useEffect, useState } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { NeomorphFlexView } from "../../Components/NeomorphView/NeomorphView";
import { backIcon, circleLogo } from "../../Utils/ImagesPath";
import Text from "../../Components/TextComp/Text";
import AddProfile from "AddProfile/AddProfile";
import ViewProfile from "ViewProfile/ViewProfile";
import Styles from "./Styles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ImageComp from "../../Components/ImageComp/Image";
import { blueColor, borderColor, redColor } from "../../Utils/ThemeColors";
import { Button1 } from "../../Components/Buttons/Buttons";
import { getAllProfiles } from "../../realm/index";
import { useNavigation } from "@react-navigation/native";
import { profile } from "../../redux/profile";
import { useDispatch, useSelector } from "react-redux";

export default function Profiles({ navigation: { goBack, navigate } }) {
  const [profiles, setProfiles] = useState([]);
  const user = useSelector((state) => state.login.login);
  const [profileCreation, setProfileCreation] = useState(true);
  // console.log("USER ", user);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //get all profiles
  const getAllProfilesHandler = () => {
    const profiles = getAllProfiles();
    if (profiles.length >= user?.membership?.numberOfProfiles) {
      setProfileCreation(false);
    }
    setProfiles(profiles);
  };

  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      getAllProfilesHandler();
    });
    return () => subscribe;
  }, [getAllProfilesHandler]);

  useEffect(() => {
    getAllProfilesHandler();
  }, []);

  //check the membership subscribed
  const checkMembershipSubscribed = () => {
    navigate("ManageProfile");
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
              text="PROFILES"
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
            marginTop: hp(5),
            paddingHorizontal: wp(3),
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {profiles.map((items, index) => (
            <TouchableOpacity
              onPress={() => {
                dispatch(profile(items));
                navigate("UserShortCuts", {
                  screen: "UserShortCuts",
                });
              }}
              key={index}
            >
              <ViewProfile data={items} navigation={navigate} />
            </TouchableOpacity>
          ))}
          {!profileCreation ? (
            <View />
          ) : (
            <AddProfile onPress={checkMembershipSubscribed} />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
