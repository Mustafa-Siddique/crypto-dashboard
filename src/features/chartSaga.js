// @ts-check
import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import { getChartFailure, getChartSuccess, getChartStart } from "./chartSlice";

// Fetch chart data from coingecko API
function* fetchChart(e) {
  try {
    const reqOptions = {
      url: `https://api.coingecko.com/api/v3/coins/${e.payload.asset}/market_chart?vs_currency=${e.payload.currency}&days=${e.payload.time}`,
      method: "GET",
    };
    
    let response = yield axios.request(reqOptions);
    yield put(getChartSuccess(response.data));
  } catch (error) {
    yield put(getChartFailure(error.message));
  }
}

// Watcher saga
function* watchFetchChart() {
  yield takeLatest(getChartStart.type, fetchChart);
}

// Export saga
export function* chartSaga() {
  yield all([call(watchFetchChart)]);
}
