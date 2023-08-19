import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { profile } = profileSlice.actions;

export default profileSlice.reducer;
