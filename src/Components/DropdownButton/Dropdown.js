import React, { useImperativeHandle,useRef, forwardRef, useState } from "react";
import { Alert, View } from "react-native";
import Text from "../TextComp/Text";
import { Neomorph, NeomorphBlur } from "react-native-neomorph-shadows";
import {
  backgroundColor,
  backgroundColor1,
  blueColor,
  buttonColor,
} from "../../Utils/ThemeColors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ModalDropdown from "react-native-modal-dropdown";
import { NeomorphView } from "../NeomorphView/NeomorphView";
import { useDispatch, useSelector } from "react-redux";
import { dropdownType, dropdownMuscle } from "../../redux/dropdown";
import {
  filterExerciseByMuscle,
  filterExerciseByType,
} from "../../realm/index";
import { filteredExercises } from "../../redux/filterexercises";

const DropdownButton = (props) => {
  const {
    buttonContainer,
    buttonInnerContainer,
    options,
    buttonText,
    dropdownStyle,
    heightmin,
    profile,
    muscleGroups,
    screen,
  } = props;

  const dispatch = useDispatch();
  const exerType = useSelector((state) => state.dropdown.exerciseType);
  const muscle = useSelector((state) => state.dropdown.exerciseMuscle);


  //onSelect handler
  const onSelectHandler = (index, option) => {
    // console.log('option ',option)
    if (buttonText === "EXERCISE TYPE" || buttonText === exerType) {
      dispatch(dropdownType(index));
      const filter = filterExerciseByType(index, profile?._id);
      dispatch(filteredExercises([...filter]));
    } else if (buttonText === "MUSCLE GROUP" || buttonText === muscle) {
      dispatch(dropdownMuscle(option));
      const filterMuscle = muscleGroups.find((items) => items.name == option);
      const filter = filterExerciseByMuscle(filterMuscle?._id, profile?._id);
      dispatch(filteredExercises([...filter]));
    } else {
      const filter = filterExerciseByType(index, profile?._id);
      dispatch(filteredExercises([...filter]));
    }
  };


  const dropdownComp = (rowData, rowID, highlighted) => {
    return (
      <NeomorphView
        viewStyle={{
          marginBottom: hp(0.8),
          marginTop: hp(0.6),
          width: wp(24),
          paddingVertical: hp(0.8),
          borderRadius: hp(2),
        }}
      >
        <Text
          text={rowData}
          textStyle={{
            color: blueColor,
            fontSize: screen === "exercise" ? wp(2.9) : wp(3.4),
            fontFamily: "OpenSans-Semibold",
          }}
        />
      </NeomorphView>
    );
  };

  return (
    <Neomorph
      inner
      style={{
        shadowRadius: 4,
        backgroundColor: backgroundColor1,
        justifyContent: "center",
        alignItems: "center",
        ...buttonContainer,
      }}
    >
      <NeomorphBlur
        style={{
          shadowRadius: 2,
          backgroundColor: buttonColor,
          ...buttonInnerContainer,
          display:'flex',
          justifyContent:'center',
          alignItems:'center'

        }}
      >
        <Text text={buttonText} textStyle={{
          color:blueColor,fontSize: screen === "exercise" ? wp(2.9) : wp(3.4),position:'absolute',
          fontFamily: "OpenSans-Semibold",
      }} />
        <ModalDropdown
          onSelect={(index, option) => {
            onSelectHandler(index, option);
          }}
          options={options}
          isFullWidth={false}
          showsVerticalScrollIndicator={false}
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          textStyle={{
            fontSize: screen === "exercise" ? wp(2.9) : wp(3.4),
            color: 'transparent',
            fontFamily: "OpenSans-Semibold",
          }}
          renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => (
            <View style={{ backgroundColor: "red" }} />
          )}
          dropdownStyle={{
            position: "absolute",
            backgroundColor: backgroundColor,
            borderWidth: 1,
            width: screen === "exercise" ? wp(28) : wp(40),
            borderColor: "#373737",
            alignItems: "center",
            marginTop: wp(6),
            borderRadius: hp(2),
            paddingHorizontal: wp(1),
            paddingVertical: hp(1),
            minHeight: hp(heightmin),
            ...dropdownStyle,
          }}
          defaultValue={buttonText}
          // renderButtonText={(text)=><Text text={text} textStyle={{fontSize:wp(3.5),color:blueColor,fontFamily:'OpenSans-Semibold'}} />}
          renderRow={dropdownComp}
          dropdownListProps={{}}
        />
      </NeomorphBlur>
    </Neomorph>
  );
};

export default DropdownButton;
