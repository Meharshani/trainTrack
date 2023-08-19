import React, { useState, useEffect, useRef,useCallback } from "react";
import { View, SafeAreaView, ScrollView, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { NeomorphFlexView,NeomorphView } from "../../Components/NeomorphView/NeomorphView";
import { Button1,Button2 } from "../../Components/Buttons/Buttons";
import Accordion from "Accordion/Accordion";
import Text from "../../Components/TextComp/Text";
import { Divider } from "Divider/Divider";
import Styles from "./Styles";
import ModalView from "../../Components/ModalView/ModalView";
import { useFocusEffect } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  homeIcon,
  plusIcon,
  graphIcon,
  clockIcon,
  saveIcon,
  backIcon,
  barbellImg,
  playIcon,
  failedIcon,
  warmupIcon,
} from "../../Utils/ImagesPath";
import ImageComp from "../../Components/ImageComp/Image";
import Input from "InputComp/Input";
import HorizontalScroll from "HorizontalScroll/HorizontalScrollComp";
import {
  backgroundColor,
  backgroundColor1,
  blueColor,
  blueColor1,
  borderColor,
  buttonColor,
  buttonTextColor,
  redColor,
} from "../../Utils/ThemeColors";
import NavButton from "./../../Components/NavButton/index";
import {
  useRoute,
  useNavigation,
  CommonActions,
} from "@react-navigation/native";
import {
  addSet,
  addHistory,
  setRestInterval,
  getGlobalValues,
  getWorkoutDaysByMonth,
  createWorkoutDays,
  addDaysInWorkoutDays,
  getMaxIdForWorkoutDays,
  lastFivegetWorkoutDataByWorkoutId,
  getRecordRMforExercise,
} from "../../realm/index";
import { useDispatch, useSelector } from "react-redux";
import { workoutExs } from "../../redux/workoutexercises";
import { setsEx } from "../../redux/sets";
import _ from "lodash";
import { Timer } from "react-native-element-timer";
import { dropdownType, dropdownMuscle } from "../../redux/dropdown";
import Countdown from "../../Components/Timer/Timer.js";
import realm from "../../realm/index";
import moment from "moment";
import NavButtonHome from "../../Components/NavButton/NavButtonHome";
import { setTimerValue } from "../../redux/timervalue";
import { setCurrentWorkout } from "../../redux/currentworkout";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WorkoutDetail({navigation: { goBack, navigate } }) {
  const [showRestTimerModal, setShowRestTimerModal] = useState(false);
  const [showSaveSetModal, setShowSaveSetModal] = useState(false);
  const [plateCalcModal, setPlateCalcModal] = useState(false);

  const { params } = useRoute();
  const exercises = useSelector((state) => state.workout.workoutexercises);
  const sets = useSelector((state) => state.sets.sets);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [notes, setNotes] = useState("");
  const [failedSet, setFailedSet] = useState(false);
  const [warmupSet, setWarmupSet] = useState(false);
  const [editWarmup, setEditWarmpup] = useState(false);
  const [workoutHistory, setWortoutHistory] = useState([]);
  const [editWeight, setEditWeight] = useState("");
  const [editReps, setEditReps] = useState("");
  const [editSet, setEditSet] = useState(null);
  const [initialMin, setInitialMin] = useState(0);
  const [initialSecs, setInitialSecs] = useState(59);
  const [showCountdown, setShowCountdown] = useState(false);
  const [maxRmValue, setMaxRmValue] = useState(0);
  const dispatch = useDispatch();
  const selectedProfile = useSelector((state) => state.profiles.profile);
  const timerValue = useSelector((state) => state.timer.timer);
  const navigation = useNavigation();
  const timerRef = useRef(null);
  const [barWeight, setBarWeight] = useState("45");
  const [timerPrevValue, setTimerPrevValue] = useState(0);

  // console.log("WORKOUT HISTORY ", workoutHistory);

  const [plate45, setPlate45] = useState(0);
  const [plate35, setPlate35] = useState(0);
  const [plate25, setPlate25] = useState(0);
  const [plate10, setPlate10] = useState(0);
  const [plate5, setPlate5] = useState(0);

  //clear plates handler
  const handleClear = () => {
    setPlate45(0);
    setPlate35(0);
    setPlate25(0);
    setPlate10(0);
    setPlate5(0);
    setBarWeight("45");
  };

  //set exercises in redux persist
  useEffect(() => {
    dispatch(workoutExs(params.workout.exercises));
  }, []);

  useFocusEffect(useCallback(() => {

    handleGetPreviousData()

  }, []))

  // adding new exercise
  useEffect(()=>{
    if(params?.item){
      console.log('running')
      var  _id = realm.objects("exercise").max("_id") + 1;
      var {_id,muscleGroup,notes,profile,type,name} = params?.item;
      dispatch(workoutExs([...params.workout.exercises,
        {_id, createdDate:new Date() , muscleGroup, name, notes, profile, type}
      ]));
    }

  },[params?.item])

  const handleGetPreviousData= async()=>{
    var PreviousState = await AsyncStorage.getItem('currentExercise');
    // console.log("PreviousState ",PreviousState)
    if(PreviousState){
      filterWorkoutHistory(Number(PreviousState));
      getRecordRM(Number(PreviousState));
      setCurrentIndex(Number(PreviousState));
      setWeight("");
      setReps("");
    }
    
  }

  //next exercise handler
  const nextExerciseHandler = () => {
    if (currentIndex < exercises.length - 1) {
      // console.log(currentIndex + 1);
      filterWorkoutHistory(currentIndex + 1);
      getRecordRM(currentIndex + 1);
      setCurrentIndex(currentIndex + 1);
      setWeight("");
      setReps("");
      setWarmupSet(false);
      setFailedSet(false);
      setNotes("");
    }else if(currentIndex==exercises.length-1){
      filterWorkoutHistory(0);
      getRecordRM(0);
      setCurrentIndex(0);
      setWeight("");
      setReps("");
      setWarmupSet(false);
      setFailedSet(false);
      setNotes("");
    } 
    else {
      return;
    }
  };

  //prev exercise handler
  const prevExerciseHandler = () => {
    if (currentIndex == 0) {
      return;
    }
    filterWorkoutHistory(currentIndex - 1);
    getRecordRM(currentIndex - 1);
    setCurrentIndex(currentIndex - 1);
    setWeight("");
    setReps("");
    setWarmupSet(false);
    setFailedSet(false);
    setNotes("");
    setWarmupSet(false);
  };

  //calculate RM Value
  const rmValueCalculator = () => {
    return weight * 1.1307 + 0.6998;
  };

  //sum of reps
  const repsSum = () => {
    let sum = 0;
    const filteredSets = sets.filter(
      (items) => items.exercise._id == exercises[currentIndex]?._id
    );
    filteredSets.forEach((items) => {
      sum += parseInt(items.reps);
    });
    return sum;
  };

  //sum of weight volume
  const volumeSum = () => {
    let sum = 0;
    const filteredVolume = sets.filter(
      (items) => items.exercise._id == exercises[currentIndex]?._id
    );
    filteredVolume.forEach((items) => {
      sum += parseInt(items.weight * items.reps);
    });
    return sum;
  };

  //calculate total volume for exercise history
  const calTotalsVolume = (element) => {
    let sum = 0;
    element.forEach((items) => {
      sum += parseInt(items.weight * items.reps);
    });
    return sum;
  };

  //calculate total reps
  const calTotalsrmValue = (element) => {
    let sum = 0;
    element.forEach((items) => {
      sum += parseInt(items.weight) * 1.1307 + 0.6998;
    });
    return sum;
  };

  //save set handler
  const saveSetHandler = (warmUp) => {
    if (weight == "") {
      return;
    }
    if (reps == "") {
      return;
    }

    const exercisesSets = [...sets];

    let _id = 0;

    if (sets.length > 0) {
      _id = sets[sets.length - 1]._id + 1;
    }

    const set = {
      weight: weight,
      reps: reps,
      rmValue: rmValueCalculator(),
      isHeighest: false,
      exercise: exercises[currentIndex],
      _id: _id,
      profile: selectedProfile,
      failedSet: failedSet,
      warmupSet: warmUp,
      notes: notes,
    };
    let updatedSets = [...exercisesSets, set];
    dispatch(setsEx(updatedSets));
    getRecordRM(currentIndex, updatedSets);
    setWarmupSet(false);
    setFailedSet(false);
    setNotes('')
    if (initialMin === 0 && initialSecs === 0) {
      setShowCountdown(false);
    } else {
      timerRef?.current?.stop();
      setShowCountdown(true);
    }
  };

    //finish workout handler
  const finishWorkoutHandler = async () => {
    // if (sets.length == 0) {
    //   return;
    // }
    console.log('sets ',sets)
    // timerRef.current.stop();
    // dispatch(setTimerValue(0));
    let data = await getWorkoutDaysByMonth();
    var dt = new Date();

    const days = data[0].days;
    realm.write(() => {
      days.push(dt.getDate());
    });

    await addDaysInWorkoutDays(
      data[0]._id,
      days,
      data[0].month,
      data[0].year,
      selectedProfile
    );

    let setsFromRealm = realm.objects("sets");

    let workoutData = realm.objects("workoutData");

    let setsArray = [];

    exercises.forEach((exercise) => {
      sets
        .filter((items) => items.exercise._id === exercise._id)
        .forEach((sets) => {
          let _id = 0;
          if (setsFromRealm.length > 0) {
            _id = realm.objects("sets").max("_id") + 1;
          }

          addSet(
            parseInt(sets.weight),
            parseInt(sets.reps),
            parseInt(sets.rmValue),
            sets.isHeighest,
            sets.exercise,
            _id,
            sets.profile,
            sets.failedSet,
            sets.warmupSet,
            sets.notes
          );

          let indiSet = {
            weight: parseInt(sets.weight),
            reps: parseInt(sets.reps),
            rmValue: parseInt(sets.rmValue),
            isHeighest: sets.isHeighest,
            _id: _id,
            profile: sets.profile,
            failedSet: sets.failedSet,
            warmupSet: sets.warmupSet,
            notes: sets.notes,
            createdDate: new Date(Date.now()),
          };
          setsArray.push(indiSet);
        });
      let workoutDataId = 0;
      let setsArrcopy = setsArray;
      setsArray = [];
      if (workoutData.length > 0) {
        workoutDataId = realm.objects("workoutData").max("_id") + 1;
      }
      addHistory(
        params.workout,
        exercise,
        setsArrcopy,
        workoutDataId,
        selectedProfile
      );
    });
    timerRef.current.stop();
    dispatch(setTimerValue(0));
    dispatch(setCurrentWorkout(null));
    dispatch(setsEx([]));
    goBack();
  };

  //edit set
  const editSetHandler = (set) => {
    setEditSet(set);
    setFailedSet(set.failedSet);
    setEditWarmpup(set.warmupSet);
    setEditWeight(set.weight);
    setEditReps(set.reps);
    setShowSaveSetModal(true);
  };

  //save set handler
  const saveEditHandler = (warmUpSet, failedSet) => {
    // let setsCopy = _.cloneDeep(sets);
    let setsCopy = [...Array.from(sets)];
    let index = setsCopy.findIndex((item) => item._id == editSet._id);
    setsCopy[index].weight = editWeight;
    setsCopy[index].reps = editReps;
    setsCopy[index].failedSet = failedSet;
    setsCopy[index].warmupSet = warmUpSet;
    dispatch(setsEx(setsCopy));
    setShowSaveSetModal(false);
  };

  //delete set handler
  const deleteSetHandler = () => {
    // let setsCopy = _.cloneDeep(sets);
    let setsCopy = [...Array.from(sets)];
    let filter = setsCopy.filter((item) => item._id !== editSet._id);
    dispatch(setsEx(filter));
    setShowSaveSetModal(false);
  };

  //add exercise handler
  const addExerciseHandler = () => {
    // navigate("AddExercise", {
    //   workout: params.workout,
    // });
    navigate("ExercisesScreen", {
      workout: params.workout,
    });

    dispatch(dropdownMuscle("MUSCLE GROUP"));
    dispatch(dropdownType("EXERCISE TYPE"));
  };

  //set global value of interval
  const setGlobalValueInterval = () => {
    const global = getGlobalValues(selectedProfile?._id);

    if (global.length > 0) {
      const filterGlobal = global.find(
        (item) => item.profile._id === selectedProfile._id
      );
      if (filterGlobal.restInterval === 1) {
        setInitialMin(0);
        setInitialSecs(59);
      } else if (filterGlobal.restInterval === 2) {
        setInitialMin(1);
        setInitialSecs(59);
      } else if (filterGlobal.restInterval === 3) {
        setInitialMin(2);
        setInitialSecs(59);
      } else {
        setShowCountdown(false);
        setInitialMin(0);
        setInitialSecs(0);
      }
    } else {
      return;
    }
  };

  //get global interval
  useEffect(() => {
    setTimerPrevValue(timerValue);
    const timeout = setTimeout(() => {
      timerRef?.current?.start();
      clearTimeout(timeout);
    }, 1000);
    setGlobalValueInterval();
  }, []);

  //set rest counter handler
  const setRestCountdownHandler = async (min, sec, interval) => {
    setShowCountdown(false);
    setShowRestTimerModal(false);
    setInitialMin(min);
    setInitialSecs(sec);
    await setRestInterval(selectedProfile._id, interval, selectedProfile);
  };

  //load workout days
  const getWorkoutDays = async () => {
    let data = await getWorkoutDaysByMonth(selectedProfile?._id);
    // console.log("WORKOUT DAYS ", data);
    if (data.length === 0) {
      let id = await getMaxIdForWorkoutDays();
      if (id === undefined) {
        await createWorkoutDays(0, selectedProfile);
      } else {
        await createWorkoutDays(id + 1, selectedProfile);
      }
    }
  };

  //filter last five workout history
  const filterWorkoutHistory = async (index) => {
    let lastFiveWorkouts = await lastFivegetWorkoutDataByWorkoutId(
      params?.workout?._id,
      exercises[index]?._id
    );
    setWortoutHistory(lastFiveWorkouts);
  };

  //highest rmValue of a exercise
  const getRecordRM = async (index, exerSets) => {
    let highestRmValue = await getRecordRMforExercise(
      exercises[index]?._id,
      params?.workout?._id
    );
    if (highestRmValue !== undefined) {
      setMaxRmValue(highestRmValue);
    } else {
      setMaxRmValue(0);
      if (exerSets !== undefined) {
        const exerciseSets = exerSets.filter(
          (item) => item.exercise._id === index
        );
        const maxiRMValue = Math.max(...exerciseSets.map((o) => o.rmValue));
        setMaxRmValue(Math.round(maxiRMValue));
      } else if (sets.length !== 0) {
        const exerciseSets = sets.filter((item) => item.exercise._id === index);
        const maxiRMValue = Math.max(...exerciseSets.map((o) => o.rmValue));
        setMaxRmValue(Math.round(maxiRMValue));
      }
    }
  };

  useEffect(() => {
    getWorkoutDays();
    filterWorkoutHistory(currentIndex);
    getRecordRM(currentIndex);
    timerRef.current.pause();
  }, []);

  return (
    <View style={Styles.containerStyle}>
      <KeyboardAvoidingView
      // behavior={'position'}
      >
      <SafeAreaView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: hp(2) }}
        >
          <View style={Styles.header.container}>
            <View style={{ alignSelf: "center", width: wp(33) }}>
              <Text
                text={(params?.workout?.name).toUpperCase()}
                textStyle={{ fontSize: wp(4), fontFamily: "OpenSans-Bold" }}
              />

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Timer
                  ref={timerRef}
                  formatTime={"hh:mm:ss"}
                  initialSeconds={timerValue}
                  textStyle={{
                    fontSize: wp(3.5),
                    color: redColor,
                    fontFamily: "OpenSans-Semibold",
                  }}
                  onPause={(e) => {}}
                  onEnd={(e) => {
                    // console.log("EVENT WORKOUT ", e);
                    dispatch(setTimerValue(e + timerPrevValue));
                    navigation.dispatch(
                      CommonActions.reset({
                        routes: [
                          {
                            name: "UserShortCuts",
                            params: {
                              name: "UserShortCuts",
                            },
                          },
                        ],
                      })
                    );
                  }}
                />
              </View>
            </View>
            <View style={Styles.header.innerContainer}>
              <TouchableOpacity
                style={{ marginRight: wp(-7) }}
                onPress={async() => {
                  var PreviousState = await AsyncStorage.setItem('currentExercise',currentIndex.toString());
                  timerRef?.current?.stop();
                }}
              >
                <NavButtonHome>
                  <ImageComp
                    source={homeIcon}
                    imageStyle={{
                      resizeMode: "contain",
                      width: wp(6),
                      height: wp(6),
                    }}
                    tintColor={blueColor}
                  />
                </NavButtonHome>
              </TouchableOpacity>
            </View>
            <Button1
              onPress={finishWorkoutHandler}
              isText={true}
              buttonText="FINISH WORKOUT"
              buttonTextStyle={{
                color: redColor,
                textAlign: "center",
                fontSize: wp(2.9),
                fontFamily: "OpenSans-Semibold",
              }}
              isIcon={false}
              buttonIcon={null}
              tintColor={redColor}
              buttonContainer={{
                width: wp(34),
                height: hp(7),
                borderRadius: hp(3.25),
                marginLeft: wp(6),
                marginTop: wp(1),
              }}
              buttonInnerContainer={{
                width: wp(31),
                height: hp(5),
                borderRadius: hp(2.5),
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.4)",
              padding: 10,
              paddingLeft: wp(5),
              borderRadius: 50,
            }}
          >
            <Button2
              onPress={prevExerciseHandler}
              isText={false}
              buttonText=""
              isIcon={true}
              buttonIcon={playIcon}
              tintColor={blueColor1}
              buttonIconStyle={{
                width: wp(3.5),
                height: wp(3.5),
                transform: [{ rotate: "180deg" }],
              }}
              buttonInnerContainer={Styles.buttonInnserStyle}
            />
            <View style={{ alignSelf: "center" }}>
              <View style={{ width: wp(62) }}>
                <Text
                  text={exercises[currentIndex]?.name}
                  textStyle={{
                    fontSize: wp(4.5),
                    textAlign: "center",
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
                <Text
                  text={exercises[currentIndex]?.notes}
                  textStyle={{
                    fontSize: wp(2.5),
                    textAlign: "center",
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
                <Text
                  text={`Record 1 RM : ${maxRmValue ? maxRmValue : 0}`}
                  textStyle={{
                    fontSize: wp(3.5),
                    textAlign: "center",
                    color: blueColor,
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
              </View>
            </View>
            <Button2
              onPress={nextExerciseHandler}
              isText={false}
              buttonText=""
              isIcon={true}
              buttonIcon={playIcon}
              tintColor={blueColor1}
              buttonIconStyle={{
                width: wp(3.5),
                height: wp(3.5),
              }}
              buttonInnerContainer={Styles.buttonInnserStyle}
            />
          </View>

          <View style={Styles.section1.container}>
            <View style={Styles.section1.view1}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "48%" }}>
                  <Text
                    text="Weight"
                    textStyle={{
                      fontSize: wp(2.5),
                      textAlign: "center",
                      fontFamily: "OpenSans",
                    }}
                  />
                  <Input
                    onFocusHandler={() => setWeight("")}
                    keyboardType="numeric"
                    onchange={(text) => setWeight(text)}
                    value={weight}
                    maxLength={3}
                    textAlign="center"
                    placeholder="0"
                    placeholderTextColor={blueColor}
                    viewStyle={{
                      marginTop: hp(1.5),
                      height: hp(6.5),
                      borderRadius: hp(3.5),
                    }}
                    inputStyle={{
                      fontSize: wp(7),
                      color: blueColor,
                      fontFamily: "OpenSans-Semibold",
                    }}
                  />
                </View>
                <View style={{ width: "48%" }}>
                  <Text
                    text="Reps"
                    textStyle={{
                      fontSize: wp(2.5),
                      textAlign: "center",
                      fontFamily: "OpenSans",
                    }}
                  />
                  <Input
                    maxLength={2}
                    keyboardType="numeric"
                    onFocusHandler={() => setReps("")}
                    onchange={(text) => setReps(text)}
                    value={reps}
                    textAlign="center"
                    placeholder="0"
                    placeholderTextColor={blueColor}
                    viewStyle={{
                      marginTop: hp(1.5),
                      height: hp(6.5),
                      borderRadius: hp(3.25),
                    }}
                    inputStyle={{
                      fontSize: wp(7),
                      color: blueColor,
                      fontFamily: "OpenSans-Semibold",
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  marginTop: hp(1.5),
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => setShowRestTimerModal(true)}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <ImageComp
                    source={clockIcon}
                    tintColor={redColor}
                    imageStyle={{ width: wp(3), height: wp(3) }}
                  />
                  <Text
                    text="Rest Time"
                    textStyle={{
                      fontSize: wp(3),
                      marginLeft: wp(1.3),
                      color: redColor,
                      fontFamily: "OpenSans",
                    }}
                  />
                </TouchableOpacity>

                {showCountdown ? (
                  <Countdown
                    setCountDown={setShowCountdown}
                    TimerRef={timerRef}
                    initialMinute={initialMin}
                    initialSeconds={initialSecs}
                  />
                ) : (
                  <Text
                    text={
                      initialMin === 0 && initialSecs === 0
                        ? `${initialMin} : ${initialSecs}0`
                        : `${initialMin} : ${initialSecs}`
                    }
                    textStyle={{
                      fontSize: wp(3),
                      marginLeft: -wp(2),
                      color: redColor,
                      fontFamily: "OpenSans",
                    }}
                  />
                )}

                <Button2
                  onPress={() => setPlateCalcModal(true)}
                  isText={true}
                  buttonText="Plate Calc"
                  isIcon={false}
                  buttonIcon={null}
                  buttonTextStyle={{
                    fontSize: wp(2.5),
                    fontFamily: "OpenSans-Semibold",
                  }}
                  buttonInnerContainer={{
                    width: wp(20),
                    height: hp(3),
                    borderRadius: hp(1.5),
                  }}
                />
              </View>

              <View style={{ marginTop: hp(1.5) }}>
                <Input
                  value={notes}
                  onchange={(text) => setNotes(text)}
                  placeholder="Enter set note"
                  placeholderTextColor={blueColor}
                  viewStyle={{
                    height: hp(4.75),
                    paddingHorizontal: wp(3),
                    borderBottomWidth: 1,
                    borderRadius: hp(2.25),
                    borderBottomColor: borderColor,
                  }}
                  inputStyle={{
                    fontSize: wp(3),
                    color: blueColor,
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
              </View>
            </View>
            <View style={Styles.section1.view2}>
              <Button1
                onPress={addExerciseHandler}
                isText={true}
                buttonText="Add Exercise"
                buttonTextStyle={{
                  textAlign: "center",
                  fontSize: wp(2.75),
                  fontFamily: "OpenSans-Semibold",
                }}
                isIcon={true}
                buttonIcon={plusIcon}
                tintColor={buttonTextColor}
                buttonIconStyle={{ width: wp(2.5), height: wp(2.5) }}
                buttonContainer={{
                  width: wp(33),
                  height: hp(4.5),
                  borderRadius: hp(2.25),
                }}
                buttonInnerContainer={{
                  width: wp(31),
                  height: hp(3.5),
                  borderRadius: hp(2),
                }}
              />
              <Button1
                onPress={() => 
                  {  timerRef.current.pause();
                    saveSetHandler(false)
                  }
                }
                isText={true}
                buttonText="SAVE SET"
                buttonTextStyle={{
                  color: redColor,
                  textAlign: "center",
                  fontSize: wp(5.5),
                  fontFamily: "OpenSans-Bold",
                }}
                isIcon={false}
                buttonIcon={null}
                tintColor={redColor}
                buttonContainer={{
                  width: wp(33),
                  height: hp(9),
                  borderRadius: hp(2.5),
                  marginTop: hp(1),
                }}
                buttonInnerContainer={{
                  width: wp(30),
                  height: hp(7.5),
                  borderRadius: hp(2),
                }}
              />
              <Button1
                onPress={() => {
                  setWarmupSet(true);
                  saveSetHandler(true);
                }}
                isText={true}
                buttonText="Save as warm up"
                buttonTextStyle={{
                  color: blueColor,
                  textAlign: "center",
                  fontSize: wp(2.75),
                  fontFamily: "OpenSans-Semibold",
                }}
                isIcon={false}
                buttonIcon={null}
                buttonContainer={{
                  width: wp(33),
                  height: hp(4.5),
                  borderRadius: hp(2.25),
                  marginTop: hp(1),
                  backgroundColor: buttonColor,
                }}
                buttonInnerContainer={{
                  width: wp(31),
                  height: hp(3.5),
                  borderRadius: hp(2),
                  backgroundColor: buttonColor,
                }}
              />
            </View>
          </View>
          <View style={Styles.section2.container}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "12.5%", alignItems: "center" }}>
                <Text
                  text="Set"
                  textStyle={{ fontSize: wp(3), fontFamily: "OpenSans" }}
                />
              </View>
              <View style={{ width: "17.5%", alignItems: "center" }}>
                <Text
                  text="Weight"
                  textStyle={{ fontSize: wp(3), fontFamily: "OpenSans" }}
                />
              </View>
              <View style={{ width: "17.5%" }}></View>
              <View style={{ width: "17.5%", alignItems: "center" }}>
                <Text
                  text="Reps"
                  textStyle={{ fontSize: wp(3), fontFamily: "OpenSans" }}
                />
              </View>
              <View style={{ width: "17.5%", alignItems: "center" }}>
                <Text
                  text="Volume"
                  textStyle={{ fontSize: wp(3), fontFamily: "OpenSans" }}
                />
              </View>
              <View style={{ width: "17.5%", alignItems: "center" }}>
                <Text
                  text="1 RM"
                  textStyle={{ fontSize: wp(3), fontFamily: "OpenSans" }}
                />
              </View>
            </View>

            <NeomorphFlexView
              viewStyle={{
                width: "100%",
                borderRadius: wp(4),
                marginTop: hp(1),
                paddingVertical: hp(1),
              }}
            >
              {sets
                .filter(
                  (items) => items.exercise._id === exercises[currentIndex]?._id
                )
                .map((item, index) => {
                  return (
                    <View key={index}>
                      <View
                        style={{
                          flexDirection: "row",
                          // justifyContent: "space-between",
                          // paddingLeft: wp(2),
                          width: "100%"
                        }}
                      >
                        <TouchableOpacity
                          onPress={editSetHandler.bind(this, item)}
                          style={{ width: "12.5%", alignItems: "center"}}
                        >
                          <Text
                            text={
                              item.failedSet
                                ? `${index + 1} F`
                                : item.warmupSet
                                ? "W"
                                : index + 1
                            }
                            textStyle={{
                              fontSize: wp(3),
                              fontFamily: "OpenSans"
                            }}
                          />
                        </TouchableOpacity>
                        <View style={{ width: "17.5%", alignItems: "center" }}>
                          <Text
                            text={item?.weight}
                            textStyle={{
                              fontSize: wp(3),
                              fontFamily: "OpenSans",
                            }}
                          />
                        </View>
                        <View style={{ width: "17.5%", alignItems: "center" }}>
                          <Text
                            text="x"
                            textStyle={{
                              fontSize: wp(3),
                              fontFamily: "OpenSans",
                            }}
                          />
                        </View>
                        <View style={{ width: "17.5%", alignItems: "center" }}>
                          <Text
                            text={item?.reps}
                            textStyle={{
                              fontSize: wp(3),
                              fontFamily: "OpenSans",
                            }}
                          />
                        </View>
                        <View style={{ width: "17.5%", alignItems: "center" }}>
                          <Text
                            text={item.weight * item.reps}
                            textStyle={{
                              fontSize: wp(3),
                              fontFamily: "OpenSans",
                            }}
                          />
                        </View>
                        <View style={{ width: "17.5%", alignItems: "center" }}>
                          <Text
                            text={item.rmValue.toFixed()}
                            textStyle={{
                              fontSize: wp(3),
                              fontFamily: "OpenSans",
                            }}
                          />
                        </View>
                      </View>

                      {item.notes ? (
                        <View
                          style={{ marginLeft: wp(18), marginTop: wp(1.5) }}
                        >
                          <Text
                            text={item.notes}
                            textStyle={{
                              fontSize: wp(3),
                              fontFamily: "OpenSans",
                            }}
                          />
                        </View>
                      ) : null}
                      {index ===
                      sets.filter(
                        (items) =>
                          items.exercise._id === exercises[currentIndex]?._id
                      ).length -
                        1 ? null : (
                        <Divider
                          width={wp(91)}
                          height={hp(0.15)}
                          style={Styles.section2.dividerStyle}
                        />
                      )}
                    </View>
                  );
                })}
            </NeomorphFlexView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: hp(0.5),
              }}
            >
              <View style={{ width: "47.5%" }}>
                <Text
                  text="Set Totals"
                  textStyle={{
                    fontSize: wp(4),
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
              </View>
              <View style={{ width: "17.5%", alignItems: "center" }}>
                <Text
                  text={repsSum().toString()}
                  textStyle={{
                    fontSize: wp(4),
                    color: blueColor,
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
              </View>
              <View style={{ width: "17.5%", alignItems: "center" }}>
                <Text
                  text={volumeSum().toString()}
                  textStyle={{
                    fontSize: wp(4),
                    color: blueColor,
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
              </View>
              <View style={{ width: "16%", alignItems: "center" }}></View>
            </View>
          </View>

          <Divider
            width="100%"
            height={hp(0.2)}
            style={Styles.section2.dividerStyle}
          />

          <View style={Styles.section3.container}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                text="Exercise History"
                textStyle={{ fontSize: wp(3.5), fontFamily: "OpenSans" }}
              />
              <View style={{ flexDirection: "row" }}>
                <Text
                  text="Graph"
                  textStyle={{
                    fontSize: wp(3.5),
                    marginRight: wp(3),
                    fontFamily: "OpenSans",
                  }}
                />
                <ImageComp
                  source={graphIcon}
                  tintColor={redColor}
                  imageStyle={{ width: wp(5), height: wp(5) }}
                />
              </View>
            </View>
            <View style={Styles.section3.innerContainer}>
              {workoutHistory.slice(0, 5).map((items, index) => {
                return (
                  <React.Fragment key={index}>
                    <View style={{ width: "100%", paddingHorizontal: wp(3.5) }}>
                      <Accordion
                        initialKey={index}
                        defaultOpen={1}
                        headerComp={
                          <View
                            style={{
                              width: "100%",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <View style={{width:'42%'}}>
                            <Text
                              text={moment(items.workoutDate).format(
                                "MM/DD/YYYY"
                              )}
                              textStyle={{
                                fontSize: wp(3),
                                fontFamily: "OpenSans",
                              }}
                            />
                            </View>
                            <View style={{width:'21%',alignItems:'center'}}>
                            <Text
                              text={Math.ceil(calTotalsrmValue(items.sets))}
                              textStyle={{
                                fontSize: wp(3),
                                fontFamily: "OpenSans",
                              }}
                            />
                            </View>
                            <View style={{width:'37%',alignItems:'flex-end'}}>
                            <Text
                              text={calTotalsVolume(items.sets)}
                              textStyle={{
                                fontSize: wp(3),
                                fontFamily: "OpenSans",
                              }}
                            />
                            </View>
                          </View>
                        }
                        bodyComp={items.sets.map((ele, i) => (
                          <View
                            style={{
                              width: "100%",
                              flexDirection: "row",
                              alignItems: "center",
                              paddingVertical: wp(2),
                              justifyContent: "flex-start",
                            }}
                          >
                            <TouchableOpacity
                              // onPress={() => setShowSaveSetModal(true)}
                              style={{ width: "10%",alignItems: "center" }}>
                              <Text
                                text={(i + 1).toString()}
                                textStyle={{
                                  fontSize: wp(3),
                                  fontFamily: "OpenSans",
                                }}
                              />
                            </TouchableOpacity>
                            <View
                              style={{ width: "14%",alignItems: "center" }}
                            >
                              <Text
                                text={ele.weight.toString()}
                                textStyle={{
                                  fontSize: wp(3),
                                  fontFamily: "OpenSans",
                                }}
                              />
                            </View>
                            <View
                              style={{ width: "14%", alignItems: "center" }}
                            >
                              <Text
                                text="x"
                                textStyle={{
                                  fontSize: wp(3),
                                  fontFamily: "OpenSans",
                                }}
                              />
                            </View>
                            <View
                              style={{ width: "18.5%", alignItems: "center" }}
                            >
                              <Text
                                text={ele.reps.toString()}
                                textStyle={{
                                  fontSize: wp(3),
                                  fontFamily: "OpenSans",
                                }}
                              />
                            </View>
                            <View
                              style={{ width: "17%", alignItems: "center" }}
                            >
                              <Text
                                text={(ele.weight * ele.reps).toString()}
                                textStyle={{
                                  fontSize: wp(3),
                                  fontFamily: "OpenSans",
                                }}
                              />
                            </View>
                            <View
                              style={{ width: "17%", alignItems: "flex-end" }}
                            >
                              <Text
                                text={ele.rmValue.toString()}
                                textStyle={{
                                  fontSize: wp(3),
                                  fontFamily: "OpenSans",
                                }}
                              />
                            </View>
                          </View>
                        ))}
                      />
                    </View>
                    {index === workoutHistory.length - 1 ? null : (
                      <Divider
                        width={wp(91)}
                        height={hp(0.15)}
                        style={Styles.section2.dividerStyle}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </View>
          </View>
          {/* 
          <View style={Styles.section3.innerContainer}>
            {workoutHistory?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <View style={{ width: "100%", paddingHorizontal: wp(3.5) }}>
                    <Accordion
                      initialKey={index}
                      defaultOpen={1}
                      headerComp={
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            text={moment(item.createdDate).format("YYYY/MM/DD")}
                            textStyle={{
                              fontSize: wp(3),
                              fontFamily: "OpenSans",
                            }}
                          />
                          <Text
                            text={item.sets.rmValue.toString()}
                            textStyle={{
                              fontSize: wp(3),
                              fontFamily: "OpenSans",
                            }}
                          />
                          <Text
                            text={(
                              item.sets.weight * item.sets.reps
                            ).toString()}
                            textStyle={{
                              fontSize: wp(3),
                              fontFamily: "OpenSans",
                            }}
                          />
                        </View>
                      }
                      bodyComp={
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: wp(2),
                            justifyContent: "space-between",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => setShowSaveSetModal(true)}
                            style={{ width: "16%", alignItems: "center" }}
                          >
                            <Text
                              text={index.toString()}
                              textStyle={{
                                fontSize: wp(3),
                                fontFamily: "OpenSans",
                              }}
                            />
                          </TouchableOpacity>
                          <View style={{ width: "18%", alignItems: "center" }}>
                            <Text
                              text={item.sets.weight.toString()}
                              textStyle={{
                                fontSize: wp(3),
                                fontFamily: "OpenSans",
                              }}
                            />
                          </View>
                          <View style={{ width: "16%", alignItems: "center" }}>
                            <Text
                              text="x"
                              textStyle={{
                                fontSize: wp(3),
                                fontFamily: "OpenSans",
                              }}
                            />
                          </View>
                          <View style={{ width: "16%", alignItems: "center" }}>
                            <Text
                              text={item.sets.reps.toString()}
                              textStyle={{
                                fontSize: wp(3),
                                fontFamily: "OpenSans",
                              }}
                            />
                          </View>
                          <View style={{ width: "16%", alignItems: "center" }}>
                            <Text
                              text={(
                                item.sets.weight * item.sets.reps
                              ).toString()}
                              textStyle={{
                                fontSize: wp(3),
                                fontFamily: "OpenSans",
                              }}
                            />
                          </View>
                          <View style={{ width: "16%", alignItems: "center" }}>
                            <Text
                              text={item.sets.rmValue.toString()}
                              textStyle={{
                                fontSize: wp(3),
                                fontFamily: "OpenSans",
                              }}
                            />
                          </View>
                        </View>
                      }
                    />
                  </View>
                  {index !== 4 && (
                    <Divider
                      width="100%"
                      height={hp(0.1)}
                      style={{ marginVertical: hp(0.1) }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </View> */}
        </ScrollView>

        {/* Rest timer Modal */}
        <ModalView
          isVisible={showRestTimerModal}
          setClose={() => setShowRestTimerModal(false)}
          containerStyle={{
            marginHorizontal: wp(25),
            height: hp(32),
            marginTop: hp(35),
          }}
        >
          <View style={{ alignItems: "center" }}>
            <NeomorphView
              viewStyle={{
                width: wp(35),
                height: hp(4.5),
                borderRadius: hp(2.25),
                marginBottom: hp(1),
              }}
            >
              <TouchableOpacity
                onPress={setRestCountdownHandler.bind(this, 0, 59, 1)}
                // onPress={setRestCountdownHandler.bind(this, 60, 1)}
              >
                <Text
                  text="1 MINUTE"
                  textStyle={{
                    color: blueColor,
                    fontSize: wp(3),
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
              </TouchableOpacity>
            </NeomorphView>
            <NeomorphView
              viewStyle={{
                width: wp(35),
                height: hp(4.5),
                borderRadius: hp(2.25),
                marginBottom: hp(1),
              }}
            >
              <TouchableOpacity
                onPress={setRestCountdownHandler.bind(this, 1, 59, 2)}
                // onPress={setRestCountdownHandler.bind(this, 120, 2)}
              >
                <Text
                  text="2 MINUTE"
                  textStyle={{
                    color: blueColor,
                    fontSize: wp(3),
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
              </TouchableOpacity>
            </NeomorphView>
            <NeomorphView
              viewStyle={{
                width: wp(35),
                height: hp(4.5),
                borderRadius: hp(2.25),
                marginBottom: hp(1),
              }}
            >
              <TouchableOpacity
                onPress={setRestCountdownHandler.bind(this, 2, 59, 3)}
              >
                <Text
                  text="3 MINUTE"
                  textStyle={{
                    color: blueColor,
                    fontSize: wp(3),
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
              </TouchableOpacity>
            </NeomorphView>
            <NeomorphView
              viewStyle={{
                width: wp(35),
                height: hp(4.5),
                borderRadius: hp(2.25),
                marginBottom: hp(1),
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setShowCountdown(false);
                  setShowRestTimerModal(false);
                  setRestCountdownHandler(0, 0, 0);
                  // setRestCountdownHandler(0, 0);
                }}
              >
                <Text
                  text="NONE"
                  textStyle={{
                    color: blueColor,
                    fontSize: wp(3),
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
              </TouchableOpacity>
            </NeomorphView>
            <TouchableOpacity onPress={() => setShowRestTimerModal(false)}>
              <NeomorphView
                viewStyle={{
                  width: wp(35),
                  height: hp(4.5),
                  borderRadius: hp(2.25),
                }}
              >
                <Text
                  text="CANCEL"
                  textStyle={{
                    color: redColor,
                    fontSize: wp(3),
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
              </NeomorphView>
            </TouchableOpacity>
          </View>
        </ModalView>

        {/* Saved Set Modal */}
        <ModalView
          isVisible={showSaveSetModal}
          setClose={() => setShowSaveSetModal(false)}
          containerStyle={{
            marginHorizontal: wp(15),
            height: hp(35),
            marginTop: hp(30),
            padding: 0,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: wp(4),
            }}
          >
            <Text
              text="EDIT SET"
              textStyle={{
                color: blueColor,
                fontSize: wp(3.5),
                fontFamily: "OpenSans-Semibold",
              }}
            />

            <TouchableOpacity
              onPress={() => saveEditHandler(editWarmup, failedSet)}
            >
              <ImageComp
                source={saveIcon}
                tintColor={blueColor}
                imageStyle={{ width: wp(5.5), height: wp(5.5) }}
              />
            </TouchableOpacity>
          </View>
          <Divider
            width="100%"
            height={hp(0.2)}
            style={Styles.section2.dividerStyle}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: wp(4),
            }}
          >
            <View style={{ width: "48%" }}>
              <Text
                text="WEIGHT"
                textStyle={{
                  fontFamily: "OpenSans-Semibold",
                  fontSize: wp(3),
                  textAlign: "center",
                }}
              />
              <Input
                value={editWeight}
                onchange={(text) => setEditWeight(text)}
                textAlign="center"
                placeholder="0000"
                placeholderTextColor={redColor}
                viewStyle={{
                  marginTop: hp(1),
                  height: hp(6.5),
                  borderBottomWidth: 1,
                  borderRadius: hp(3.25),
                  borderBottomColor: borderColor,
                }}
                inputStyle={{
                  fontSize: wp(5.5),
                  color: redColor,
                  fontFamily: "OpenSans-Semibold",
                }}
              />
              <Button2
                onPress={() => {
                  setFailedSet(false);
                  setEditWarmpup(true);
                  saveEditHandler(true, false);
                }}
                isText={true}
                buttonText="WARM UP"
                isIcon={false}
                buttonIcon={null}
                buttonContainer={{ marginTop: hp(2.5) }}
                buttonTextStyle={{
                  fontSize: wp(3),
                  fontFamily: "OpenSans-Semibold",
                  color: editWarmup ? redColor : blueColor,
                }}
                buttonInnerContainer={{
                  width: wp(25),
                  height: hp(4.75),
                  borderRadius: hp(2.5),
                  backgroundColor: editWarmup ? "#000" : buttonColor,
                }}
              />
              <Button2
                onPress={deleteSetHandler}
                isText={true}
                buttonText="DELETE SET"
                isIcon={false}
                buttonIcon={null}
                buttonContainer={{ marginTop: hp(2.5) }}
                buttonTextStyle={{
                  fontSize: wp(3),
                  fontFamily: "OpenSans-Semibold",
                  color: redColor,
                }}
                buttonInnerContainer={{
                  width: wp(25),
                  height: hp(4.75),
                  borderRadius: hp(2.5),
                }}
              />
            </View>
            <View style={{ width: "48%" }}>
              <Text
                text="REPS"
                textStyle={{
                  fontFamily: "OpenSans-Semibold",
                  fontSize: wp(3),
                  textAlign: "center",
                }}
              />
              <Input
                keyboardType="numeric"
                value={editReps}
                onchange={(text) => setEditReps(text)}
                textAlign="center"
                placeholder="0000"
                placeholderTextColor={redColor}
                viewStyle={{
                  marginTop: hp(1),
                  height: hp(6.5),
                  borderBottomWidth: 1,
                  borderRadius: hp(3.25),
                  borderBottomColor: borderColor,
                }}
                inputStyle={{
                  fontSize: wp(5.5),
                  color: redColor,
                  fontFamily: "OpenSans-Semibold",
                }}
              />
              <Button2
                onPress={() => {
                  setFailedSet(true);
                  setEditWarmpup(false);
                  saveEditHandler(false, true);
                }}
                isText={true}
                buttonText="FAILURE SET"
                isIcon={false}
                buttonIcon={null}
                buttonContainer={{ marginTop: hp(2.5) }}
                buttonTextStyle={{
                  fontSize: wp(3),
                  fontFamily: "OpenSans-Semibold",
                  color: blueColor,
                }}
                buttonInnerContainer={{
                  width: wp(25),
                  height: hp(4.75),
                  backgroundColor: failedSet ? "#000" : buttonColor,
                  borderRadius: hp(2.5),
                }}
              />
              <Button2
                onPress={() => setShowSaveSetModal(false)}
                isText={true}
                buttonText="CANCEL"
                isIcon={false}
                buttonIcon={null}
                buttonContainer={{ marginTop: hp(2.5) }}
                buttonTextStyle={{
                  fontSize: wp(3),
                  fontFamily: "OpenSans-Semibold",
                  color: redColor,
                }}
                buttonInnerContainer={{
                  width: wp(25),
                  height: hp(4.75),
                  borderRadius: hp(2.5),
                }}
              />
            </View>
          </View>
        </ModalView>

        {/* Plate Calc Modal */}
        <ModalView
          isVisible={plateCalcModal}
          setClose={() => setPlateCalcModal(false)}
          containerStyle={{
            marginHorizontal: wp(12),
            height: hp(45),
            marginTop: hp(30),
            padding: 0,
            paddingHorizontal: wp(4),
            backgroundColor: backgroundColor1,
            borderColor: "#151617",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              text="PLATE CALCULATOR"
              textStyle={{
                color: blueColor,
                fontSize: wp(4.5),
                fontFamily: "OpenSans-Semibold",
              }}
            />
            <Button2
              onPress={() => setPlateCalcModal(false)}
              isText={false}
              buttonText=""
              isIcon={true}
              buttonIcon={backIcon}
              tintColor={blueColor}
              buttonTextStyle={{
                fontSize: wp(2.5),
                fontFamily: "OpenSans-Semibold",
              }}
              buttonInnerContainer={{
                width: wp(9),
                height: wp(9),
                borderRadius: hp(4.5),
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: hp(1.5),
            }}
          >
            <Text
              text="BARBELL :"
              textStyle={{
                color: "white",
                fontSize: wp(4),
                fontFamily: "OpenSans-Semibold",
              }}
            />
            <Input
              onchange={(text) => setBarWeight(text)}
              keyboardType="numeric"
              maxLength={2}
              value={barWeight}
              textAlign="center"
              placeholder="00"
              placeholderTextColor={redColor}
              viewStyle={{
                marginHorizontal: wp(2),
                height: hp(6),
                width: wp(20),
                borderBottomWidth: 1,
                borderRadius: hp(3),
                borderBottomColor: borderColor,
              }}
              inputStyle={{
                fontSize: wp(5),
                color: redColor,
                fontFamily: "OpenSans-Semibold",
              }}
            />
            <Text
              text="LBS"
              textStyle={{
                color: "white",
                fontSize: wp(4),
                fontFamily: "OpenSans-Semibold",
              }}
            />
          </View>

          <Text
            text="TAP TO ADD PLATES ( ONE SIDE OF BAR ONLY )"
            textStyle={{
              color: "white",
              fontSize: wp(2.5),
              marginTop: hp(1),
              marginLeft: wp(1),
              fontFamily: "OpenSans-Semibold",
            }}
          />

          <View
            style={{
              flexDirection: "row",
              marginTop: hp(1.5),
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => setPlate45(plate45 + 1)}>
                <NeomorphView
                  viewStyle={{
                    width: wp(13),
                    height: wp(13),
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: wp(6.5),
                    backgroundColor: plate45 > 0 ? blueColor : backgroundColor1,
                  }}
                >
                  <Text text="45" textStyle={{ color: "white" }} />
                </NeomorphView>
              </TouchableOpacity>
              <Text
                text={plate45}
                textStyle={{
                  color: "lightgray",
                  fontSize: wp(3),
                  marginTop: hp(1),
                }}
              />
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => setPlate35(plate35 + 1)}>
                <NeomorphView
                  viewStyle={{
                    width: wp(12),
                    height: wp(12),
                    borderRadius: wp(6),
                    backgroundColor: plate35 > 0 ? blueColor : backgroundColor1,
                  }}
                >
                  <Text
                    text="35"
                    textStyle={{ color: "white", fontSize: wp(4.75) }}
                  />
                </NeomorphView>
              </TouchableOpacity>
              <Text
                text={plate35}
                textStyle={{
                  color: "lightgray",
                  fontSize: wp(3),
                  marginTop: hp(1),
                }}
              />
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => setPlate25(plate25 + 1)}>
                <NeomorphView
                  viewStyle={{
                    width: wp(11),
                    height: wp(11),
                    borderRadius: wp(5.5),
                    backgroundColor: plate25 > 0 ? blueColor : backgroundColor1,
                  }}
                >
                  <Text
                    text="25"
                    textStyle={{ color: "white", fontSize: wp(4.5) }}
                  />
                </NeomorphView>
              </TouchableOpacity>
              <Text
                text={plate25}
                textStyle={{
                  color: "lightgray",
                  fontSize: wp(3),
                  marginTop: hp(1),
                }}
              />
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => setPlate10(plate10 + 1)}>
                <NeomorphView
                  viewStyle={{
                    width: wp(10),
                    height: wp(10),
                    borderRadius: wp(5),
                    backgroundColor: plate10 > 0 ? blueColor : backgroundColor1,
                  }}
                >
                  <Text
                    text="10"
                    textStyle={{ color: "white", fontSize: wp(4.25) }}
                  />
                </NeomorphView>
              </TouchableOpacity>
              <Text
                text={plate10}
                textStyle={{
                  color: "lightgray",
                  fontSize: wp(3),
                  marginTop: hp(1),
                }}
              />
            </View>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity onPress={() => setPlate5(plate5 + 1)}>
                <NeomorphView
                  viewStyle={{
                    width: wp(9),
                    height: wp(9),
                    borderRadius: wp(4.5),
                    backgroundColor: plate5 > 0 ? blueColor : backgroundColor1,
                  }}
                >
                  <Text
                    text="5"
                    textStyle={{ color: "white", fontSize: wp(4) }}
                  />
                </NeomorphView>
              </TouchableOpacity>
              <Text
                text={plate5}
                textStyle={{
                  color: "lightgray",
                  fontSize: wp(3),
                  marginTop: hp(1),
                }}
              />
            </View>
          </View>

          <NeomorphView
            viewStyle={{
              width: wp(30),
              height: hp(5),
              borderRadius: hp(2.5),
              marginTop: hp(2),
              marginLeft: "auto",
              marginRight: wp(5),
            }}
          >
            <Text
              text={
                plate45 * (45 * 2) +
                plate35 * (35 * 2) +
                plate25 * (25 * 2) +
                plate10 * (10 * 2) +
                plate5 * (5 * 2) +
                +barWeight +
                " LBS"
              }
              textStyle={{
                color: redColor,
                textAlign: "center",
                fontSize: wp(5.5),
                fontFamily: "OpenSans-Semibold",
              }}
            />
          </NeomorphView>
          <ImageComp
            source={barbellImg}
            imageStyle={{
              position: "absolute",
              zIndex: -1,
              bottom: wp(6),
              right: 0,
            }}
          />

          <TouchableOpacity style={{ marginTop: hp(2) }} onPress={handleClear}>
            <Text
              text="CLEAR ALL"
              textStyle={{
                color: "white",
                textAlign: "right",
                marginRight: wp(10),
                fontSize: wp(4),
                marginTop: hp(1),
              }}
            />
          </TouchableOpacity>
        </ModalView>
      </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}
