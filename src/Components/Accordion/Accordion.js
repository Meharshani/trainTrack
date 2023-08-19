import React, { useState, useRef, useEffect } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { View, Animated, TouchableOpacity, Text } from "react-native";
import Header from "./Header";
import Styles from "./Styles";
import Body from "./Body";
import ImageComp from "../ImageComp/Image";
import { plusIcon, minusIcon } from "../../Utils/ImagesPath";

export default function Accordion({
  headerComp,
  bodyComp,
  openIcon,
  closeIcon,
  initialKey,
  defaultOpen,
}) {
  const [isOpen, setIsOpen] = useState(
    initialKey + 1 == defaultOpen ? true : false
  );
  const animatedView = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.timing(animatedView, {
        toValue: hp(30),
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedView, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isOpen]);

  return (
    <View style={Styles.accordionContainer}>
      <Header>
        <View style={Styles.headerView1}>{headerComp}</View>
        <View style={Styles.headerView2}>
          {isOpen ? (
            <TouchableOpacity
              style={Styles.headerButton}
              onPress={() => setIsOpen(false)}
            >
              <ImageComp
                source={minusIcon}
                imageStyle={{ width: wp(2.5), height: wp(2.5) }}
                tintColor="white"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={Styles.headerButton}
              onPress={() => setIsOpen(true)}
            >
              <ImageComp
                source={plusIcon}
                imageStyle={{ width: wp(2.5), height: wp(2.5) }}
                tintColor="white"
              />
            </TouchableOpacity>
          )}
        </View>
      </Header>
      <Body
        height={
          isOpen || (isOpen && initialKey + 1 == defaultOpen) ? "auto" : 0
        }
      >
        {bodyComp}
      </Body>
    </View>
  );
}
