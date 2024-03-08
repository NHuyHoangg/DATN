import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isSeller: false
  },
  reducers: {
    set(state, action) {
      state.isSeller = action.payload;
    },
    validateSeller(state, action) {
      state.isSeller = true;
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice;
