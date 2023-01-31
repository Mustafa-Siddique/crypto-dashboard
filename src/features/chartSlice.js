import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  error: "",
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    getChartStart: (state, action) => {},
    getChartSuccess: (state, action) => {
      state.data = action.payload;
    },
    getChartFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getChartStart, getChartSuccess, getChartFailure } =
  chartSlice.actions;

export default chartSlice.reducer;
