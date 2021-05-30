import { LocationStatistics } from '../model/LocationStatistics';
import { LocationType } from '../model/LocationType';

export enum LocationActionTypes {
  LOCATION_FETCH = 'LOCATION_FETCH',
  LOCATION_LOADING = 'LOCATION_LOADING',
  LOCATION_FETCH_SUCCESS = 'LOCATION_FETCH_SUCCESS',
  LOCATION_ERROR = 'LOCATION_ERROR',
  UPDATE_SEARCH_VALUE = 'UPDATE_SEARCH_VALUE',
  LOCATIONS_FETCH_STATISTICS = 'LOCATIONS_FETCH_STATISTICS',
  LOCATIONS_FETCH_STATISTICS_SUCCESS = 'LOCATIONS_FETCH_STATISTICS_SUCCESS',
  LOCATIONS_FETCH_STATISTICS_ERROR = 'LOCATIONS_FETCH_STATISTICS_ERROR',
}

export class LocationsFetchStatistics {
  public readonly type = LocationActionTypes.LOCATIONS_FETCH_STATISTICS;
}

export class LocationsFetchStatisticsSuccess {
  public readonly type = LocationActionTypes.LOCATIONS_FETCH_STATISTICS_SUCCESS;
  public locationsStatistics: LocationStatistics[];

  constructor(locationsStatistics: LocationStatistics[]) {
    this.locationsStatistics = locationsStatistics;
  }
}

export class LocationsFetchStatisticsError {
  public readonly type = LocationActionTypes.LOCATIONS_FETCH_STATISTICS_ERROR;
  public errorStatus: string;

  constructor(errorStatus: string) {
    this.errorStatus = errorStatus;
  }
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

export const fetchAllLocationsStatistics = (): LocationsFetchStatistics => {
  return {
    type: LocationActionTypes.LOCATIONS_FETCH_STATISTICS,
  };
};

export const fetchAllLocationsStatisticsSuccess = (
  locationsStatistics: LocationStatistics[]
): LocationsFetchStatisticsSuccess => {
  return {
    type: LocationActionTypes.LOCATIONS_FETCH_STATISTICS_SUCCESS,
    locationsStatistics: locationsStatistics,
  };
};

export const fetchAllLocationsStatisticsError = (errorStatus: string): LocationsFetchStatisticsError => {
  return {
    type: LocationActionTypes.LOCATIONS_FETCH_STATISTICS_ERROR,
    errorStatus: errorStatus,
  };
};
