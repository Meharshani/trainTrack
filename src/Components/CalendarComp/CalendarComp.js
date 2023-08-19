import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import {
  backgroundColor,
  backgroundColor1,
  blueColor,
  blueColor1,
  grayColor,
} from "../../Utils/ThemeColors";
import DayComponent from "./DayComponent";
import HeaderComponent from "./HeaderComponent";
import Styles from "./Styles";
import realm, {
  getWorkoutDaysMonthly,
  getTotal,
  getExerciseHistoryWeekly,
} from "../../realm";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Header, Icon } from "react-native-elements";
import { NeomorphView } from "../NeomorphView/NeomorphView";
import TextComp from "../TextComp/Text";
import { workoutHis } from "../../redux/workouthistory.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setLoader } from "../../redux/loading";

export default function CalendarComp() {
  const [exercisedates, setExerciseDates] = useState([
    "2023-02-01",
    "2023-01-28",
    "2023-01-27",
  ]);
  const [state, updateState] = useState();
  const [datea, setDate] = useState("");
  const [finalData, setFinalData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [d, sd] = useState("");
  const [m, sm] = useState("");
  const [y, sy] = useState("");
  const [dte, setDte] = useState("");
  const dispatch = useDispatch();
  const selectedProfile = useSelector((state) => state.profiles.profile);

  //get dates
  const getDate = async (dt) => {
    try {
      setDate(dt.dateString);
      setDte(`${dt.month}/${dt.day}/${dt.year}`);
      setLoader(true);
      const timeout = setTimeout(async () => {
        clearTimeout(timeout);
        let data = await getTotal(
          dt.month - 1,
          dt.day,
          dt.year,
          selectedProfile?._id
        );
        if (data !== undefined) {
          // console.log(data[0]);
          setFinalData(data);
          setLoader(false);
          dispatch(workoutHis(data));
          sy(dt.year);
          sm(dt.month);
          sd(dt.day);
        }
      }, 3000);
    } catch (e) {
      throw e;
    }
  };

  //get workout days history by month
  const getWorkoutDaysHistory = async () => {
    var dt = new Date();
    let data = await getWorkoutDaysMonthly(
      dt.getMonth(),
      dt.getFullYear(),
      selectedProfile?._id
    );
    // console.log("DAYS ", data[0].days);
    if (data.length > 0) {
      setExerciseDates(data[0].days);
    } else {
      setExerciseDates([]);
    }
  };

  useEffect(() => {
    getWorkoutDaysHistory();
  }, []);

  // if (loader) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size={40} color="blue" />
  //     </View>
  //   );
  // }

  return (
    <View>
      <Calendar
        style={Styles.calendarContainer}
        markedDates={{
          "2023-02-01": { marked: true, dotColor: "#50cebb" },
          "2023-01-31": { marked: true, dotColor: "#50cebb" },
          "2023-01-30": {
            startingDay: true,
            color: "#50cebb",
            textColor: "white",
          },
          "2023-01-29": { color: "#70d7c7", textColor: "white" },
          "2023-01-28": {
            color: "#70d7c7",
            textColor: "white",
            marked: true,
            dotColor: "white",
          },
          "2023-01-27": { color: "#70d7c7", textColor: "white" },
          "2023-01-26": {
            endingDay: true,
            color: "#50cebb",
            textColor: "white",
          },
        }}
        // dayComponent={({ date, state }) => <DayComponent date={date} />}
        dayComponent={({ date }) => {
          var abc = exercisedates.indexOf(date.day);
          return (
            <>
              {abc > -1 ? (
                <TouchableOpacity
                  onPress={() => {
                    getDate(date);
                  }}
                >
                  <NeomorphView
                    viewStyle={{
                      ...Styles.dayContainer,
                      backgroundColor:
                        date.dateString === datea ? 'red' : blueColor1,
                    }}
                  >
                    {loader & (date.dateString === datea) ? (
                      <ActivityIndicator size={20} color="#fff" />
                    ) : (
                      <TextComp text={date.day} textStyle={Styles.dayText} />
                    )}
                  </NeomorphView>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => alert("No Workout on this day")}
                >
                  <NeomorphView
                    viewStyle={{
                      ...Styles.dayContainer,
                      backgroundColor:
                        date.dateString === datea ? "red" : backgroundColor1,
                    }}
                  >
                    <TextComp text={date.day} textStyle={Styles.dayText} />
                  </NeomorphView>
                </TouchableOpacity>
              )}
            </>
          );
        }}
        onMonthChange={async (month) => {
          // console.log("month changed", month);
          setFinalData([]);
          let data = await getWorkoutDaysMonthly(month.month - 1, month.year);
          if (data.length > 0) {
            setExerciseDates(data[0].days);
          } else {
            setExerciseDates([]);
          }
        }}
        customHeader={({ month, addMonth }) => (
          <HeaderComponent month={month} addMonth={addMonth} />
        )}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        // onPressArrowRight={(addMonth) => console.log(addMonth())}
        renderArrow={(direction) => {
          return (
            <View
              style={{
                backgroundColor: "#272727",
                width: widthPercentageToDP("9%"),
                height: heightPercentageToDP("4%"),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name={direction === "right" ? "right" : "left"}
                type="antdesign"
                color="red"
                size={widthPercentageToDP(5)}
              />
            </View>
          );
        }}
        hideExtraDays={true}
        // Specify theme properties to override specific styles for calendar parts. Default = {}

        theme={{
          calendarBackground: backgroundColor,
          backgroundColor: backgroundColor,
          textSectionTitleColor: "#b6c1cd",
          textSectionTitleDisabledColor: "#d9e1e8",
          selectedDayBackgroundColor: "red",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#ffffff",
          dayTextColor: "#ffffff",
          textDisabledColor: "#d9e1e8",
          dotColor: "#00adf5",
          selectedDotColor: "#ffffff",
          arrowColor: "orange",
          disabledArrowColor: "#d9e1e8",
          monthTextColor: "white",
          indicatorColor: "blue",
          textDayFontFamily: "CenturyGothic",
          textMonthFontFamily: "CenturyGothic",
          textDayHeaderFontFamily: "CenturyGothic",
          textDayFontWeight: "300",
          textDayHeaderFontWeight: "300",
          textDayFontSize: widthPercentageToDP(5),
          textMonthFontSize: widthPercentageToDP(5),
          textDayHeaderFontSize: 16,
        }}
      />
    </View>
  );
}

// <Calendar
//   monthFormat={"yyyy MM"}
// theme={{
//   calendarBackground: backgroundColor,
//   backgroundColor: backgroundColor,
// }}
//   markedDates={{
//     "2021-03-15": { selected: true, marked: true, selectedColor: "blue" },
//   }}
// hideDayNames
// hideArrows
// customHeader={({ month, addMonth }) => (
//   <HeaderComponent month={month} addMonth={addMonth} />
// )}
//   style={Styles.calendarContainer}
// dayComponent={({ date, state }) => <DayComponent date={date} />}
// />;
