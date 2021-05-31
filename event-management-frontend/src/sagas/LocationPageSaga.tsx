import { put, takeLatest, call, takeEvery } from 'redux-saga/effects';
import { locationFetchSucces, LocationActionTypes, locationError } from '../actions/LocationActions';
import {
  fetchAllLocationsStatisticsError,
  fetchAllLocationsStatisticsSuccess,
  LOCATIONS_FETCH_STATISTICS,
} from '../actions/LocationStatisticsAction';
import { fetchLocation } from '../api/HeaderEventCrudAPI';
import { fetchLocationStatistics } from '../api/LocationServiceAPI';

function* fetchLocations() {
  try {
    const response = yield call(() => fetchLocation());
    yield put(locationFetchSucces(response));
  } catch (error) {
    yield put(locationError(error));
  }
}

export function* watchFetchLocationAsync() {
  yield takeLatest(LocationActionTypes.LOCATION_FETCH, fetchLocations);
}

function* fetchStatistics() {
  try {
    const response = yield call(() => fetchLocationStatistics());
    yield put(fetchAllLocationsStatisticsSuccess(response));
  } catch (error) {
    yield put(fetchAllLocationsStatisticsError(error));
  }
}

export function* watchFetchLocationsStatisticsAsync() {
  yield takeEvery(LOCATIONS_FETCH_STATISTICS, fetchStatistics);
}
