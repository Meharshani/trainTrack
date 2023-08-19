module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      "extensions": ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      "alias": {
        "Buttons": "./src/Components/Buttons",
        "Utils": "./src/Utils",
        "TextComp": "./src/Components/TextComp",
        "ImageComp": "./src/Components/ImageComp",
        "AvatarComp": "./src/Components/AvatarComp",
        "NeomorphView": "./src/Components/NeomorphView",
        "InputComp": "./src/Components/InputComp",
        "Dropdown": "./src/Components/DropdownButton",
        "Divider": "./src/Components/DividerComp",
        "Calendar": "./src/Components/CalendarComp",
        "Accordion": "./src/Components/Accordion",
        "HorizontalScroll": "./src/Components/HorizontalScrollComp",
        "Graph": "./src/Components/GraphComp",
        "Modal": "./src/Components/ModalView",
        "DrawerButton": "./src/Components/DrawerButton",
        "AddProfile": "./src/Components/AddProfileComp",
        "ViewProfile": "./src/Components/ViewProfileComp",
        "UserShortCuts": "./src/Screens/UserShortCutsScreen",
        "AddExercise": "./src/Screens/AddExerciseScreen",
        "Workouts": "./src/Screens/WorkoutsScreen",
        "Exercises": "./src/Screens/ExercisesScreen",
        "Settings": "./src/Screens/SettingScreen",
        "History": "./src/Screens/HistoryScreen",
        "UserStats": "./src/Screens/UserStatScreen",
        "UserStatCalc": "./src/Screens/UserStatCalcScreen",
        "WorkoutDetail": "./src/Screens/WorkoutDetailScreen",
        "HistoryGraph": "./src/Screens/HistoryGraphScreen",
        "Signup": "./src/Screens/SignupScreen",
        "Signin": "./src/Screens/SigninScreen",
        "ManageProfile": "./src/Screens/ManageProfileScreen",
      }
    }],
    'react-native-reanimated/plugin'
  ]
};
