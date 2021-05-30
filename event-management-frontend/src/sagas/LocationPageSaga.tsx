import { put, takeLatest, call, takeEvery } from 'redux-saga/effects';
import {
  locationFetchSucces,
  LocationActionTypes,
  locationError,
  fetchAllLocationsStatisticsSuccess,
  fetchAllLocationsStatisticsError,
} from '../actions/LocationActions';
import { fetchLocation } from '../api/HeaderEventCrudAPI';
import { getLocationsStatistics } from '../api/LocationServiceAPI';

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

function* fetchAllLocationsStatistics() {
  try {
    const response = yield call(() => getLocationsStatistics());
    yield put(fetchAllLocationsStatisticsSuccess(response));
  } catch (error) {
    yield put(fetchAllLocationsStatisticsError(error));
  }
}

export function* watchFetchLocationsStatisticsAsync() {
  yield takeEvery(LocationActionTypes.LOCATIONS_FETCH_STATISTICS, fetchAllLocationsStatistics);
}
