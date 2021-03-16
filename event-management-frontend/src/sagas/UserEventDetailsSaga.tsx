import { takeLatest, put, call } from 'redux-saga/effects';
import {
  fetchEventWithLocationRequest,
  fetchEventWithLocationSuccess,
  fetchEventWithLocationFailure,
  UserEventDetailsActionTypes,
  LoadEventWithLocationsAction,
} from '../actions/UserEventDetailsActions';
import { fetchEventWithLocationsAPI } from '../api/UserEventDetailsAPI';

//-----------------------------------------LOAD EVENT WITH LOCATIONS
function* loadEventWithLocationsAsync(props: LoadEventWithLocationsAction) {
  try {
    yield put(fetchEventWithLocationRequest());
    const event = yield call(() => fetchEventWithLocationsAPI(props.id));
    event.eventDto.id = parseInt(props.id);
    yield put(fetchEventWithLocationSuccess(event));
  } catch (e) {
    yield put(fetchEventWithLocationFailure(e));
  }
}

export function* watchLoadEventWithLocationAsync() {
  yield takeLatest(UserEventDetailsActionTypes.LOAD_EVENT_WITH_LOCATIONS, loadEventWithLocationsAsync);
}
