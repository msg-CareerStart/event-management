import { RESET_STORE } from '../actions/HeaderEventCrudActions';
import {
  ADD_USERFORM,
  ADD_USER_REQUEST,
  EDIT_USERFORM,
  EDIT_USER_REQUEST,
  LOAD_USER_BY_ID,
  LOAD_USER_BY_USERNAME,
  FETCH_USER_REQUEST,
} from '../actions/UserFormActions';
import UserForm from '../model/UserForm';

export interface UserFormState {
  user: UserForm;
}

export const initialState: UserFormState = {
  user: {} as UserForm,
};

const UserFormReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...initialState,
      };

    case ADD_USER_REQUEST:
      return {
        ...initialState,
      };

    case EDIT_USER_REQUEST:
      return {
        ...initialState,
      };

    case RESET_STORE:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default UserFormReducer;
