import { applyMiddleware, configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import trendingReducer from "../features/trendingSlice";
import saga from "redux-saga";
import { rootSaga } from "./rootSaga";
import logger from "redux-logger";

// create an instance of the store and export it. The store is configured with the trendingReducer. and it should have a Middleware.

const sagaMiddleware = saga();

export const store = configureStore({
    reducer: {
        trending: trendingReducer,
    },
    middleware: (getDefaultMiddleware) =>
    [...getDefaultMiddleware({ thunk: false }), sagaMiddleware, process.env.NODE_ENV === 'development' && logger],
});

sagaMiddleware.run(rootSaga);