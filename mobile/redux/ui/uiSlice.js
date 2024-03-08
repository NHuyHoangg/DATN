import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    screen: "login",
  },
  reducers: {
    setScreen(state, action) {
      state.screen = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
