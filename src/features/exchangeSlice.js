import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: [],
  error: "",
};

// Slice
export const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    getExchangeStart: (state, action) => {},
    getExchangeSuccess: (state, action) => {
      state.data = action.payload;
    },
    getExchangeFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Actions
export const { getExchangeStart, getExchangeSuccess, getExchangeFailure } =
  exchangeSlice.actions;
  
export default exchangeSlice.reducer;
