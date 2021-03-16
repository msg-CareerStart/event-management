import { put, takeLatest, call } from 'redux-saga/effects';
import {
  upcomingEventsFetchSucces,
  historyEventsFetchSucces,
  AdminHomePageActionTypes,
  upcomingEventsError,
  historyEventsError,
} from '../actions/AdminHomePageActions';
import { fetchUpcomingEventsAPI, fetchHistoryEventsAPI } from '../api/AdminHomePageAPI';

function* fetchUpcomingEvents() {
  try {
    const response = yield call(() => fetchUpcomingEventsAPI());
    yield put(upcomingEventsFetchSucces(response));
  } catch (err) {
    yield put(upcomingEventsError(true));
  }
}
export function* watchFetchUpcomingEventsAsync() {
  yield takeLatest(AdminHomePageActionTypes.UPCOMING_EVENTS_FETCH, fetchUpcomingEvents);
}

function* fetchHistoryEvents() {
  try {
    const response = yield call(() => fetchHistoryEventsAPI());
    yield put(historyEventsFetchSucces(response));
  } catch (err) {
    yield put(historyEventsError(true));
  }
}
export function* watchFetchHistoryEventsAsync() {
  yield takeLatest(AdminHomePageActionTypes.HISTORY_EVENTS_FETCH, fetchHistoryEvents);
}
