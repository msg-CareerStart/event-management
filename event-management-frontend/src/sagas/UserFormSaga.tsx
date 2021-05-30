import { fetchEventFailure } from '../actions/HeaderEventCrudActions';
import {
  LOAD_USER_BY_ID,
  fetchUserByIDRequest,
  fetchUserByIDSuccess,
  fetchUserByIDFailure,
  LOAD_USER_BY_USERNAME,
  fetchUserByUsernameRequest,
  fetchUserByUsernameSuccess,
  fetchUserByUsernameFailure,
  ADD_USERFORM,
  addUserSuccess,
  addUserRequest,
  addUserFailure,
  EDIT_USERFORM,
  editUserSuccess,
  editUserRequest,
  editUserFailure,
} from '../actions/UserFormActions';
import { addUserAPI, editUserAPI, fetchUserByIdAPI, fetchUserByUsernameAPI } from '../api/UserFormAPI';
import UserForm from '../model/UserForm';
import { takeLatest, call, put } from 'redux-saga/effects';

interface Props {
  type: any;
  payload: any;
}

interface AddProps {
  type: string;
  payload: { user: UserForm };
}

function* loadUserByIdAsync(props: Props) {
  try {
    yield put(fetchUserByIDRequest());
    const user = yield call(() => fetchUserByIdAPI(props.payload));
    yield put(fetchUserByIDSuccess(user));
  } catch (e) {
    yield put(fetchUserByIDFailure(e));
  }
}

export function* watchLoadUserByIDAsync() {
  yield takeLatest(LOAD_USER_BY_ID, loadUserByIdAsync);
}

function* loadUserByUsernameAsync(props: Props) {
  try {
    yield put(fetchUserByUsernameRequest());
    const user = yield call(() => fetchUserByUsernameAPI(props.payload));
    yield put(fetchUserByUsernameSuccess(user));
  } catch (e) {
    yield put(fetchUserByUsernameFailure(e));
  }
}

export function* watchLoadUserByUsernameAsync() {
  yield takeLatest(LOAD_USER_BY_USERNAME, loadUserByUsernameAsync);
}

function* addUserAsync(props: AddProps) {
  try {
    yield put(addUserRequest());
    const user: UserForm = props.payload.user;
    const res = yield call(() => addUserAPI(user));
    if (res.status !== true) {
      throw res;
    } else {
      yield put(addUserSuccess(user));
    }
  } catch (e) {
    yield put(addUserFailure(e));
  }
}

export function* watchAddUserAsync() {
  yield takeLatest(ADD_USERFORM, addUserAsync);
}

function* editUserAsync(props: AddProps) {
  try {
    yield put(editUserRequest());
    const user: UserForm = props.payload.user;
    const res = yield call(() => editUserAPI(user));
    if (res.status !== true) {
      throw res;
    } else {
      yield put(editUserSuccess(user));
    }
  } catch (e) {
    yield put(editUserFailure(e));
  }
}

export function* watchEditEventAsync() {
  yield takeLatest(EDIT_USERFORM, editUserAsync);
}
