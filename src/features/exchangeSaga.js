import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import {
  getExchangeFailure,
  getExchangeSuccess,
  getExchangeStart,
} from "./exchangeSlice";

// Fetch exchange data from coingecko API
function* fetchExchange(e) {
  try {
    const reqOptions = {
      url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eth",
      method: "GET",
    };

    let response = yield axios.request(reqOptions);
    yield put(getExchangeSuccess(response.data));
  } catch (error) {
    yield put(getExchangeFailure(error.message));
  }
}

// Watcher saga
function* watchFetchExchange() {
  yield takeLatest(getExchangeStart.type, fetchExchange);
}

// Export saga
export function* exchangeSaga() {
  yield all([call(watchFetchExchange)]);
}
