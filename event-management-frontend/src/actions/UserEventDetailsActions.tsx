import { EventWithLocation } from '../model/EventWithLocation';

export enum UserEventDetailsActionTypes {
  LOAD_EVENT_WITH_LOCATIONS = 'LOAD_EVENT_WITH_LOCATIONS',
  FETCH_EVENT_WITH_LOCATION_REQUEST = 'FETCH_EVENT_WITH_LOCATION_REQUEST',
  FETCH_EVENT_WITH_LOCATION_SUCCESS = 'FETCH_EVENT_WITH_LOCATION_SUCCESS',
  FETCH_EVENT_WITH_LOCATION_FAILURE = 'FETCH_EVENT_WITH_LOCATION_FAILURE',
}

export class LoadEventWithLocationsAction {
  public readonly type = UserEventDetailsActionTypes.LOAD_EVENT_WITH_LOCATIONS;
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class FetchEventWithLocationRequestAction {
  public readonly type = UserEventDetailsActionTypes.FETCH_EVENT_WITH_LOCATION_REQUEST;
}

export class FetchEventWithLocationSuccessAction {
  public readonly type = UserEventDetailsActionTypes.FETCH_EVENT_WITH_LOCATION_SUCCESS;
  public event: EventWithLocation;

  constructor(event: EventWithLocation) {
    this.event = event;
  }
}

export class FetchEventWithLocationFailureAction {
  public readonly type = UserEventDetailsActionTypes.FETCH_EVENT_WITH_LOCATION_FAILURE;
  public error: string;

  constructor(error: string) {
    this.error = error;
  }
}

//-------------------------------------------------------------for SAGA
export const loadEventWithLocations = (id: string) => {
  return {
    type: UserEventDetailsActionTypes.LOAD_EVENT_WITH_LOCATIONS,
    id: id,
  };
};

//-------------------------------------------------------------
export const fetchEventWithLocationRequest = () => {
  return {
    type: UserEventDetailsActionTypes.FETCH_EVENT_WITH_LOCATION_REQUEST,
  };
};

export const fetchEventWithLocationSuccess = (event: EventWithLocation) => {
  return {
    type: UserEventDetailsActionTypes.FETCH_EVENT_WITH_LOCATION_SUCCESS,
    event: event,
  };
};

export const fetchEventWithLocationFailure = (error: string) => {
  return {
    type: UserEventDetailsActionTypes.FETCH_EVENT_WITH_LOCATION_FAILURE,
    error: error,
  };
};

export type UserEventDetailsActions =
  | LoadEventWithLocationsAction
  | FetchEventWithLocationRequestAction
  | FetchEventWithLocationSuccessAction
  | FetchEventWithLocationFailureAction;
