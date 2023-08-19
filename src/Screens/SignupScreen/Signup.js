import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";
import { circleLogo, textLogo } from "../../Utils/ImagesPath";
import { Button1,Button2 } from "../../Components/Buttons/Buttons";
import Text from "../../Components/TextComp/Text";
import Input from "InputComp/Input";
import Styles from "./Styles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ImageComp from "../../Components/ImageComp/Image";
import {
  backgroundColor1,
  blueColor,
  borderColor,
  buttonTextColor,
  redColor,
} from "../../Utils/ThemeColors";
import { Divider } from "Divider/Divider";
import { NeomorphFlexView,NeomorphView } from "../../Components/NeomorphView/NeomorphView";
import DeviceInfo from "react-native-device-info";
import axios from "axios";
import { BASEURL } from "../../env";
import { useNavigation } from "@react-navigation/native";

export default function Signup({ navigation: { navigate } }) {
  const [username, setUsername] = useState("WahasMughal");
  const [email, setEmail] = useState("wahasali22@gmail.com");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("24");
  const [password, setPassword] = useState("123456");
  const [confirmPasword, setConfirmPassword] = useState("123456");
  const [userNameErr, setUserNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [ageErr, setAgeErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [confirmPassErr, setConfirmPassErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const getUniqueDeviceID = async () => {
    const id = await DeviceInfo.getUniqueId();
    return id.toString();
  };

  //validation handler
  const validationHandler = () => {
    setUserNameErr("");
    setEmailErr("");
    setAgeErr("");
    setPassErr("");
    setConfirmPassErr("");

    let emailReg =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (username === "") {
      setUserNameErr("Username is Required");
      return false;
    }

    if (email === "") {
      setEmailErr("Email is Required");
      return false;
    }

    if (!emailReg.test(email)) {
      setEmailErr("Invalid Email");
      return false;
    }

    if (age === "") {
      setAgeErr("Age is Required");
      return false;
    }

    if (password === "") {
      setPassErr("Password is Required");
      return false;
    }

    if (confirmPasword === "") {
      setConfirmPassErr("Confirm Password is Required");
      return false;
    }

    if (confirmPasword !== password) {
      setConfirmPassErr("Password doesn't match");
      return false;
    }

    return true;
  };

  //login handler
  const registerHandler = async () => {
    // return navigate("Memberships");

    if (validationHandler()) {
      let payload = {
        fName: username,
        email: email,
        age: parseInt(age),
        gender: gender,
        password: password,
        deviceId: await getUniqueDeviceID(),
      };
      setIsLoading(true);
      axios
        .post(`${BASEURL}/user/signupUser`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setIsLoading(false);
          // console.log("RES ", res.data);
          if (res.data.doc) {
            navigation.navigate("Memberships", {
              user: res.data.doc,
            });
          } else {
            if (Platform.OS === "android") {
              if (res?.data?.err?.code) {
                ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
              } else {
                ToastAndroid.show(res.data?.err, ToastAndroid.SHORT);
              }
            } else {
              if (res?.data?.err?.code) {
                // console.log('error --->',res.data.err)
                Alert.alert("Error", "Someting went wrong", [{ text: "Okay" }]);
              } else {
                Alert.alert("Error", res.data?.err, [{ text: "Okay" }]);
              }
            }
          }
        })
        .catch((e) => {
          setIsLoading(false);
          // console.log(e);
        });
    }
  };

  return (
    <View style={Styles.containerStyle}>
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: hp(5),
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: hp(4),
            }}
          >
            <ImageComp
              source={circleLogo}
              imageStyle={{
                resizeMode: "contain",
                width: wp(17.5),
                height: wp(17.5),
              }}
            />
            <ImageComp
              source={textLogo}
              imageStyle={{ width: wp(55), height: wp(17), marginLeft: wp(4) }}
            />
          </View>

          <Divider width="100%" height={hp(0.1)} style={Styles.dividerStyle} />

          <Text
            text="REGISTERATION"
            textStyle={{ fontSize: wp(5.5), fontFamily: "OpenSans-Bold" }}
          />
          <Input
            value={username}
            onchange={(text) => setUsername(text)}
            placeholder="USER NAME"
            viewStyle={{
              height: hp(7),
              borderBottomWidth: 1,
              borderBottomColor: borderColor,
              marginTop: hp(4),
            }}
            inputStyle={{ fontSize: wp(3.5), fontFamily: "OpenSans-Semibold" }}
          />

          {userNameErr !== "" ? (
            <Text
              text={userNameErr}
              textStyle={{
                color: redColor,
                fontSize: wp(3),
                fontFamily: "OpenSans-Bold",
                marginVertical: wp(1),
                alignSelf: "flex-start",
                marginLeft: wp(1.2),
              }}
            />
          ) : (
            <View />
          )}

          <Input
            value={email}
            onchange={(text) => setEmail(text)}
            placeholder="EMAIL"
            viewStyle={{
              height: hp(7),
              borderBottomWidth: 1,
              borderBottomColor: borderColor,
              marginTop: hp(1.5),
            }}
            inputStyle={{ fontSize: wp(3.5), fontFamily: "OpenSans-Semibold" }}
          />

          {emailErr !== "" ? (
            <Text
              text={emailErr}
              textStyle={{
                color: redColor,
                fontSize: wp(3),
                fontFamily: "OpenSans-Bold",
                marginVertical: wp(1),
                alignSelf: "flex-start",
                marginLeft: wp(1.2),
              }}
            />
          ) : (
            <View />
          )}

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: hp(1.5),
            }}
          >
            <TouchableOpacity onPress={() => setGender("Male")}>
              <NeomorphView
                viewStyle={{
                  height: hp(5),
                  width: wp(45),
                  borderRadius: hp(2.5),
                  backgroundColor:
                    gender === "Male" ? blueColor : backgroundColor1,
                }}
              >
                <Text
                  text="MALE"
                  textStyle={{
                    fontFamily: "OpenSans-Semibold",
                    fontSize: wp(3.5),
                    color: gender === "Male" ? "white" : buttonTextColor,
                  }}
                />
              </NeomorphView>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setGender("Female")}>
              <NeomorphView
                viewStyle={{
                  height: hp(5),
                  width: wp(45),
                  borderRadius: hp(2.5),
                  backgroundColor:
                    gender === "Female" ? blueColor : backgroundColor1,
                }}
              >
                <Text
                  text="FEMALE"
                  textStyle={{
                    fontFamily: "OpenSans-Semibold",
                    fontSize: wp(3.5),
                    color: gender === "Female" ? "white" : buttonTextColor,
                  }}
                />
              </NeomorphView>
            </TouchableOpacity>
          </View>

          <Input
            keyboardType="numeric"
            maxLength={3}
            value={age}
            onchange={(text) => setAge(text)}
            placeholder="AGE"
            viewStyle={{
              height: hp(7),
              borderBottomWidth: 1,
              borderBottomColor: borderColor,
              marginTop: hp(1.5),
            }}
            inputStyle={{ fontSize: wp(3.5), fontFamily: "OpenSans-Semibold" }}
          />

          {ageErr !== "" ? (
            <Text
              text={ageErr}
              textStyle={{
                color: redColor,
                fontSize: wp(3),
                fontFamily: "OpenSans-Bold",
                marginVertical: wp(1),
                alignSelf: "flex-start",
                marginLeft: wp(1.2),
              }}
            />
          ) : (
            <View />
          )}

          <Input
            value={password}
            onchange={(text) => setPassword(text)}
            placeholder="PASSWORD"
            viewStyle={{
              height: hp(7),
              borderBottomWidth: 1,
              borderBottomColor: borderColor,
              marginTop: hp(1.5),
            }}
            inputStyle={{ fontSize: wp(3.5), fontFamily: "OpenSans-Semibold" }}
          />

          {passErr !== "" ? (
            <Text
              text={passErr}
              textStyle={{
                color: redColor,
                fontSize: wp(3),
                fontFamily: "OpenSans-Bold",
                marginVertical: wp(1),
                alignSelf: "flex-start",
                marginLeft: wp(1.2),
              }}
            />
          ) : (
            <View />
          )}
          <Input
            value={confirmPasword}
            onchange={(text) => setConfirmPassword(text)}
            placeholder="CONFIRM PASSWORD"
            viewStyle={{
              height: hp(7),
              borderBottomWidth: 1,
              borderBottomColor: borderColor,
              marginTop: hp(1.5),
            }}
            inputStyle={{ fontSize: wp(3.5), fontFamily: "OpenSans-Semibold" }}
          />

          {confirmPassErr !== "" ? (
            <Text
              text={confirmPassErr}
              textStyle={{
                color: redColor,
                fontSize: wp(3),
                fontFamily: "OpenSans-Bold",
                marginVertical: wp(1),
                alignSelf: "flex-start",
                marginLeft: wp(1.2),
              }}
            />
          ) : (
            <View />
          )}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: hp(1.5),
            }}
          >
            <Text
              text="Already have account?"
              textStyle={{ fontSize: wp(3), fontFamily: "OpenSans-Semibold" }}
            />
            <TouchableOpacity onPress={() => navigate("Signin")}>
              <Text
                text="SIGN IN"
                textStyle={{
                  fontSize: wp(3),
                  marginLeft: wp(2),
                  textDecorationLine: "underline",
                  fontFamily: "OpenSans-Semibold",
                  color: blueColor,
                }}
              />
            </TouchableOpacity>
          </View>

          <Button2
            onPress={registerHandler}
            isLoading={isLoading}
            isText={true}
            buttonText="SIGN UP"
            isIcon={false}
            buttonIcon={null}
            buttonContainer={{ marginTop: hp(5) }}
            buttonTextStyle={{
              fontSize: wp(4),
              fontFamily: "OpenSans-Semibold",
              color: "white",
            }}
            buttonInnerContainer={{
              width: wp(60),
              height: hp(6),
              borderRadius: hp(3),
              backgroundColor: blueColor,
            }}
          />
        </ScrollView>
      </SafeAreaView>
      {/* <View style={Styles.floatedCircle}></View>
      <View style={Styles.floatedCircle1}></View> */}
    </View>
  );
}
