import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  error: "",
  dropdownCurrency: "usd",
  dropdownTime: "1",
  dropdownAsset: "bitcoin",
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setDropDown: (state, action) => {
      if (action.payload.type === "currency") {
        state.dropdownCurrency = action.payload.value;
      } else if (action.payload.type === "time") {
        state.dropdownTime = action.payload.value;
      } else if (action.payload.type === "asset") {
        state.dropdownAsset = action.payload.value;
      }
    },
    getChartStart: (state, action) => {},
    getChartSuccess: (state, action) => {
      state.data = action.payload;
    },
    getChartFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { getChartStart, getChartSuccess, getChartFailure, setDropDown } =
  chartSlice.actions;

export default chartSlice.reducer;
