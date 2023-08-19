import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sound: true,
};

export const soundSlice = createSlice({
  name: "sound",
  initialState,
  reducers: {
    setSoundONOFF: (state, action) => {
      state.sound = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSoundONOFF } = soundSlice.actions;

export default soundSlice.reducer;
