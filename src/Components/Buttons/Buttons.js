import React from "react";
import { ActivityIndicator, TouchableHighlight, View } from "react-native";
import { Neomorph, NeomorphBlur } from "react-native-neomorph-shadows";
import Text from "../TextComp/Text";
import Image from "../ImageComp/Image";
import {
  backgroundColor1,
  blueColor,
  redColor,
  buttonColor,
  grayColor,
} from "../../Utils/ThemeColors";
import { Button1Style } from "./Styles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

export const Button1 = ({
  isIcon,
  isText,
  buttonContainer,
  buttonInnerContainer,
  tintColor,
  buttonText,
  onPress,
  buttonTextStyle,
  buttonIcon,
  buttonIconStyle,
}) => {
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
          // marginTop:1,
          backgroundColor: buttonColor,
          ...buttonInnerContainer,
        }}
      >
        <TouchableHighlight
          underlayColor="rgba(14, 162, 235, 0.02)"
          activeOpacity={0.1}
          onPress={onPress}
          style={Button1Style.innerView}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              paddingHorizontal: wp(2),
            }}
          >
            {isIcon && (
              <View
                style={{
                  width: isText ? "30%" : "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={buttonIcon}
                  tintColor={tintColor}
                  imageStyle={[
                    { width: wp(3), height: wp(3) },
                    buttonIconStyle,
                  ]}
                />
              </View>
            )}
            {isText && (
              <View
                style={{
                  width: isIcon ? "70%" : "100%",
                  justifyContent: "center",
                  alignItems: isIcon ? "flex-start" : "center",
                }}
              >
                <Text
                  text={buttonText}
                  textStyle={[{ fontSize: wp(4) }, buttonTextStyle]}
                />
              </View>
            )}
          </View>
        </TouchableHighlight>
      </NeomorphBlur>
    </Neomorph>
  );
};

export const Button2 = ({
  isIcon,
  isText,
  isLoading,
  buttonText,
  buttonTextStyle,
  buttonIcon,
  buttonIconStyle,
  buttonContainer,
  onPress,
  buttonInnerContainer,
  tintColor,
  disabled=false
}) => {
  return (
    <View style={buttonContainer}>
      <NeomorphBlur
        style={{
          shadowRadius: 2,
          backgroundColor: buttonColor,
          ...buttonInnerContainer,
        }}
      >
        <TouchableHighlight
          underlayColor="rgba(14, 162, 235, 0.02)"
          activeOpacity={0.1}
          onPress={onPress}
          style={Button1Style.innerView}
          disabled={disabled}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              paddingHorizontal: wp(2),
            }}
          >
            {isIcon && (
              <View
                style={{
                  width: isText ? "30%" : "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={buttonIcon}
                  imageStyle={[
                    { width: wp(5), height: wp(5) },
                    buttonIconStyle,
                  ]}
                  tintColor={tintColor}
                />
              </View>
            )}
            {isText && (
              <View
                style={{
                  width: isIcon ? "70%" : "100%",
                  justifyContent: "center",
                  alignItems: isIcon ? "flex-start" : "center",
                }}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" size={32} />
                ) : (
                  <Text
                    text={buttonText}
                    textStyle={[{ fontSize: wp(4) }, buttonTextStyle]}
                  />
                )}
              </View>
            )}
          </View>
        </TouchableHighlight>
      </NeomorphBlur>
    </View>
  );
};

export const RadioButtonComp = ({
  obj,
  values,
  i,
  value,
  onPress,
  buttonInnerSize,
  buttonOuterSize,
}) => {

  return (
    // <RadioButton labelHorizontal={true} key={i} >
    <RadioButtonInput
      obj={obj}
      index={i}
      isSelected={values?.some((item) => item.value3Index === i)}
      onPress={onPress}
      buttonInnerColor={blueColor}
      buttonOuterColor={grayColor}
      buttonSize={buttonInnerSize}
      buttonOuterSize={buttonOuterSize}
      buttonStyle={{ borderWidth: wp(0.5) }}
      buttonWrapStyle={{ marginLeft: 10, marginTop: hp(0.5) }}
    />

    // </RadioButton>
  );
};

export const RadioButtonExercises = ({
  obj,
  i,
  value,
  onPress,
  buttonInnerSize,
  buttonOuterSize,
}) => {
  return (
    // <RadioButton labelHorizontal={true} key={i} >
    <RadioButtonInput
      obj={obj}
      index={i}
      isSelected={value}
      onPress={onPress}
      buttonInnerColor={redColor}
      buttonOuterColor={grayColor}
      buttonSize={buttonInnerSize}
      buttonOuterSize={buttonOuterSize}
      buttonStyle={{ borderWidth: wp(0.5) }}
      buttonWrapStyle={{ marginLeft: 10, marginTop: hp(0.5) }}
    />

    // </RadioButton>
  );
};
