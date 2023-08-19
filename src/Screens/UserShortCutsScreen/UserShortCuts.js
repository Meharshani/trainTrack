import React, { useState, useEffect, useRef,useCallback } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Text from "../../Components/TextComp/Text";
import { Button1,Button2 } from "../../Components/Buttons/Buttons";
import { NeomorphFlexView,NeomorphView } from "../../Components/NeomorphView/NeomorphView";
import Avatar from "../../Components/AvatarComp/Avatar";
import { RadioButtonComp } from "../../Components/Buttons/Buttons";
import Styles from "./Styles";
import {
  backgroundColor,
  backgroundColor1,
  blueColor,
  blueColor1,
  borderColor,
  redColor,
} from "../../Utils/ThemeColors";
import {
  legIcon,
  chestIcon,
  armIcon,
  shoulderIcon,
  muscleIcon,
  userImage,
  plusIcon,
  circleLogo,
  textLogo,
  facebookIcon,
  twitterIcon,
  instagramIcon,
  saveIcon,
  barbellImg,
  backIcon,
  failedIcon,
  userIcon,
  userStateIcon,
  userSettingsIcon,
  workoutsIcon,
  exerciseIcon
} from "../../Utils/ImagesPath";
import RadioForm from "react-native-simple-radio-button";
import ImageComp from "../../Components/ImageComp/Image";
import Input from "InputComp/Input";
import DrawerButton from "DrawerButton/DrawerButton";
import { Divider } from "Divider/Divider";
import {
  getOrderedWeightHistory,
  getOrderedBodyCompositions,
  getAllWorkouts,
  getProfileShortcuts,
  setShortcuts,
} from "../../realm/index";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import ModalView from "../../Components/ModalView/ModalView";
import { useSelector } from "react-redux";
import { setTimerValue } from "../../redux/timervalue";
import { setsEx } from "../../redux/sets";
import { setCurrentWorkout } from "../../redux/currentworkout";
import { useDispatch } from "react-redux";
import { Timer } from "react-native-element-timer";
import {
  addSet,
  addHistory,
  getWorkoutDaysByMonth,
  addDaysInWorkoutDays,
} from "../../realm/index";
import realm from "../../realm/index";
import { logger } from "react-native-logs";
import { setLatestWorkout } from "../../redux/latestworkout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';

const data1 = [
  { label: "USER STATS", route: "UserStats", id: 0 },
  { label: "PLATE CACULATOR", route: "plateCal", id: 1 },
  { label: "ADD WORKOUT", route: "WorkoutScreen", id: 2 },
  { label: "ADD EXCERCISE", route: "AddExercise", id: 3 },
];

export default function UserShortCuts({

  navigation: { openDrawer, navigate },
}) {
  var [value, setValue] = useState([]);
  var [value1, setValue1] = useState([]);

  const [addShortcut, setAddShortcut] = useState(false);
  const [orderWeights, setOrderedWeights] = useState([]);
  const [orderedComps, setOrderedComps] = useState([]);
  const [latestWorkout, setLatestWorkouts] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const navigation = useNavigation();
  const { params } = useRoute();
  var [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [selShortcutsArr, setSelShortcutsArr] = useState([]);
  const [profileShortcuts, setProfileShortcuts] = useState([]);
  const [plateCalcModal, setPlateCalcModal] = useState(false);
  const selectedProfile = useSelector((state) => state.profiles.profile);
  const timerValue = useSelector((state) => state.timer.timer);
  const currentWorkout = useSelector((state) => state.currentworkout.workout);
  const latestWorkoutRoot = useSelector(
    (state) => state.latestworkout.latestWorkout
  );
  const [timerPrevValue, setTimerPrevValue] = useState(0);
  const exercises = useSelector((state) => state.workout.workoutexercises);
  const sets = useSelector((state) => state.sets.sets);

  const timerRef = useRef(null);

  const [plate45, setPlate45] = useState(0);
  const [plate35, setPlate35] = useState(0);
  const [plate25, setPlate25] = useState(0);
  const [plate10, setPlate10] = useState(0);
  const [plate5, setPlate5] = useState(0);
  const [barWeight, setBarWeight] = useState("45");

  const dispatch = useDispatch();
  console.log('usershortcut')

  useFocusEffect(useCallback(()=> {
    handleGetSelectedShortCuts()
  }, []))

  const handleGetSelectedShortCuts=async()=>{
    var selected_Workouts = await AsyncStorage.getItem('selectedWorkouts');
    var selected_Routes = await AsyncStorage.getItem('selectedRoutes');

    selected_Workouts = selected_Workouts ? JSON.parse(selected_Workouts) : []
    selected_Routes = selected_Routes ? JSON.parse(selected_Routes) : []
    // console.log('selected_Workouts ',selected_Workouts)
    // console.log('selected_Routes ',selected_Routes)
    // if(val){
    //   val = JSON.parse(val);
    // }else{
    //   val = []
    // }
    // if(val1){
    //   setValue1(JSON.parse(val1))
    // }
    let addIntoShortcuts = selected_Workouts.concat(selected_Routes);
    setSelShortcutsArr(addIntoShortcuts);
    setShortcuts(selectedProfile, addIntoShortcuts);


  }

  //clear plates handler
  const handleClear = () => {
    setPlate45(0);
    setPlate35(0);
    setPlate25(0);
    setPlate10(0);
    setPlate5(0);
    setBarWeight("45");
  };

  //get ordered weights
  const getOrderWeights = async () => {
    const allWeights = await getOrderedWeightHistory(selectedProfile?._id);
    setOrderedWeights(allWeights);
  };

  //get ordered body compositions
  const getOrderComps = async () => {
    const allcomps = await getOrderedBodyCompositions(selectedProfile?._id);
    setOrderedComps(allcomps);
  };

  //get workouts
  const getWorkouts = () => {
    const workouts = getAllWorkouts(selectedProfile?._id);
    setWorkouts(workouts);
    if (latestWorkoutRoot !== null) {
      if (latestWorkoutRoot.profile?._id === selectedProfile?._id) {
        setLatestWorkouts(latestWorkoutRoot);
      } else {
        setLatestWorkouts(null);
      }
    }
  };

  //get profile shortcuts
  const getProfileShortcut = () => {
    const shortcuts = getProfileShortcuts(selectedProfile?._id);
    console.log("short ",shortcuts?.length)
    handleAutoSelectItems(shortcuts)

    setProfileShortcuts(shortcuts);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getOrderWeights();
      getOrderComps();
      getWorkouts();
      getProfileShortcut();
    });

    return () => unsubscribe;
  }, [getOrderComps, getOrderWeights, getWorkouts]);


  const handleAutoSelectItems=(my_shortcuts)=>{

    console.log("inner ",my_shortcuts)
    value=[]
    value1=[]
    my_shortcuts.map((shorts)=>{
      var name = shorts?.workout?.name;
      if(name=='Chest Workout'){
        value = [{"value3Index": 0}];
      }
      if(name=='Leg Workout'){
        value =[...value,{"value3Index": 1}];
      }
      if(name=='Shoulder Workout'){
        value = [...value,{"value3Index": 2}];
      }
      if(name=='Back Workout'){
        value = [...value,{"value3Index": 3}];
      }
      if(name=='Arm Workout'){
        value = [...value,{"value3Index": 4}];
      }
      
      if(shorts?.screenName=='UserStats'){
        value1=[{"value3Index": 0}];
      }
      if(shorts?.screenName=='plateCal'){
        value1= [...value1,{"value3Index": 1}];
      }
      if(shorts?.screenName=='WorkoutScreen'){
        console.log('WorkoutScreen')
        value1=[...value1,{"value3Index": 2}];
      }
      if(shorts?.screenName=='AddExercise'){
        console.log('AddExercise')
        value1=[...value1,{"value3Index": 3}];
      }
    })
      setValue(value)
      setValue1(value1)

  }

  useEffect(() => {
    getOrderWeights();
    getOrderComps();
    getWorkouts();
  }, []);

  const startTimerHandler = () => {
    if (latestWorkout !== null && currentWorkout === null) {
      const timeout = setTimeout(() => {
        timerRef?.current?.start();
        clearTimeout(timeout);
      }, 1000);
    }
  };

  useEffect(() => {
    setTimerPrevValue(timerValue);
    startTimerHandler;
  }, []);

  //add shortcuts
  const addShortcutHandler = async() => {
    if (selectedWorkouts.length > 0 || selectedRoutes.length > 0) {
      let addIntoShortcuts = selectedWorkouts.concat(selectedRoutes);
      setSelShortcutsArr(addIntoShortcuts);
      setShortcuts(selectedProfile, addIntoShortcuts);
      setAddShortcut(false);
      await AsyncStorage.setItem('selectedWorkouts',JSON.stringify(selectedWorkouts));
      await AsyncStorage.setItem('selectedRoutes',JSON.stringify(selectedRoutes));

    }
  };

  //current workout
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

  //finish workout handler
  const finishWorkoutHandler = async () => {
    if (sets.length == 0) {
      return;
    }

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
        .filter((items) => items.exercise._id == exercise._id)
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
        currentWorkout,
        exercise,
        setsArrcopy,
        workoutDataId,
        selectedProfile
      );
    });
    dispatch(setTimerValue(null));
    dispatch(setCurrentWorkout(null));
    dispatch(setsEx([]));
  };

  //handle multi-selection of radio button
  const radioButtonsHandler = async(obj, index) => {
    var selected_Workouts = await AsyncStorage.getItem('selectedWorkouts');
    selected_Workouts = selected_Workouts ? JSON.parse(selected_Workouts) : []

    selectedWorkouts=selected_Workouts;
    if (selectedWorkouts.some((item) => item.workout._id === obj._id)) {
      const filtered = selectedWorkouts.filter(
        (item) => item.workout._id !== obj._id
      );
      setSelectedWorkouts(filtered);
    } else {
    console.log("selectedWorkouts internal ",selectedWorkouts)
      setSelectedWorkouts([
        ...selectedWorkouts,
        {
          workout: obj,
          shortcutType: "workout",
        },
      ]);
    }
    if (value.some((item) => item.value3Index === index)) {
      const filtered = value.filter((item) => item.value3Index !== index);
      setValue(filtered);
    } else {
      setValue([
        ...value,
        {
          value3Index: index,
        },
      ]);
    }
  };

  //handle multi-selection of other radio button
  const otherRadioButtonHandler = (obj, index) => {
    if (selectedRoutes.some((item) => item.screenName === obj.route)) {
      const filtered = selectedRoutes.filter(
        (item) => item.screenName !== obj.route
      );
      setSelectedRoutes(filtered);
    } else {
      setSelectedRoutes([
        ...selectedRoutes,
        {
          shortcutType: "screen",
          screenName: obj.route,
          label: obj.label,
        },
      ]);
    }
    if (value1.some((item) => item.value3Index === index)) {
      const filtered = value1.filter((item) => item.value3Index !== index);
      setValue1(filtered);
    } else {
      setValue1([
        ...value1,
        {
          value3Index: index,
        },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => setAddShortcut(false)}>
      <View style={Styles.containerStyle}>
        <SafeAreaView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: hp(2) }}
          >
            <View>
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
                  <ImageComp
                    source={textLogo}
                    imageStyle={{
                      width: wp(30),
                      height: wp(10),
                      marginLeft: wp(0.5),
                    }}
                  />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity style={Styles.header.iconContainer}>
                    <ImageComp
                      source={facebookIcon}
                      imageStyle={{ width: wp(4), height: wp(4) }}
                      tintColor={backgroundColor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.header.iconContainer}>
                    <ImageComp
                      source={twitterIcon}
                      imageStyle={{ width: wp(4), height: wp(4) }}
                      tintColor={backgroundColor}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.header.iconContainer}>
                    <ImageComp
                      source={instagramIcon}
                      imageStyle={{ width: wp(3.5), height: wp(3.5) }}
                      tintColor={backgroundColor}
                    />
                  </TouchableOpacity>

                  <Button1
                    onPress={() => setAddShortcut(!addShortcut)}
                    buttonText=""
                    isIcon={true}
                    isText={false}
                    buttonIcon={plusIcon}
                    tintColor={redColor}
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
              </View>
              <View style={Styles.section1.container}>
                <Avatar
                  image={userIcon}
                  showIcon={false}
                  avatarContainer={Styles.section1.avatarContainer}
                  avatarInnerContainer={Styles.section1.avatarInnerContainer}
                  isEdit={false}
                />
                <View style={Styles.section1.detailViewContainer}>
                  <NeomorphFlexView viewStyle={Styles.section1.view1}>
                    <Text
                      text={selectedProfile?.name}
                      textStyle={{ fontFamily: "OpenSans-Semibold" }}
                    />
                  </NeomorphFlexView>
                  <NeomorphFlexView viewStyle={Styles.section1.view2}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "100%",
                        paddingHorizontal: wp(2),
                      }}
                    >
                      <View
                        style={{
                          paddingHorizontal: wp(1.5),
                          height: "70%",
                          backgroundColor: blueColor1,
                          borderRadius: 50,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          text={
                            orderWeights.length !== 0
                              ? orderWeights[orderWeights.length - 1]?.weight +
                                " LBS"
                              : "000 LBS"
                          }
                          textStyle={{
                            color: "black",
                            fontSize: wp(3.5),
                            fontFamily: "OpenSans-Bold",
                          }}
                        />
                      </View>
                      <Text
                        text="WEIGHT"
                        textStyle={{
                          fontSize: wp(3.5),
                          fontFamily: "OpenSans-Semibold",
                        }}
                      />
                      <Divider width={wp(0.5)} height="60%" />
                      <Text
                        text="FAT"
                        textStyle={{
                          fontSize: wp(3.5),
                          fontFamily: "OpenSans-Semibold",
                        }}
                      />
                      <View
                        style={{
                          paddingHorizontal: wp(3),
                          height: "70%",
                          backgroundColor: blueColor1,
                          borderRadius: 50,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          text={
                            orderedComps.length !== 0
                              ? (orderedComps[0]?.bodyFat).toFixed(1) + "%"
                              : "00.0%"
                          }
                          textStyle={{
                            color: "black",
                            fontSize: wp(3.5),
                            fontFamily: "OpenSans-Bold",
                          }}
                        />
                      </View>
                    </View>
                  </NeomorphFlexView>
                </View>
              </View>

              {latestWorkout !== null && currentWorkout === null ? (
                <NeomorphFlexView viewStyle={Styles.section2.container}>
                  <View style={Styles.section2.innerView}>
                    <View>
                      <Text
                        text="LAST WORKOUT"
                        textStyle={{
                          fontSize: wp(4),
                          fontFamily: "OpenSans-Semibold",
                        }}
                      />
                      <Text
                        text={moment(latestWorkout?.workoutDate).format(
                          "MM/DD/YYYY"
                        )}
                        textStyle={{
                          fontSize: wp(3.5),
                          fontFamily: "OpenSans-Semibold",
                        }}
                      />
                    </View>
                    <Divider width={wp(0.5)} height="90%" />
                    <Button2
                      isText={true}
                      buttonText={latestWorkout?.name}
                      isIcon={false}
                      buttonIcon={null}
                      buttonTextStyle={{
                        color: blueColor1,
                        fontSize: wp(3.5),
                        fontFamily: "OpenSans-Bold",
                      }}
                      buttonInnerContainer={
                        Styles.section2.buttonInnerContainer
                      }
                    />
                  </View>
                </NeomorphFlexView>
              ) : (
                <View />
              )}

              {currentWorkout !== null ? (
                <NeomorphFlexView viewStyle={Styles.section2.container}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View>
                      <Text
                        text="WORKOUT IN PROGRESS"
                        textStyle={{
                          fontSize: wp(3),
                          fontFamily: "OpenSans-Semibold",
                        }}
                      />

                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Timer
                          ref={timerRef}
                          autoStart
                          formatTime={"hh:mm:ss"}
                          initialSeconds={timerValue}
                          textStyle={{
                            fontSize: wp(3.5),
                            color: redColor,
                            fontFamily: "OpenSans-Semibold",
                          }}
                          onPause={(e) => {}}
                          onTimes={(e) => {
                          }}
                          onEnd={(e) => {
                            // console.log("EVENT SHORTCUT ", e);
                            dispatch(setTimerValue(e + timerPrevValue));
                            navigate("WorkoutDetailScreen", {
                              workout: currentWorkout,
                            });
                          }}
                        />
                      </View>
                    </View>

                    <Button2
                      onPress={() => {
                        timerRef.current.stop();
                      }}
                      isText={true}
                      buttonText="RESUME"
                      isIcon={false}
                      buttonIcon={null}
                      buttonContainer={{ marginRight: wp(1) }}
                      buttonTextStyle={{
                        color: blueColor1,
                        fontSize: wp(3.5),
                        fontFamily: "OpenSans-Bold",
                      }}
                      buttonInnerContainer={{
                        width: wp(25),
                        height: hp(4),
                        borderRadius: hp(2),
                      }}
                    />
                    <Button2
                      onPress={() => {
                        finishWorkoutHandler();
                      }}
                      isText={true}
                      buttonText="SAVE"
                      isIcon={false}
                      buttonIcon={null}
                      buttonTextStyle={{
                        color: redColor,
                        fontSize: wp(3.5),
                        fontFamily: "OpenSans-Bold",
                      }}
                      buttonInnerContainer={{
                        width: wp(20),
                        height: hp(4),
                        borderRadius: hp(2),
                      }}
                    />
                  </View>
                </NeomorphFlexView>
              ) : (
                <View />
              )}

              <View style={Styles.section3.container}>
                <View style={Styles.section3.dot}></View>
                <Text
                  text="USER SHORTCUTS"
                  textStyle={{
                    fontFamily: "OpenSans-Bold",
                    fontSize: wp(5),
                    marginHorizontal: wp(2),
                  }}
                />
                <View style={Styles.section3.dot}></View>
              </View>
              <View style={Styles.section4.container}>
                <View style={Styles.section4.view1}>
                  
                  {profileShortcuts.slice(0, 10).map((dt, i) => {
                    return (
                      <React.Fragment key={i}>

                            
                  {i!=1 ? (
                    <></>
                  ) : (
                    <Button1
                      onPress={(e) => {
                        setAddShortcut(true)
                      }
                    }
                      isText={true}
                      buttonText={"ADD SHORTCUT"}
                      buttonTextStyle={{
                        color: redColor,
                        textAlign: "center",
                        fontSize: wp(3.2),
                        fontFamily: "OpenSans-Semibold",
                      }}
                      isIcon={true}
                      buttonIcon={plusIcon}
                      buttonIconStyle={{ width: wp(4), height: wp(4) }}
                      tintColor={redColor}
                      buttonContainer={{
                        width: wp(40),
                        height: hp(7.2),
                        borderRadius: hp(3.6),
                      }}
                      buttonInnerContainer={{
                        width: wp(35),
                        height: hp(4.8),
                        borderRadius: hp(2.4),
                      }}
                    />
                  )}

                        <Button1
                          onPress={() =>
                            dt?.workout?.name
                              ? currentWorkoutHandler(dt?.workout)
                              : dt?.screenName === "plateCal"
                              ? setPlateCalcModal(true)
                              : navigate(dt?.screenName)
                          }
                          isText={true}
                          buttonText={
                            dt?.workout?.name
                              ? dt?.workout?.name
                              : dt?.screenName === "plateCal"
                              ? "Plate Calculator"
                              : dt?.screenName === "UserStats"
                              ? "User Stats"
                              : dt?.screenName === "WorkoutScreen"
                              ? "Add Workout"
                              : dt?.screenName === "AddExercise"
                              ? "Add Exercise"
                              : dt?.screenName
                          }
                          buttonTextStyle={{
                            fontSize: wp(3.2),
                            fontFamily: "OpenSans-Semibold",
                          }}
                          isIcon={true}
                          buttonIcon={
                            dt?.workout?.name
                            ? (dt?.workout?.name=='Arm Workout' ?
                            armIcon :
                            dt?.workout?.name=='Leg Workout' ?
                            legIcon :
                            dt?.workout?.name=='Shoulder Workout' ?
                            shoulderIcon :
                            dt?.workout?.name=='Back Workout' ?
                            muscleIcon : chestIcon
                            )
                            : dt?.screenName === "plateCal"
                            ? userSettingsIcon
                            : dt?.screenName === "UserStats"
                            ? userStateIcon
                            : dt?.screenName === "WorkoutScreen"
                            ? plusIcon
                            : dt?.screenName === "AddExercise"
                            ? plusIcon
                            : failedIcon
                          }
                          tintColor={blueColor}
                          buttonContainer={{
                            marginBottom: hp(1.5),
                            width: wp(40),
                            height: hp(7.2),
                            borderRadius: hp(3.6),
                          }}
                          buttonInnerContainer={{
                            width: wp(35),
                            height: hp(4.8),
                            borderRadius: hp(2.4),
                          }}
                        />
                      </React.Fragment>
                    );
                  })}
                </View>
                <View style={Styles.section4.view2.container}>
                  {addShortcut ? (
                    <View style={Styles.section4.view2.innerContainer}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingVertical: hp(1),
                          paddingHorizontal: wp(3),
                          borderBottomColor: "#000",
                          borderBottomWidth: wp(0.6),
                        }}
                      >
                        <Text
                          text="WORKOUTS"
                          textStyle={{ color: blueColor, fontSize: wp(4) }}
                        />
                        <TouchableOpacity onPress={addShortcutHandler}>
                          <ImageComp
                            source={saveIcon}
                            imageStyle={{ width: wp(4.5), height: wp(4.5) }}
                            tintColor={blueColor}
                          />
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          paddingHorizontal: wp(2.5),
                          paddingBottom: hp(1),
                          borderBottomColor: "#000",
                          borderBottomWidth: wp(0.6),
                        }}
                      >
                        <RadioForm formHorizontal={false} animation={true}>
                          {workouts.map((obj, i) => {
                            return (
                              <React.Fragment key={i}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: hp(0.5),
                                  }}
                                >
                                  <Text
                                    text={obj.name}
                                    textStyle={{
                                      fontSize: wp(3),
                                      fontFamily: "OpenSans-Semibold",
                                    }}
                                  />
                                  <RadioButtonComp
                                    obj={obj}
                                    values={value}
                                    i={i}
                                    value={value[i]?.value3Index}
                                    onPress={radioButtonsHandler.bind(
                                      this,
                                      obj,
                                      i
                                    )}
                                    buttonInnerSize={wp(2)}
                                    buttonOuterSize={wp(4.5)}
                                  />
                                </View>
                              </React.Fragment>
                            );
                          })}
                        </RadioForm>
                        <Text
                          text="OTHER"
                          textStyle={{
                            color: blueColor,
                            fontSize: wp(4),
                            marginTop: hp(1.5),
                            fontFamily: "OpenSans-Semibold",
                          }}
                        />
                      </View>

                      <View
                        style={{
                          paddingHorizontal: wp(2.5),
                          paddingBottom: hp(2),
                        }}
                      >
                        <RadioForm formHorizontal={false} animation={true}>
                          {data1.map((obj, i) => {
                            return (
                              <React.Fragment key={i}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: hp(0.5),
                                  }}
                                >
                                  <Text
                                    text={obj.label}
                                    textStyle={{
                                      fontSize: wp(3),
                                      fontFamily: "OpenSans-Semibold",
                                    }}
                                  />
                                  <RadioButtonComp
                                    obj={obj}
                                    i={i}
                                    values={value1}
                                    value={value1[i]?.value3Index}
                                    onPress={otherRadioButtonHandler.bind(
                                      this,
                                      obj,
                                      i
                                    )}
                                    buttonInnerSize={wp(2)}
                                    buttonOuterSize={wp(4.5)}
                                  />
                                </View>
                              </React.Fragment>
                            );
                          })}
                        </RadioForm>
                      </View>
                    </View>
                  ) : (
                    profileShortcuts
                      .slice(11, profileShortcuts[profileShortcuts.length])
                      .map((dt, i) => {
                        return (
                          <React.Fragment key={i}>
                            <Button1
                              onPress={() =>
                                dt?.workout?.name
                                  ? currentWorkoutHandler(dt?.workout)
                                  : dt?.screenName === "plateCal"
                                  ? setPlateCalcModal(true)
                                  : navigate(dt?.screenName)
                              }
                              isText={true}
                              buttonText={
                                dt?.workout?.name
                                  ? dt?.workout?.name
                                  : dt?.screenName === "plateCal"
                                  ? "Plate Calculator"
                                  : dt?.label
                              }
                              buttonTextStyle={{
                                fontSize: wp(3.5),
                                fontFamily: "OpenSans-Semibold",
                              }}
                              isIcon={true}
                              buttonIcon={failedIcon}
                              tintColor={blueColor}
                              buttonContainer={{
                                marginBottom: hp(1.5),
                                width: wp(40),
                                height: hp(7.2),
                                borderRadius: hp(3.6),
                              }}
                              buttonInnerContainer={{
                                width: wp(35),
                                height: hp(4.8),
                                borderRadius: hp(2.4),
                              }}
                            />
                          </React.Fragment>
                        );
                      })
                  )}


                  {/* <Button1
                onPress={() => setAddShortcut(!addShortcut)}
                isText={true}
                buttonText={addShortcut === false ? "ADD SHORTCUT" : "CANCEL"}
                buttonTextStyle={{
                  color: redColor,
                  textAlign: "center",
                  fontSize: wp(3.2),
                  fontFamily: "OpenSans-Semibold",
                }}
                isIcon={addShortcut === false ? true : false}
                buttonIcon={addShortcut === false ? plusIcon : null}
                buttonIconStyle={{ width: wp(4), height: wp(4) }}
                tintColor={redColor}
                buttonContainer={{
                  marginTop: hp(1.5),
                  width: wp(40),
                  height: hp(7.2),
                  borderRadius: hp(3.6),
                }}
                buttonInnerContainer={{
                  width: wp(35),
                  height: hp(4.8),
                  borderRadius: hp(2.4),
                }}
              /> */}
                </View>
              </View>
            </View>
          </ScrollView>
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
                      backgroundColor:
                        plate45 > 0 ? blueColor : backgroundColor1,
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
                      backgroundColor:
                        plate35 > 0 ? blueColor : backgroundColor1,
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
                      backgroundColor:
                        plate25 > 0 ? blueColor : backgroundColor1,
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
                      backgroundColor:
                        plate10 > 0 ? blueColor : backgroundColor1,
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
                      backgroundColor:
                        plate5 > 0 ? blueColor : backgroundColor1,
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

            <TouchableOpacity
              style={{ marginTop: hp(2) }}
              onPress={handleClear}
            >
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

        <DrawerButton onPress={() => openDrawer()} right={0} top={hp(42.5)} />
      </View>
    </TouchableWithoutFeedback>
  );
}
