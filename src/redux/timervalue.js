import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timer: 0,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimerValue: (state, action) => {
      state.timer = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTimerValue } = timerSlice.actions;

export default timerSlice.reducer;
