import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { getTrendingFailure, getTrendingSuccess } from './trendingSlice';

function* fetchTrending() {
    try {
        const reqOptions = {
        url: "https://api.coingecko.com/api/v3/search/trending",
        method: "GET",
      }
      
      let response = yield axios.request(reqOptions);
        yield put(getTrendingSuccess(response.data));
    } catch (error) {
        yield put(getTrendingFailure(error.message));
    }
}

function* watchFetchTrending() {
  yield takeLatest('trending/getTrendingStart', fetchTrending);
}

export function* trendingSaga() {
    yield all([call(watchFetchTrending)]);
}