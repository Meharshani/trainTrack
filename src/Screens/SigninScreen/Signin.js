import React, { useState, useEffect } from "react";
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
import Input from "../../Components/InputComp/Input";
import Styles from "./Styles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ImageComp from "../../Components/ImageComp/Image";
import { blueColor, borderColor, redColor } from "../../Utils/ThemeColors";
import { Divider } from "../../Components/DividerComp/Divider";
import realm from "../../realm";
import { profile } from "../../redux/profile";
import { addMuscleGroup } from "../../realm";
import axios from "axios";
import { BASEURL } from "../../env";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setLoginDetails } from "../../redux/login";
import Dataa from '../Data'
export default function Signin({ navigation: { navigate } }) {
  const [email, setEmail] = useState("wahasali22@gmail.com");
  const [password, setPassword] = useState("123456");
  const [isLoading, setIsLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const muscleGroups = [
  //   { _id: 0, muscle: "CHEST" },
  //   { _id: 1, muscle: "LEG" },
  //   { _id: 2, muscle: "SHOULDERS" },
  //   { _id: 3, muscle: "BACK" },
  //   { _id: 4, muscle: "ARM" },
  // ];

  //load main profile
  const loadUserData = async (user) => {
    const profileData = await realm.objects("profile");
    console.log('llllllllllllllllllllllllllllllllllllllll')
    if (profileData.length === 0) {
      let data = {
        _id: 1,
        name: user.fName,
        gender: user.gender,
        age: user.age,
        createdDate: new Date(),
      };
      dispatch(profile(data));
      await realm.write(() => {
        realm.create("profile", data);
        const muscleGroups = Dataa["Muscle Groups"]
        const exercises = Dataa['Exercises']
        const workouts = Dataa['Workouts']
        let muscleGroupToAdd = muscleGroups.map((item, index) => {
          return {
            _id: index + 1,
            name: item.NAME,
            profile: data,
            createdDate: new Date(Date.now()),
          }
        })
        const exercisesToAdd = exercises.map((exer, index) => {
          return {
            name: exer.NAME,
            notes: exer.NOTES!==undefined?exer.NOTES:"-",
            type: exer.TYPE === 'UNILATERAL' ? 0 : (exer.TYPE === "BILATERAL" ? 1 : 2),
            createdDate: new Date(),
            profile: data,
            muscleGroup: muscleGroupToAdd.filter((muscle) => muscle.name === exer["MUSCLE GROUP"])[0],
            _id: index + 1
          }
        })
        const workoutsToAdd = workouts.map((workout, index) => {
          const workoutExercises = []
          for (const item of Object.entries(workout)) {
            if (workout[0] !== "NAME") {
              let exerciseName = item[1]
              let exercise = exercisesToAdd.filter((exer) => exer.name === exerciseName)[0]
              if(exercise!==undefined)
              workoutExercises.push(exercise)
            }
          }
          return {
            _id: index + 1,
            name: workout.NAME,
            createdDate: new Date(),
            profile: data,
            icon: 1,
            exercises:workoutExercises
          }
        })
        // console.log('workout to addd -->',workoutsToAdd[0])
        muscleGroupToAdd.forEach((item, index) => {
          realm.create(
            "muscleGroup",
            {
              ...item
            },
            "modified"
          );
        });
        exercisesToAdd.forEach((item,index)=>{
          realm.create(
            "exercise",
            {
              ...item
            },
            'modified'
          )
        })
        workoutsToAdd.map((item,index)=>{
          realm.create(
            'workouts',
            {
              ...item
            },
            "modified"
          )
        })
        // addExercises(data)
      });
    }
  };

  //validation handler
  const validationHandler = () => {
    setEmailErr("");
    setPasswordErr("");

    let emailReg =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email === "") {
      setEmailErr("Email is Required");
      return false;
    }

    if (!emailReg.test(email)) {
      setEmailErr("Invalid Email");
      return false;
    }

    if (password === "") {
      setPasswordErr("Password is Required");
      return false;
    }

    return true;
  };

  //login handler
  const loginHandler = () => {
    if (validationHandler()) {
      let payload = {
        email: email,
        password: password,
      };
      setIsLoading(true);
      axios
        .post(`${BASEURL}/user/userLogin`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setIsLoading(false);
          if (res.data.doc) {
            setData(res.data);
            loadUserData(res.data.doc);
            restoreDataFromBackend(res.data.doc);
            dispatch(setLoginDetails(res.data.doc));
            navigation.dispatch(
              CommonActions.reset({ routes: [{ name: "UserShortCuts" }] })
            );
          } else {
            if (Platform.OS === "android") {
              ToastAndroid.show(res.data?.err, ToastAndroid.SHORT);
            } else {
              Alert.alert("Error", res.data?.err, [{ text: "Okay" }]);
            }
          }
        })
        .catch((e) => {
          setIsLoading(false);
          console.log(e);
        });
    }
  };

  //restore data in realm
  const restoreDataInRealm = async (data) => {
    try {
      let {
        exercise,
        muscleGroup,
        globarValues,
        weightHistory,
        bodyComp,
        sets,
        workouts,
        shortcuts,
        workoutData,
        workoutDays,
      } = data;

      if (muscleGroup !== null && muscleGroup !== undefined) {
        if (muscleGroup.length > 0) {
          await realm.write(() => {
            muscleGroup.forEach((exer) => {
              realm.create("muscleGroup", { ...exer }, "modified");
            });
          });
        }
      }
      if (exercise !== null && exercise !== undefined) {
        if (exercise.length > 0) {
          await realm.write(() => {
            exercise.forEach((exer) => {
              realm.create("exercise", { ...exer }, "modified");
            });
          });
        }
      }
      if (weightHistory !== null && weightHistory !== undefined) {
        if (weightHistory.length > 0) {
          await realm.write(() => {
            weightHistory.forEach((exer) => {
              realm.create("weightHistory", { ...exer }, "modified");
            });
          });
        }
      }
      if (bodyComp !== null && bodyComp !== undefined) {
        if (bodyComp.length > 0) {
          await realm.write(() => {
            bodyComp.forEach((exer) => {
              realm.create("bodyComp", { ...exer }, "modified");
            });
          });
        }
      }
      if (workouts !== null && workouts !== undefined) {
        if (workouts.length > 0) {
          await realm.write(() => {
            workouts.forEach((exer) => {
              realm.create("workouts", { ...exer }, "modified");
            });
          });
        }
      }
      if (sets !== null && sets !== undefined) {
        if (sets.length > 0) {
          await realm.write(() => {
            sets.forEach((exer) => {
              realm.create("sets", { ...exer }, "modified");
            });
          });
        }
      }
      if (workoutData !== null && workoutData !== undefined) {
        if (workoutData.length > 0) {
          await realm.write(() => {
            workoutData.forEach((exer) => {
              realm.create("workoutData", { ...exer }, "modified");
            });
          });
        }
      }
      if (workoutDays !== null && workoutDays !== undefined) {
        if (workoutDays.length > 0) {
          await realm.write(() => {
            workoutDays.forEach((exer) => {
              realm.create("workoutDays", { ...exer }, "modified");
            });
          });
        }
      }

      if (globarValues !== null && globarValues !== undefined) {
        if (globarValues.length > 0) {
          await realm.write(() => {
            realm.create("globalValues", { ...globarValues }, "modified");
          });
        }
      }

      if (data.profile[0] !== null && data.profile[0] !== undefined) {
        if (data.profile[0].length > 0) {
          await realm.write(() => {
            realm.create("profile", { ...data.profile[0] }, "modified");
          });
        }
      }

      if (shortcuts !== null && shortcuts !== undefined) {
        if (shortcuts.length > 0) {
          await realm.write(() => {
            realm.create("shortcuts", { ...shortcuts }, "modified");
          });
        }
      }

      if (Platform.OS === "android") {
        ToastAndroid.show("Success: Data has been restored", ToastAndroid.LONG);
      } else {
        Alert.alert("Info", "Data has been restored successfully!", [
          { text: "Okay" },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //restore data from backend
  const restoreDataFromBackend = async (user) => {
    let payload = {
      user: user?._id,
    };

    axios
      .post(`${BASEURL}/user/restoreData`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("RES ", res.data);
        if (res.data.message === "Success") {
          // console.log('restore dataaaa --->', res.data.doc)
          restoreDataInRealm(res.data.doc);
        } else {
          if (Platform.OS === "android") {
            ToastAndroid.show("Error: Something went wrong", ToastAndroid.LONG);
          } else {
            Alert.alert("Info", "Something went wrong", [{ text: "Okay" }]);
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
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
            text="LOGIN"
            textStyle={{ fontSize: wp(5.5), fontFamily: "OpenSans-Bold" }}
          />
          <Input
            value={email}
            onchange={(text) => setEmail(text)}
            placeholder="EMAIL"
            viewStyle={{
              height: hp(7.5),
              borderBottomWidth: 1,
              borderBottomColor: borderColor,
              marginTop: hp(4),
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
                marginVertical: wp(2),
                alignSelf: "flex-start",
                marginLeft: wp(1.2),
              }}
            />
          ) : (
            <View />
          )}

          <Input
            secureTextEntry={true}
            value={password}
            onchange={(text) => setPassword(text)}
            placeholder="PASSWORD"
            viewStyle={{
              height: hp(7.5),
              borderBottomWidth: 1,
              borderBottomColor: borderColor,
              marginTop: hp(1.5),
            }}
            inputStyle={{ fontSize: wp(3.5), fontFamily: "OpenSans-Semibold" }}
          />

          {passwordErr !== "" ? (
            <Text
              text={passwordErr}
              textStyle={{
                color: redColor,
                fontSize: wp(3),
                fontFamily: "OpenSans-Bold",
                marginVertical: wp(2),
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
              text="Don't have account?"
              textStyle={{ fontSize: wp(3), fontFamily: "OpenSans-Semibold" }}
            />
            <TouchableOpacity onPress={() => navigate("Signup")}>
              <Text
                text="SIGN UP"
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
            onPress={loginHandler}
            isText={true}
            isLoading={isLoading}
            buttonText="SIGN IN"
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
