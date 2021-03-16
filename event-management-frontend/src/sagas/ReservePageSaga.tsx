import { put, takeLatest, call } from 'redux-saga/effects';
import { ReserveTicketActionTypes, reserveEventFetchSucces, reserveEventError } from '../actions/ReserveTicketsActions';
import { fetchReserveEventAPI } from '../api/ReservePageAPI';

interface Props {
  type: string;
  id: number;
}

function* fetchReserveEvent(props: Props) {
  try {
    const response = yield call(() => fetchReserveEventAPI(props.id));
    yield put(reserveEventFetchSucces(response));
  } catch (error) {
    yield put(reserveEventError(true));
  }
}

export function* watchFetchReserveEventAsync() {
  yield takeLatest(ReserveTicketActionTypes.RESERVE_EVENT_FETCH, fetchReserveEvent);
}
