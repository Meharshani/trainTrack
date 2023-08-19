import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backup: true,
};

export const backupSlice = createSlice({
  name: "backup",
  initialState,
  reducers: {
    backupHandler: (state, action) => {
      state.backup = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { backupHandler } = backupSlice.actions;

export default backupSlice.reducer;
