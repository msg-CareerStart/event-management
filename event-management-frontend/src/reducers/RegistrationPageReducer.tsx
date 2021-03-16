import { RegistrationAction, RegistrationActionTypes } from '../actions/RegistrationPageActions';

export interface RegistrationPageState {
  isLoading: boolean;
  error: string;
  success: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  usernameError: string;
  passwordError: string;
  confirmPasswordError: string;
}

const initialState: RegistrationPageState = {
  isLoading: true,
  error: '',
  success: '',
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  firstNameError: '',
  lastNameError: '',
  emailError: '',
  usernameError: '',
  passwordError: '',
  confirmPasswordError: '',
};

export const RegistrationPageReducer = (
  state: RegistrationPageState = initialState,
  action: RegistrationAction
): RegistrationPageState => {
  switch (action.type) {
    case RegistrationActionTypes.REGISTRATION_LOADING: {
      return {
        ...state,
        isLoading: action.loadingStatus,
      };
    }

    case RegistrationActionTypes.REGISTRATION_ERROR: {
      return {
        ...state,
        error: action.errorStatus,
      };
    }

    case RegistrationActionTypes.REGISTRATION_SUCCESS: {
      return {
        ...state,
        success: action.successStatus,
      };
    }

    case RegistrationActionTypes.FIRST_NAME_INPUT: {
      return {
        ...state,
        firstName: action.firstName,
      };
    }

    case RegistrationActionTypes.LAST_NAME_INPUT: {
      return {
        ...state,
        lastName: action.lastName,
      };
    }

    case RegistrationActionTypes.EMAIL_INPUT: {
      return {
        ...state,
        email: action.email,
      };
    }

    case RegistrationActionTypes.USERNAME_INPUT: {
      return {
        ...state,
        username: action.username,
      };
    }

    case RegistrationActionTypes.PASSWORD_INPUT: {
      return {
        ...state,
        password: action.password,
      };
    }

    case RegistrationActionTypes.CONFIRM_PASSWORD_INPUT: {
      return {
        ...state,
        confirmPassword: action.confirmPassword,
      };
    }

    case RegistrationActionTypes.FIRST_NAME_INPUT_ERROR: {
      return {
        ...state,
        firstNameError: action.firstNameError,
      };
    }

    case RegistrationActionTypes.LAST_NAME_INPUT_ERROR: {
      return {
        ...state,
        lastNameError: action.lastNameError,
      };
    }

    case RegistrationActionTypes.EMAIL_INPUT_ERROR: {
      return {
        ...state,
        emailError: action.emailError,
      };
    }

    case RegistrationActionTypes.USERNAME_INPUT_ERROR: {
      return {
        ...state,
        usernameError: action.usernameError,
      };
    }

    case RegistrationActionTypes.PASSWORD_INPUT_ERROR: {
      return {
        ...state,
        passwordError: action.passwordError,
      };
    }

    case RegistrationActionTypes.CONFIRM_PASSWORD_INPUT_ERROR: {
      return {
        ...state,
        confirmPasswordError: action.confirmPasswordError,
      };
    }
    default:
      return state;
  }
};

export default RegistrationPageReducer;
