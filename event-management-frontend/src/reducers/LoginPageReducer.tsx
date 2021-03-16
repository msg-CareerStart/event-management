import { LoginAction, LoginActionTypes } from "../actions/LoginPageActions";

export interface LoginPageState {
  isLoading: boolean;
  error: string;
  username: string;
  password: string;
  success: string;
}

const initialState: LoginPageState = {
  isLoading: true,
  password: "",
  error: "",
  username: "",
  success: "",
};

export const LoginPageReducer = (state: LoginPageState = initialState, action: LoginAction): LoginPageState => {
  switch (action.type) {
    case LoginActionTypes.LOGIN_LOADING: {
      return {
        ...state,
        isLoading: action.loadingStatus,
      };
    }
    case LoginActionTypes.LOGIN_ERROR: {
      return {
        ...state,
        error: action.errorStatus,
      };
    }
    case LoginActionTypes.PASSWORD_INPUT: {
      return {
        ...state,
        password: action.password,
      };
    }
    case LoginActionTypes.USERNAME_INPUT: {
      return {
        ...state,
        username: action.username,
      };
    }
    case LoginActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        success: action.success,
      };
    }
    default:
      return state;
  }
};

export default LoginPageReducer;
