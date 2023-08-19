import React from "react";
import { TextInput } from "react-native";
import { Neomorph } from "react-native-neomorph-shadows";
import Image from "../ImageComp/Image";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { backgroundColor1, buttonTextColor } from "../../Utils/ThemeColors";

export default function InputComp({
  viewStyle,
  inputStyle,
  textAlign,
  showIcon,
  placeholderTextColor,
  icon,
  iconStyle,
  iconColor,
  multiline,
  textAlignVertical,
  secureTextEntry,
  value,
  onchange,
  placeholder,
  editable,
  onFocusHandler,
  keyboardType,
  onLastEditing,
  maxLength,
}) {
  return (
    <Neomorph
      inner
      lightShadowColor="#fff"
      style={{
        shadowRadius: 2,
        backgroundColor: backgroundColor1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: wp(5),
        borderRadius: wp(5),
        ...viewStyle,
      }}
    >
      {showIcon && (
        <Image
          source={icon}
          imageStyle={[{ marginRight: wp(2.5) }, iconStyle]}
          tintColor={iconColor}
        />
      )}
      <TextInput
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={onFocusHandler}
        maxLength={maxLength}
        onEndEditing={onLastEditing}
        value={value}
        placeholder={placeholder}
        onChangeText={onchange}
        textAlign={textAlign}
        style={[
          { borderWidth: 0, width: "100%", color: buttonTextColor },
          inputStyle,
        ]}
        placeholderTextColor={placeholderTextColor || buttonTextColor}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        allowFontScaling={false}
        editable={editable}
      />
    </Neomorph>
  );
}
