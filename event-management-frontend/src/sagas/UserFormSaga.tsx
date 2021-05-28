import { fetchEventFailure } from '../actions/HeaderEventCrudActions';
import {
  addUserRequest,
  addUserSuccess,
  editUserRequest,
  editUserSuccess,
  fetchUserRequest,
  fetchUserSuccess,
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
    yield put(fetchUserRequest());
    const user = yield call(() => fetchUserByIdAPI(props.payload));
    yield put(fetchUserSuccess(user));
  } catch (e) {}
}

function* loadUserByUsernameAsync(props: Props) {
  try {
    yield put(fetchUserRequest());
    const user = yield call(() => fetchUserByUsernameAPI(props.payload));
    yield put(fetchUserSuccess(user));
  } catch (e) {}
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
  } catch (e) {}
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
  } catch (e) {}
}
