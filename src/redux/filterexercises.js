import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredExercises: [],
};

export const filterExercisesSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filteredExercises: (state, action) => {
      state.filteredExercises = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { filteredExercises } = filterExercisesSlice.actions;

export default filterExercisesSlice.reducer;
