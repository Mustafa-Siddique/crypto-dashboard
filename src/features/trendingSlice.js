import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  error: "",
};

export const trendingSlice = createSlice({
  name: "trending",
  initialState,
  reducers: {
    getTrendingStart: (state, action) => {},
    getTrendingSuccess: (state, action) => {
      state.data = action.payload;
    },
    getTrendingFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getTrendingStart, getTrendingSuccess, getTrendingFailure } =
  trendingSlice.actions;

export default trendingSlice.reducer;
