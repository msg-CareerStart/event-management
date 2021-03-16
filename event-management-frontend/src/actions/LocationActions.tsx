import { LocationType } from '../model/LocationType';

export enum LocationActionTypes {
  LOCATION_FETCH = 'LOCATION_FETCH',
  LOCATION_LOADING = 'LOCATION_LOADING',
  LOCATION_FETCH_SUCCESS = 'LOCATION_FETCH_SUCCESS',
  LOCATION_ERROR = 'LOCATION_ERROR',
  UPDATE_SEARCH_VALUE = 'UPDATE_SEARCH_VALUE',
}

export class LocationFetchAction {
  public readonly type = LocationActionTypes.LOCATION_FETCH;
}
export class LocationLoadingStatusAction {
  public readonly type = LocationActionTypes.LOCATION_LOADING;
  public loadingStatus: boolean;

  constructor(loadingStatus: boolean) {
    this.loadingStatus = loadingStatus;
  }
}

export class LocationErrorAction {
  public readonly type = LocationActionTypes.LOCATION_ERROR;
  public errorStatus: string;

  constructor(errorStatus: string) {
    this.errorStatus = errorStatus;
  }
}

export class LocationFetchSuccessAction {
  public readonly type = LocationActionTypes.LOCATION_FETCH_SUCCESS;
  public locations: LocationType[];

  constructor(locations: LocationType[]) {
    this.locations = locations;
  }
}

export class SearchValueUpdate {
  public readonly type = LocationActionTypes.UPDATE_SEARCH_VALUE;
  public searchValue: string;

  constructor(searchValue: string) {
    this.searchValue = searchValue;
  }
}

export type LocationAction =
  | LocationFetchAction
  | LocationLoadingStatusAction
  | LocationErrorAction
  | LocationFetchSuccessAction
  | SearchValueUpdate;

export const locationisLoading = (loadingStatus: boolean): LocationLoadingStatusAction => {
  return {
    type: LocationActionTypes.LOCATION_LOADING,
    loadingStatus: loadingStatus,
  };
};

export const locationError = (errorStatus: string): LocationErrorAction => {
  return {
    type: LocationActionTypes.LOCATION_ERROR,
    errorStatus: errorStatus,
  };
};

export const locationFetchSucces = (locations: LocationType[]): LocationFetchSuccessAction => {
  return {
    type: LocationActionTypes.LOCATION_FETCH_SUCCESS,
    locations: locations,
  };
};

export const locationFetch = (): LocationFetchAction => {
  return {
    type: LocationActionTypes.LOCATION_FETCH,
  };
};

export const updateSearchValue = (searchValue: string): SearchValueUpdate => {
  return {
    type: LocationActionTypes.UPDATE_SEARCH_VALUE,
    searchValue: searchValue,
  };
};
