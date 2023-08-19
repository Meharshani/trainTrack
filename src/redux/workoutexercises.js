import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workoutexercises: [],
};

export const workoutExercises = createSlice({
  name: "workoutexercises",
  initialState,
  reducers: {
    workoutExs: (state, action) => {
      state.workoutexercises = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { workoutExs } = workoutExercises.actions;

export default workoutExercises.reducer;
