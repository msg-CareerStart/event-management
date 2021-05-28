import { LocationType } from '../model/LocationType';

export const FETCH_LOCATION_FROM_ID_LOCATION = 'FETCH_LOCATION_FROM_ID_LOCATION';
export const FETCH_LOCATION_FROM_ID_LOCATION_SUCCESS = 'FETCH_LOCATION_FROM_ID_LOCATION_SUCCESS';
export const FETCH_LOCATION_FROM_ID_LOCATION_FAILURE = 'FETCH_LOCATION_FROM_ID_LOCATION_FAILURE';

export class FetchLocationFromIdLocationActions {
  public readonly type = FETCH_LOCATION_FROM_ID_LOCATION;
  public id: number;

  constructor(id: number) {
    this.id = id;
  }
}

export class FetchLocationFromIdLocationSuccessAction {
  public readonly type = FETCH_LOCATION_FROM_ID_LOCATION_SUCCESS;
  public location: LocationType;

  constructor(location: LocationType) {
    this.location = location;
  }
}

export class FetchLocationFromIdLocationFailureAction {
  public readonly type = FETCH_LOCATION_FROM_ID_LOCATION_FAILURE;
  public err: string;

  constructor(err: string) {
    this.err = err;
  }
}

export const fetchLocationFromIdLocation = (id: number): FetchLocationFromIdLocationActions => {
  return {
    type: FETCH_LOCATION_FROM_ID_LOCATION,
    id: id,
  };
};

export const fetchLocationFromIdLocationSuccess = (
  location: LocationType
): FetchLocationFromIdLocationSuccessAction => {
  return {
    type: FETCH_LOCATION_FROM_ID_LOCATION_SUCCESS,
    location: location,
  };
};

export const fetchLocationFromIdLocationFailure = (error: string): FetchLocationFromIdLocationFailureAction => {
  return {
    type: FETCH_LOCATION_FROM_ID_LOCATION_FAILURE,
    err: error,
  };
};

export type UserMapPageActions =
  | FetchLocationFromIdLocationActions
  | FetchLocationFromIdLocationSuccessAction
  | FetchLocationFromIdLocationFailureAction;
