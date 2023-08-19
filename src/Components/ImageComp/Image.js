import React from "react";
import { Image, Platform } from "react-native";
import { ImageStyle } from "./Styles";
import { blueColor } from "../../Utils/ThemeColors";

export default function ImageComp({
  source,
  imageStyle,
  tintColor,
  resizeMode,
}) {
  return (
    <Image
      source={source}
      style={[ImageStyle.imageStyle, imageStyle, { tintColor: tintColor }]}
      // tintColor={tintColor}
      resizeMode={resizeMode}
    />
  );
}
