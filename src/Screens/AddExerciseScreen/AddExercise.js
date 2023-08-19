import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { NeomorphFlexView } from "../../Components/NeomorphView/NeomorphView";
import { backIcon, circleLogo } from "../../Utils/ImagesPath";
import { Button1 } from "../../Components/Buttons/Buttons";
import Dropdown from "Dropdown/Dropdown";
import Text from "../../Components/TextComp/Text";
import Input from "InputComp/Input";
import Styles from "./Styles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ImageComp from "../../Components/ImageComp/Image";
import { blueColor, borderColor, redColor } from "../../Utils/ThemeColors";
import DrawerButton from "DrawerButton/DrawerButton";
import {
  addExercise,
  getAllMuscleGroup,
  getAllExercises,
  getAllProfiles,
  updateExercise,
  editWorkout,
} from "../../realm/index";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import realm from "../../realm/index";

import _ from "lodash";

export default function AddExercise({ navigation: { goBack, openDrawer } }) {
  const { params } = useRoute();
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [allExercises, setAllExcerises] = useState([]);
  const [exercise, setExercise] = useState(
    params?.exercise ? params.exercise.name : ""
  );
  const [notes, setNotes] = useState(
    params?.exercise ? params.exercise.notes : ""
  );

  // console.log("DRAWER ", params?.openDrawer);
  const [workout] = useState(params?.workout ? params.workout : []);
  const [exerciseErr, setExerciseErr] = useState(false);
  const [types] = useState(["UNILATERAL", "BILATERAL", "REPS"]);
  const exerType = useSelector((state) => state.dropdown.exerciseType);
  const muscle = useSelector((state) => state.dropdown.exerciseMuscle);
  const selectedProfile = useSelector((state) => state.profiles.profile);
  const navigation = useNavigation();

  useEffect(() => {
    const muscles = getAllMuscleGroup(selectedProfile?._id);
    setMuscleGroups(muscles);
    const exercises = getAllExercises(selectedProfile?._id);
    setAllExcerises(exercises);
  }, []);

  //add exercise handler
  const addExerciseHandler = () => {
    if (exercise == "") {
      return setExerciseErr(true);
    }
    if (exerType == "EXERCISE TYPE") {
      return;
    }
    if (muscle == "MUSCLE GROUP") {
      return;
    }

    let _id = 0;
    const filterMuscle = muscleGroups.find((items) => items.name == muscle);
    if (allExercises.length == 0) {
      addExercise(
        exercise,
        notes,
        exerType,
        filterMuscle,
        _id,
        selectedProfile
      );
      goBack();
    } 
    else {
      _id = realm.objects("exercise").max("_id") + 1;
      addExercise(
        exercise,
        notes,
        exerType,
        filterMuscle,
        _id,
        selectedProfile
      );
      goBack();
    }


  };

  //edit exercise
  const editExerciseHandler = () => {
    const filterMuscle = muscleGroups.find((items) => items.name === muscle);
    updateExercise(
      params.exercise._id,
      exercise,
      notes,
      exerType,
      filterMuscle,
      new Date(Date.now()),
      selectedProfile
    );
    goBack();
  };

  //edit workout handler
  const editWorkoutHandler = () => {
    if (exercise == "") {
      return setExerciseErr(true);
    }
    if (exerType == "EXERCISE TYPE") {
      return;
    }
    if (muscle == "MUSCLE GROUP") {
      return;
    }

    let _id = realm.objects("exercise").max("_id") + 1;

    const filterMuscle = muscleGroups.find((items) => items.name == muscle);

    const addedExercise = {
      name: exercise,
      notes: notes,
      type: exerType,
      muscleGroup: filterMuscle,
      _id,
      profile: selectedProfile,
      createdDate: new Date(Date.now()),
    };

    let prevExercises = workout?.exercises;
    let updatedExercises = [...prevExercises, addedExercise];

    editWorkout(
      workout?._id,
      workout?.name,
      updatedExercises,
      new Date(Date.now()),
      selectedProfile,
      workout?.icon
    );

    let paramWorkout = {
      _id: workout?._id,
      name: workout?.name,
      exercises: updatedExercises,
      createdDate: new Date(Date.now()),
      profile: selectedProfile,
      icon: workout?.icon,
    };

    navigation.navigate("WorkoutDetailScreen", {
      workout: paramWorkout,
    });
  };

  return (
    <>
      <DismissKeyboard>
        <View style={Styles.containerStyle}>
          <SafeAreaView>
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
                  text={params?.exercise ? "EDIT EXERCISE" : "ADD EXERCISE "}
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
                  marginLeft: wp(3),
                  borderRadius: wp(7),
                }}
                buttonInnerContainer={{
                  width: wp(10),
                  height: wp(10),
                  borderRadius: wp(5),
                }}
              />
            </View>
            <View style={{ marginTop: hp(2) }}>
              <Input
                placeholder="EXERCISE NAME"
                value={exercise}
                onchange={(text) => setExercise(text)}
                viewStyle={{
                  height: hp(7.5),
                  borderBottomWidth: 1,
                  borderBottomColor: borderColor,
                }}
                inputStyle={{
                  fontSize: wp(4),
                  fontFamily: "OpenSans-Semibold",
                }}
                onFocus={() => setExerciseErr(false)}
              />
              {exerciseErr && (
                <View
                  style={{ width: "100%", marginLeft: wp(3), marginTop: wp(2) }}
                >
                  <Text
                    text="Exercise name is required"
                    textStyle={{
                      color: redColor,
                      fontSize: wp(2.9),
                      fontFamily: "OpenSans-Semibold",
                    }}
                  />
                </View>
              )}
              <Input
                placeholder="EXERCISE NOTE"
                viewStyle={{
                  height: hp(20),
                  marginTop: hp(3),
                  paddingVertical: hp(1),
                  borderBottomWidth: 1,
                  borderBottomColor: borderColor,
                }}
                inputStyle={{
                  fontSize: wp(4),
                  height: "100%",
                  fontFamily: "OpenSans-Semibold",
                }}
                value={notes}
                onchange={(text) => setNotes(text)}
                multiline={true}
                textAlignVertical="top"
                onFocusHandler={() => setExerciseErr(false)}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: hp(3),
              }}
            >
              <Dropdown
                options={types}
                buttonText={
                  exerType == 0
                    ? "UNILATERAL"
                    : exerType == 1
                    ? "BILATERAL"
                    : exerType == 2
                    ? "REPS"
                    : "EXERCISE TYPE"
                }
                buttonContainer={{
                  width: wp(44),
                  height: hp(7),
                  borderRadius: hp(3.5),
                }}
                buttonInnerContainer={{
                  width: wp(40),
                  height: hp(5),
                  borderRadius: hp(2.5),
                }}
                heightmin={20}
                profile={selectedProfile}
                muscleGroups={muscleGroups}
                dropdownStyle={{
                  marginLeft:
                    exerType === 0
                      ? -wp(10)
                      : exerType === 1
                      ? -wp(11.5)
                      : exerType === 2
                      ? -wp(16)
                      : wp(-11),
                      borderColor:'#1b1c1e',
                      maxHeight:hp(18),
                }}
              />

              <Dropdown
                options={muscleGroups.map((items) => items.name)}
                buttonText={muscle}
                buttonContainer={{
                  width: wp(44),
                  height: hp(7),
                  borderRadius: hp(3.5),
                }}
                buttonInnerContainer={{
                  width: wp(40),
                  height: hp(5),
                  borderRadius: hp(2.5),
                }}
                heightmin={hp(0)}
                profile={selectedProfile}
                muscleGroups={muscleGroups}
                dropdownStyle={{
                  marginRight:
                    muscle.length <= 3
                      ? -wp(17)
                      : muscle.length <= 5
                      ? -wp(15)
                      : muscle.length <= 10
                      ? -wp(10)
                      : -wp(6.5),
                      borderColor:'#1b1c1e',
                      maxHeight:hp(18),
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: hp(2),
              }}
            >
              <Button1
                onPress={() => goBack()}
                isText={true}
                buttonText="CANCEL"
                buttonTextStyle={{
                  color: redColor,
                  textAlign: "center",
                  fontSize: wp(3.5),
                  fontFamily: "OpenSans-Semibold",
                }}
                isIcon={false}
                buttonContainer={{
                  width: wp(44),
                  height: hp(7),
                  borderRadius: hp(3.5),
                }}
                buttonInnerContainer={{
                  width: wp(40),
                  height: hp(5),
                  borderRadius: hp(2.5),
                }}
              />
              <Button1
                onPress={() => {
                  if (params?.exercise) {
                    editExerciseHandler();
                  } else if (params?.workout) {
                    editWorkoutHandler();
                  } else {
                    addExerciseHandler();
                  }
                }}
                isText={true}
                buttonText={
                  params?.exercise
                    ? "EDIT EXERCISE"
                    : params?.workout
                    ? "ADD EXERCISE"
                    : "SAVE EXERCISE"
                }
                buttonTextStyle={{
                  color: redColor,
                  textAlign: "center",
                  fontSize: wp(3.5),
                  fontFamily: "OpenSans-Semibold",
                }}
                isIcon={false}
                buttonContainer={{
                  width: wp(44),
                  height: hp(7),
                  borderRadius: hp(3.5),
                }}
                buttonInnerContainer={{
                  width: wp(40),
                  height: hp(5),
                  borderRadius: hp(2.5),
                }}
              />
            </View>
          </SafeAreaView>
        </View>
      </DismissKeyboard>
    </>
  );
}

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
