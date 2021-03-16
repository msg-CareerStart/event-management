import { takeLatest, call, put } from 'redux-saga/effects';
import {
  LOAD_EVENT,
  fetchEventRequest,
  fetchEventSuccess,
  fetchEventFailure,
  DELETE_EVENT,
  deleteEventRequest,
  deleteEventSuccess,
  deleteEventFailure,
  ADD_EVENT,
  addEventRequest,
  addEventSuccess,
  addEventFailure,
  editEventRequest,
  editEventSuccess,
  editEventFailure,
  EDIT_EVENT,
} from '../actions/HeaderEventCrudActions';
import {
  fetchEventAPI,
  deleteEventAPI,
  addEventAPI,
  editEventAPI,
  updateImagesFromS3,
} from '../api/HeaderEventCrudAPI';
import { EventCrud } from '../model/EventCrud';
import { EventImage } from '../model/EventImage';

interface Props {
  type: string;
  payload: string;
}

interface AddProps {
  type: string;
  payload: { event: EventCrud; images: EventImage[] };
}

//-----------------------------------------LOAD EVENT
function* loadEventAsync(props: Props) {
  try {
    yield put(fetchEventRequest());
    const event = yield call(() => fetchEventAPI(props.payload));
    event.eventDto.id = parseInt(props.payload);
    yield put(fetchEventSuccess(event.eventDto, event.availableTicketsPerCategoryList));
  } catch (e) {
    yield put(fetchEventFailure(e));
  }
}

export function* watchLoadEventAsync() {
  yield takeLatest(LOAD_EVENT, loadEventAsync);
}

//-----------------------------------------DELETE EVENT
function* deleteEventAsync(props: Props) {
  try {
    yield put(deleteEventRequest());
    const res = yield call(() => deleteEventAPI(props.payload));
    if (res.status !== 200) {
      throw res;
    } else {
      yield put(deleteEventSuccess());
    }
  } catch (e) {
    yield put(deleteEventFailure(e.status));
  }
}

export function* watchDeletEventAsync() {
  yield takeLatest(DELETE_EVENT, deleteEventAsync);
}

//-----------------------------------------ADD EVENT
function* addEventAsync(props: AddProps) {
  try {
    yield put(addEventRequest());
    const imagesURL = yield call(() => updateImagesFromS3(props.payload.images));
    const event: EventCrud = props.payload.event;
    event.picturesUrlSave = imagesURL;
    event.picturesUrlDelete = [];
    const res = yield call(() => addEventAPI(event));
    if (res.status !== true) {
      throw res;
    } else {
      yield put(addEventSuccess());
    }
  } catch (e) {
    yield put(addEventFailure(e.status));
  }
}

export function* watchAddEventAsync() {
  yield takeLatest(ADD_EVENT, addEventAsync);
}

//-----------------------------------------EDIT EVENT
function* editEventAsync(props: AddProps) {
  try {
    yield put(editEventRequest());
    const imagesURL = yield call(() => updateImagesFromS3(props.payload.images));
    const event: EventCrud = props.payload.event;
    event.picturesUrlSave = imagesURL;
    event.picturesUrlDelete = [];
    const res = yield call(() => editEventAPI(event));
    if (res.status !== true) {
      throw res;
    } else {
      yield put(editEventSuccess());
    }
  } catch (e) {
    yield put(editEventFailure(e.status));
  }
}

export function* watchEditEventAsync() {
  yield takeLatest(EDIT_EVENT, editEventAsync);
}
