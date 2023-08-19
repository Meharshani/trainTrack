import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latestWorkout: null,
};

export const latestWorkoutSlice = createSlice({
  name: "latestWorkout",
  initialState,
  reducers: {
    setLatestWorkout: (state, action) => {
      state.latestWorkout = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLatestWorkout } = latestWorkoutSlice.actions;

export default latestWorkoutSlice.reducer;
