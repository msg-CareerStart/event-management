import { call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchStatisticsEventFailure,
  fetchStatisticsEventRequest,
  fetchStatisticsEventSuccess,
  FETCH_STATISTICS_EVENT,
} from '../actions/EventStatisticsAction';
import { fetchEventStatistics } from '../api/HeaderEventCrudAPI';

function* fetchStatisticsEventAsync() {
  try {
    yield put(fetchStatisticsEventRequest());
    const events = yield call(() => fetchEventStatistics());
    yield put(fetchStatisticsEventSuccess(events));
  } catch (e) {
    yield put(fetchStatisticsEventFailure(e));
  }
}

export function* watchFetchStatisticsEventAsync() {
  yield takeEvery(FETCH_STATISTICS_EVENT, fetchStatisticsEventAsync);
}
