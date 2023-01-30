import { all, call } from 'redux-saga/effects';
import { trendingSaga } from '../features/trendingSaga';

export function* rootSaga() {
  yield all([call(trendingSaga)]);
}