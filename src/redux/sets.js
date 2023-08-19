import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sets: [],
};

export const setsOfExercises = createSlice({
  name: "sets",
  initialState,
  reducers: {
    setsEx: (state, action) => {
      state.sets = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setsEx } = setsOfExercises.actions;

export default setsOfExercises.reducer;
