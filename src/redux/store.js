import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import dropdownReducer from "./dropdown.js";
import filteredExercisesReducer from "./filterexercises";
import workoutExReducer from "./workoutexercises";
import workoutHistoryReducer from "./workouthistory";
import setsReducer from "./sets";
import notificationReducer from "./notificationsound";
import timerReducer from "./timervalue";
import loginReducer from "./login";
import backupReducer from "./backup";
import currentWorkoutReducer from "./currentworkout";
import latestWorkoutReducer from "./latestworkout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore, createTransform } from "redux-persist";
import profileReducer from "./profile";

//combine the reducers with the help of combineReducer method from redux
const rootReducer = combineReducers({
  dropdown: dropdownReducer,
  exercises: filteredExercisesReducer,
  workout: workoutExReducer,
  sets: setsReducer,
  workouthistory: workoutHistoryReducer,
  profiles: profileReducer,
  notification: notificationReducer,
  timer: timerReducer,
  login: loginReducer,
  currentworkout: currentWorkoutReducer,
  backup: backupReducer,
  latestworkout: latestWorkoutReducer,
});

//config redux persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["workouthistory"],
};

//config redux persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//pass the rootReducer to reducer in redux toolkit config
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: false,
    }),
});

export const persist = persistStore(store);
