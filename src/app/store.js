// @ts-check
import { configureStore } from "@reduxjs/toolkit";
import trendingReducer from "../features/trendingSlice";
import exchangeReducer from "../features/exchangeSlice";
import chartReducer from "../features/chartSlice";
import walletReducer from "../features/walletSlice";
import saga from "redux-saga";
import { rootSaga } from "./rootSaga";
import logger from "redux-logger";

// Saga middleware
const sagaMiddleware = saga();

const middleware = [sagaMiddleware];
if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

// Store
export const store = configureStore({
  reducer: {
    trending: trendingReducer,
    exchange: exchangeReducer,
    chart: chartReducer,
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    ...middleware,
  ],
});

// Run saga
sagaMiddleware.run(rootSaga);
