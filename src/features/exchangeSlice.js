import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  error: "",
};

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

export const { getExchangeStart, getExchangeSuccess, getExchangeFailure } =
  exchangeSlice.actions;
  
export default exchangeSlice.reducer;
