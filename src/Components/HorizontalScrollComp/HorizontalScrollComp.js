import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { blueColor, blueColor1 } from "../../Utils/ThemeColors";
import { NeomorphView } from "../NeomorphView/NeomorphView";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Button2 } from '../Buttons/Buttons';
import { playIcon } from "../../Utils/ImagesPath";
import Styles from "./Styles";

export default function HorizontalScrollComp({
  month,
  addMonth,
  data,
  render,
  selectedIndex,
}) {
  const [selectedData, setSelectedData] = useState({});
  const [index, setIndex] = useState(null);

  useEffect(() => {
    data?.map((dt, i) => {
      if (selectedIndex) {
        if (i === selectedIndex) {
          setSelectedData(dt);
          setIndex(selectedIndex);
        }
      } else {
        if (i === 0) {
          setSelectedData(dt);
          setIndex(0);
        }
      }
    });
  }, [data]);

  return (
    <NeomorphView viewStyle={Styles.headerContainer}>
      <Button2
        // onPress={()=>addMonth(-1)}
        isText={false}
        buttonText=""
        isIcon={true}
        buttonIcon={playIcon}
        tintColor={blueColor1}
        buttonIconStyle={{
          width: wp(2.5),
          height: wp(2.5),
          transform: [{ rotate: "180deg" }],
        }}
        buttonInnerContainer={Styles.buttonInnserStyle}
      />
      <View>{render(selectedData, index)}</View>
      <Button2
        // onPress={()=>addMonth(1)}
        isText={false}
        buttonText=""
        isIcon={true}
        buttonIcon={playIcon}
        tintColor={blueColor1}
        buttonIconStyle={{ width: wp(2.5), height: wp(2.5) }}
        buttonInnerContainer={Styles.buttonInnserStyle}
      />
    </NeomorphView>
  );
}
