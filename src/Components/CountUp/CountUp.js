import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { redColor } from "../../Utils/ThemeColors";
import { useSelector } from "react-redux";

const Timer = (props) => {
  const { initialMinute, initialSeconds } = props;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);
  const [hours, setHours] = useState(0);

  //whenever initialMinute and initialSeconds props changes then set min and secs again
  useEffect(() => {
    setMinutes(initialMinute);
    setSeconds(initialSeconds);
  }, [initialMinute, initialSeconds]);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds < 0) {
        setSeconds(seconds + 1);
      }
      if (seconds === seconds / 60) {
        if (minutes === 0) {
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <View>
      <View>
        <Text style={styles.mediumText}>
          {minutes < 1 ? `0${minutes}` : minutes} :{" "}
          {seconds < 10 ? `0${seconds}` : seconds}
        </Text>
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  mediumText: {
    fontSize: wp(3),
    marginLeft: -wp(2),
    color: redColor,
    fontFamily: "OpenSans",
  },
});
