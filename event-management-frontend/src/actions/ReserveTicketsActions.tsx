import { EventReserveTicketType } from '../model/EventReserveTicketType';

export enum ReserveTicketActionTypes {
  RESERVE_EVENT_FETCH = 'RESERVE_EVENT_FETCH',
  RESERVE_EVENT_LOADING = 'RESERVE_EVENT_LOADING',
  RESERVE_EVENT_FETCH_SUCCESS = 'RESERVE_EVENT_FETCH_SUCCESS',
  RESERVE_EVENT_ERROR = 'RESERVE_EVENT_ERROR',
  UPDATE_RADIOBUTTON = 'UPDATE_RADIOBUTTON',
}

export class ReserveEventFetchAction {
  public readonly type = ReserveTicketActionTypes.RESERVE_EVENT_FETCH;
  public id: number;

  constructor(id: number) {
    this.id = id;
  }
}
export class ReserveEventLoadingStatusAction {
  public readonly type = ReserveTicketActionTypes.RESERVE_EVENT_LOADING;
  public loadingStatus: boolean;

  constructor(loadingStatus: boolean) {
    this.loadingStatus = loadingStatus;
  }
}

export class ReserveEventErrorAction {
  public readonly type = ReserveTicketActionTypes.RESERVE_EVENT_ERROR;
  public errorStatus: boolean;

  constructor(errorStatus: boolean) {
    this.errorStatus = errorStatus;
  }
}

export class ReserveEventFetchSuccessAction {
  public readonly type = ReserveTicketActionTypes.RESERVE_EVENT_FETCH_SUCCESS;
  public event: EventReserveTicketType;

  constructor(event: EventReserveTicketType) {
    this.event = event;
  }
}
export class UpdateRadioButtonAction {
  public readonly type = ReserveTicketActionTypes.UPDATE_RADIOBUTTON;
  public radioButton: string;

  constructor(radioButton: string) {
    this.radioButton = radioButton;
  }
}

export type ReserveTicketAction =
  | ReserveEventFetchAction
  | ReserveEventLoadingStatusAction
  | ReserveEventErrorAction
  | ReserveEventFetchSuccessAction
  | UpdateRadioButtonAction;

export const reserveEventisLoading = (loadingStatus: boolean): ReserveEventLoadingStatusAction => {
  return {
    type: ReserveTicketActionTypes.RESERVE_EVENT_LOADING,
    loadingStatus: loadingStatus,
  };
};

export const reserveEventError = (errorStatus: boolean): ReserveEventErrorAction => {
  return {
    type: ReserveTicketActionTypes.RESERVE_EVENT_ERROR,
    errorStatus: errorStatus,
  };
};

export const reserveEventFetchSucces = (event: EventReserveTicketType): ReserveEventFetchSuccessAction => {
  return {
    type: ReserveTicketActionTypes.RESERVE_EVENT_FETCH_SUCCESS,
    event: event,
  };
};

export const reserveEventFetch = (id: number): ReserveEventFetchAction => {
  return {
    type: ReserveTicketActionTypes.RESERVE_EVENT_FETCH,
    id: id,
  };
};

export const updateRadioButton = (radioButton: string): UpdateRadioButtonAction => {
  return {
    type: ReserveTicketActionTypes.UPDATE_RADIOBUTTON,
    radioButton: radioButton,
  };
};
