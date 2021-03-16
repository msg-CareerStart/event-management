export enum LoginActionTypes {
  USERNAME_INPUT = "USERNAME_INPUT",
  PASSWORD_INPUT = "PASSWORD_INPUT",
  LOGIN_ERROR = "LOGIN_ERROR",
  LOGIN_LOADING = "LOGIN_LOADING",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
}

export class LoginLoadingStatusAction {
  public readonly type = LoginActionTypes.LOGIN_LOADING;
  public loadingStatus: boolean;

  constructor(loadingStatus: boolean) {
    this.loadingStatus = loadingStatus;
  }
}

export class LoginErrorAction {
  public readonly type = LoginActionTypes.LOGIN_ERROR;
  public errorStatus: string;

  constructor(errorStatus: string) {
    this.errorStatus = errorStatus;
  }
}

export class LoginUpdatePasswordAction {
  public readonly type = LoginActionTypes.PASSWORD_INPUT;
  public password: string;

  constructor(password: string) {
    this.password = password;
  }
}

export class LoginUpdateUsernameAction {
  public readonly type = LoginActionTypes.USERNAME_INPUT;
  public username: string;

  constructor(username: string) {
    this.username = username;
  }
}
export class LoginSuccessAction {
  public readonly type = LoginActionTypes.LOGIN_SUCCESS;
  public success: string;

  constructor(success: string) {
    this.success = success;
  }
}

export type LoginAction =
  | LoginLoadingStatusAction
  | LoginErrorAction
  | LoginUpdatePasswordAction
  | LoginUpdateUsernameAction
  | LoginSuccessAction;

export const loginisLoading = (loadingStatus: boolean): LoginLoadingStatusAction => {
  return {
    type: LoginActionTypes.LOGIN_LOADING,
    loadingStatus: loadingStatus,
  };
};

export const loginError = (errorStatus: string): LoginErrorAction => {
  return {
    type: LoginActionTypes.LOGIN_ERROR,
    errorStatus: errorStatus,
  };
};

export const loginPassword = (password: string): LoginUpdatePasswordAction => {
  return {
    type: LoginActionTypes.PASSWORD_INPUT,
    password: password,
  };
};

export const loginUsername = (username: string): LoginUpdateUsernameAction => {
  return {
    type: LoginActionTypes.USERNAME_INPUT,
    username: username,
  };
};

export const loginSuccess = (success: string): LoginSuccessAction => {
  return {
    type: LoginActionTypes.LOGIN_SUCCESS,
    success: success,
  };
};
