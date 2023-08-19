import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workout: null,
};

export const currentWorkoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setCurrentWorkout: (state, action) => {
      state.workout = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentWorkout } = currentWorkoutSlice.actions;

export default currentWorkoutSlice.reducer;
