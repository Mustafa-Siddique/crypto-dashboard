import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: [],
  error: "",
};

// Slice
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

// Actions
export const { getTrendingStart, getTrendingSuccess, getTrendingFailure } =
  trendingSlice.actions;

export default trendingSlice.reducer;
