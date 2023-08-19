import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginDetails: (state, action) => {
      state.login = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoginDetails } = loginSlice.actions;

export default loginSlice.reducer;
