import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import {
  getChartFailure,
  getChartSuccess,
  getChartStart,
} from "./chartSlice";

function* fetchChart() {
  try {
    const reqOptions = {
      url: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eth",
      method: "GET",
    };

    let response = yield axios.request(reqOptions);
    yield put(getChartSuccess(response.data));
  } catch (error) {
    yield put(getChartFailure(error.message));
  }
}

function* watchFetchChart() {
  yield takeLatest(getChartStart.type, fetchChart);
}

export function* chartSaga() {
  yield all([call(watchFetchChart)]);
}
