import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  exerciseType: "EXERCISE TYPE",
  exerciseMuscle: "MUSCLE GROUP",
};

export const dropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    dropdownType: (state, action) => {
      state.exerciseType = action.payload;
    },
    dropdownMuscle: (state, action) => {
      state.exerciseMuscle = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { dropdownType, dropdownMuscle } = dropdownSlice.actions;

export default dropdownSlice.reducer;
