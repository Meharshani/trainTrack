import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Modal,
} from "react-native";
import { NeomorphFlexView } from "../../Components/NeomorphView/NeomorphView";
import { Button1 } from "../../Components/Buttons/Buttons";
import Text from "../../Components/TextComp/Text";
import Input from "InputComp/Input";
import Dropdown from "Dropdown/Dropdown";
import DrawerButton from "DrawerButton/DrawerButton";
import { useNavigation } from "@react-navigation/native";
import Styles from "./Styles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  circleLogo,
  plusIcon,
  editIcon,
  graphIcon,
  searchIcon,
  deleteIcon,
  backIcon,
} from "../../Utils/ImagesPath";
import ImageComp from "../../Components/ImageComp/Image";
import {
  backgroundColor1,
  blueColor,
  blueColor1,
  borderColor,
  redColor,
} from "../../Utils/ThemeColors";
import {
  getAllMuscleGroup,
  getAllExercises,
  getAllProfiles,
  deleteExercise,
} from "../../realm/index";
import { useSelector, useDispatch } from "react-redux";
import { filteredExercises } from "../../redux/filterexercises";
import { dropdownType, dropdownMuscle } from "../../redux/dropdown";

const arr = [{}, {}, {}];

export default function Exercises({ navigation: { openDrawer, navigate } }) {
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [types, setTypes] = useState(["UNILATERAL", "BILATERAL", "REPS"]);
  const navigation = useNavigation();
  const [searchedExercises, setSearchedExercises] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const filterExerices = useSelector(
    (state) => state.exercises.filteredExercises
  );
  const exerType = useSelector((state) => state.dropdown.exerciseType);

  const dispatch = useDispatch();
  const selectedProfile = useSelector((state) => state.profiles.profile);

  useEffect(() => {
    const muscles = getAllMuscleGroup(selectedProfile?._id);
    setMuscleGroups(muscles);
    const exercises = getAllExercises(selectedProfile?._id);
    dispatch(filteredExercises(exercises));
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const exercises = getAllExercises(selectedProfile?._id);
      dispatch(filteredExercises(exercises));
    });
    return () => unsubscribe;
  }, []);

  //delete exercise
  const deleteExerciseHandler = (exerId) => {
    deleteExercise(exerId);
    const exercises = getAllExercises();
    dispatch(filteredExercises(exercises));
  };

  //search exercise
  const searchExerciseHandler = (text) => {
    setSearchInput(text);
    const textLowerCase = text.toLowerCase();
    const filterExercises = filterExerices.filter((item) =>
      item.name.toLowerCase().includes(textLowerCase)
    );
    setSearchedExercises(filterExercises);
  };

  function getUniqueListBy(arr, key, char) {
    return [
      ...new Map(
        arr.map((item) => [item[key].charAt(0) === char, item])
      ).values(),
    ];
  }

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
                text="EXERCISES"
                textStyle={{ fontSize: wp(5.5), fontFamily: "OpenSans-Bold" }}
              />
            </View>
            <Button1
              onPress={() => {
                dispatch(dropdownMuscle("MUSCLE GROUP"));
                dispatch(dropdownType("EXERCISE TYPE"));
                navigate("AddExercise");
              }}
              isText={true}
              buttonText="ADD EXERCISES"
              buttonTextStyle={{
                color: redColor,
                textAlign: "center",
                fontSize: wp(3.2),
                fontFamily: "OpenSans-Semibold",
              }}
              isIcon={true}
              buttonIcon={plusIcon}
              buttonIconStyle={{ width: wp(3.5), height: wp(3.5) }}
              tintColor={redColor}
              buttonContainer={{
                width: wp(38),
                height: hp(8),
                borderRadius: hp(3.75),
              }}
              buttonInnerContainer={{
                width: wp(34),
                height: hp(6),
                borderRadius: hp(3),
              }}
            />
          </View>
          <View>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <View style={{ width: wp(73) }}>
                <Input
                  showIcon={true}
                  icon={searchIcon}
                  iconStyle={{ width: wp(7), height: wp(7) }}
                  iconColor={blueColor}
                  placeholder="Search"
                  viewStyle={{
                    height: hp(7),
                    borderRadius: hp(3.75),
                    borderBottomWidth: 1,
                    borderBottomColor: borderColor,
                    paddingHorizontal: wp(12),
                  }}
                  value={searchInput}
                  onchange={(text) => searchExerciseHandler(text)}
                  inputStyle={{
                    fontSize: wp(4),
                    fontFamily: "OpenSans-Semibold",
                  }}
                />
              </View>

              <Button1
                onPress={() => navigation.navigate("UserShortCuts")}
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

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: hp(2),
              }}
            >
              <Button1
                onPress={() => {
                  const exercises = getAllExercises(selectedProfile?._id);
                  dispatch(filteredExercises(exercises));
                }}
                buttonText="ALPHABETICAL"
                isText={true}
                buttonIcon={backIcon}
                tintColor={blueColor}
                buttonContainer={{
                  width: wp(30),
                  height: hp(7),
                  borderRadius: hp(3.5),
                }}
                buttonInnerContainer={{
                  width: wp(26),
                  height: hp(5),
                  borderRadius: hp(2.5),
                }}
                buttonTextStyle={{
                  fontSize: wp(2.9),
                  color: blueColor,
                  fontFamily: "OpenSans-Semibold",
                }}
              />

              <Dropdown
                options={types}
                buttonText="EXERCISE TYPE"
                buttonContainer={{
                  width: wp(30),
                  height: hp(7),
                  borderRadius: hp(3.5),
                }}
                buttonInnerContainer={{
                  width: wp(26),
                  height: hp(5),
                  borderRadius: hp(2.5),
                }}
                heightmin={20}
                screen="exercise"
                profile={selectedProfile}
                muscleGroups={muscleGroups}
                dropdownStyle={{
                  marginLeft: -wp(4),
                }}
              />

              <Dropdown
                options={muscleGroups.map((items) => items.name)}
                buttonText="MUSCLE GROUP"
                buttonContainer={{
                  width: wp(30),
                  height: hp(7),
                  borderRadius: hp(3.5),
                }}
                buttonInnerContainer={{
                  width: wp(26),
                  height: hp(5),
                  borderRadius: hp(2.5),
                }}
                heightmin={30}
                screen="exercise"
                profile={selectedProfile}
                muscleGroups={muscleGroups}
                dropdownStyle={{ marginRight: -wp(3) }}
              />
            </View>
          </View>
          <View style={Styles.section2.container}>
            {searchedExercises.length === 0
              ? Array.from(filterExerices)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .filter(
                    (v, i, a) =>
                      a.findIndex(
                        (v2) => v2.name.charAt(0) === v.name.charAt(0)
                      ) === i
                  )
                  .map((item, i) => {
                    return (
                      <View
                        style={{
                          shadowRadius: 1.5,
                          backgroundColor: backgroundColor1,
                          justifyContent: "center",
                          alignItems: "center",
                          paddingBottom: 10,
                          marginTop: hp(1),
                          borderRadius: 15,
                        }}
                        key={i}
                      >
                        <View
                          style={{
                            width: wp(7.5),
                            height: wp(7.5),
                            borderRadius: wp(3.75),
                            backgroundColor: blueColor,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "flex-start",
                          }}
                        >
                          <Text
                            text={item?.name?.charAt(0).toUpperCase()}
                            textStyle={{ fontSize: wp(5.5), color: "white" }}
                          />
                        </View>

                        {filterExerices
                          .filter(
                            (items) =>
                              items.name.charAt(0) === item.name.charAt(0)
                          )
                          .map((innerItem, index) => (
                            <View
                              key={index}
                              style={{
                                paddingTop: wp(2),
                                paddingBottom: wp(2),
                                paddingHorizontal: wp(5),
                                width: "90%",
                                borderBottomWidth:
                                  index ===
                                  filterExerices.filter(
                                    (items) =>
                                      items.name.charAt(0) ===
                                      item.name.charAt(0)
                                  ).length -
                                    1
                                    ? 0
                                    : hp(0.1),
                                borderBottomColor: "black",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <View>
                                <Text
                                  text={innerItem?.name}
                                  textStyle={{
                                    fontSize: wp(3.5),
                                    fontFamily: "OpenSans-Semibold",
                                  }}
                                />
                                <Text
                                  text={innerItem?.muscleGroup?.name}
                                  textStyle={{
                                    fontSize: wp(3),
                                    fontFamily: "OpenSans",
                                  }}
                                />
                              </View>

                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <TouchableOpacity
                                  style={{ marginRight: wp(3) }}
                                  onPress={() => {
                                    dispatch(
                                      dropdownMuscle(innerItem.muscleGroup.name)
                                    );
                                    dispatch(dropdownType(innerItem.type));
                                    navigate("AddExercise", {
                                      exercise: innerItem,
                                      openDrawer,
                                    });
                                  }}
                                >
                                  <ImageComp
                                    source={editIcon}
                                    imageStyle={{
                                      width: wp(5),
                                      height: wp(5),
                                    }}
                                    tintColor={blueColor}
                                  />
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={{ marginRight: wp(3) }}
                                  onPress={() => {
                                    deleteExerciseHandler(innerItem._id);
                                  }}
                                >
                                  <ImageComp
                                    source={deleteIcon}
                                    imageStyle={{
                                      width: wp(6.5),
                                      height: wp(6.5),
                                    }}
                                    tintColor={redColor}
                                  />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                  <ImageComp
                                    source={graphIcon}
                                    imageStyle={{
                                      width: wp(5),
                                      height: wp(5),
                                    }}
                                    tintColor={redColor}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          ))}
                      </View>
                    );
                  })
              : Array.from(searchedExercises)
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .filter(
                    (v, i, a) =>
                      a.findIndex(
                        (v2) => v2.name.charAt(0) === v.name.charAt(0)
                      ) === i
                  )
                  .map((item, i) => {
                    return (
                      <View
                        style={{
                          shadowRadius: 1.5,
                          backgroundColor: backgroundColor1,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 12,
                          paddingBottom: 10,
                          marginTop: hp(1),
                        }}
                        key={i}
                      >
                        <View
                          style={{
                            width: wp(7.5),
                            height: wp(7.5),
                            borderRadius: wp(3.75),
                            backgroundColor: blueColor,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "flex-start",
                          }}
                        >
                          <Text
                            text={item?.name?.charAt(0).toUpperCase()}
                            textStyle={{ fontSize: wp(5.5), color: "white" }}
                          />
                        </View>

                        {filterExerices
                          .filter(
                            (items) =>
                              items.name.charAt(0) === item.name.charAt(0)
                          )
                          .map((innerItem, index) => (
                            <View
                              key={index}
                              style={{
                                paddingTop: wp(2),
                                paddingBottom: wp(2),
                                paddingHorizontal: wp(5),
                                width: "90%",
                                borderBottomWidth:
                                  index ===
                                  filterExerices.filter(
                                    (items) =>
                                      items.name.charAt(0) ===
                                      item.name.charAt(0)
                                  ).length -
                                    1
                                    ? 0
                                    : hp(0.1),
                                borderBottomColor: "black",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <View>
                                <Text
                                  text={innerItem?.name}
                                  textStyle={{
                                    fontSize: wp(3.5),
                                    fontFamily: "OpenSans-Semibold",
                                  }}
                                />
                                <Text
                                  text={innerItem?.muscleGroup?.name}
                                  textStyle={{
                                    fontSize: wp(3),
                                    fontFamily: "OpenSans",
                                  }}
                                />
                              </View>

                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <TouchableOpacity
                                  style={{ marginRight: wp(3) }}
                                  onPress={() => {
                                    dispatch(
                                      dropdownMuscle(innerItem.muscleGroup.name)
                                    );
                                    dispatch(dropdownType(innerItem.type));
                                    navigate("AddExercise", {
                                      exercise: innerItem,
                                    });
                                  }}
                                >
                                  <ImageComp
                                    source={editIcon}
                                    imageStyle={{ width: wp(5), height: wp(5) }}
                                    tintColor={blueColor}
                                  />
                                </TouchableOpacity>
                                <TouchableOpacity
                                  style={{ marginRight: wp(3) }}
                                  onPress={() => {
                                    deleteExerciseHandler(innerItem._id);
                                  }}
                                >
                                  <ImageComp
                                    source={deleteIcon}
                                    tintColor={redColor}
                                    imageStyle={{ width: wp(7), height: wp(7) }}
                                  />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                  <ImageComp
                                    source={graphIcon}
                                    imageStyle={{ width: wp(5), height: wp(5) }}
                                    tintColor={redColor}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          ))}
                      </View>
                    );
                  })}
          </View>
        </ScrollView>
        {/* <Modal transparent visible={modal}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            <NeomorphFlexView
              viewStyle={{
                width: wp("80%"),
                height: wp("50%"),
                borderRadius: 7,
                padding: 15,
              }}
            >
              <ImageComp
                source={deleteIcon}
                imageStyle={{
                  width: wp(10),
                  height: wp(10),
                  marginBottom: wp(3),
                }}
              />
              <Text
                text={"Do you want to delete this?"}
                textStyle={{ fontSize: wp(4.5), color: "white" }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-around",
                  marginTop: wp(6),
                }}
              >
                <TouchableOpacity onPress={() => setModal(false)}>
                  <View
                    style={{
                      borderColor: blueColor1,
                      borderWidth: 2,
                      borderRadius: 7,
                      width: wp(20),
                      alignItems: "center",
                      justifyContent: "center",
                      height: wp(10),
                    }}
                  >
                    <Text
                      text={"No"}
                      textStyle={{ fontSize: wp(4.5), color: "white" }}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={deleteExerciseHandler}>
                  <View
                    style={{
                      borderColor: redColor,
                      borderWidth: 2,
                      borderRadius: 7,
                      width: wp(30),
                      alignItems: "center",
                      justifyContent: "center",
                      height: wp(10),
                    }}
                  >
                    <Text
                      text={"Yes, Delete"}
                      textStyle={{ fontSize: wp(4.5), color: "white" }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </NeomorphFlexView>
          </View>
        </Modal> */}
      </SafeAreaView>
      <DrawerButton onPress={() => openDrawer()} right={0} top={hp(42.5)} />
    </View>
  );
}


// import React, { useEffect, useState } from "react";
// import {
//   View,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   Alert,
//   Modal,
// } from "react-native";
// import { NeomorphFlexView } from "../../Components/NeomorphView/NeomorphView";
// import { Button1 } from "../../Components/Buttons/Buttons";
// import Text from "../../Components/TextComp/Text";
// import Input from "InputComp/Input";
// import Dropdown from "Dropdown/Dropdown";
// import DrawerButton from "DrawerButton/DrawerButton";
// import { useNavigation } from "@react-navigation/native";
// import Styles from "./Styles";
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from "react-native-responsive-screen";
// import {
//   circleLogo,
//   plusIcon,
//   editIcon,
//   graphIcon,
//   searchIcon,
//   deleteIcon,
//   backIcon,
// } from "../../Utils/ImagesPath";
// import ImageComp from "../../Components/ImageComp/Image";
// import {
//   backgroundColor1,
//   blueColor,
//   blueColor1,
//   borderColor,
//   redColor,
// } from "../../Utils/ThemeColors";
// import realm,{
//   getAllMuscleGroup,
//   getAllExercises,
//   getAllProfiles,
//   deleteExercise,
//   addExercise,
// } from "../../realm/index";
// import { useSelector, useDispatch } from "react-redux";
// import { filteredExercises } from "../../redux/filterexercises";
// import { dropdownType, dropdownMuscle } from "../../redux/dropdown";
// import { useRoute } from "@react-navigation/native";
// import { workoutExs } from "../../redux/workoutexercises";

// const arr = [{}, {}, {}];

// export default function Exercises({ navigation: { goBack,openDrawer, navigate } }) {
//   const [muscleGroups, setMuscleGroups] = useState([]);
//   const [types, setTypes] = useState(["UNILATERAL", "BILATERAL", "REPS"]);
//   const navigation = useNavigation();
//   const [searchedExercises, setSearchedExercises] = useState([]);
//   const [searchInput, setSearchInput] = useState("");
//   const filterExerices = useSelector(
//     (state) => state.exercises.filteredExercises
//   );
//   const exerType = useSelector((state) => state.dropdown.exerciseType);
//   const { params } = useRoute();
//   const dispatch = useDispatch();
//   const selectedProfile = useSelector((state) => state.profiles.profile);

//   useEffect(() => {
//     const muscles = getAllMuscleGroup(selectedProfile?._id);
//     setMuscleGroups(muscles);
//     const exercises = getAllExercises(selectedProfile?._id);
//     console.log('exercisesss ---> ',exercises)
//     dispatch(filteredExercises(exercises));
//   }, []);

//   useEffect(() => {
//     const unsubscribe = navigation.addListener("focus", () => {
//       const exercises = getAllExercises(selectedProfile?._id);
//       dispatch(filteredExercises(exercises));
//     });
//     return () => unsubscribe;
//   }, []);

//   //delete exercise
//   const deleteExerciseHandler = (exerId) => {
//     deleteExercise(exerId);
//     const exercises = getAllExercises();
//     dispatch(filteredExercises(exercises));
//   };

//   //search exercise
//   const searchExerciseHandler = (text) => {
//     setSearchInput(text);
//     const textLowerCase = text.toLowerCase();
//     const filterExercises = filterExerices.filter((item) =>{
//       var ww = item.name.toLowerCase().includes(textLowerCase)
//       return ww;
//     }
//     );
//     setSearchedExercises(filterExercises);
//   };

//   function getUniqueListBy(arr, key, char) {
//     return [
//       ...new Map(
//         arr.map((item) => [item[key].charAt(0) === char, item])
//       ).values(),
//     ];
//   }

//   // add workout handler
//   const handleAddWorkout =(item)=>{
//   //  var  _id = realm.objects("exercise").max("_id") + 1;
//   //  var {_id,muscleGroup,notes,profile,type,name} = item;
//   //  addExercise(
//   //   name,
//   //   notes,
//   //   type,
//   //   muscleGroup,
//   //   _id,
//   //   profile
//   // );
//   // dispatch(workoutExs([...params.workout.exercises,
//   //   {_id, createdDate:new Date() , muscleGroup, name, notes, profile, type}
//   // ]));

//   navigate("WorkoutDetailScreen", {
//     workout: params.workout,
//     item
//   });

//   }

//   return (
//     <View style={Styles.containerStyle}>
//       <SafeAreaView>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingVertical: hp(2) }}
//         >
//           <View style={Styles.header.container}>
//             <View style={Styles.header.innerContainer}>
//               <NeomorphFlexView viewStyle={Styles.header.logoContainer}>
//                 <ImageComp
//                   source={circleLogo}
//                   imageStyle={{
//                     resizeMode: "contain",
//                     width: wp(12),
//                     height: wp(12),
//                   }}
//                 />
//               </NeomorphFlexView>
//               <Text
//                 text="EXERCISES"
//                 textStyle={{ fontSize: wp(5.5), fontFamily: "OpenSans-Bold" }}
//               />
//             </View>
//             <Button1
//               onPress={() => {
//                 dispatch(dropdownMuscle("MUSCLE GROUP"));
//                 dispatch(dropdownType("EXERCISE TYPE"));
//                 navigate("AddExercise");
//               }}
//               isText={true}
//               buttonText="ADD EXERCISES"
//               buttonTextStyle={{
//                 color: redColor,
//                 textAlign: "center",
//                 fontSize: wp(3.2),
//                 fontFamily: "OpenSans-Semibold",
//               }}
//               isIcon={true}
//               buttonIcon={plusIcon}
//               buttonIconStyle={{ width: wp(3.5), height: wp(3.5) }}
//               tintColor={redColor}
//               buttonContainer={{
//                 width: wp(38),
//                 height: hp(8),
//                 borderRadius: hp(3.75),
//               }}
//               buttonInnerContainer={{
//                 width: wp(34),
//                 height: hp(6),
//                 borderRadius: hp(3),
//               }}
//             />
//           </View>
//           <View>
//             <View style={{ alignItems: "center", flexDirection: "row" }}>
//               <View style={{ width: wp(73) }}>
//                 <Input
//                   showIcon={true}
//                   icon={searchIcon}
//                   iconStyle={{ width: wp(7), height: wp(7) }}
//                   iconColor={blueColor}
//                   placeholder="Search"
//                   viewStyle={{
//                     height: hp(7),
//                     borderRadius: hp(3.75),
//                     borderBottomWidth: 1,
//                     borderBottomColor: borderColor,
//                     paddingHorizontal: wp(12),
//                   }}
//                   value={searchInput}
//                   onchange={(text) => searchExerciseHandler(text)}
//                   inputStyle={{
//                     fontSize: wp(4),
//                     fontFamily: "OpenSans-Semibold",
//                   }}
//                 />
//               </View>

//               <Button1
//                 onPress={() => navigation.navigate("UserShortCuts")}
//                 buttonText=""
//                 isIcon={true}
//                 isText={false}
//                 buttonIcon={backIcon}
//                 tintColor={blueColor}
//                 buttonContainer={{
//                   width: wp(14),
//                   height: wp(14),
//                   marginLeft: wp(3),
//                   borderRadius: wp(7),
//                 }}
//                 buttonInnerContainer={{
//                   width: wp(10),
//                   height: wp(10),
//                   borderRadius: wp(5),
//                 }}
//               />
//             </View>

//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 marginTop: hp(2),
//               }}
//             >
//               <Button1
//                 onPress={() => {
//                   const exercises = getAllExercises(selectedProfile?._id);
//                   dispatch(filteredExercises(exercises));
//                 }}
//                 buttonText="ALPHABETICAL"
//                 isText={true}
//                 buttonIcon={backIcon}
//                 tintColor={blueColor}
//                 buttonContainer={{
//                   width: wp(30),
//                   height: hp(7),
//                   borderRadius: hp(3.5),
//                 }}
//                 buttonInnerContainer={{
//                   width: wp(26),
//                   height: hp(5),
//                   borderRadius: hp(2.5),
//                 }}
//                 buttonTextStyle={{
//                   fontSize: wp(2.9),
//                   color: blueColor,
//                   fontFamily: "OpenSans-Semibold",
//                 }}
//               />

//               <Dropdown
//                 options={types}
//                 buttonText="EXERCISE TYPE"
//                 buttonContainer={{
//                   width: wp(30),
//                   height: hp(7),
//                   borderRadius: hp(3.5),
//                 }}
//                 buttonInnerContainer={{
//                   width: wp(26),
//                   height: hp(5),
//                   borderRadius: hp(2.5),
//                 }}
//                 heightmin={20}
//                 screen="exercise"
//                 profile={selectedProfile}
//                 muscleGroups={muscleGroups}
//                 dropdownStyle={{
//                   marginLeft: -wp(4),
//                   borderColor:'#23262a',
//                   maxHeight:hp(18),
//                 }}
//               />

//               <Dropdown
//                 options={muscleGroups.map((items) => items.name)}
//                 buttonText="MUSCLE GROUP"
//                 buttonContainer={{
//                   width: wp(30),
//                   height: hp(7),
//                   borderRadius: hp(3.5),
//                 }}
//                 buttonInnerContainer={{
//                   width: wp(26),
//                   height: hp(5),
//                   borderRadius: hp(2.5),
//                 }}
//                 heightmin={20}
//                 screen="exercise"
//                 profile={selectedProfile}
//                 muscleGroups={muscleGroups}
//                 dropdownStyle={{ marginRight: -wp(3),
//                   borderColor:'#23262a',
//                   maxHeight:hp(22) }}
//               />
//             </View>
//           </View>
//           <View style={Styles.section2.container}>
//             {searchedExercises.length === 0
//               ? Array.from(filterExerices)
//                   .sort((a, b) => a.name.localeCompare(b.name))
//                   .filter(
//                     (v, i, a) =>
//                       a.findIndex(
//                         (v2) => v2.name.charAt(0) === v.name.charAt(0)
//                       ) === i
//                   )
//                   .map((item, i) => {
//                     return (
//                       <View
//                         style={{
//                           shadowRadius: 1.5,
//                           backgroundColor: backgroundColor1,
//                           justifyContent: "center",
//                           alignItems: "center",
//                           paddingBottom: 10,
//                           marginTop: hp(1),
//                           borderRadius: 15,
//                         }}
//                         key={i}
//                       >
//                         <View
//                           style={{
//                             width: wp(7.5),
//                             height: wp(7.5),
//                             borderRadius: wp(3.75),
//                             backgroundColor: blueColor,
//                             justifyContent: "center",
//                             alignItems: "center",
//                             alignSelf: "flex-start",
//                           }}
//                         >
//                           <Text
//                             text={item?.name?.charAt(0).toUpperCase()}
//                             textStyle={{ fontSize: wp(5.5), color: "white" }}
//                           />
//                         </View>

//                         {filterExerices
//                           .filter(
//                             (items) =>
//                               items.name.charAt(0) === item.name.charAt(0)
//                           )
//                           .map((innerItem, index) => (
//                             <View
//                               key={index}
//                               style={{
//                                 paddingTop: wp(2),
//                                 paddingBottom: wp(2),
//                                 paddingHorizontal: wp(5),
//                                 width: "90%",
//                                 borderBottomWidth:
//                                   index ===
//                                   filterExerices.filter(
//                                     (items) =>
//                                       items.name.charAt(0) ===
//                                       item.name.charAt(0)
//                                   ).length -
//                                     1
//                                     ? 0
//                                     : hp(0.1),
//                                 borderBottomColor: "black",
//                                 flexDirection: "row",
//                                 justifyContent: "space-between",
//                               }}
//                             >
//                               <View>
//                                 <Text
//                                   // text={'true'}
//                                   text={innerItem?.name}
//                                   textStyle={{
//                                     fontSize: wp(3.5),
//                                     fontFamily: "OpenSans-Semibold",
//                                   }}
//                                 />
//                                 <Text
//                                   text={innerItem?.muscleGroup?.name}
//                                   textStyle={{
//                                     fontSize: wp(3),
//                                     fontFamily: "OpenSans",
//                                   }}
//                                 />
//                               </View>

//                                 {
//                                   !params?.workout &&
//                                   <View
//                                   style={{
//                                     flexDirection: "row",
//                                     alignItems: "center",
//                                   }}
//                                 >
//                                 <TouchableOpacity
//                                   style={{ marginRight: wp(3) }}
//                                   onPress={() => {
//                                     dispatch(
//                                       dropdownMuscle(innerItem.muscleGroup.name)
//                                     );
//                                     dispatch(dropdownType(innerItem.type));
//                                     navigate("AddExercise", {
//                                       exercise: innerItem,
//                                       openDrawer,
//                                     });
//                                   }}
//                                 >
//                                   <ImageComp
//                                     source={editIcon}
//                                     imageStyle={{
//                                       width: wp(5),
//                                       height: wp(5),
//                                     }}
//                                     tintColor={blueColor}
//                                   />
//                                 </TouchableOpacity>
//                                 <TouchableOpacity
//                                   style={{ marginRight: wp(3) }}
//                                   onPress={() => {
//                                     deleteExerciseHandler(innerItem._id);
//                                   }}
//                                 >
//                                   <ImageComp
//                                     source={deleteIcon}
//                                     imageStyle={{
//                                       width: wp(6.5),
//                                       height: wp(6.5),
//                                     }}
//                                     tintColor={redColor}
//                                   />
//                                 </TouchableOpacity>
//                                 <TouchableOpacity>
//                                   <ImageComp
//                                     source={graphIcon}
//                                     imageStyle={{
//                                       width: wp(5),
//                                       height: wp(5),
//                                     }}
//                                     tintColor={redColor}
//                                   />
//                                 </TouchableOpacity>
//                               </View>
//                                   }

// {
//   params.workout &&  
//   <View>
//                                     <TouchableOpacity
//                                   style={{ marginRight: wp(3) }}
//                                   onPress={()=>handleAddWorkout(innerItem)}>
//                                   <ImageComp
//                                     source={editIcon}
//                                     imageStyle={{
//                                       width: wp(5),
//                                       height: wp(5),
//                                     }}
//                                     tintColor={blueColor}
//                                   />
//                                 </TouchableOpacity>
//   </View>
// }
//                             </View>
//                           ))}
//                       </View>
//                     );
//                   })
//               : Array.from(searchedExercises)
//                   .sort((a, b) => a.name.localeCompare(b.name))
//                   .filter(
//                     (v, i, a) =>
//                       a.findIndex(
//                         (v2) => v2.name.charAt(0) === v.name.charAt(0)
//                       ) === i
//                   )
//                   .map((item, i) => {
//                     return (
//                       <View
//                         style={{
//                           shadowRadius: 1.5,
//                           backgroundColor: backgroundColor1,
//                           justifyContent: "center",
//                           alignItems: "center",
//                           borderRadius: 12,
//                           paddingBottom: 10,
//                           marginTop: hp(1),
//                         }}
//                         key={i}
//                       >
//                         <View
//                           style={{
//                             width: wp(7.5),
//                             height: wp(7.5),
//                             borderRadius: wp(3.75),
//                             backgroundColor: blueColor,
//                             justifyContent: "center",
//                             alignItems: "center",
//                             alignSelf: "flex-start",
//                           }}
//                         >
//                           <Text
//                             text={item?.name?.charAt(0).toUpperCase()}
//                             textStyle={{ fontSize: wp(5.5), color: "white" }}
//                           />
//                         </View>

//                         {filterExerices
//                           .filter(
//                             (items) =>
//                               items.name.charAt(0) === item.name.charAt(0)
//                           )
//                           .map((innerItem, index) => (
//                             <View
//                               key={index}
//                               style={{
//                                 paddingTop: wp(2),
//                                 paddingBottom: wp(2),
//                                 paddingHorizontal: wp(5),
//                                 width: "90%",
//                                 borderBottomWidth:
//                                   index ===
//                                   filterExerices.filter(
//                                     (items) =>
//                                       items.name.charAt(0) ===
//                                       item.name.charAt(0)
//                                   ).length -
//                                     1
//                                     ? 0
//                                     : hp(0.1),
//                                 borderBottomColor: "black",
//                                 flexDirection: "row",
//                                 justifyContent: "space-between",
//                               }}
//                             >
//                               <View>
//                                 <Text
//                                   text={innerItem?.name}
//                                   textStyle={{
//                                     fontSize: wp(3.5),
//                                     fontFamily: "OpenSans-Semibold",
//                                   }}
//                                 />
//                                 <Text
//                                   text={innerItem?.muscleGroup?.name}
//                                   textStyle={{
//                                     fontSize: wp(3),
//                                     fontFamily: "OpenSans",
//                                   }}
//                                 />
//                               </View>

//                               <View
//                                 style={{
//                                   flexDirection: "row",
//                                   alignItems: "center",
//                                 }}
//                               >
//                                 <TouchableOpacity
//                                   style={{ marginRight: wp(3) }}
//                                   onPress={() => {
//                                     dispatch(
//                                       dropdownMuscle(innerItem.muscleGroup.name)
//                                     );
//                                     dispatch(dropdownType(innerItem.type));
//                                     navigate("AddExercise", {
//                                       exercise: innerItem,
//                                     });
//                                   }}
//                                 >
//                                   <ImageComp
//                                     source={editIcon}
//                                     imageStyle={{ width: wp(5), height: wp(5) }}
//                                     tintColor={blueColor}
//                                   />
//                                 </TouchableOpacity>
//                                 <TouchableOpacity
//                                   style={{ marginRight: wp(3) }}
//                                   onPress={() => {
//                                     deleteExerciseHandler(innerItem._id);
//                                   }}
//                                 >
//                                   <ImageComp
//                                     source={deleteIcon}
//                                     tintColor={redColor}
//                                     imageStyle={{ width: wp(7), height: wp(7) }}
//                                   />
//                                 </TouchableOpacity>
//                                 <TouchableOpacity>
//                                   <ImageComp
//                                     source={graphIcon}
//                                     imageStyle={{ width: wp(5), height: wp(5) }}
//                                     tintColor={redColor}
//                                   />
//                                 </TouchableOpacity>
//                               </View>
//                             </View>
//                           ))}
//                       </View>
//                     );
//                   })}
//           </View>
//         </ScrollView>
//         {/* <Modal transparent visible={modal}>
//           <View
//             style={{
//               flex: 1,
//               justifyContent: "center",
//               alignItems: "center",
//               backgroundColor: "rgba(0,0,0,0.3)",
//             }}
//           >
//             <NeomorphFlexView
//               viewStyle={{
//                 width: wp("80%"),
//                 height: wp("50%"),
//                 borderRadius: 7,
//                 padding: 15,
//               }}
//             >
//               <ImageComp
//                 source={deleteIcon}
//                 imageStyle={{
//                   width: wp(10),
//                   height: wp(10),
//                   marginBottom: wp(3),
//                 }}
//               />
//               <Text
//                 text={"Do you want to delete this?"}
//                 textStyle={{ fontSize: wp(4.5), color: "white" }}
//               />
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   width: "100%",
//                   justifyContent: "space-around",
//                   marginTop: wp(6),
//                 }}
//               >
//                 <TouchableOpacity onPress={() => setModal(false)}>
//                   <View
//                     style={{
//                       borderColor: blueColor1,
//                       borderWidth: 2,
//                       borderRadius: 7,
//                       width: wp(20),
//                       alignItems: "center",
//                       justifyContent: "center",
//                       height: wp(10),
//                     }}
//                   >
//                     <Text
//                       text={"No"}
//                       textStyle={{ fontSize: wp(4.5), color: "white" }}
//                     />
//                   </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={deleteExerciseHandler}>
//                   <View
//                     style={{
//                       borderColor: redColor,
//                       borderWidth: 2,
//                       borderRadius: 7,
//                       width: wp(30),
//                       alignItems: "center",
//                       justifyContent: "center",
//                       height: wp(10),
//                     }}
//                   >
//                     <Text
//                       text={"Yes, Delete"}
//                       textStyle={{ fontSize: wp(4.5), color: "white" }}
//                     />
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             </NeomorphFlexView>
//           </View>
//         </Modal> */}
//       </SafeAreaView>
//       <DrawerButton onPress={() => openDrawer()} right={0} top={hp(42.5)} />
//     </View>
//   );
// }