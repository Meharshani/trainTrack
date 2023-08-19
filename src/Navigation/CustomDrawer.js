import React from "react";
import { View, TouchableOpacity } from "react-native";
import { NeomorphFlex, NeomorphBlur } from "react-native-neomorph-shadows";
import { Divider } from "Divider/Divider";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Styles from "./Styles";
import DrawerButton from "DrawerButton/DrawerButton";
import Text from "../Components/TextComp/Text";
import Image from "../Components/ImageComp/Image";
import {
  exerciseIcon,
  historyIcon,
  homeIcon,
  userSettingsIcon,
  userStateIcon,
  workoutsIcon,
} from "../Utils/ImagesPath";
import { blueColor, buttonTextColor } from "../Utils/ThemeColors";
import NavButton from "./../Components/NavButton/index";
export default function CustomDrawer({
  navigation: { closeDrawer, navigate },
  state: { routes, index },
  ...props
}) {
  return (
    <NeomorphFlex inner style={Styles.drawerContainer}>
      <View style={Styles.innerContainer}>
        {routes?.map((name, i) => {
          return (
            <React.Fragment key={i}>
              <NavButton>
                <TouchableOpacity
                  onPress={() => navigate(name?.name)}
                  style={{
                    height: wp(10),
                    width: wp(10),
                    borderRadius: wp(5),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      routes[index].name === name?.name
                        ? blueColor
                        : "transparent",
                  }}
                >
                  {name?.name === "UserStats" ? (
                    <Image
                      source={userStateIcon}
                      imageStyle={{ width: wp(7), height: wp(8) }}
                      tintColor={
                        routes[index].name === name?.name
                          ? "black"
                          : buttonTextColor
                      }
                    />
                  ) : name?.name === "Setting" ? (
                    <Image
                      source={userSettingsIcon}
                      imageStyle={{ width: wp(8), height: wp(8) }}
                      tintColor={
                        routes[index].name === name?.name
                          ? "black"
                          : buttonTextColor
                      }
                    />
                  ) : name?.name === "HistoryScreen" ? (
                    <Image
                      source={historyIcon}
                      imageStyle={{ width: wp(8), height: wp(7.5) }}
                      tintColor={
                        routes[index].name === name?.name
                          ? "black"
                          : buttonTextColor
                      }
                    />
                  ) : name?.name === "ExercisesScreen" ? (
                    <Image
                      source={exerciseIcon}
                      imageStyle={{ width: wp(6), height: wp(7) }}
                      tintColor={
                        routes[index].name === name?.name
                          ? "black"
                          : buttonTextColor
                      }
                    />
                  ) : name?.name === "WorkoutScreen" ? (
                    <Image
                      source={workoutsIcon}
                      imageStyle={{ width: wp(8), height: wp(5) }}
                      tintColor={
                        routes[index].name === name?.name
                          ? "black"
                          : buttonTextColor
                      }
                    />
                  ) : (
                    <Image
                      source={homeIcon}
                      imageStyle={{ width: wp(8.5), height: wp(6) }}
                      tintColor={
                        routes[index].name === name?.name
                          ? "black"
                          : buttonTextColor
                      }
                    />
                  )}
                </TouchableOpacity>
              </NavButton>
              <Text
                text={
                  name?.name === "UserStats"
                    ? "USER STATS"
                    : name?.name === "Setting"
                    ? "USER SETTINGS"
                    : name?.name === "HistoryScreen"
                    ? "HISTORY"
                    : name?.name === "ExercisesScreen"
                    ? "EXERCISES"
                    : name?.name === "WorkoutScreen"
                    ? "WORKOUTS"
                    : null
                }
                textStyle={{
                  fontSize: wp(2.6),
                  marginTop: hp(0.5),
                  fontFamily: "OpenSans-Semibold",
                }}
              />
              {name?.name !== "UserShortCuts" && (
                <Divider
                  width="40%"
                  height={1.5}
                  style={{ marginVertical: hp(1.2) }}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>
      <DrawerButton top={hp(33)} left={-wp(3)} onPress={() => closeDrawer()} />
    </NeomorphFlex>
  );
}
