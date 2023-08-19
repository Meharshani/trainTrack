import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { backgroundColor1, blueColor1 } from "../../Utils/ThemeColors";
import { NeomorphView } from "../NeomorphView/NeomorphView";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import TextComp from "../TextComp/Text";
import Styles from "./Styles";

export default function DayComponent({ date }) {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <TouchableOpacity onPress={() => setSelectedDate(date?.dateString)}>
      <NeomorphView
        viewStyle={{
          ...Styles.dayContainer,
          backgroundColor:
            selectedDate === date?.dateString ? blueColor1 : backgroundColor1,
        }}
      >
        <TextComp text={date.day} textStyle={Styles.dayText} />
      </NeomorphView>
    </TouchableOpacity>
  );
}
