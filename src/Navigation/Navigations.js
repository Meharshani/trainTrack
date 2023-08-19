import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import CustomDrawer from "./CustomDrawer";
import { navigationRef } from "../Utils/OpenDrawer";

// Screens
import UserShortCuts from "../Screens/UserShortCutsScreen/UserShortCuts";
import AddExercise from "../Screens/AddExerciseScreen/AddExercise";
import ExercisesScreen from "../Screens/ExercisesScreen/ExercisesScreen";
import WorkoutScreen from "../Screens/WorkoutsScreen/WorkoutScreen";
import Setting from "../Screens/SettingScreen/Setting";
import HistoryScreen from "../Screens/HistoryScreen/HistoryScreen";
import UserStats from "../Screens/UserStatScreen/UserStats";
import UserStatCalc from "../Screens/UserStatCalcScreen/UserStatCalc";
import WorkoutDetailScreen from "../Screens/WorkoutDetailScreen/WorkoutDetailScreen";
import HistoryGraph from "../Screens/HistoryGraphScreen/HistoryGraph";
import Signup from "../Screens/SignupScreen/Signup";
import Signin from "../Screens/SigninScreen/Signin";
import Profiles from "../Screens/ManageProfileScreen/Profiles";
import ManageProfile from "../Screens/ManageProfileScreen/ManageProfile";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Trial from "../Screens/MembershipScreens/Trial";
import ExerciseGraph from "../Screens/ExerciseGraph/ExerciseGraph";
import WorkoutGraph from "../Screens/WorkoutGraph/WorkoutGraph"
import StatsGraph from "../Screens/StatsGraph/StatsGraph"
import Memberships from "../Screens/MembershipScreens/Memberships";
import Splash from "../Screens/Splash/Splash";
import Test from "../Screens/Test";
import AddExercisesToWorkout from "../Screens/AddExercisesToWorkout/AddExercisesToWorkout";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerNavigations = () => {
  console.log('navigation')

  return (
    <Drawer.Navigator
      initialRouteName="UserShortCuts"
      backBehavior="firstRoute"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "transparent",
          justifyContent: "center",
          width: wp(100),
          marginLeft: wp(75),
          zIndex: 1500,
        },
        drawerPosition: "right",
        overlayColor: "transparent",
        drawerType: "front",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="UserStats"
        component={UserStats}
        options={{ headerShown: false, drawerLabel: "USER STATS" }}
      />
      <Drawer.Screen
        name="Setting"
        component={Setting}
        options={{ headerShown: false, drawerLabel: "USER SETTING" }}
      />
      <Drawer.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{ headerShown: false, drawerLabel: "HISTORY" }}
      />
      <Drawer.Screen
        name="ExercisesScreen"
        component={ExercisesScreen}
        options={{ headerShown: false, drawerLabel: "EXERCISES" }}
      />

      <Drawer.Screen
        name="WorkoutScreen"
        component={WorkoutScreen}
        options={{ headerShown: false, drawerLabel: "WORKOUTS" }}
      />
      <Drawer.Screen
        name="UserShortCuts"
        component={UserShortCuts}
        options={{ headerShown: false, drawerLabel: "HOME" }}
      />
    </Drawer.Navigator>
  );
};

export default function Root() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="test" component={Test} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Trial" component={Trial} />
        <Stack.Screen name="Memberships" component={Memberships} />
        <Stack.Screen name="UserShortCuts" component={DrawerNavigations} />
        <Stack.Screen name="AddExercise" component={AddExercise} />
        <Stack.Screen
          name="AddExercisesToWorkout"
          component={AddExercisesToWorkout}
        />
        <Stack.Screen name="UserStatCalc" component={UserStatCalc} />
        {/* <Stack.Screen name="HistoryGraph" component={HistoryGraph} /> */}
        <Stack.Screen name="StatsGraph" component={StatsGraph} />
        <Stack.Screen name="ExerciseGraph" component={ExerciseGraph} />
        <Stack.Screen name="WorkoutGraph" component={WorkoutGraph} />
        <Stack.Screen
          name="WorkoutDetailScreen"
          component={WorkoutDetailScreen}
        />
        <Stack.Screen name="Profiles" component={Profiles} />
        <Stack.Screen name="ManageProfile" component={ManageProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
