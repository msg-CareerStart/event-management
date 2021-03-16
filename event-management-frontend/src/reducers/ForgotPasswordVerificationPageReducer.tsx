import { VerificationAction, VerificationActionTypes } from "../actions/ForgotPasswordVerificationPageAction";

export interface VerificationPageState {
  isLoading: boolean;
  error: string;
  email: string;
  newpassword: string;
  code: string;
}

const initialState: VerificationPageState = {
  isLoading: true,
  newpassword: "",
  error: "",
  email: "",
  code: "",
};

export const VerificationPageReducer = (
  state: VerificationPageState = initialState,
  action: VerificationAction
): VerificationPageState => {
  switch (action.type) {
    case VerificationActionTypes.VERIFICATION_LOADING: {
      return {
        ...state,
        isLoading: action.loadingStatus,
      };
    }
    case VerificationActionTypes.VERIFICATION_ERROR: {
      return {
        ...state,
        error: action.errorStatus,
      };
    }
    case VerificationActionTypes.NEW_PASSWORD_INPUT: {
      return {
        ...state,
        newpassword: action.password,
      };
    }
    case VerificationActionTypes.EMAIL_INPUT: {
      return {
        ...state,
        email: action.email,
      };
    }
    case VerificationActionTypes.VERIFICATION_CODE_INPUT: {
      return {
        ...state,
        code: action.code,
      };
    }
    default:
      return state;
  }
};

export default VerificationPageReducer;
