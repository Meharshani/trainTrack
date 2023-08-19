import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Text from "../../Components/TextComp/Text";
import { Divider } from "Divider/Divider";
import Styles from "./Styles";
import DrawerButton from "DrawerButton/DrawerButton";
import { DrawerActions } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { NeomorphFlexView } from "../../Components/NeomorphView/NeomorphView";
import { circleLogo, backIcon, userImage, graphIcon } from "../../Utils/ImagesPath";
import ImageComp from "../../Components/ImageComp/Image";
import { openDrawer } from "../../Utils/OpenDrawer";
import { Button1 } from "../../Components/Buttons/Buttons";
import {
  backgroundColor1,
  blueColor,
  blueColor1,
  buttonColor,
  buttonTextColor,
  redColor,
} from "../../Utils/ThemeColors";
import ModalView from "../../Components/ModalView/ModalView";
import { TextInput } from "react-native-gesture-handler";
import { Neomorph, NeomorphBlur } from "react-native-neomorph-shadows";
import {
  addWeightHistory,
  addBodyComposition,
  getWeightHistory,
  getBodyCompositions,
  getLastBodyComposition,
  getLastWeightHistory,
  mockWeightHistory
} from "../../realm/index";
import { useEffect } from "react";
import realm from "../../realm/index";
import { useSelector } from "react-redux";
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const subDays = function (days) {
  var date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};
export default function UserStatCalc({ navigation: { goBack, dispatch } }) {
  const [isView, setIsView] = useState(false);
  const [imgpath, setImagePath] = useState("");
  const [weight, setWeight] = useState("");
  const [lastWeight, setLastWeight] = useState(0);
  const [weightHistory, setWeightHistory] = useState([]);
  const [bodyCompHistory, setBodyCompHistory] = useState([]);
  const [lastComp, setLastComp] = useState(0);
  const [bodyFatState, setBodyFatState] = useState({
    Age: "",
    Abdominal: "",
    Chest: "",
    Midaxillary: "",
    Subscapular: "",
    Suprailliac: "",
    Thigh: "",
    Tricep: "",
  });
  const [gender, setGender] = useState(0);
  const [maleSel, setMaleSel] = useState(true);
  const [femaleSel, setFemaleSel] = useState(false);
  const [calculatedFat, setCalculatedFat] = useState(0);
  const [bodyDensity, setBodyDensity] = useState(0);
  const [weightFocused, setWeightFocused] = useState(false);
  const selectedProfile = useSelector((state) => state.profiles.profile);

  //get weights
  const getWeights = async () => {
    const weights = await getWeightHistory(selectedProfile?._id);
    setWeightHistory(weights);
    // console.log("WEIGHTS ", weights);
  };

  //get body compositions
  const getBodyComps = async () => {
    const bodyComp = await getBodyCompositions(selectedProfile?._id);
    setBodyCompHistory(bodyComp);
    // console.log("COMPOSITION ", bodyComp);
  };

  //get last weight
  const getLastWeight = async () => {
    const weight = await getLastWeightHistory(selectedProfile?._id);
    setLastWeight(weight?.weight);
    // console.log("LAST WEIGHT ", weight?.weight);
  };

  //get last composition
  const getLastComp = async () => {
    const composition = await getLastBodyComposition(selectedProfile?._id);
    setLastComp(composition?.bodyFat);
    // console.log("LAST COMPOSITION ", composition?.bodyFat);
  };

  useEffect(() => {
    // console.log('hi...')
    getWeights();
    getBodyComps();
    getLastWeight();
    getLastComp();
    
  }, []);
  //save weight
  const saveWeightHandler = (check) => {
    if (weight == "") {
      return;
    }
    let body = {
      weight: parseInt(weight),
      lastWeight: lastWeight,
    };
    let _id = 0;
    if (weightHistory.length == 0) {
      addWeightHistory(_id, body, selectedProfile);
    } else {
      _id = realm.objects("weightHistory").max("_id") + 1;
      addWeightHistory(_id, body, selectedProfile);
    }
    if (!check) {
      if (Platform.OS === "ios") {
        alert("Weight has been saved");
      } else {
        ToastAndroid.show("Weight has been saved", ToastAndroid.LONG);
      }
    }
  };

  //calculations of body fat
  const calculateBodyFat = () => {
    if (
      bodyFatState.Age !== "" &&
      bodyFatState.Abdominal !== "" &&
      bodyFatState.Thigh !== "" &&
      bodyFatState.Chest !== "" &&
      bodyFatState.Tricep !== "" &&
      bodyFatState.Subscapular !== "" &&
      bodyFatState.Suprailliac !== "" &&
      bodyFatState.Midaxillary !== ""
    ) {
      if (gender === 0) {
        let sumOfSkinFolds =
          +bodyFatState.Abdominal +
          +bodyFatState.Thigh +
          +bodyFatState.Chest +
          +bodyFatState.Tricep +
          +bodyFatState.Subscapular +
          +bodyFatState.Suprailliac +
          +bodyFatState.Midaxillary;
        let squaredskinFolds = +sumOfSkinFolds * +sumOfSkinFolds;
        let x = sumOfSkinFolds * 0.00043499;
        let y = squaredskinFolds * 0.00000055;
        let z = +bodyFatState.Age * 0.00028826;
        let bodyDensity = 1.112 - x + y - z;
        let x1 = 495 / bodyDensity;
        let bodyFat = x1 - 450;
        setCalculatedFat(bodyFat);
        setBodyDensity(bodyDensity);
      } else {
        let sumOfSkinFolds =
          +bodyFatState.Abdominal +
          +bodyFatState.Thigh +
          +bodyFatState.Chest +
          +bodyFatState.Tricep +
          +bodyFatState.Subscapular +
          +bodyFatState.Suprailliac +
          +bodyFatState.Midaxillary;
        let squaredskinFolds = +sumOfSkinFolds * +sumOfSkinFolds;
        let x = sumOfSkinFolds * 0.00046971;
        let y = squaredskinFolds * 0.00000056;
        let z = +bodyFatState.Age * 0.00012828;
        let bodyDensity = 1.112 - x + y - z;
        let x1 = 495 / bodyDensity;
        let bodyFat = x1 - 450;
        setCalculatedFat(bodyFat);
        setBodyDensity(bodyDensity);
      }
    } else {
      setCalculatedFat(0);
      setBodyDensity(0);
    }
  };

  //dynamic input handler
  const inputHandler = (name, value) => {
    setBodyFatState({
      ...bodyFatState,
      [name]: value,
    });
  };

  //add body composition
  const addBodyCompositionHandler = () => {
    if (weight === "") {
      if (Platform.OS === "ios") {
        alert("Weight is empty");
      } else {
        ToastAndroid.show("Weight is empty", ToastAndroid.LONG);
      }
    }
    if (calculatedFat == 0) {
      return;
    }
    let body = {
      bodyFat: calculatedFat,
      bodyDensity: bodyDensity,
      lastBodyFat: lastComp,
    };
    let _id = 0;
    if (bodyCompHistory.length == 0) {
      addBodyComposition(_id, body, selectedProfile);
      setCalculatedFat(0);
    } else {
      _id = realm.objects("bodyComp").max("_id") + 1;
      addBodyComposition(_id, body, selectedProfile);
      setCalculatedFat(0);
    }
    saveWeightHandler(true);

    if (Platform.OS === "ios") {
      alert("Body fat and weight has been saved");
    } else {
      ToastAndroid.show(
        "Body fat and weight has been saved",
        ToastAndroid.LONG
      );
    }
  };

  return (
    <View style={Styles.containerStyle}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={10}>
        <SafeAreaView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: hp(2),
              marginTop: weightFocused ? hp(20) : hp(2),
            }}
          >
            <View style={Styles.header.container}>
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
                <View>
                  <Text
                    text="USER STATS CALCS"
                    textStyle={{
                      fontSize: wp(5.5),
                      fontFamily: "OpenSans-Bold",
                    }}
                  />
                  <Text
                    text={selectedProfile?.name}
                    textStyle={{
                      fontSize: wp(4),
                      fontFamily: "OpenSans-Semibold",
                    }}
                  />
                </View>
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
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: wp(40),
                alignSelf: "center",
                marginTop: wp(7),
                marginBottom: wp(4),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setGender(0);
                  setMaleSel(true);
                  setFemaleSel(false);
                }}
              >
                <Text
                  text="MALE"
                  textStyle={{
                    color: maleSel ? blueColor1 : buttonTextColor,
                    fontSize: wp(4.5),
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setGender(1);
                  setFemaleSel(true);
                  setMaleSel(false);
                }}
              >
                <Text
                  text="FEMALE"
                  textStyle={{
                    color: femaleSel ? blueColor1 : buttonTextColor,
                    fontSize: wp(4.5),
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={Styles.section1.container}>
              <Text
                text="WEIGHT (LBS)"
                textStyle={{
                  fontSize: wp(4.5),
                  fontFamily: "OpenSans-Semibold",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: hp(1.5),
                }}
              >
                <Neomorph
                  inner
                  style={{
                    shadowRadius: 4,
                    backgroundColor: backgroundColor1,
                    justifyContent: "center",
                    alignItems: "center",
                    color: blueColor,
                    fontFamily: "OpenSans-Semibold",
                    ...Styles.section1.buttonsContainerStyle,
                  }}
                >
                  <NeomorphBlur
                    style={{
                      shadowRadius: 2,
                      backgroundColor: buttonColor,
                      paddingHorizontal: 20,
                      justifyContent: "center",
                      ...Styles.section1.buttonInnserStyle,
                    }}
                  >
                    <TextInput
                      onBlur={() => {
                        setWeightFocused(false);
                      }}
                      onFocus={() => {
                        setWeightFocused(true);
                        setWeight("");
                      }}
                      keyboardType="numeric"
                      value={weight}
                      maxLength={3}
                      placeholder="000"
                      placeholderTextColor={blueColor}
                      onChangeText={(text) => setWeight(text)}
                      style={{
                        color: blueColor,
                        fontFamily: "OpenSans-Semibold",
                        fontSize: wp(4),
                        textAlign: "center",
                      }}
                    />
                  </NeomorphBlur>
                </Neomorph>

                <Button1
                  onPress={() => saveWeightHandler(false)}
                  buttonText="SAVE WEIGHT"
                  isIcon={false}
                  isText={true}
                  buttonIcon={null}
                  tintColor={null}
                  buttonTextStyle={[
                    Styles.section1.buttonTextStyle,
                    { color: redColor, fontFamily: "OpenSans-Semibold" },
                  ]}
                  buttonContainer={Styles.section1.buttonsContainerStyle}
                  buttonInnerContainer={Styles.section1.buttonInnserStyle}
                />
              </View>
            </View>

            <Divider
              width="100%"
              height={hp(0.2)}
              style={Styles.dividerStyle}
            />
            <ModalView
              isVisible={isView}
              bodyImage={true}
              setClose={() => setIsView(false)}
              containerStyle={{
                marginHorizontal: wp(10),
                height: wp(59),
                marginTop: hp(30),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{ uri: imgpath }}
                  style={{
                    width: wp(70.5),
                    height: wp(59),
                    borderRadius: wp(5),
                  }}
                />
              </View>
            </ModalView>
            <View style={Styles.section2.container}>
              <Text
                text="BODY FAT"
                textStyle={{
                  fontSize: wp(4.5),
                  fontFamily: "OpenSans-Semibold",
                }}
              />
              {/* <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={50}
            > */}
              <NeomorphFlexView
                viewStyle={{
                  padding: 0,
                  marginHorizontal: wp(3),
                  marginTop: hp(2),
                  borderRadius: wp(3),
                }}
              >
                <View style={{ width: "100%", padding: hp(2) }}>
                  <Text
                    text="Body fat calculation results based on Jackson-Polock 7 equation for men and women"
                    textStyle={{ fontSize: wp(3), fontFamily: "OpenSans" }}
                  />
                </View>
                <Divider width="100%" height={hp(0.2)} style={{ margin: 0 }} />
                {[
                  {
                    part: "Age",
                  },
                  {
                    part: "Abdominal",
                    img: "https://firebasestorage.googleapis.com/v0/b/guest-house-bff87.appspot.com/o/Abdominal.jpg?alt=media&token=e6fd09a1-cc33-45a7-8cb9-ed600de0e67c",
                  },
                  {
                    part: "Chest",
                    img: "https://firebasestorage.googleapis.com/v0/b/guest-house-bff87.appspot.com/o/Chest.jpg?alt=media&token=cb0753e2-c9d7-4eaa-b85c-796ecef9412b",
                  },
                  {
                    part: "Midaxillary",
                    img: "https://firebasestorage.googleapis.com/v0/b/guest-house-bff87.appspot.com/o/Midaxillary.jpg?alt=media&token=21495f56-a811-4455-9d19-080adc0d2726",
                  },
                  {
                    part: "Subscapular",
                    img: "https://firebasestorage.googleapis.com/v0/b/guest-house-bff87.appspot.com/o/subscapular.jpg?alt=media&token=776bfd37-f801-4cfd-aa7a-1a7c946461fa",
                  },
                  {
                    part: "Suprailliac",
                    img: "https://firebasestorage.googleapis.com/v0/b/guest-house-bff87.appspot.com/o/Suprailiac.jpg?alt=media&token=f9e257ec-351f-4d26-9273-ff9c7f190367",
                  },
                  {
                    part: "Thigh",
                    img: "https://firebasestorage.googleapis.com/v0/b/guest-house-bff87.appspot.com/o/Thigh.jpg?alt=media&token=ecac8b61-17e8-4820-91dc-587cbc85e7b1",
                  },
                  {
                    part: "Tricep",
                    img: "https://firebasestorage.googleapis.com/v0/b/guest-house-bff87.appspot.com/o/Tricep.jpg?alt=media&token=7815be19-5a68-4023-a729-6335e8fed919",
                  },
                ].map((dt, i) => {
                  return (
                    <React.Fragment key={i}>
                      <View
                        style={{
                          width: "100%",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingHorizontal: hp(2),
                          paddingVertical: hp(0.5),
                        }}
                      >
                        <Text
                          text={dt.part}
                          textStyle={{
                            fontSize: wp(4),
                            color: blueColor,
                            fontFamily: "OpenSans",
                          }}
                        />
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <TouchableOpacity
                            onPress={
                              dt.part == "Age"
                                ? null
                                : () => {
                                    setImagePath(dt.img);
                                    setIsView(true);
                                  }
                            }
                          >
                            {dt.part == "Age" ? null : (
                              <Text
                                text="?"
                                textStyle={{
                                  fontSize: wp(4),
                                  color: redColor,
                                  fontFamily: "OpenSans-Semibold",
                                }}
                              />
                            )}
                          </TouchableOpacity>

                          <Neomorph
                            inner
                            style={{
                              shadowRadius: 4,
                              backgroundColor: backgroundColor1,
                              justifyContent: "center",
                              alignItems: "center",
                              width: wp(22),
                              height: hp(5.5),
                              borderRadius: hp(2.75),
                              marginLeft: wp(3),
                              marginRight: dt.part === "Age" ? wp(6) : wp(0),
                            }}
                          >
                            <NeomorphBlur
                              style={{
                                shadowRadius: 2,
                                backgroundColor: buttonColor,
                                width: wp(18),
                                height: hp(4.3),
                                borderRadius: hp(2),
                              }}
                            >
                              <TextInput
                                onFocus={() => {
                                  weightFocused.current = "position";
                                  setBodyFatState({
                                    ...bodyFatState,
                                    [dt.part]: "",
                                  });
                                }}
                                keyboardType="numeric"
                                maxLength={3}
                                placeholder="0"
                                placeholderTextColor={blueColor}
                                value={bodyFatState[dt.part]}
                                onChangeText={(text) =>
                                  inputHandler(dt.part, text)
                                }
                                style={{
                                  color: blueColor,
                                  fontFamily: "OpenSans-Semibold",
                                  fontSize: wp(3),
                                  height: "100%",
                                  textAlign: "center",
                                }}
                              />
                            </NeomorphBlur>
                          </Neomorph>

                          {dt.part == "Age" ? null : (
                            <Text
                              text="mm"
                              textStyle={{
                                fontSize: wp(3),
                                fontFamily: "OpenSans-Semibold",
                              }}
                            />
                          )}
                        </View>
                      </View>
                      <Divider
                        width="100%"
                        height={hp(0.2)}
                        style={{ margin: 0 }}
                      />
                    </React.Fragment>
                  );
                })}

                <View
                  style={{
                    width: "100%",
                    paddingHorizontal: hp(2),
                    paddingVertical: hp(1.5),
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button1
                      onPress={calculateBodyFat}
                      buttonText="CALCULATE BODY FAT"
                      isIcon={false}
                      isText={true}
                      buttonIcon={null}
                      tintColor={null}
                      buttonTextStyle={{
                        fontSize: wp(3.5),
                        fontFamily: "OpenSans-Semibold",
                      }}
                      buttonContainer={{
                        width: wp(48),
                        height: hp(6.5),
                        borderRadius: hp(3.25),
                      }}
                      buttonInnerContainer={{
                        width: wp(44),
                        height: hp(5),
                        borderRadius: hp(2.5),
                      }}
                    />
                    <Button1
                      buttonText={calculatedFat.toFixed(1)}
                      isIcon={false}
                      isText={true}
                      buttonIcon={null}
                      tintColor={null}
                      buttonTextStyle={{
                        fontSize: wp(4),
                        color: blueColor,
                        fontFamily: "OpenSans-Semibold",
                      }}
                      buttonContainer={{
                        width: wp(30),
                        height: hp(6.5),
                        borderRadius: hp(3.25),
                      }}
                      buttonInnerContainer={{
                        width: wp(26),
                        height: hp(5),
                        borderRadius: hp(2.5),
                      }}
                    />
                  </View>
                  <Button1
                    onPress={addBodyCompositionHandler}
                    buttonText="SAVE BODY FAT AND WEIGHT"
                    isIcon={false}
                    isText={true}
                    buttonIcon={null}
                    tintColor={null}
                    buttonTextStyle={{
                      fontSize: wp(3.5),
                      color: redColor,
                      fontFamily: "OpenSans-Semibold",
                    }}
                    buttonContainer={{
                      width: wp(78),
                      height: hp(6.5),
                      borderRadius: hp(3.25),
                      marginTop: hp(1),
                    }}
                    buttonInnerContainer={{
                      width: wp(74),
                      height: hp(5),
                      borderRadius: hp(2.5),
                    }}
                  />
                </View>
              </NeomorphFlexView>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
      {/* <DrawerButton onPress={()=>openDrawer()} right={0} top={hp(42.5)} /> */}
    </View>
  );
}
