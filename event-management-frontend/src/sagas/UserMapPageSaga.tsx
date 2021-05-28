import { takeEvery, put, call } from 'redux-saga/effects';
import {
  fetchLocationFromIdLocationFailure,
  fetchLocationFromIdLocationSuccess,
  FETCH_LOCATION_FROM_ID_LOCATION,
} from '../actions/UserMapPageActions';
import { fetchEventLocation } from '../api/UserMapPageAPI';

interface Props {
  type: string;
  id: number;
}

function* fetchLocationFromIdLocationAsync(props: Props) {
  try {
    const location = yield call(() => fetchEventLocation(props.id));
    yield put(fetchLocationFromIdLocationSuccess(location));
  } catch (error) {
    yield put(fetchLocationFromIdLocationFailure(error));
  }
}

export function* watchFetchLocationFromIdLocationAsync() {
  yield takeEvery(FETCH_LOCATION_FROM_ID_LOCATION, fetchLocationFromIdLocationAsync);
}
