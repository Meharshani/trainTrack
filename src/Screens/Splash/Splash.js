import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ToastAndroid,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { backgroundColor } from "../../Utils/ThemeColors";
import { CommonActions } from "@react-navigation/native";
import isNetworkAvailable from "../../Utils/Network";
import BackgroundTimer from "react-native-background-timer";
import data from '../Data'
import {
  getAllMuscleGroup,
  getAllExercises,
  getGlobalValues,
  getOrderedBodyCompositions,
  getOrderedWeightHistory,
  allWorkoutsOrdered,
  allSets,
  getAllProfiles,
  getOrderedWorkoutData,
  getOrderedWorkoutDays,
  getProfileShortcuts,
} from "../../realm/index";
import { useSelector, useDispatch } from "react-redux";
import { backupHandler } from "../../redux/backup";
import axios from "axios";
import { BASEURL } from "../../env";
const { width } = Dimensions.get("window");

const Splash = (props) => {
  console.log('sjsjns')
  // useEffect(() => {
  //   setTimeout(async () => {
       
  //     // props.navigation.navigate("Signin");
  //     // navigation.navigate('Home')
   
  //     // navigation.navigate('CollectionDD', { screen: 'CollectionDD' });
  //     // AsyncStorage.clear().then(() => {
  //     //   console.log('finish')
  //     // })
  //   }, 2000) 
  // }, [])
  const user = useSelector((state) => state.login.login);
  const backup = useSelector((state) => state.backup.backup);
  const dispatch = useDispatch();

  const backgroundTaskHandler = () => {
    BackgroundTimer.runBackgroundTimer(async () => {
      const network = await isNetworkAvailable();
      if (network.type === "wifi" && network.details.strength >= 60) {
        backupScheduler();
      } else {
        dispatch(backupHandler(false));
        if (Platform.OS === "android") {
          ToastAndroid.show(
            "Connect to Wifi for scheduled backup",
            ToastAndroid.LONG
          );
        } else {
          Alert.alert("Info", "Connect to Wifi for scheduled backup", [
            { text: "Okay" },
          ]);
        }
      }
    }, 86400000);
  };
  // run after every 24 hours
  useEffect(() => {
    // return backupScheduler();
    // console.log('muscleeee --->',data["Muscle Groups"])
    if (user !== null) {
      if (backup) {
        backgroundTaskHandler();
      } else {
        backupScheduler();
      }
    }
  }, []);

  //backup schduler
  const backupScheduler = async () => {
    let allProfiles = await getAllProfiles();
    let muscleGroups = await getAllMuscleGroup();
    let allExercises = await getAllExercises();
    let globarValues = await getGlobalValues();
    let orderedWeightHistory = await getOrderedWeightHistory();
    let bodyComp = await getOrderedBodyCompositions();
    const sets = await allSets();
    const workouts = await allWorkoutsOrdered();
    const workoutData = await getOrderedWorkoutData();
    const workoutDays = await getOrderedWorkoutDays();
    const shortcuts = await getProfileShortcuts();

    let payload = {
      user: user._id,
      data: {
        profile: allProfiles,
        exercise: allExercises,
        muscleGroup: muscleGroups,
        globarValues,
        weightHistory: orderedWeightHistory,
        bodyComp,
        sets,
        workouts,
        shortcuts,
        workoutData,
        workoutDays,
      },
    };
    axios
      .post(`${BASEURL}/user/backupData`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log("RES ", res.data);
        if (res.data.message === "Success") {
          dispatch(backupHandler(true));
          if (Platform.OS === "android") {
            ToastAndroid.show(
              "Success: Your data has been backup",
              ToastAndroid.LONG
            );
          } else {
            Alert.alert("Info", "Your data has been backup", [
              { text: "Okay" },
            ]);
          }
        } else {
          if (Platform.OS === "android") {
            ToastAndroid.show("Error: Something went wrong", ToastAndroid.LONG);
          } else {
            Alert.alert("Info", "Something went wrong", [{ text: "Okay" }]);
          }
        }
      })
      .catch((e) => {
        dispatch(backupHandler(false));
        // console.log(e);
      });
  };

  //get memberships handler
  const getMemberhipsCheckHandler = () => {
    // console.log(user?._id);
    axios
      .post(
        `${BASEURL}/user/checkMembership`,
        {
          id: user._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        // console.log("res", res);
        if (res.data.doc) {
          const expiry = res.data?.doc?.membershipExpiry;
          const currentDate = new Date();
          const expiryDate = new Date(expiry);
          if (currentDate <= expiryDate) {
            props.navigation.dispatch(
              CommonActions.reset({ routes: [{ name: "UserShortCuts" }] })
            );
          } else {
            props.navigation.dispatch(
              CommonActions.reset({
                routes: [
                  {
                    name: "Memberships",
                    params: {
                      membership: false,
                    },
                  },
                ],
              })
            );
          }
        }
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  //check membership expiry from async
  const checkFromAsyncHandler = async () => {
    const expiry = user?.membershipExpiry;
    const currentDate = new Date();
    const expiryDate = new Date(expiry);
    if (currentDate <= expiryDate) {
      props.navigation.dispatch(
        CommonActions.reset({ routes: [{ name: "UserShortCuts" }] })
      );
    } else {
      props.navigation.dispatch(
        CommonActions.reset({
          routes: [
            {
              name: "Memberships",
              params: {
                membership: false,
              },
            },
          ],
        })
      );
    }
  };

  //check user, membership locally and from internet
  const checkMembershipHandler = async () => {
    if (user !== null) {
      const network = await isNetworkAvailable();
      // console.log("CONNECTED ", network.isConnected);
      if (network.isConnected) {
        getMemberhipsCheckHandler();
      } else {
        checkFromAsyncHandler();
      }
    } else {
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        props.navigation.navigate("Signin");
      }, 3000);
    }
  };

  useEffect(() => {
    checkMembershipHandler();
    // props.navigation.navigate("Signin");
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../Assets/Images/CIRCLE_LOGO.png")}
        style={{ width: width / 1.4, height: 200 }}
        resizeMode="contain"
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColor,
  },
});
