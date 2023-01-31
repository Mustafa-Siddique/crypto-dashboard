import { all, call } from 'redux-saga/effects';
import { trendingSaga } from '../features/trendingSaga';
import { exchangeSaga } from '../features/exchangeSaga'

export function* rootSaga() {
  yield all([call(trendingSaga), call(exchangeSaga)]);
}