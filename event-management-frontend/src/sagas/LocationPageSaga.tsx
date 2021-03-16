import { put, takeLatest, call } from 'redux-saga/effects';
import { locationFetchSucces, LocationActionTypes, locationError } from '../actions/LocationActions';
import { fetchLocation } from '../api/HeaderEventCrudAPI';

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
