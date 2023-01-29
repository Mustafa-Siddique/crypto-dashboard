import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

export const trendingSlice = createSlice({
    name: "trending",
    initialState,
    reducers: {
        getTrending: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { getTrending } = trendingSlice.actions;

export default trendingSlice.reducer;

    