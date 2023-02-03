import { all, call } from "redux-saga/effects";
import { trendingSaga } from "../features/trendingSaga";
import { exchangeSaga } from "../features/exchangeSaga";
import { chartSaga } from "../features/chartSaga";

export function* rootSaga() {
  yield all([call(trendingSaga), call(exchangeSaga), call(chartSaga)]);
}