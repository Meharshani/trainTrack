import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
} from "react-native";
import {
  backIcon,
  circleLogo,
  facebookIcon,
  instagramIcon,
  twitterIcon,
} from "../../Utils/ImagesPath";
import Text from "../../Components/TextComp/Text";
import ModalView from "../../Components/ModalView/ModalView";
import Input from "InputComp/Input";
import Styles from "./Styles";
import {
  backgroundColor,
  backgroundColor1,
  blueColor,
  blueColor1,
  borderColor,
  buttonTextColor,
  redColor,
} from "../../Utils/ThemeColors";
import { NeomorphFlexView } from "../../Components/NeomorphView/NeomorphView";
import ImageComp from "../../Components/ImageComp/Image";
import { Button1,Button2 } from "../../Components/Buttons/Buttons";
import DrawerButton from "DrawerButton/DrawerButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Divider } from "Divider/Divider";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setSoundONOFF } from "../../redux/notificationsound";
import realm, {
  addMuscleGroup,
  deleteMuscleGroup,
  updateMuscleGroup,
  getAllMuscleGroup,
  getAllExercises,
  getGlobalValues,
  setRestInterval,
  getOrderedBodyCompositions,
  getOrderedWeightHistory,
  allWorkoutsOrdered,
  allSets,
  getAllProfiles,
  getOrderedWorkoutData,
  getProfileShortcuts,
  getOrderedWorkoutDays,
} from "../../realm/index";
import RNFS from "react-native-fs";
import {
  zipWithPassword,
  unzipWithPassword,
  zip,
  unzip,
} from "react-native-zip-archive";
import RNFetchBlob from "rn-fetch-blob";
import DocumentPicker from "react-native-document-picker";
import Toast from "react-native-toast-message";

export default function Setting({ navigation: { openDrawer, navigate } }) {
  const [isView, setIsView] = useState(false);
  const [timer, setTimer] = useState(2);
  const [timerSound, setTimerSound] = useState(true);
  const [muscleGroup, setMuscleGroup] = useState("");
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [selectedMusclesDelete, setSelectedMusclesDelete] = useState(undefined);
  const [selectedMusclesEdit, setSelectedMusclesEdit] = useState(undefined);
  const [muscleGroupErr, setMuscleGroupErr] = useState(false);
  const selectedProfile = useSelector((state) => state.profiles.profile);
  const navigation = useNavigation();
  const [initialMin, setInitialMin] = useState(0);
  const [initialSecs, setInitialSecs] = useState(59);
  const dispatch = useDispatch();
  var handleNoRepeat = [];

  // console.log("PROFILE ", selectedProfile);
  // console.log("MUSCLES ", muscleGroups);

  //get muscles
  const getMuscles = () => {
    // console.log("PROFILES ", getAllMuscleGroup(1));
    const muscles = getAllMuscleGroup(selectedProfile._id);
    setMuscleGroups(muscles);
  };

  useEffect(() => {
    const subscribe = navigation.addListener("focus", () => {
      getMuscles();
    });
    return () => subscribe;
  }, [getMuscles]);

  useEffect(() => {
    getMuscles();
  }, []);

  //add muscle group
  const handleAddMucsleGroup = async () => {
    if (muscleGroup !== "") {
      let musclesGroupCopy = [];
      let updatedMuscleGroup = [];
      if (muscleGroup.length > 0) {
        let _id = 0;

        if (muscleGroups.length == 0) {
          musclesGroupCopy = [...muscleGroups];
          updatedMuscleGroup = [
            ...musclesGroupCopy,
            { _id: 0, name: muscleGroup },
          ];
          addMuscleGroup(_id, muscleGroup, selectedProfile);
          setMuscleGroup("");
        } else {
          _id = realm.objects("muscleGroup").max("_id") + 1;
          musclesGroupCopy = [...muscleGroups];
          updatedMuscleGroup = [
            ...musclesGroupCopy,
            { _id: _id, name: muscleGroup },
          ];
          addMuscleGroup(_id, muscleGroup, selectedProfile);
          setMuscleGroup("");
        }
      }

      setMuscleGroups(updatedMuscleGroup);
      setIsView(false);
    } else {
      setMuscleGroupErr(true);
    }
  };

  //delete muscle
  const deleteMusclesHandler = () => {
    if (selectedMusclesDelete != undefined) {
      const filterMuscles = muscleGroups.filter(
        (items) => items._id != selectedMusclesDelete._id
      );
      setMuscleGroups(filterMuscles);
      deleteMuscleGroup(selectedMusclesDelete._id);
      setIsView(false);
    }
  };

  //edit muscle
  const editMusclesHandler = async () => {
    if (selectedMusclesEdit != undefined) {
      updateMuscleGroup(
        selectedMusclesEdit._id,
        muscleGroup,
        selectedProfile,
        new Date(Date.now())
      );
      setIsView(false);
      const muscles = getAllMuscleGroup();
      setMuscleGroups(muscles);
    }
  };

  //set global value of interval
  const setGlobalValueInterval = () => {
    const global = getGlobalValues(selectedProfile?._id);

    if (global.length > 0) {
      const filterGlobal = global.find(
        (item) => item.profile._id === selectedProfile._id
      );

      // console.log("GLOBAL ", global);

      if (filterGlobal.restInterval === 1) {
        setTimer(1);
      } else if (filterGlobal.restInterval === 2) {
        setTimer(2);
      } else if (filterGlobal.restInterval === 3) {
        setTimer(3);
      } else {
        setTimer(0);
      }
    } else {
      return;
    }
  };

  //get global interval
  useEffect(() => {
    setGlobalValueInterval();
  }, []);

  //set rest counter handler
  const setRestCountdownHandler = async (min, sec, interval) => {
    setTimer(interval);
    setInitialMin(min);
    setInitialSecs(sec);
    await setRestInterval(selectedProfile._id, interval, selectedProfile);
  };

  const createBackupFile = async () => {
    let allProfiles = await getAllProfiles();
    let muscleGroups = await getAllMuscleGroup();
    let allExercises = await getAllExercises();
    let globarValues = await getGlobalValues();
    let orderedWeightHistory = await getOrderedWeightHistory();
    let bodyComp = await getOrderedBodyCompositions();
    const sets = await allSets();
    const shortcuts = await getProfileShortcuts();
    const workouts = await allWorkoutsOrdered();
    const workoutData = await getOrderedWorkoutData();
    const workoutDays = await getOrderedWorkoutDays();

    let data = {
      profiles: allProfiles,
      exercises: allExercises,
      muscles: muscleGroups,
      globarValues,
      orderedWeightHistory,
      bodyComp,
      sets,
      shortcuts,
      workouts,
      workoutData,
      workoutDays,
    };
    if (Platform.OS === "ios") {
      RNFS.mkdir(RNFS.DocumentDirectoryPath + "/Training/");
      var path = RNFS.DocumentDirectoryPath + "/Training/test.txt";

      // write the file
      RNFS.writeFile(path, JSON.stringify(data), "utf8")
        .then((success) => {
          let dateTime = new Date();
          let dateString = `${
            dateTime.getMonth() + 1
          } - ${dateTime.getDate()} - ${dateTime.getFullYear()}`;
          // console.log("dateStr-->", dateString);
          // console.log("FILE WRITTEN!");
          // console.log("success-->", success);
          const targetPath = `${RNFS.DocumentDirectoryPath}/Training-backup_${dateString}.zip`;
          const password = "wkpad9u0pj4rJOr4OJt45J54pPJzQOJWenocfs";
          const encryptionType = "STANDARD"; //possible values: AES-256, AES-128, STANDARD. default is STANDARD

          zipWithPassword(
            RNFS.DocumentDirectoryPath + "/Training/",
            targetPath,
            password,
            encryptionType
          )
            .then((zippath) => {
              // console.log(`zip completed at ${zippath}`);
              RNFetchBlob.ios.openDocument(zippath);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((err) => {
          // console.log(err.message);
        });
    } else {
      RNFS.mkdir(RNFS.DownloadDirectoryPath + "/TrainingTracker/");
      var path = RNFS.DownloadDirectoryPath + "/TrainingTracker/test.txt";

      // write the file
      RNFS.writeFile(path, JSON.stringify(data), "utf8")
        .then((success) => {
          let dateTime = new Date();
          let dateString = `${
            dateTime.getMonth() + 1
          } - ${dateTime.getDate()} - ${dateTime.getFullYear()}`;
          // console.log("dateStr-->", dateString);
          // console.log("FILE WRITTEN!");
          // console.log("success-->", success);
          const targetPath = `${RNFS.DownloadDirectoryPath}/TrainingTracker/Training-backup_${dateString}.zip`;
          const password = "wkpad9u0pj4rJOr4OJt45J54pPJzQOJWenocfs";
          const encryptionType = "AES-256"; //possible values: AES-256, AES-128, STANDARD. default is STANDARD

          zipWithPassword(
            RNFS.DownloadDirectoryPath + "/TrainingTracker/",
            targetPath,
            password,
            encryptionType
          )
            .then((zippath) => {
              // console.log(`zip completed at ${zippath}`);
              ToastAndroid.show(
                `File created successfully at ${targetPath}`,
                ToastAndroid.LONG
              );
              RNFS.unlink(
                `${RNFS.DownloadDirectoryPath}/TrainingTracker/test.txt`
              );
            })
            .catch((error) => {
              // console.log("ERROR ", error);
              RNFS.unlink(
                `${RNFS.DownloadDirectoryPath}/TrainingTracker/test.txt`
              );
              ToastAndroid.show(
                `Error: File creation failed`,
                ToastAndroid.LONG
              );
            });
        })
        .catch((err) => {
          ToastAndroid.show(`Error: File creation failed`, ToastAndroid.LONG);
        });
    }
  };

  //create backup handler
  const createBackupHandler = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        createBackupFile();
      } else {
        alert("Grant Permission to have backup");
      }
    } else {
      createBackupFile();
    }
  };

  //read backup
  const readBackupFile = () => {
    if (Platform.OS === "ios") {
      DocumentPicker.pick({
        type: "com.pkware.zip-archive",
      })
        .then((success) => {
          let sourcePathOfZip = success.fileCopyUri;
          const randomNumber = (Math.floor(Math.random() * 1000000) + 1000000)
            .toString()
            .substring(1);
          let destinationPathOfZip =
            RNFS.DocumentDirectoryPath + "/appBack" + randomNumber + ".zip";
          RNFS.copyFile(sourcePathOfZip, destinationPathOfZip).then(
            (response) => {
              // console.log("movedddd--->", response);
              const targetPath = RNFS.DocumentDirectoryPath;
              const password = "wkpad9u0pj4rJOr4OJt45J54pPJzQOJWenocfs";

              unzipWithPassword(destinationPathOfZip, targetPath, password)
                .then((path) => {
                  var textPath = RNFS.DocumentDirectoryPath + "/test.txt";
                  RNFS.readFile(textPath, "utf8").then(async (response) => {
                    Toast.show({
                      type: "info",
                      position: "top",
                      text1: "Restoring data",
                      text2: "Your data is being restored. Please be patient.",
                      autoHide: true,
                      topOffset: 100,
                      onShow: () => {},
                      onHide: () => {},
                      onPress: () => {},
                      visibilityTime: 4000,
                    });
                    let data = JSON.parse(response);
                    let {
                      profiles,
                      exercises,
                      muscles,
                      globarValues,
                      orderedWeightHistory,
                      bodyComp,
                      sets,
                      shortcuts,
                      workouts,
                      workoutData,
                      workoutDays,
                    } = data;
                    if (muscles !== null && muscles !== undefined) {
                      if (muscles.length > 0) {
                        await realm.write(() => {
                          muscles.forEach((exer) => {
                            realm.create(
                              "muscleGroup",
                              { ...exer },
                              "modified"
                            );
                          });
                        });
                      }
                    }
                    if (exercises !== null && exercises !== undefined) {
                      if (exercises.length > 0) {
                        await realm.write(() => {
                          exercises.forEach((exer) => {
                            realm.create("exercise", { ...exer }, "modified");
                          });
                        });
                      }
                    }
                    if (
                      orderedWeightHistory !== null &&
                      orderedWeightHistory !== undefined
                    ) {
                      if (orderedWeightHistory.length > 0) {
                        await realm.write(() => {
                          orderedWeightHistory.forEach((exer) => {
                            realm.create(
                              "weightHistory",
                              { ...exer },
                              "modified"
                            );
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
                            realm.create(
                              "workoutData",
                              { ...exer },
                              "modified"
                            );
                          });
                        });
                      }
                    }
                    if (workoutDays !== null && workoutDays !== undefined) {
                      if (workoutDays.length > 0) {
                        await realm.write(() => {
                          workoutDays.forEach((exer) => {
                            realm.create(
                              "workoutDays",
                              { ...exer },
                              "modified"
                            );
                          });
                        });
                      }
                    }

                    if (globarValues !== null && globarValues !== undefined) {
                      await realm.write(() => {
                        realm.create(
                          "globalValues",
                          { ...globarValues },
                          "modified"
                        );
                      });
                    }

                    if (profiles !== null && profiles !== undefined) {
                      await realm.write(() => {
                        realm.create("profile", { ...profiles }, "modified");
                      });
                    }

                    if (shortcuts !== null && shortcuts !== undefined) {
                      await realm.write(() => {
                        realm.create("shortcuts", { ...shortcuts }, "modified");
                      });
                    }
                  });
                  setTimeout(() => {
                    Toast.show({
                      type: "success",
                      position: "top",
                      text1: "Restore Complete",
                      text2:
                        "All your data in backup file has been restored successfully.",
                      autoHide: true,
                      topOffset: 100,
                      onShow: () => {},
                      onHide: () => {},
                      onPress: () => {},
                      visibilityTime: 4000,
                    });
                  }, 4000);
                })
                .catch((error) => {
                  Toast.show({
                    type: "error",
                    position: "top",
                    text1: "Restoring failed",
                    text2: "Invalid Zip file",
                    autoHide: true,
                    topOffset: 100,
                    onShow: () => {},
                    onHide: () => {},
                    onPress: () => {},
                    visibilityTime: 4000,
                  });
                });
            }
          );
        })
        .catch((err) => {
          Toast.show({
            type: "error",
            position: "top",
            text1: "Restoring failed",
            text2: "Invalid Zip file",
            autoHide: true,
            topOffset: 100,
            onShow: () => {},
            onHide: () => {},
            onPress: () => {},
            visibilityTime: 4000,
          });
        });
    } else {
      DocumentPicker.pick({
        type: DocumentPicker.types.zip,
      })
        .then((success) => {
          let sourcePathOfZip = success[0].uri;
          // console.log("SOURCE", sourcePathOfZip);
          const randomNumber = (Math.floor(Math.random() * 1000000) + 1000000)
            .toString()
            .substring(1);
          let destinationPathOfZip =
            RNFS.DownloadDirectoryPath + "/appBack" + randomNumber + ".zip";
          RNFS.copyFile(sourcePathOfZip, destinationPathOfZip).then(
            (response) => {
              const targetPath = RNFS.DownloadDirectoryPath;
              const password = "wkpad9u0pj4rJOr4OJt45J54pPJzQOJWenocfs";

              unzipWithPassword(destinationPathOfZip, targetPath, password)
                .then((path) => {
                  var textPath = RNFS.DownloadDirectoryPath + "/test.txt";
                  RNFS.readFile(textPath, "utf8").then(async (response) => {
                    // console.log("response--->", response);
                    ToastAndroid.show(
                      "Restoring data: Your data is being restored. Please be patient",
                      ToastAndroid.LONG
                    );

                    let data = JSON.parse(response);
                    let {
                      profiles,
                      exercises,
                      muscles,
                      globarValues,
                      orderedWeightHistory,
                      bodyComp,
                      sets,
                      shortcuts,
                      workouts,
                      workoutData,
                      workoutDays,
                    } = data;
                    if (muscles !== null && muscles !== undefined) {
                      if (muscles.length > 0) {
                        await realm.write(() => {
                          muscles.forEach((exer) => {
                            realm.create(
                              "muscleGroup",
                              { ...exer },
                              "modified"
                            );
                          });
                        });
                      }
                    }
                    if (exercises !== null && exercises !== undefined) {
                      if (exercises.length > 0) {
                        await realm.write(() => {
                          exercises.forEach((exer) => {
                            realm.create("exercise", { ...exer }, "modified");
                          });
                        });
                      }
                    }
                    if (
                      orderedWeightHistory !== null &&
                      orderedWeightHistory !== undefined
                    ) {
                      if (orderedWeightHistory.length > 0) {
                        await realm.write(() => {
                          orderedWeightHistory.forEach((exer) => {
                            realm.create(
                              "weightHistory",
                              { ...exer },
                              "modified"
                            );
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
                            realm.create(
                              "workoutData",
                              { ...exer },
                              "modified"
                            );
                          });
                        });
                      }
                    }
                    if (workoutDays !== null && workoutDays !== undefined) {
                      if (workoutDays.length > 0) {
                        await realm.write(() => {
                          workoutDays.forEach((exer) => {
                            realm.create(
                              "workoutDays",
                              { ...exer },
                              "modified"
                            );
                          });
                        });
                      }
                    }

                    if (globarValues !== null && globarValues !== undefined) {
                      await realm.write(() => {
                        realm.create(
                          "globalValues",
                          { ...globarValues },
                          "modified"
                        );
                      });
                    }
                    if (profiles !== null && profiles !== undefined) {
                      await realm.write(() => {
                        realm.create("profile", { ...profiles }, "modified");
                      });
                    }
                    if (shortcuts !== null && shortcuts !== undefined) {
                      await realm.write(() => {
                        realm.create("shortcuts", { ...shortcuts }, "modified");
                      });
                    }
                  });
                  setTimeout(() => {
                    ToastAndroid.show(
                      "Restore Complete: All your data in backup file has been restored successfully",
                      ToastAndroid.LONG
                    );
                  }, 4000);
                  RNFS.unlink(
                    `${RNFS.DownloadDirectoryPath}/appBack${randomNumber}.zip`
                  );
                  RNFS.unlink(`${RNFS.DownloadDirectoryPath}/test.txt`);
                })
                .catch((error) => {
                  // console.error("ERROR 1", error);
                  ToastAndroid.show(
                    "Restoration Failed: Invalid Zip file",
                    ToastAndroid.LONG
                  );
                  RNFS.unlink(
                    `${RNFS.DownloadDirectoryPath}/appBack/${randomNumber}.zip`
                  );
                  RNFS.unlink(`${RNFS.DownloadDirectoryPath}/test.txt`);
                });
            }
          );
        })
        .catch((err) => {
          // console.log("ERROR", err);
          ToastAndroid.show(
            "Restoration Failed: Invalid Zip file",
            ToastAndroid.LONG
          );
        });
    }
  };

  return (
    <View style={Styles.containerStyle}>
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: hp(2) }}
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
              <Text
                text="SETTINGS"
                textStyle={{ fontSize: wp(5.5), fontFamily: "OpenSans-Bold" }}
              />
            </View>
            <Button1
              onPress={() => navigate("UserShortCuts")}
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
          <View style={Styles.section1.container}>
            <HeadingComp
              text="REST TIMER"
              textStyle={{
                fontSize: wp(4.5),
                marginHorizontal: wp(2),
                fontFamily: "OpenSans-Bold",
              }}
            />
            <NeomorphFlexView viewStyle={Styles.section1.view1}>
              <TouchableOpacity
                onPress={setRestCountdownHandler.bind(this, 0, 59, 1)}
                style={{
                  width: "24%",
                  height: "70%",
                  borderRadius: 50,
                  backgroundColor: timer === 1 ? blueColor1 : "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  text="1 minute"
                  textStyle={{
                    fontSize: wp(3),
                    fontFamily: "OpenSans-Semibold",
                    color: timer === 1 ? "white" : buttonTextColor,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={setRestCountdownHandler.bind(this, 1, 59, 2)}
                style={{
                  width: "24%",
                  height: "70%",
                  borderRadius: 50,
                  backgroundColor: timer === 2 ? blueColor1 : "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  text="2 minutes"
                  textStyle={{
                    fontSize: wp(3),
                    fontFamily: "OpenSans-Semibold",
                    color: timer === 2 ? "white" : buttonTextColor,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={setRestCountdownHandler.bind(this, 2, 59, 3)}
                style={{
                  width: "24%",
                  height: "70%",
                  borderRadius: 50,
                  backgroundColor: timer === 3 ? blueColor1 : "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  text="3 minutes"
                  textStyle={{
                    fontSize: wp(3),
                    fontFamily: "OpenSans-Semibold",
                    color: timer === 3 ? "white" : buttonTextColor,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={setRestCountdownHandler.bind(this, 0, 0, 0)}
                style={{
                  width: "24%",
                  height: "70%",
                  borderRadius: 50,
                  backgroundColor: timer === 0 ? blueColor1 : "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  text="none"
                  textStyle={{
                    fontSize: wp(3),
                    fontFamily: "OpenSans-Semibold",
                    color: timer === 0 ? "white" : buttonTextColor,
                  }}
                />
              </TouchableOpacity>
            </NeomorphFlexView>
            <NeomorphFlexView viewStyle={Styles.section1.view2}>
              <Text
                text="TIMER SOUND"
                textStyle={{
                  fontSize: wp(3.5),
                  fontFamily: "OpenSans-Semibold",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "50%",
                  height: "100%",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setSoundONOFF(true));
                    setTimerSound(true);
                  }}
                  style={{
                    width: "49%",
                    height: "70%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 50,
                    backgroundColor: timerSound ? blueColor1 : "transparent",
                  }}
                >
                  <Text
                    text="ON"
                    textStyle={{
                      fontSize: wp(3),
                      fontFamily: "OpenSans-Semibold",
                      color: timerSound ? "white" : buttonTextColor,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setSoundONOFF(false));
                    setTimerSound(false);
                  }}
                  style={{
                    width: "49%",
                    height: "70%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 50,
                    backgroundColor: !timerSound ? blueColor1 : "transparent",
                  }}
                >
                  <Text
                    text="OFF"
                    textStyle={{
                      fontSize: wp(3),
                      fontFamily: "OpenSans-Semibold",
                      color: !timerSound ? "white" : buttonTextColor,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </NeomorphFlexView>
          </View>

          <Divider
            width="100%"
            height={hp(0.2)}
            style={{
              marginTop: hp(2),
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
            }}
          />

          <View style={Styles.section2.container}>
            <HeadingComp
              text="MUSCLE GROUP"
              textStyle={{
                fontSize: wp(4.5),
                marginHorizontal: wp(2),
                fontFamily: "OpenSans-Bold",
              }}
            />
            <NeomorphFlexView
              viewStyle={{ ...Styles.section2.view1, height: "auto" }}
            >
              {muscleGroups.map((item, index) => {

                var founded = handleNoRepeat.find((myItem)=>myItem.toUpperCase()==item.name.toUpperCase());
                if(!founded){
                  handleNoRepeat.push(item.name);
                  return (
                    <View
                      style={{
                        width: "100%",
                        paddingHorizontal: wp(5),
                        paddingVertical: hp(0.75),
                        borderBottomColor: "black",
                        borderBottomWidth: index !== 4 ? 1 : 0,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      key={index}
                    >
                      <Text
                        text={item.name}
                        textStyle={{
                          fontSize: wp(3.5),
                          fontFamily: "OpenSans-Semibold",
                        }}
                      />
  
                      <View
                        style={{
                          width: 100,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            setIsView(true);
                            setSelectedMusclesEdit(item);
                            setSelectedMusclesDelete(undefined);
                            setMuscleGroup(item.name);
                          }}
                        >
                          <Text
                            text="Edit"
                            textStyle={{
                              fontSize: wp(3.5),
                              fontFamily: "OpenSans-Semibold",
                              color: blueColor1,
                            }}
                          />
                        </TouchableOpacity>
  
                        <TouchableOpacity
                          onPress={() => {
                            setIsView(true);
                            setSelectedMusclesDelete(item);
                            setMuscleGroup(item.name);
                            setSelectedMusclesEdit(undefined);
                          }}
                        >
                          <Text
                            text="Delete"
                            textStyle={{
                              fontSize: wp(3.5),
                              fontFamily: "OpenSans-Semibold",
                              color: "red",
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );  
                }

              })}

              <Button2
                onPress={() => {
                  setIsView(true);
                  setSelectedMusclesDelete(undefined);
                  setSelectedMusclesEdit(undefined);
                  setMuscleGroup("");
                }}
                isText={true}
                buttonText="ADD MUSCLE GROUP"
                isIcon={false}
                buttonIcon={null}
                buttonContainer={{
                  marginVertical: hp(2),
                  width: wp(44),
                  height: hp(5),
                  borderRadius: hp(2.75),
                }}
                buttonTextStyle={{
                  color: blueColor1,
                  fontSize: wp(3),
                  fontFamily: "OpenSans-Semibold",
                }}
                buttonInnerContainer={{
                  width: wp(43),
                  height: hp(4.5),
                  borderRadius: hp(2.25),
                }}
              />
            </NeomorphFlexView>
          </View>

          <Divider
            width="100%"
            height={hp(0.2)}
            style={{
              marginTop: hp(2),
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
            }}
          />

          <View style={Styles.section3.container}>
            <HeadingComp
              text="DATA BACK UP"
              textStyle={{
                fontSize: wp(4.5),
                marginHorizontal: wp(2),
                fontFamily: "OpenSans-Bold",
              }}
            />
            <NeomorphFlexView viewStyle={Styles.section3.view1}>
              <View>
                <Text
                  text="CONNECT TO PC"
                  textStyle={{
                    fontSize: wp(3.5),
                    fontFamily: "OpenSans-Semibold",
                  }}
                />

                <Text
                  text="TO BACKUP AND"
                  textStyle={{
                    fontSize: wp(3.5),
                    fontFamily: "OpenSans-Semibold",
                  }}
                />

                <Text
                  text="RESTORE DATA"
                  textStyle={{
                    fontSize: wp(3.5),
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
              </View>
              <View>
                <NeomorphFlexView
                  viewStyle={{
                    width: wp(35),
                    borderRadius: hp(2.25),
                    textAlign: "center",
                    paddingVertical: hp(1),
                  }}
                >
                  <Pressable onPress={createBackupHandler}>
                    <Text
                      text="BACKUP DATA NOW"
                      textStyle={{
                        fontSize: wp(3),
                        color: blueColor,
                        fontFamily: "OpenSans-Semibold",
                      }}
                    />
                  </Pressable>
                </NeomorphFlexView>
                <NeomorphFlexView
                  viewStyle={{
                    width: wp(35),
                    borderRadius: hp(2.25),
                    textAlign: "center",
                    paddingVertical: hp(1),
                    marginTop: hp(1),
                  }}
                >
                  <Pressable onPress={readBackupFile}>
                    <Text
                      text="RESTORE DATA NOW"
                      textStyle={{
                        fontSize: wp(3),
                        color: blueColor,
                        fontFamily: "OpenSans-Semibold",
                      }}
                    />
                  </Pressable>
                </NeomorphFlexView>
              </View>
            </NeomorphFlexView>
          </View>

          <Divider
            width="100%"
            height={hp(0.2)}
            style={{
              marginTop: hp(2),
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
            }}
          />

          <View style={Styles.section4.container}>
            <Text
              text="SOCIAL MEDIA"
              textStyle={{ fontSize: wp(5), fontFamily: "OpenSans-Semibold" }}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={Styles.section4.iconContainer}>
                <ImageComp
                  source={facebookIcon}
                  imageStyle={{ width: wp(4.5), height: wp(4.5) }}
                  tintColor={backgroundColor}
                />
              </TouchableOpacity>
              <TouchableOpacity style={Styles.section4.iconContainer}>
                <ImageComp
                  source={twitterIcon}
                  imageStyle={{ width: wp(5), height: wp(5) }}
                  tintColor={backgroundColor}
                />
              </TouchableOpacity>
              <TouchableOpacity style={Styles.section4.iconContainer}>
                <ImageComp
                  source={instagramIcon}
                  imageStyle={{ width: wp(4), height: wp(4) }}
                  tintColor={backgroundColor}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Divider
            width="100%"
            height={hp(0.2)}
            style={{
              marginTop: hp(1.5),
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
            }}
          />

          <View style={Styles.section4.container}>
            <Button2
              onPress={() => navigate("Profiles")}
              isText={true}
              buttonText="MANAGE PROFILES"
              isIcon={false}
              buttonIcon={null}
              buttonContainer={{
                width: wp(82),
                height: hp(5),
                borderRadius: hp(2.75),
              }}
              buttonTextStyle={{
                color: blueColor1,
                fontSize: wp(3),
                fontFamily: "OpenSans-Semibold",
              }}
              buttonInnerContainer={{
                width: wp(80),
                height: hp(5),
                borderRadius: hp(2.5),
              }}
            />
          </View>

          <Divider
            width="100%"
            height={hp(0.2)}
            style={{
              marginTop: hp(1.5),
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
            }}
          />

          <View style={Styles.section5.container}>
            <NeomorphFlexView viewStyle={Styles.section5.view1}>
              <Text
                text="Terms Of Services"
                textStyle={{
                  fontSize: wp(3.5),
                  color: blueColor,
                  fontFamily: "OpenSans-Semibold",
                }}
              />
            </NeomorphFlexView>
            <NeomorphFlexView viewStyle={Styles.section5.view2}>
              <Text
                text="Privacy Policy"
                textStyle={{
                  fontSize: wp(3.5),
                  color: blueColor,
                  fontFamily: "OpenSans-Semibold",
                }}
              />
            </NeomorphFlexView>
          </View>
        </ScrollView>

        <ModalView
          isVisible={isView}
          setClose={() => setIsView(false)}
          containerStyle={{
            marginHorizontal: wp(10),
            height: hp(25),
            marginTop: hp(35),
            backgroundColor: backgroundColor1,
            borderColor: "#151617",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              text="ADD MUSCLE GROUP"
              textStyle={{
                color: "white",
                fontSize: wp(5),
                fontFamily: "OpenSans-Semibold",
                marginBottom: hp(3),
              }}
            />
            <Input
              placeholder="ENTER MUSCLE GROUP NAME"
              viewStyle={{
                height: hp(6.5),
                borderRadius: hp(3.25),
                borderBottomWidth: 1,
                borderBottomColor: borderColor,
              }}
              inputStyle={{
                fontSize: wp(2.8),
                fontFamily: "OpenSans-Semibold",
              }}
              value={muscleGroup}
              onchange={(val) => (
                setMuscleGroup(val), setMuscleGroupErr(false)
              )}
              editable={selectedMusclesDelete ? false : true}
            />
            {muscleGroupErr && (
              <View style={{ width: "100%", marginLeft: wp(8) }}>
                <Text
                  text="Muscle group is required"
                  textStyle={{
                    textAlign: "left",
                    color: redColor,
                    fontSize: wp(2.5),
                    fontFamily: "OpenSans-Regular",
                  }}
                />
              </View>
            )}
            <View
              style={{
                width: "100%",
                marginTop: hp(1),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: wp(1),
              }}
            >
              <Button2
                isText={true}
                buttonText="CANCEL"
                isIcon={false}
                buttonIcon={null}
                buttonContainer={{ marginTop: hp(1) }}
                buttonTextStyle={{
                  fontSize: wp(3),
                  fontFamily: "OpenSans-Semibold",
                  color: redColor,
                }}
                buttonInnerContainer={{
                  width: wp(29),
                  height: hp(4.5),
                  borderRadius: hp(2),
                }}
                onPress={() => setIsView(false)}
              />
              <Button2
                isText={true}
                buttonText={
                  selectedMusclesDelete
                    ? "DELETE"
                    : selectedMusclesEdit
                    ? "EDIT"
                    : "SAVE"
                }
                isIcon={false}
                buttonIcon={null}
                buttonContainer={{ marginTop: hp(1) }}
                buttonTextStyle={{
                  fontSize: wp(3),
                  fontFamily: "OpenSans-Semibold",
                  color: blueColor,
                }}
                buttonInnerContainer={{
                  width: wp(29),
                  height: hp(4.5),
                  borderRadius: hp(2),
                }}
                onPress={() => {
                  if (selectedMusclesDelete != undefined) {
                    deleteMusclesHandler();
                  } else if (selectedMusclesEdit != undefined) {
                    editMusclesHandler();
                  } else {
                    handleAddMucsleGroup();
                  }
                }}
              />
            </View>
          </View>
        </ModalView>
      </SafeAreaView>
      <DrawerButton onPress={() => openDrawer()} right={0} top={hp(42.5)} />
    </View>
  );
}

const HeadingComp = ({ text, textStyle }) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp(1.5),
      }}
    >
      <View
        style={{
          width: wp(2.5),
          height: wp(2.5),
          borderRadius: wp(1.75),
          backgroundColor: blueColor1,
        }}
      ></View>
      <Text text={text} textStyle={textStyle} />
      <View
        style={{
          width: wp(2.5),
          height: wp(2.5),
          borderRadius: wp(1.75),
          backgroundColor: blueColor1,
        }}
      ></View>
    </View>
  );
};
