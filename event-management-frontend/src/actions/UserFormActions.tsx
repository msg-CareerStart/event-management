import UserForm from '../model/UserForm';

export const LOAD_USER_BY_ID = 'FETCH_USER_BY_ID';
export const LOAD_USER_BY_USERNAME = 'FETCH_USER_BY_USERNAME';
export const ADD_USERFORM = 'ADD_USERFORM';
export const EDIT_USERFORM = 'EDIT_USERFORM';
export const RESET_STORE = 'RESET_STORE';
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';
export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

export const fetchUserById = (id: number) => {
  return {
    type: LOAD_USER_BY_ID,
    payload: id,
  };
};

export const fetchUserByUsername = (username: string) => {
  return {
    type: LOAD_USER_BY_USERNAME,
    payload: username,
  };
};

export const addUser = (user: UserForm) => {
  return {
    type: ADD_USERFORM,
    payload: { user: user },
  };
};

export const EditUser = (user: UserForm) => {
  return {
    type: EDIT_USERFORM,
    payload: { user },
  };
};

export const resetStore = () => {
  return {
    type: RESET_STORE,
  };
};

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = (user: UserForm) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
};

export const addUserSuccess = (user: UserForm) => {
  return {
    type: ADD_USER_SUCCESS,
    payload: user,
  };
};

export const addUserRequest = () => {
  return {
    type: ADD_USER_REQUEST,
  };
};

export const editUserSuccess = (user: UserForm) => {
  return {
    type: EDIT_USER_SUCCESS,
    payload: user,
  };
};

export const editUserRequest = () => {
  return {
    type: EDIT_USER_REQUEST,
  };
};
