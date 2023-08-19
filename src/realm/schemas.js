exports.bodyComp = {
  name: "bodyComp",
  primaryKey: "_id",
  properties: {
    _id: "int",
    createdDate: "date",
    age: "int?",
    abdominal: "int?",
    chest: "int?",
    thigh: "int?",
    tricep: "int?",
    subscapular: "int?",
    midaxillary: "int?",
    bodyDensity: "float?",
    bodyFat: "float",
    fatChange: "float?",
    profile: "profile",
  },
};

exports.exercise = {
  name: "exercise",
  primaryKey: "_id",
  properties: {
    _id: "int",
    name: "string",
    notes: "string",
    type: "int",
    muscleGroup: "muscleGroup?",
    createdDate: "date",
    profile: "profile",
  },
};

exports.workoutsets = {
  name: "workoutsets",
  primaryKey: "_id",
  properties: {
    _id: "int",
    weight: "int",
    reps: "int",
    rmvalue: "int",
    isHighest: "bool?",
  },
};

exports.globals = {
  //DISCARDED
  name: "globals",
  properties: {
    username: "string",
    restInterval: "int?",
    alarm: "bool",
    gender: "int",
  },
};

exports.globalValues = {
  //WILL BE USED
  name: "globalValues",
  primaryKey: "_id",
  properties: {
    _id: "int",
    username: "string?",
    restInterval: "int?",
    alarm: "bool?",
    gender: "int?",
    profile: "profile",
  },
};

exports.muscleGroup = {
  name: "muscleGroup",
  primaryKey: "_id",
  properties: {
    _id: "int",
    name: "string",
    createdDate: "date",
    profile: "profile",
  },
};

exports.profile = {
  name: "profile",
  primaryKey: "_id",
  properties: {
    _id: "int",
    name: "string",
    gender: "string",
    age: "int",
    createdDate: "date",
  },
};

exports.weightHistory = {
  name: "weightHistory",
  primaryKey: "_id",
  properties: {
    _id: "int",
    weight: "float",
    weightDate: "date",
    change: "float?",
    profile: "profile",
  },
};

exports.workouts = {
  name: "workouts",
  primaryKey: "_id",
  properties: {
    _id: "int",
    name: "string",
    exercises: "exercise[]",
    createdDate: "date",
    profile: "profile",
    icon: "int",
  },
};

exports.sets = {
  name: "sets",
  primaryKey: "_id",
  properties: {
    _id: "int",
    weight: "int",
    reps: "int",
    isHeighest: "bool",
    rmValue: "int",
    exercise: "exercise",
    createdDate: "date",
    failedSet: "bool",
    warmupSet: "bool",
    profile: "profile",
    notes: "string?",
  },
};

exports.workoutData = {
  name: "workoutData",
  primaryKey: "_id",
  properties: {
    _id: "int",
    workout: "workouts",
    exercise: "exercise",
    workoutDate: "date",
    sets: "sets[]",
    profile: "profile",
    totalWeightLifted:'int'
  },
};

exports.shortcuts = {
  name: "shortcuts",
  primaryKey: "_id",
  properties: {
    _id: "int",
    workout: "workouts?",
    shortcutType: "string", //workout, screen
    screenName: "string?", //route name in case of screen
    profile: "profile",
  },
};

exports.workoutDays = {
  name: "workoutDays",
  primaryKey: "_id",
  properties: {
    _id: "int",
    month: "string",
    days: "int[]",
    year: "int",
    profile: "profile",
  },
};
