import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { NeomorphFlexView } from "../../Components/NeomorphView/NeomorphView";
import { Button1,Button2 } from "../../Components/Buttons/Buttons";
import ModalView from "../../Components/ModalView/ModalView";
import Text from "../../Components/TextComp/Text";
import Input from "InputComp/Input";
import Styles from "./Styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  legIcon,
  chestIcon,
  armIcon,
  shoulderIcon,
  muscleIcon,
  circleLogo,
  plusIcon,
  editIcon,
  graphIcon,
  playIcon,
  saveIcon,
  deleteIcon,
} from "../../Utils/ImagesPath";
import ImageComp from "../../Components/ImageComp/Image";
import {
  backgroundColor,
  backgroundColor1,
  blueColor,
  blueColor1,
  borderColor,
  grayColor,
  redColor,
} from "../../Utils/ThemeColors";
import DrawerButton from "DrawerButton/DrawerButton";
import {
  getAllWorkouts,
  createWorkout,
  getAllProfiles,
  getAllExercises,
  editWorkout,
  deleteWorkout,
  addSet,
  addHistory,
  createWorkoutDays,
  addDaysInWorkoutDays,
  getWorkoutDaysByMonth
} from "../../realm/index";
import realm from "../../realm/index";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWorkout } from "../../redux/currentworkout";
import { setLatestWorkout } from "../../redux/latestworkout";
function randomArray(unshuffled) {
  let newArrr = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  return newArrr
}
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
const icons = [chestIcon,legIcon , armIcon, shoulderIcon, muscleIcon];

export default function Workouts({ navigation: { openDrawer, navigate } }) {
  const [isView, setIsView] = useState(false);
  const [showIconPopup, setShowIconPopup] = useState(false);
  const [allWorkouts, setGetAllWorkouts] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const [workout, setWorkout] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(-1);
  const [showExercises, setShowExercises] = useState(false);
  const [workoutId, setWorkoutId] = useState(undefined);
  const selectedProfile = useSelector((state) => state.profiles.profile);
  const currentWorkout = useSelector((state) => state.currentworkout.workout);
  const { params } = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedExercises, setSelectedExercises] = useState([]);
  // console.log("WORKOUT ", selectedExercises);

  const getWorkoutDetails = () => {
    const workouts = getAllWorkouts(selectedProfile?._id);
    setGetAllWorkouts(workouts);
    const exercises = getAllExercises(selectedProfile?._id);
    setAllExercises(exercises);
    if (params !== undefined) {
      setSelectedExercises(params?.selectedExs);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getWorkoutDetails();
    });
    return unsubscribe;
  }, [getWorkoutDetails]);

  useEffect(() => {
    getWorkoutDetails();
    // generateGraphMockData()
    // testData()
    
  }, []);
  // const testData = async () => {
  //   let dataa = await realm.objects('workoutDays')
  //   console.log('dataa length--->',dataa[1].days)
  // }
  //Generate mock data
  // const generateGraphMockData = async () => {
  //   let checkWorkoutData = await realm.objects('workoutData')
  //   if(checkWorkoutData.length===0){
  //     let months = [
  //       "jan",
  //       "Feb",
  //       "Mar",
  //       "Apr",
  //       "May",
  //       "June",
  //       "July",
  //       "Aug",
  //       "Sep",
  //       "Oct",
  //       "Nov",
  //       "Dec",
  //     ];
  //     let workouts = await realm.objects('workouts')
  //     // console.log('exercises --->',exercises[0])
  //     // console.log('workouts --->', workouts[0])
  //     let setCounter = 1
  //     let workoutDataCounter = 1
  //     let setsArr = []
  //     let data = Array.from({ length: 25 }, (_, indexx) => {
  //       let totalWeightLifted = 0
  //       let pickedWorkouts = randomArray(workouts).slice(0, 2)
  //       let sets = Array.from({ length: 10 }, (_, i) => {
  //         let weight = getRandomInt(50, 200)
  //         totalWeightLifted += weight
  //         return {
  //           reps: getRandomInt(3, 20),
  //           isHeighest: i === 9 ? true : false,
  //           weight,
  //           rmValue: weight * 1.1307 + 0.6998,
  //           exercise: pickedWorkouts[i % 2].exercises[i % 2],
  //           createdDate: new Date(subDays(indexx)),
  //           failedSet: i % 4 == 0 ? true : false,
  //           warmupSet: i % 4 === 0 ? true : false,
  //           profile: selectedProfile,
  //           _id: ++setCounter
  //         }
  //       })
  //       setsArr.push(sets)
  //       let workoutData = pickedWorkouts.map((workout, index) => {
  //         return {
  //           workout,
  //           exercise: workout.exercises[index % 3],
  //           workoutDate: new Date(subDays(indexx)),
  //           sets: sets,
  //           profile: selectedProfile,
  //           _id: ++workoutDataCounter,
  //           totalWeightLifted
  //         }
  //       })
  //       // createWorkoutDays(indexx+1,selectedProfile,new Date(subDays(indexx)))
  //       return workoutData
  //     })
  //     setsArr.flat().map((set, index) => {
  //       addSet(set.weight, set.reps, set.rmValue, set.isHeighest, set.exercise, set._id, set.profile, set.failedSet, set.warmupSet, "test" + index, set.createdDate)
  //     })
  //     data.flat().map((workoutdat, index) => {
  //       addHistory(workoutdat.workout, workoutdat.exercise, workoutdat.sets, workoutdat._id, selectedProfile, workoutdat.totalWeightLifted, workoutdat.workoutDate)
  //     })
  //     let workoutDays = Array.from({length:25},async (_,indexx)=>{
  //       let date = subDays(indexx)
  //       let month = date.getMonth()
  //       let workoutDays = await realm.objects('workoutDays')
  //       if(workoutDays.length===0){
  //         //App just started
  //         createWorkoutDays(indexx+1,selectedProfile,date)
  //       }
  //       else{
  //         //Workout days exists
  //         //Check if month exists
  //         let checkMonth = workoutDays.filter((workoutDay)=>workoutDay.month===months[month])
  //         if(checkMonth.length>0){
  //           //month exists, need to call add days in workoutDays
  //           const days = checkMonth[0].days
  //           await realm.write(() => {
  //             days.push(date.getDate());
  //           });
  //           await addDaysInWorkoutDays(
  //             checkMonth[0]._id,
  //             days,
  //             checkMonth[0].month,
  //             checkMonth[0].year,
  //             selectedProfile
  //           );
  //         }
  //         else{
  //           //call create workout days
  //           createWorkoutDays(indexx+1,selectedProfile,date)
  //         }
  //       }
  //     })
  //   }
  // }
  //add workout
  const addWorkoutHandler = () => {
    if (workout === "") {
      return;
    }
    if (selectedIcon === -1) {
      return;
    }

    if (selectedExercises.length === 0) {
      return;
    }

    let _id = 0;
    if (allWorkouts.length == 0) {
      createWorkout(
        workout,
        selectedExercises,
        _id,
        selectedProfile,
        selectedIcon
      );
      setSelectedExercises([]);
      setWorkout("");
      setSelectedIcon(-1);
      setIsView(false);
    } else {
      _id = realm.objects("workouts").max("_id") + 1;
      createWorkout(
        workout,
        selectedExercises,
        _id,
        selectedProfile,
        selectedIcon
      );
      setSelectedExercises([]);
      setWorkout("");
      setSelectedIcon(-1);
      setIsView(false);
    }
  };

  //edit workout
  const editWorkoutHandler = () => {
    if (workout === "") {
      return;
    }

    if (selectedIcon === -1) {
      return;
    }

    if (selectedExercises.length === 0) {
      return;
    }
    editWorkout(
      workoutId,
      workout,
      selectedExercises,
      new Date(Date.now()),
      selectedProfile,
      selectedIcon
    );
    setIsView(false);
    setSelectedExercises([]);
    setWorkout("");
    setSelectedIcon(-1);
    setWorkoutId(undefined);
  };

  //delete workout handler
  const deleteWorkoutHandler = async (workoutId) => {
    await deleteWorkout(workoutId);
    const allworkouts = getAllWorkouts(selectedProfile?._id);
    setGetAllWorkouts(allworkouts);
  };

  //select multiple exercises
  const selectExercisesHandler = (item) => {
    if (selectedExercises.some((items) => items._id == item._id)) {
      const removedExercise = selectedExercises.filter(
        (items) => items._id != item._id
      );
      setSelectedExercises(removedExercise);
    } else {
      const exercisesCopy = [...selectedExercises];
      const updatedExerciseArray = [...exercisesCopy, item];
      setSelectedExercises([...updatedExerciseArray]);
    }
  };

  //current workout handler
  const currentWorkoutHandler = (item) => {
    if (currentWorkout !== null && currentWorkout?._id !== item._id) {
      return;
    } else {
      dispatch(setCurrentWorkout(item));
      const updatedObj = JSON.parse(JSON.stringify(item));
      dispatch(setLatestWorkout({ ...updatedObj, workoutDate: new Date() }));
      navigate("WorkoutDetailScreen", {
        workout: item,
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
                text="WORKOUTS"
                textStyle={{ fontSize: wp(5.5), fontFamily: "OpenSans-Bold" }}
              />
            </View>
            <Button1
              onPress={() => {
                setWorkoutId(undefined);
                setIsView(true);
                setWorkout('')
                setSelectedIcon(-1)

              }}
              isText={true}
              buttonText="ADD WORKOUT"
              buttonTextStyle={{
                color: redColor,
                textAlign: "center",
                fontSize: wp(3),
                fontFamily: "OpenSans-Semibold",
              }}
              isIcon={true}
              buttonIcon={plusIcon}
              buttonIconStyle={{ width: wp(4), height: wp(4) }}
              tintColor={redColor}
              buttonContainer={{
                marginTop: hp(1.8),
                width: wp(35),
                height: hp(8.5),
                borderRadius: hp(4.5),
              }}
              buttonInnerContainer={{
                width: wp(30),
                height: hp(6),
                borderRadius: hp(3),
              }}
            />
          </View>
          <View style={Styles.section1.container}>
            {allWorkouts.map((item, index) => {
              console.log('item ',item)
              return (
                <NeomorphFlexView
                  viewStyle={Styles.section1.workoutCard}
                  key={item._id}
                >
                  <ImageComp
                    source={icons[index]}
                    imageStyle={{ width: wp(6.5), height: wp(6.5) }}
                    tintColor={blueColor}
                  />
                  <View style={{ width: wp(37), paddingLeft: wp(3) }}>
                    <Text
                      text={item?.name}
                      textStyle={{
                        fontSize: wp(3.5),
                        fontFamily: "OpenSans-Semibold",
                      }}
                    />

                    <Text
                      text={`${item.exercises.length} ${item.exercises.length === 1 ? "exercise" : "exercises"
                        } `}
                      textStyle={{
                        fontSize: wp(3),
                        fontFamily: "OpenSans",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: wp(38),
                      // backgroundColor: "red",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={deleteWorkoutHandler.bind(this, item._id)}
                    >
                      <ImageComp
                        source={deleteIcon}
                        imageStyle={{ width: wp(6), height: wp(6) }}
                        tintColor={redColor}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsView(true);
                        setWorkout(item?.name);
                        setSelectedExercises(item?.exercises);
                        setSelectedIcon(item?.icon);
                        setWorkoutId(item?._id);
                      }}
                    >
                      <ImageComp
                        source={editIcon}
                        imageStyle={{ width: wp(5), height: wp(5) }}
                        tintColor={blueColor}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <ImageComp
                        source={graphIcon}
                        imageStyle={{ width: wp(5.5), height: wp(5.5) }}
                        tintColor={redColor}
                      />
                    </TouchableOpacity>
                    <Button1
                      onPress={currentWorkoutHandler.bind(this, item)}
                      buttonText=""
                      isIcon={true}
                      isText={false}
                      buttonIcon={playIcon}
                      tintColor={blueColor}
                      buttonContainer={{
                        width: wp(10),
                        height: wp(10),
                        marginRight: wp(2),
                        borderRadius: wp(10),
                      }}
                      buttonInnerContainer={{
                        width: wp(10),
                        height: wp(10),
                        borderRadius: wp(5),
                      }}
                    />
                  </View>

                  {/* <ImageComp source={graphIcon} imageStyle={{width:wp(6.5),height:wp(6.5)}} tintColor={blueColor} /> */}
                </NeomorphFlexView>
              );
            })}
          </View>
        </ScrollView>

        {/* Add Workout Popup */}
        <ModalView
          isVisible={isView}
          setClose={() => setIsView(false)}
          containerStyle={{
            marginHorizontal: wp(5),
            height: hp(32),
            marginTop: hp(35),
            backgroundColor: backgroundColor1,
            borderColor: "#151617",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              text={workoutId !== undefined ? "EDIT WORKOUT" : "ADD WORKOUT"}
              textStyle={{
                color: grayColor,
                fontSize: wp(5),
                fontFamily: "OpenSans-Semibold",
                marginBottom: hp(3),
              }}
            />
            <Input
              placeholder="WORKOUT NAME"
              viewStyle={{
                height: hp(6.5),
                borderRadius: hp(3.25),
                borderBottomWidth: 1,
                backgroundColor: backgroundColor,
                borderBottomColor: borderColor,
              }}
              value={workout}
              onchange={(text) => setWorkout(text)}
              inputStyle={{ fontSize: wp(3), fontFamily: "OpenSans-Semibold" }}
            />
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Button2
                  onPress={() => setShowIconPopup(true)}
                  isText={true}
                  buttonText="ADD ICON"
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
                />
                {selectedIcon === -1 ? (
                  <View />
                ) : (
                  <ImageComp
                    source={icons[selectedIcon]}
                    imageStyle={{
                      width: wp(6),
                      height: wp(6),
                      marginTop: wp(2),
                      marginLeft: wp(5),
                    }}
                    tintColor={blueColor}
                  />
                )}
              </View>

              <Button2
                onPress={() =>
                  navigate("AddExercisesToWorkout", {
                    selectedExs: selectedExercises,
                  })
                }
                isText={true}
                buttonText="EXERCISES"
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
              />
            </View>
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
                onPress={() => setIsView(false)}
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
              />
              <Button2
                onPress={
                  workoutId !== undefined
                    ? editWorkoutHandler
                    : addWorkoutHandler
                }
                isText={true}
                buttonText={workoutId !== undefined ? "SAVE" : "SAVE WORKOUT"}
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
              />
            </View>
          </View>
        </ModalView>

        {/* Add Icon Popup */}
        <ModalView
          isVisible={showIconPopup}
          setClose={() => setShowIconPopup(false)}
          containerStyle={{
            marginHorizontal: wp(5),
            height: hp(32),
            marginTop: hp(35),
            backgroundColor: backgroundColor1,
            borderColor: "#151617",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              text="ADD ICON"
              textStyle={{
                color: grayColor,
                fontSize: wp(5),
                fontFamily: "OpenSans-Semibold",
                marginBottom: hp(3),
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                marginBottom: wp(5),
              }}
            >
              {icons.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      // console.log("INDEX ", index);
                      setShowIconPopup(false);
                      setSelectedIcon(index);
                    }}
                    style={{
                      width: wp(13),
                      height: wp(13),
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: wp(6),
                      marginVertical: hp(0.5),
                      backgroundColor: backgroundColor,
                    }}
                  >
                    <ImageComp
                      source={item}
                      imageStyle={{ width: wp(8), height: wp(8) }}
                      tintColor={blueColor}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <Button2
              isText={true}
              buttonText="Cancel"
              isIcon={false}
              onPress={() => setShowIconPopup(false)}
              buttonIcon={null}
              buttonContainer={{ marginTop: hp(1.5) }}
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
            />
          </View>
        </ModalView>

        {/* Add exercises */}
        <ModalView
          isVisible={showExercises}
          setClose={() => setShowExercises(false)}
          containerStyle={{
            marginHorizontal: wp(5),
            height: hp(32),
            marginTop: hp(35),
            backgroundColor: backgroundColor1,
            borderColor: "#151617",
          }}
        >
          <ScrollView
            contentContainerStyle={{
              alignItems: "center",
              paddingBottom: 50,
            }}
          >
            <Text
              text="ADD EXERCISES"
              textStyle={{
                color: grayColor,
                fontSize: wp(5),
                fontFamily: "OpenSans-Semibold",
                marginBottom: hp(1.5),
                marginTop: hp(2),
              }}
            />

            <Text
              text="Tap to select/unselect exercises"
              textStyle={{
                color: blueColor1,
                fontSize: wp(3),
                fontFamily: "OpenSans-Semibold",
                marginBottom: hp(1.5),
              }}
            />

            {allExercises.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    selectExercisesHandler(item);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: wp(65),
                    height: wp(12),
                    borderRadius: wp(6),
                    marginVertical: hp(1),
                    borderWidth: 1,
                    borderColor: selectedExercises?.some(
                      (items) => items._id == item._id
                    )
                      ? blueColor1
                      : "#888",
                    paddingHorizontal: 20,
                    backgroundColor: backgroundColor,
                  }}
                >
                  <Text
                    text={item?.name}
                    textStyle={{ color: "#fff", fontSize: wp(3) }}
                  />
                  <Text
                    textStyle={{ color: "#fff", fontSize: wp(3) }}
                    text={item?.muscleGroup?.name}
                  />
                </TouchableOpacity>
              );
            })}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Button2
                isText={true}
                buttonText="Cancel"
                isIcon={false}
                onPress={() => setShowExercises(false)}
                buttonIcon={null}
                buttonContainer={{ marginTop: hp(1.5), marginRight: hp(1.2) }}
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
              />
              <Button2
                isText={true}
                buttonText="Save"
                isIcon={false}
                onPress={() => setShowExercises(false)}
                buttonIcon={null}
                buttonContainer={{ marginTop: hp(1.5) }}
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
              />
            </View>
          </ScrollView>
        </ModalView>
      </SafeAreaView>
      <DrawerButton onPress={() => openDrawer()} right={0} top={hp(42.5)} />
    </View>
  );
}
