import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    addWallet: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addWallet } = walletSlice.actions;
export default walletSlice.reducer;