import { call, put, takeEvery } from 'redux-saga/effects';
import {
  loadDiscountsForEventFailure,
  loadDiscountsForEventSuccess,
  loadDiscountsForEventRequest,
  LOAD_DISCOUNTS_FOR_EVENT,
} from '../actions/DiscountForEventActions';
import { discountCodesForEventAPI } from '../api/EventsServiceAPI';

function* loadDiscountsForEventAsync(action: any) {
  try {
    yield put(loadDiscountsForEventRequest());
    const discounts = yield call(() => discountCodesForEventAPI(action.payload));
    yield put(loadDiscountsForEventSuccess(discounts));
  } catch (e) {
    yield put(loadDiscountsForEventFailure(e));
  }
}

export function* watchLoadDiscountsForEventAsync() {
  yield takeEvery(LOAD_DISCOUNTS_FOR_EVENT, loadDiscountsForEventAsync);
}
