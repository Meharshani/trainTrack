// import { Extrapolate } from 'react-native-reanimated';
import Realm from "realm";
// import RnFS from 'react-native-fs'
import {
  exercise,
  globalValues,
  muscleGroup,
  weightHistory,
  workouts,
  bodyComp,
  sets,
  workoutData,
  profile,
  shortcuts,
  workoutDays,
} from "./schemas";
// let realm;
//initialize Realm

var realm = new Realm({
  path: "trainingtracker.realm",
  schema: [
    exercise,
    bodyComp,
    globalValues,
    muscleGroup,
    weightHistory,
    workouts,
    sets,
    workoutData,
    profile,
    shortcuts,
    workoutDays,
  ],
  schemaVersion: 14,
});

//Export Realm
export default realm;

/** DEFINE QUERY FUNCTIONS */

export function getAllMuscleGroup(profile) {
  const muscleGroups = realm.objects("muscleGroup");
  if (muscleGroups.length == 0) {
    return muscleGroups;
  } else {
    return realm.objects("muscleGroup").filtered("profile._id == $0", profile);
  }
}

//Get all saved profiles
export function getAllProfiles() {
  return realm.objects("profile");
}

//Create a profile
export function addProfile(_id, name, gender, age) {
  if (
    name !== undefined &&
    _id !== undefined &&
    age !== undefined &&
    gender !== undefined
  ) {
    return realm.write(() => {
      return realm.create(
        "profile",
        {
          _id: _id,
          name,
          gender,
          age,
          createdDate: new Date(Date.now()),
        },
        "modified"
      );
    });
  } else {
    alert("Profile detail is required");
  }
}

//Edit a profile
export function editProfile(_id, name, gender, age, createdDate) {
  if (
    name !== undefined &&
    _id !== undefined &&
    age !== undefined &&
    gender !== undefined
  ) {
    return realm.write(() => {
      return realm.create(
        "profile",
        {
          _id: _id,
          name,
          gender,
          age,
          createdDate,
        },
        "modified"
      );
    });
  } else {
    alert("Profile detail is required");
  }
}

//Delete specific profile
export async function deleteProfile(id) {
  if (id !== undefined) {
    let profile = await realm.objectForPrimaryKey("profile", id);
    return await realm.write(() => {
      // Delete the profile from the realm.
      realm.delete(profile);
      // Discard the reference.
      profile = null;
    });
  } else {
    alert("Profile _id is required");
  }
}

export function addMuscleGroup(_id, name, profile) {
  if (name !== undefined && _id !== undefined) {
    return realm.write(() => {
      return realm.create(
        "muscleGroup",
        {
          _id: _id,
          name,
          profile,
          createdDate: new Date(Date.now()),
        },
        "modified"
      );
    });
  } else {
    alert("Muscle Group name is required");
  }
}

export function updateMuscleGroup(_id, name, profile, createdDate) {
  if (name !== undefined && _id !== undefined) {
    return realm.write(() => {
      return realm.create(
        "muscleGroup",
        {
          _id: _id,
          name,
          profile,
          createdDate,
        },
        "modified"
      );
    });
  } else {
    alert("Muscle Group data is required");
  }
}

//Delete specific muscle group
export async function deleteMuscleGroup(id) {
  if (id !== undefined) {
    let muscle = await realm.objectForPrimaryKey("muscleGroup", id);
    return await realm.write(() => {
      // Delete the muscle from the realm.
      realm.delete(muscle);
      // Discard the reference.
      muscle = null;
    });
  } else {
    alert("Muscle _id is required");
  }
}

//Get Global Values
//Get all exercises
export function getGlobalValues(profile = 1) {
  const globals = realm.objects("globalValues");
  if (globals.length == 0) {
    return globals;
  } else {
    return realm.objects("globalValues").filtered("profile._id == $0", profile);
  }
}

//Set Username
export async function setUsername(_id, name) {
  if (name !== undefined && name !== null && _id !== undefined) {
    return realm.write(() => {
      return realm.create("globalValues", { _id, username: name }, "modified");
    });
  } else {
    alert("Username is required");
  }
}

//set restInterval
export async function setRestInterval(_id, interval, profile) {
  // console.log({ _id, interval });

  if (interval !== undefined && interval !== null && _id !== undefined) {
    return realm.write(() => {
      return realm.create(
        "globalValues",
        { _id, restInterval: interval, profile: profile },
        "modified"
      );
    });
  } else {
    alert("interval is required");
  }
}

//Set gender
export async function setGender(_id, gender) {
  //0: Mail, 1: Female
  if (gender !== undefined && gender !== null && _id !== undefined) {
    return realm.write(() => {
      return realm.create("globalValues", { _id, gender: gender }, "modified");
    });
  } else {
    alert("gender is required");
  }
}

//Set Alarm
export async function setAlarm(_id, alarm) {
  //0: Mail, 1: Female
  if (alarm !== undefined && alarm !== null && _id !== undefined) {
    return realm.write(() => {
      return realm.create("globalValues", { _id, alarm: alarm }, "modified");
    });
  } else {
    alert("alarm is required");
  }
}

//Get all exercises
export function getAllExercises(profile = 1) {
  const exercise = realm.objects("exercise");
  if (exercise.length == 0) {
    return exercise;
  } else {
    return realm.objects("exercise").filtered("profile._id == $0", profile);
  }
}

export function filterExerciseByType(type, profile) {
  const exercise = realm.objects("exercise");
  if (exercise.length == 0) {
    return exercise;
  } else {
    return realm
      .objects("exercise")
      .filtered("type==" + type + " AND profile._id==" + profile);
  }
}

export function filterExerciseByMuscle(muscle, profile) {
  const exercise = realm.objects("exercise");
  if (exercise.length == 0) {
    return exercise;
  } else {
    return realm
      .objects("exercise")
      .filtered("muscleGroup._id==" + muscle + " AND profile._id==" + profile);
  }
}

//Add new exercise
export function addExercise(name, notes, type, muscleGroup, _id, profile) {
  // console.log({
  //   name,
  //   notes,
  //   type,
  //   muscleGroup,
  //   _id,
  //   profile,
  // });

  if (
    _id !== undefined &&
    name !== undefined &&
    name !== null &&
    notes !== undefined &&
    type !== undefined &&
    muscleGroup !== undefined
  ) {
    return realm.write(() => {
      return realm.create(
        "exercise",
        {
          _id: _id,
          name,
          notes,
          type,
          muscleGroup: muscleGroup,
          profile,
          createdDate: new Date(Date.now()),
        },
        "modified"
      );
    });
  } else {
    alert("Exercise data is incomplete");
  }
}

//Edit exercise
export async function updateExercise(
  _id,
  name,
  notes,
  type,
  muscleGroup,
  createdDate,
  profile
) {
  // console.log("inside->", {
  //   _id,
  //   name,
  //   notes,
  //   type,
  //   muscleGroup,
  //   createdDate,
  // });
  if (
    _id !== undefined &&
    name !== undefined &&
    name !== null &&
    notes !== undefined &&
    type !== undefined &&
    muscleGroup !== undefined
  ) {
    return realm.write(() => {
      return realm.create(
        "exercise",
        {
          _id: _id,
          name,
          notes,
          type,
          muscleGroup: muscleGroup,
          createdDate,
          profile,
        },
        "modified"
      );
    });
  } else {
    alert("Exercise data is incomplete");
  }
}

//Delete Exercise
export async function deleteExercise(id) {
  if (id !== undefined) {
    let exercise = realm.objectForPrimaryKey("exercise", id);
    return realm.write(() => {
      // Delete the muscle from the realm.
      realm.delete(exercise);
      // Discard the reference.
      exercise = null;
    });
  } else {
    alert("Exercise _id is required");
  }
}

//Get Exercises in Alphabetical Order
export async function getExercisesInAlhphabetOrder() {
  let exercises = realm.objects("exercise");
  return exercises.sorted("name");
}

//Get Exercises in MuscleGroup Order
export async function getExercisesInmuscleGroupOrder() {
  let exercises = realm.objects("exercise");
  return exercises.sorted("muscleGroup._id");
}

//Delete specific workout
export async function deleteWorkout(id) {
  if (id !== undefined) {
    let workout = await realm.objectForPrimaryKey("workouts", id);
    return await realm.write(() => {
      // Delete the workout from the realm.
      realm.delete(workout);
      // Discard the reference.
      workout = null;
    });
  } else {
    alert("Workout _id is required");
  }
}

//Get all workouts
export function getAllWorkouts(profile = 1) {
  const workouts = realm.objects("workouts");
  if (workouts.length == 0) {
    return workouts;
  } else {
    return realm.objects("workouts").filtered("profile._id == $0", profile);
  }
}

//Edit Workout
export async function editWorkout(
  _id,
  name,
  exercises,
  createdDate,
  profile,
  icon
) {
  if (
    _id !== undefined &&
    name !== undefined &&
    name !== null &&
    exercises !== undefined &&
    exercises.length !== 0 &&
    profile !== undefined &&
    icon !== undefined
  ) {
    return realm.write(() => {
      return realm.create(
        "workouts",
        {
          _id: _id,
          name,
          exercises,
          createdDate,
          profile,
          icon,
        },
        "modified"
      );
    });
  } else {
    alert("Exercise data is incomplete");
  }
}

//Create Workout
export async function createWorkout(name, exercises, _id, profile, icon) {
  if (
    name !== undefined &&
    name !== null &&
    exercises !== undefined &&
    _id !== undefined &&
    profile !== undefined &&
    icon !== undefined
  ) {
    if (exercises.length > 0) {
      return realm.write(() => {
        return realm.create(
          "workouts",
          {
            _id: _id,
            name: name,
            exercises: exercises,
            createdDate: new Date(Date.now()),
            profile,
            icon,
          },
          "modified"
        );
      });
    } else {
      alert("No Exercises selected");
    }
  } else {
    alert("Workout data is incomplete");
  }
}

//Get all body compositions
export async function getBodyCompositions(profile = 1) {
  const bodyComp = realm.objects("bodyComp");
  if (bodyComp.length == 0) {
    return bodyComp;
  } else {
    return realm.objects("bodyComp").filtered("profile._id == $0", profile);
  }
}

//Get Last body composition
export async function getLastBodyComposition(profile = 1) {
  let _id = -1;
  const composition = await getBodyCompositions(profile);
  if (composition.length > 0) _id = composition.max("_id");
  if (_id > -1) {
    return realm.objectForPrimaryKey("bodyComp", _id);
  } else {
    return null;
  }
}

//Get body compositions in order
export async function getOrderedBodyCompositions(profile) {
  const bodyComp = realm.objects("bodyComp");
  if (bodyComp.length === 0) {
    return bodyComp;
  } else {
    const filterredProfile = realm
      .objects("bodyComp")
      .filtered("profile._id == $0", profile);
    return filterredProfile.sorted("_id", true);
  }
}

//Add body composition
export async function addBodyComposition(_id, body, profile) {
  // }
  if (body.bodyFat !== undefined) {
    //since weight is required
    let fatChange = 0;
    if (body.lastBodyFat !== undefined && body.lastBodyFat !== 0) {
      fatChange = body.bodyFat - body.lastBodyFat;
    }
    body._id = _id;
    body.bodyFat = body.bodyFat;
    body.bodyDensity = body.bodyDensity;
    body.fatChange = fatChange;
    body.createdDate = new Date(Date.now());
    body.profile = profile;
    await realm.write(() => {
      return realm.create("bodyComp", body, "modified");
    });
  } else {
    alert("Body Fat is required");
  }
}

//Add body composition
export async function mockBodyComposition(_id, body, profile) {
  // }
  if (body.bodyFat !== undefined) {
    //since weight is required
    let fatChange = 0;
    if (body.lastBodyFat !== undefined && body.lastBodyFat !== 0) {
      fatChange = body.bodyFat - body.lastBodyFat;
    }
    body._id = _id;
    body.fatChange = fatChange;
    // body.createdDate = new Date(Date.now());
    body.profile = profile;
    await realm.write(() => {
      return realm.create("bodyComp", body, "modified");
    });
  } else {
    alert("Body Fat is required");
  }
}

//Get all body compositions
export async function getWeightHistory(profile = 1) {
  const weightHistory = realm.objects("weightHistory");
  if (weightHistory.length == 0) {
    return weightHistory;
  } else {
    return realm
      .objects("weightHistory")
      .filtered("profile._id == $0", profile);
  }
}

//Get Last body composition
export async function getLastWeightHistory(profile) {
  let _id = -1;
  const weights = await getWeightHistory(profile);
  if (weights?.length > 0) _id = weights.max("_id");
  if (_id > -1) {
    return realm.objectForPrimaryKey("weightHistory", _id);
  } else {
    return null;
  }
}

//Get body compositions in order
export async function getOrderedWeightHistory(profile = 1) {
  const weightHistory = realm.objects("weightHistory");
  if (weightHistory.length === 0) {
    return weightHistory;
  } else {
    const filterredProfile = realm
      .objects("weightHistory")
      .filtered("profile._id == $0", profile);
    return filterredProfile.sorted("_id", true);
  }
}

export async function mockWeightHistory(_id, body, profile,weightDate) {
  // console.log("FROM REALM ", _id, body, profile);

  if (body.weight !== undefined) {
    //since weight is required
    let change = 0;
    if (body.lastWeight !== undefined && body.lastWeight !== 0) {
      change = body.weight - body.lastWeight;
    }
    body._id = _id;
    body.weight = body.weight;
    body.change = change;
    body.weightDate = weightDate
    body.profile = profile;
    await realm.write(() => {
      return realm.create("weightHistory", body, "modified");
    });
  } else {
    alert("Body Weight is required");
  }
}
//Add body composition
export async function addWeightHistory(_id, body, profile) {
  // console.log("FROM REALM ", _id, body, profile);

  if (body.weight !== undefined) {
    //since weight is required
    let change = 0;
    if (body.lastWeight !== undefined && body.lastWeight !== 0) {
      change = body.weight - body.lastWeight;
    }
    body._id = _id;
    body.weight = body.weight;
    body.change = change;
    body.weightDate = new Date(Date.now());
    body.profile = profile;
    await realm.write(() => {
      return realm.create("weightHistory", body, "modified");
    });
  } else {
    alert("Body Weight is required");
  }
}

//Add Set
export function addSet(
  weight,
  reps,
  rmValue,
  isHeighest,
  exercise,
  _id,
  profile,
  failedSet,
  warmupSet,
  notes = "",
  createdDate=null
) {
  if (
    _id !== undefined &&
    weight !== undefined &&
    reps !== undefined &&
    exercise !== undefined &&
    rmValue !== undefined &&
    isHeighest !== undefined &&
    profile !== undefined
  ) {
    return realm.write(() => {
      return realm.create(
        "sets",
        {
          _id: _id,
          weight,
          reps,
          rmValue,
          isHeighest,
          exercise,
          failedSet: failedSet !== undefined ? failedSet : false,
          warmupSet: warmupSet !== undefined ? warmupSet : false,
          notes,
          profile,
          createdDate: createdDate===null?new Date(Date.now()):createdDate,
        },
        "modified"
      );
    });
  } else {
    alert("Set data is incomplete");
  }
}

export function addHistory(workout, exercise, sets, _id, profile,totalWeightLifted=0,workoutDate=null) {
  // console.log({
  //   workout,
  //   exercise,
  //   sets,
  //   _id,
  // });
  if (
    _id !== undefined &&
    workout !== undefined &&
    exercise !== undefined &&
    sets !== undefined
  ) {
    // return console.log("HISTORY ", { workout, exercise, sets, _id });

    return realm.write(() => {
      return realm.create(
        "workoutData",
        {
          _id: _id,
          exercise,
          workout,
          sets,
          workoutDate: workoutDate===null?new Date(Date.now()):workoutDate,
          profile: profile,
          totalWeightLifted
        },
        "modified"
      );
    });
  } else {
    alert("History is incomplete");
  }
}

//Get workoutData by workout
export function getWorkoutDataByWorkoutId(workoutId) {
  if (workoutId !== undefined) {
    return realm
      .objects("workouts")
      .filtered("workout._id ==[c] " + '"' + workoutId + '"');
  }
}

//for dev
export function deleteAllData() {
  realm.write(() => {
    realm.deleteAll();
  });
}

export function getProfileShortcuts(profile = 1) {
  const shortcuts = realm.objects("shortcuts");
  if (shortcuts.length == 0) {
    return shortcuts;
  } else {
    return realm.objects("shortcuts").filtered("profile._id == $0", profile);
  }
}

export function setShortcuts(profile, shortcutsData) {
  //Delete previous shortcuts for profile
  const shortcuts = realm.objects("shortcuts");
  if (shortcuts.length == 0) {
    //There are no shortcuts; shortcuts can be inserted directly
    if (shortcutsData.length > 0) {
      let finalShortcut;
      return realm.write(() => {
        shortcutsData.forEach((shortcut, index) => {
          finalShortcut = {
            ...shortcut,
            _id: index + 1,
            createdDate: new Date(Date.now()),
            profile,
          };
          realm.create("shortcuts", finalShortcut, "modified");
        });
      });
    } else {
      alert("Shortcuts data is required");
    }
  } else {
    //There are shortcuts already; previous shortcuts need to be deleted before setting new
    let data = realm
      .objects("shortcuts")
      .filtered("profile._id == $0", profile._id);
    realm.write(() => {
      realm.delete(data);
      // let maxId = shortcuts.max("_id") + 1;
      // console.log("REACHED");
      if (shortcutsData.length > 0) {
        let finalShortcut;
        // console.log("REACHED", maxId);
        shortcutsData.forEach((shortcut, index) => {
          finalShortcut = {
            ...shortcut,
            _id: index + 1,
            createdDate: new Date(Date.now()),
            profile,
          };
          realm.create("shortcuts", finalShortcut, "modified");
        });
      } else {
        alert("Shortcuts data is required");
      }
    });
  }
  //Set new shortcuts
}

//Get workoutDays by month (to be called on set workout screen)
export function getWorkoutDaysByMonth(profile = 1) {
  let months = [
    "jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = new Date(Date.now());
  let month = date.getMonth();
  let year = date.getFullYear();

  const filterByProfile = realm
    .objects("workoutDays")
    .filtered("profile._id == $0", profile);

  return filterByProfile.filtered(
    "month ==" +
      '"' +
      months[month] +
      '"' +
      " && year ==" +
      '"' +
      parseInt(year) +
      '"'
  );
}

//for history screen
export function getWorkoutDaysMonthly(m, year, profile = 1) {
  let months = [
    "jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const filterByProfile = realm
    .objects("workoutDays")
    .filtered("profile._id == $0", profile);
  return filterByProfile.filtered(
    "month ==" +
      '"' +
      months[m] +
      '"' +
      " && year ==" +
      '"' +
      parseInt(year) +
      '"'
  );
}

//get the max Id for workoutDays
export function getMaxIdForWorkoutDays() {
  return realm.objects("workoutDays").max("_id");
}

//create workoutDays
export function createWorkoutDays(_id, profile,selectedDdate=null) {
  if (_id !== undefined && profile !== undefined) {
    let months = [
      "jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let date = selectedDdate===null?new Date(Date.now()):selectedDdate;
    let month = date.getMonth();
    let year = date.getFullYear();
    let today = date.getDate();
    return realm.write(() => {
      return realm.create(
        "workoutDays",
        {
          _id: _id,
          month: months[month],
          year,
          days: [today],
          profile: profile,
        },
        "modified"
      );
    });
  } else {
    alert("Workout Days id is undefined");
  }
}

//add days in workoutDays
export async function addDaysInWorkoutDays(id, days, month, year, profile) {
  if (
    id !== undefined &&
    days !== undefined &&
    month !== undefined &&
    year !== undefined &&
    profile !== undefined
  ) {
    // let data = await realm.objectForPrimaryKey('workoutDays',id)
    // console.log('dataaaa->',data)
    return realm.write(async () => {
      return realm.create(
        "workoutDays",
        {
          _id: id,
          month: month,
          year,
          days: days,
          profile: profile,
        },
        "modified"
      );
    });
  } else {
    alert("Workout Days id is undefined");
  }
}

//last five workouts
export function lastFivegetWorkoutDataByWorkoutId(workoutId, exerciseId) {
  return realm
    .objects("workoutData")
    .filtered(
      "workout._id ==" +
        '"' +
        workoutId +
        '"' +
        " && exercise._id ==" +
        '"' +
        exerciseId +
        '"'
    )
    .sorted("workoutDate", true);
}

//highest rmValue of a exercise
export async function getRecordRMforExercise(exerciseId, workoutId) {
  if (exerciseId !== undefined && workoutId !== undefined)
    return realm
      .objects("sets")
      .filtered("exercise._id ==" + '"' + exerciseId + '"')
      .max("rmValue");
}

//export async function getTotal(m, d, y) {
export async function getTotal(m, d, y, profile = 1) {
  var start = new Date();
  // start.setHours(0,0,0,0);
  // console.log("month----->", m);
  start.setUTCMonth(m);
  start.setUTCFullYear(y);
  start.setUTCDate(d);
  start.setUTCHours(0, 0, 0, 0);
  // console.log("start--->", start);
  var end = new Date();
  end.setUTCMonth(m);
  end.setUTCFullYear(y);
  end.setUTCDate(d);
  end.setUTCHours(23, 59, 59, 999);

  // console.log("end", end);

  const filterByProfile = await realm
    .objects("workoutData")
    .filtered("profile._id == $0", profile);

  let data = filterByProfile
    .filtered("workoutDate >= $0", start)
    .filtered("workoutDate < $0", end);
  if (data.length > 0) {
    let uniqueWorkoutNames = [];
    data.map((dat) => {
      if (uniqueWorkoutNames.indexOf(dat.workout.name) < 0) {
        uniqueWorkoutNames.push(dat.workout.name);
      }
    });
    let finalData = uniqueWorkoutNames.map((id) => {
      let obj = {
        workoutName: id,
      };
      obj.sumData = [];
      // console.log("DATA ", id);
      data.forEach((dat) => {
        if (dat.workout.name === id) {
          obj.sumData.push({
            exerciseName: dat.exercise.name,
            sets: dat.sets,
            sum:
              dat.totalWeightLifted === undefined ? 0 : dat.totalWeightLifted,
            workoutName: dat.workout.name,
            exerciseId: dat.exercise._id,
            workoutId: dat.workout._id,
          });
        }
      });
      return obj;
    });
    // console.log("finalData total---->", finalData[0].sumData);

    return finalData;
  } else return data;
}

export async function allWorkoutsOrdered() {
  return realm.objects("workouts").sorted("_id", true);
}

export async function allSets() {
  return realm.objects("sets").sorted("_id", true);
}

export async function getOrderedWorkoutData() {
  return realm.objects("workoutData").sorted("_id", true);
}

export async function getOrderedWorkoutDays() {
  return realm.objects("workoutDays").sorted("_id", true);
}


export async function getExerciseHistoryWeekly(m,d,y,exer){
  // console.log('month--->',m)
  // console.log('year --->',y)
  // console.log('day --->',d)
  // console.log('exercise --->',exer)
  let start = new Date();
  start.setUTCMonth(m)
  start.setUTCFullYear(y)
  start.setUTCDate(d)
  start.setUTCHours(23,59,59,999);
  let week1Date = new Date()
  week1Date.setUTCMonth(m)
  week1Date.setUTCFullYear(y)
  week1Date.setUTCDate(d)
  week1Date.setUTCHours(23,59,59,999);

  let week2Date = new Date()
  week2Date.setUTCMonth(m)
  week2Date.setUTCFullYear(y)
  week2Date.setUTCDate(d)
  week2Date.setUTCHours(23,59,59,999);

  let week3Date = new Date()
  week3Date.setUTCMonth(m)
  week3Date.setUTCFullYear(y)
  week3Date.setUTCDate(d)
  week3Date.setUTCHours(23,59,59,999);

  let week4Date = new Date()
  week4Date.setUTCMonth(m)
  week4Date.setUTCFullYear(y)
  week4Date.setUTCDate(d)
  week4Date.setUTCHours(23,59,59,999);

  let week5Date = new Date()
  week5Date.setUTCMonth(m)
  week5Date.setUTCFullYear(y)
  week5Date.setUTCDate(d)
  week5Date.setUTCHours(23,59,59,999);

  let week6Date = new Date()
  week6Date.setUTCMonth(m)
  week6Date.setUTCFullYear(y)
  week6Date.setUTCDate(d)
  week6Date.setUTCHours(23,59,59,999);

  let week1 = new Date(week1Date.setUTCDate(week1Date.getUTCDate() - 7))
  let week2 = new Date(week2Date.setUTCDate(week2Date.getUTCDate() - 14))
  let week3 = new Date(week3Date.setUTCDate(week3Date.getUTCDate() - 21))
  let week4 = new Date(week4Date.setUTCDate(week4Date.getUTCDate() - 28))
  let week5 = new Date(week5Date.setUTCDate(week5Date.getUTCDate() - 35))
  let week6 = new Date(week6Date.setUTCDate(week6Date.getUTCDate() - 42))
  let dateArray = [week1,week2,week3,week4,week5,week6]
  let sum1= await realm.objects('workoutData').filtered('workoutDate >= $0' , week1).filtered('workoutDate < $0' , start)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sum2 = await realm.objects('workoutData').filtered('workoutDate >= $0' , week2).filtered('workoutDate < $0' , week1)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sum3 = await realm.objects('workoutData').filtered('workoutDate >= $0' , week3).filtered('workoutDate < $0' , week2)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sum4 = await realm.objects('workoutData').filtered('workoutDate >= $0' , week4).filtered('workoutDate < $0' , week3)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sum5 = await realm.objects('workoutData').filtered('workoutDate >= $0' , week5).filtered('workoutDate < $0' , week4)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sum6 = await realm.objects('workoutData').filtered('workoutDate >= $0' , week6).filtered('workoutDate < $0' , week5)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sumsOfValue = [sum1,sum2,sum3,sum4,sum5,sum6]
  return {
      dateArray,
      sumsOfValue
  }
}

export async function getExerciseRepsHistoryWeekly(m,d,y,exer){
  // console.log('month--->',m)
  // console.log('year --->',y)
  // console.log('day --->',d)
  // console.log('exercise --->',exer)
  let start = new Date();
  start.setUTCMonth(m)
  start.setUTCFullYear(y)
  start.setUTCDate(d)
  start.setUTCHours(23,59,59,999);
  let week1Date = new Date()
  week1Date.setUTCMonth(m)
  week1Date.setUTCFullYear(y)
  week1Date.setUTCDate(d)
  week1Date.setUTCHours(23,59,59,999);

  let week2Date = new Date()
  week2Date.setUTCMonth(m)
  week2Date.setUTCFullYear(y)
  week2Date.setUTCDate(d)
  week2Date.setUTCHours(23,59,59,999);

  let week3Date = new Date()
  week3Date.setUTCMonth(m)
  week3Date.setUTCFullYear(y)
  week3Date.setUTCDate(d)
  week3Date.setUTCHours(23,59,59,999);

  let week4Date = new Date()
  week4Date.setUTCMonth(m)
  week4Date.setUTCFullYear(y)
  week4Date.setUTCDate(d)
  week4Date.setUTCHours(23,59,59,999);

  let week5Date = new Date()
  week5Date.setUTCMonth(m)
  week5Date.setUTCFullYear(y)
  week5Date.setUTCDate(d)
  week5Date.setUTCHours(23,59,59,999);

  let week6Date = new Date()
  week6Date.setUTCMonth(m)
  week6Date.setUTCFullYear(y)
  week6Date.setUTCDate(d)
  week6Date.setUTCHours(23,59,59,999);

  let week1 = new Date(week1Date.setUTCDate(week1Date.getUTCDate() - 7))
  let week2 = new Date(week2Date.setUTCDate(week2Date.getUTCDate() - 14))
  let week3 = new Date(week3Date.setUTCDate(week3Date.getUTCDate() - 21))
  let week4 = new Date(week4Date.setUTCDate(week4Date.getUTCDate() - 28))
  let week5 = new Date(week5Date.setUTCDate(week5Date.getUTCDate() - 35))
  let week6 = new Date(week6Date.setUTCDate(week6Date.getUTCDate() - 42))
  let dateArray = [week1,week2,week3,week4,week5,week6]
  let sum1= await realm.objects('workoutData').filtered('workoutDate >= $0' , week1).filtered('workoutDate < $0' , start)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sum2 = await realm.objects('workoutData').filtered('workoutDate >= $0' , week2).filtered('workoutDate < $0' , week1)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sum3 = await realm.objects('workoutData').filtered('workoutDate >= $0' , week3).filtered('workoutDate < $0' , week2)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sum4 = await realm.objects('workoutData').filtered('workoutDate >= $0' , week4).filtered('workoutDate < $0' , week3)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sum5 = await realm.objects('workoutData').filtered('workoutDate >= $0' , week5).filtered('workoutDate < $0' , week4)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sum6 = await realm.objects('workoutData').filtered('workoutDate >= $0' , week6).filtered('workoutDate < $0' , week5)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sumsOfValue = [sum1,sum2,sum3,sum4,sum5,sum6]
  return {
      dateArray,
      sumsOfValue
  }
}


export async function getExerciseHistoryMonthly(m,d,y,exer){
  let start = new Date();
  start.setUTCMonth(m)
  start.setUTCFullYear(y)
  start.setUTCDate(d)
  start.setUTCHours(23,59,59,999);
  let month1Date = new Date()
  month1Date.setUTCMonth(m)
  month1Date.setUTCFullYear(y)
  month1Date.setUTCDate(d)
  month1Date.setUTCHours(23,59,59,999);

  let month2Date = new Date()
  month2Date.setUTCMonth(m)
  month2Date.setUTCFullYear(y)
  month2Date.setUTCDate(d)
  month2Date.setUTCHours(23,59,59,999);

  let month3Date = new Date()
  month3Date.setUTCMonth(m)
  month3Date.setUTCFullYear(y)
  month3Date.setUTCDate(d)
  month3Date.setUTCHours(23,59,59,999);

  let month4Date = new Date()
  month4Date.setUTCMonth(m)
  month4Date.setUTCFullYear(y)
  month4Date.setUTCDate(d)
  month4Date.setUTCHours(23,59,59,999);

  let month5Date = new Date()
  month5Date.setUTCMonth(m)
  month5Date.setUTCFullYear(y)
  month5Date.setUTCDate(d)
  month5Date.setUTCHours(23,59,59,999);

  let month6Date = new Date()
  month6Date.setUTCMonth(m)
  month6Date.setUTCFullYear(y)
  month6Date.setUTCDate(d)
  month6Date.setUTCHours(23,59,59,999);

  let month1 = new Date(month1Date.setUTCDate(month1Date.getUTCDate() - 30))
  let month2 = new Date(month2Date.setUTCDate(month2Date.getUTCDate() - 60))
  let month3 = new Date(month3Date.setUTCDate(month3Date.getUTCDate() - 90))
  let month4 = new Date(month4Date.setUTCDate(month4Date.getUTCDate() - 120))
  let month5 = new Date(month5Date.setUTCDate(month5Date.getUTCDate() - 150))
  let month6 = new Date(month6Date.setUTCDate(month6Date.getUTCDate() - 180))
  let dateArray = [month1,month2,month3,month4,month5,month6]
  let sum1= await realm.objects('workoutData').filtered('workoutDate >= $0' , month1).filtered('workoutDate < $0' , start)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sum2 = await realm.objects('workoutData').filtered('workoutDate >= $0' , month2).filtered('workoutDate < $0' , month1)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sum3 = await realm.objects('workoutData').filtered('workoutDate >= $0' , month3).filtered('workoutDate < $0' , month2)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sum4 = await realm.objects('workoutData').filtered('workoutDate >= $0' , month4).filtered('workoutDate < $0' , month3)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sum5 = await realm.objects('workoutData').filtered('workoutDate >= $0' , month5).filtered('workoutDate < $0' , month4)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sum6 = await realm.objects('workoutData').filtered('workoutDate >= $0' , month6).filtered('workoutDate < $0' , month5)
  .filtered('exercise._id == '+"\""+exer+"\"").sum('totalWeightLifted')
  let sumsOfValue = [sum1,sum2,sum3,sum4,sum5,sum6]
  return {
      dateArray,
      sumsOfValue
  }
}



export async function getWorkoutHistoryWeekly(m,d,y,workout){
  let start = new Date();
  start.setUTCMonth(m)
  start.setUTCFullYear(y)
  start.setUTCDate(d)
  start.setUTCHours(23,59,59,999);
  let week1Date = new Date()
  week1Date.setUTCMonth(m)
  week1Date.setUTCFullYear(y)
  week1Date.setUTCDate(d)
  week1Date.setUTCHours(23,59,59,999);

  let week2Date = new Date()
  week2Date.setUTCMonth(m)
  week2Date.setUTCFullYear(y)
  week2Date.setUTCDate(d)
  week2Date.setUTCHours(23,59,59,999);

  let week3Date = new Date()
  week3Date.setUTCMonth(m)
  week3Date.setUTCFullYear(y)
  week3Date.setUTCDate(d)
  week3Date.setUTCHours(23,59,59,999);

  let week4Date = new Date()
  week4Date.setUTCMonth(m)
  week4Date.setUTCFullYear(y)
  week4Date.setUTCDate(d)
  week4Date.setUTCHours(23,59,59,999);

  let week5Date = new Date()
  week5Date.setUTCMonth(m)
  week5Date.setUTCFullYear(y)
  week5Date.setUTCDate(d)
  week5Date.setUTCHours(23,59,59,999);

  let week6Date = new Date()
  week6Date.setUTCMonth(m)
  week6Date.setUTCFullYear(y)
  week6Date.setUTCDate(d)
  week6Date.setUTCHours(23,59,59,999);

  let week1 = new Date(week1Date.setUTCDate(week1Date.getUTCDate() - 7))
  let week2 = new Date(week2Date.setUTCDate(week2Date.getUTCDate() - 14))
  let week3 = new Date(week3Date.setUTCDate(week3Date.getUTCDate() - 21))
  let week4 = new Date(week4Date.setUTCDate(week4Date.getUTCDate() - 28))
  let week5 = new Date(week5Date.setUTCDate(week5Date.getUTCDate() - 35))
  let week6 = new Date(week6Date.setUTCDate(week6Date.getUTCDate() - 42))
  let dateArray = [week1,week2,week3,week4,week5,week6]
  let sum1= await realm.objects('workoutData').filtered('workoutDate >= $0' , week1).filtered('workoutDate < $0' , start)
  .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')
  let sum2 = await realm.objects('workoutData').filtered('workoutDate >= $0' , week2).filtered('workoutDate < $0' , week1)
  .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')
  let sum3 = await realm.objects('workoutData').filtered('workoutDate >= $0' , week3).filtered('workoutDate < $0' , week2)
  .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')
  let sum4 = await realm.objects('workoutData').filtered('workoutDate >= $0' , week4).filtered('workoutDate < $0' , week3)
  .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')
  let sum5 = await realm.objects('workoutData').filtered('workoutDate >= $0' , week5).filtered('workoutDate < $0' , week4)
  .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')
  let sum6 = await realm.objects('workoutData').filtered('workoutDate >= $0' , week6).filtered('workoutDate < $0' , week5)
  .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')


  let sumsOfValue = [sum1,sum2,sum3,sum4,sum5,sum6]
  return {
      dateArray,
      sumsOfValue
  }
}

export async function getWorkoutHistoryMonthly(m,d,y,workout){
  let start = new Date();
  start.setUTCMonth(m)
  start.setUTCFullYear(y)
  start.setUTCDate(d)
  start.setUTCHours(23,59,59,999);
  let month1Date = new Date()
  month1Date.setUTCMonth(m)
  month1Date.setUTCFullYear(y)
  month1Date.setUTCDate(d)
  month1Date.setUTCHours(23,59,59,999);

  let month2Date = new Date()
  month2Date.setUTCMonth(m)
  month2Date.setUTCFullYear(y)
  month2Date.setUTCDate(d)
  month2Date.setUTCHours(23,59,59,999);

  let month3Date = new Date()
  month3Date.setUTCMonth(m)
  month3Date.setUTCFullYear(y)
  month3Date.setUTCDate(d)
  month3Date.setUTCHours(23,59,59,999);

  let month4Date = new Date()
  month4Date.setUTCMonth(m)
  month4Date.setUTCFullYear(y)
  month4Date.setUTCDate(d)
  month4Date.setUTCHours(23,59,59,999);

  let month5Date = new Date()
  month5Date.setUTCMonth(m)
  month5Date.setUTCFullYear(y)
  month5Date.setUTCDate(d)
  month5Date.setUTCHours(23,59,59,999);

  let month6Date = new Date()
  month6Date.setUTCMonth(m)
  month6Date.setUTCFullYear(y)
  month6Date.setUTCDate(d)
  month6Date.setUTCHours(23,59,59,999);

  let month1 = new Date(month1Date.setUTCDate(month1Date.getUTCDate() - 30))
  let month2 = new Date(month2Date.setUTCDate(month2Date.getUTCDate() - 60))
  let month3 = new Date(month3Date.setUTCDate(month3Date.getUTCDate() - 90))
  let month4 = new Date(month4Date.setUTCDate(month4Date.getUTCDate() - 120))
  let month5 = new Date(month5Date.setUTCDate(month5Date.getUTCDate() - 150))
  let month6 = new Date(month6Date.setUTCDate(month6Date.getUTCDate() - 180))
  let dateArray = [month1,month2,month3,month4,month5,month6]
  let sum1= await realm.objects('workoutData').filtered('createdDate >= $0' , month1).filtered('createdDate < $0' , start)
  .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')
  let sum2 = await realm.objects('workoutData').filtered('createdDate >= $0' , month2).filtered('createdDate < $0' , month1)
  .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')
  let sum3 = await realm.objects('workoutData').filtered('createdDate >= $0' , month3).filtered('createdDate < $0' , month2)
  .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')
  let sum4 = await realm.objects('workoutData').filtered('createdDate >= $0' , month4).filtered('createdDate < $0' , month3)
  .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')
  let sum5 = await realm.objects('workoutData').filtered('createdDate >= $0' , month5).filtered('createdDate < $0' , month4)
  .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')
  let sum6 = await realm.objects('workoutData').filtered('createdDate >= $0' , month6).filtered('createdDate < $0' , month5)
  .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')
  let sumsOfValue = [sum1,sum2,sum3,sum4,sum5,sum6]
  return {
      dateArray,
      sumsOfValue
  }
}

export async function getWeightGraphData(m,d,y,workout,profile=1){
  let start = new Date();
  start.setUTCMonth(m)
  start.setUTCFullYear(y)
  start.setUTCDate(d)
  start.setUTCHours(23,59,59,999);
  let month1Date = new Date()
  month1Date.setUTCMonth(m)
  month1Date.setUTCFullYear(y)
  month1Date.setUTCDate(d)
  month1Date.setUTCHours(23,59,59,999);

  let month2Date = new Date()
  month2Date.setUTCMonth(m)
  month2Date.setUTCFullYear(y)
  month2Date.setUTCDate(d)
  month2Date.setUTCHours(23,59,59,999);

  let month3Date = new Date()
  month3Date.setUTCMonth(m)
  month3Date.setUTCFullYear(y)
  month3Date.setUTCDate(d)
  month3Date.setUTCHours(23,59,59,999);

  let month4Date = new Date()
  month4Date.setUTCMonth(m)
  month4Date.setUTCFullYear(y)
  month4Date.setUTCDate(d)
  month4Date.setUTCHours(23,59,59,999);

  let month5Date = new Date()
  month5Date.setUTCMonth(m)
  month5Date.setUTCFullYear(y)
  month5Date.setUTCDate(d)
  month5Date.setUTCHours(23,59,59,999);

  let month6Date = new Date()
  month6Date.setUTCMonth(m)
  month6Date.setUTCFullYear(y)
  month6Date.setUTCDate(d)
  month6Date.setUTCHours(23,59,59,999);

  let month1 = new Date(month1Date.setUTCDate(month1Date.getUTCDate() - 30))
  let month2 = new Date(month2Date.setUTCDate(month2Date.getUTCDate() - 60))
  let month3 = new Date(month3Date.setUTCDate(month3Date.getUTCDate() - 90))
  let month4 = new Date(month4Date.setUTCDate(month4Date.getUTCDate() - 120))
  let month5 = new Date(month5Date.setUTCDate(month5Date.getUTCDate() - 150))
  let month6 = new Date(month6Date.setUTCDate(month6Date.getUTCDate() - 180))
  let dateArray = [month1,month2,month3,month4,month5,month6]
  // let sum1= await realm.objects('workoutData').filtered('createdDate >= $0' , month1).filtered('createdDate < $0' , start)
  // .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')
  // let sum2 = await realm.objects('workoutData').filtered('createdDate >= $0' , month2).filtered('createdDate < $0' , month1)
  // .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')
  // let sum3 = await realm.objects('workoutData').filtered('createdDate >= $0' , month3).filtered('createdDate < $0' , month2)
  // .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')
  // let sum4 = await realm.objects('workoutData').filtered('createdDate >= $0' , month4).filtered('createdDate < $0' , month3)
  // .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')
  // let sum5 = await realm.objects('workoutData').filtered('createdDate >= $0' , month5).filtered('createdDate < $0' , month4)
  // .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')
  // let sum6 = await realm.objects('workoutData').filtered('createdDate >= $0' , month6).filtered('createdDate < $0' , month5)
  // .filtered('workout._id == '+"\""+workout+"\"").sum('totalWeightLifted')
  // let sumsOfValue = [sum1,sum2,sum3,sum4,sum5,sum6]
  // return {
  //     dateArray,
  //     sumsOfValue
  // }
  const weightHistory = realm.objects("weightHistory");
  if (weightHistory.length === 0) {
    return weightHistory;
  } else {
    const filterredProfile = realm
      .objects("weightHistory")
      .filtered("profile._id == $0", profile);
    return filterredProfile.sorted("_id", true);
  }
}
