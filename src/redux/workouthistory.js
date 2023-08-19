import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
};

export const workoutHistory = createSlice({
  name: "workouthistory",
  initialState,
  reducers: {
    workoutHis: (state, action) => {
      state.history = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { workoutHis } = workoutHistory.actions;

export default workoutHistory.reducer;
