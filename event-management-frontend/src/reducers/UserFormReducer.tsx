import {
  RESET_ERRORS,
  RESET_STORE,
  FETCH_USER_BY_ID_REQUEST,
  FETCH_USER_BY_ID_SUCCESS,
  FETCH_USER_BY_ID_FAILURE,
  FETCH_USER_BY_USERNAME_REQUEST,
  FETCH_USER_BY_USERNAME_SUCCESS,
  FETCH_USER_BY_USERNAME_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  UPDATE_FORM_ERRORS,
} from '../actions/UserFormActions';
import UserForm from '../model/UserForm';
import { UserFormErrors } from '../model/UserFormError';

export interface UserFormState {
  user: UserForm;
  isLoading: boolean;
  isError: boolean;
  error: string;
  formErrors: UserFormErrors;
}

//hardcode if its not ok the {} state
export const initialState: UserFormState = {
  user: {} as UserForm,
  isLoading: false,
  isError: false,
  error: '',
  formErrors: {
    firstName: '',
    lastName: '',
    email: '',
    ocupancyRate: '',
  },
};

const UserFormReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // ---------------------- utils
    case RESET_ERRORS:
      return {
        ...state,
        isError: false,
        modifyEventError: false,
        error: '',
      };

    case RESET_STORE:
      return {
        ...initialState,
      };

    // -----------------------fetch by id

    case FETCH_USER_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_USER_BY_ID_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: '',
        isError: false,
        isLoading: false,
      };

    case FETCH_USER_BY_ID_FAILURE:
      return {
        ...state,
        user: action.payload,
        isError: true,
        isLoading: false,
      };

    // -----------------------fetch by username

    case FETCH_USER_BY_USERNAME_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_USER_BY_USERNAME_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: '',
        isError: false,
        isLoading: false,
      };

    case FETCH_USER_BY_USERNAME_FAILURE:
      return {
        ...state,
        user: action.payload,
        isError: true,
        isLoading: false,
      };

    // -----------------------add user

    case ADD_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ADD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: '',
      };

    case ADD_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // -----------------------edit user

    case EDIT_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case EDIT_USER_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        user: action.payload,
      };

    case EDIT_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case UPDATE_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload,
      };

    default:
      return state;
  }
};

export default UserFormReducer;
