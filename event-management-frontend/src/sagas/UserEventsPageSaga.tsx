import { takeEvery, put, call } from 'redux-saga/effects';
import {
  fetchUserEventsSuccess,
  fetchUserEventsError,
  fetchUserEventsRequest,
  fetchUserEventsLocationsSuccess,
  fetchUserEventsLocationsError,
  fetchUserEventsLocationsRequest,
  UserEventsPageActionTypes,
  FetchUserEventsAction,
} from '../actions/UserEventsPageActions';
import { fetchEvents, fetchEventsLocations } from '../api/UserEventsPageAPI';
import { UserEventIsFilterType } from '../model/userEventsPage/UserEventIsFilterType';

function* fetchUserEventsAsync(action: FetchUserEventsAction) {
  yield put(fetchUserEventsRequest());
  try {
    if (action.isFilter !== UserEventIsFilterType.NOT_IN_USE) {
      const result = yield call(() => fetchEvents(action.page, action.limit, action.filters));
      yield put(fetchUserEventsSuccess(result.events, result.more));
    } else {
      const result = yield call(() => fetchEvents(action.page, action.limit));
      yield put(fetchUserEventsSuccess(result.events, result.more));
    }
  } catch (err) {
    yield put(fetchUserEventsError());
  }
}

export function* watchFetchUserEventsAsync() {
  yield takeEvery(UserEventsPageActionTypes.FETCH_USER_EVENTS, fetchUserEventsAsync);
}

function* fetchUserEventsLocationsAsync() {
  yield put(fetchUserEventsLocationsRequest());
  try {
    const result = yield call(() => fetchEventsLocations());
    yield put(fetchUserEventsLocationsSuccess(result));
  } catch (err) {
    yield put(fetchUserEventsLocationsError());
  }
}

export function* watchFetchUserEventsLocationsAsync() {
  yield takeEvery(UserEventsPageActionTypes.FETCH_USER_EVENTS_LOCATIONS, fetchUserEventsLocationsAsync);
}
