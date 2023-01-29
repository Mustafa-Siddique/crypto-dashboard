import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import trendingReducer from '../features/trendingSlice';

// create an instance of the store and export it. The store is configured with the trendingReducer. and it should have a Middleware.
export const store = configureStore({
    reducer: {
        trending: trendingReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
