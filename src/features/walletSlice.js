import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: "",
};

// Slice
export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    addWallet: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Actions
export const { addWallet } = walletSlice.actions;
export default walletSlice.reducer;