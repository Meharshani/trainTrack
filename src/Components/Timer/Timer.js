import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { redColor } from "../../Utils/ThemeColors";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import { useSelector } from "react-redux";

const Timer = (props) => {
  const { initialMinute, initialSeconds, TimerRef, setCountDown } = props;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);
  const [count, setCount] = useState(0);
  const sound = useSelector((state) => state.notification.sound);

  //get notification permission for iOS
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
    } else {
      alert("Allow permissions for the app to get notifications.");
    }
  };

  useEffect(() => {
    requestUserPermission();
  }, []);

  //initiate local notifications
  const localNotificationHandler = () => {
    PushNotification.localNotification({
      channelId: "channel-id",
      vibrate: true, // (optional) default: true,
      priority: sound ? "min" : "max",
      title: "Times Up!", // (optional)
      message: "Ready to start workout again?",
      playSound: sound,
    });
  };

  //whenever initialMinute and initialSeconds props changes then set min and secs again
  useEffect(() => {
    setCount(0);
    setMinutes(initialMinute);
    setSeconds(initialSeconds);
  }, [initialMinute, initialSeconds]);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          TimerRef.current.resume();
          setCount((prev) => prev + 1);
          if (count < 1) {
            setCountDown(false);
            localNotificationHandler();
          }
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
          {minutes < 1 ? `${minutes}` : minutes} :{" "}
          {seconds < 1 ? `0${seconds}` : seconds}
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
