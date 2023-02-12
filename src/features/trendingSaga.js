import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import { getTrendingFailure, getTrendingSuccess } from "./trendingSlice";

// Fetch trending data from coingecko API
function* fetchTrending() {
  try {
    const reqOptions = {
      url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false&price_change_percentage=24h",
      method: "GET",
    };

    let response = yield axios.request(reqOptions);
    yield put(getTrendingSuccess(response.data));
  } catch (error) {
    yield put(getTrendingFailure(error.message));
  }
}

// Watcher saga
function* watchFetchTrending() {
  yield takeLatest("trending/getTrendingStart", fetchTrending);
}

// Export saga
export function* trendingSaga() {
  yield all([call(watchFetchTrending)]);
}
