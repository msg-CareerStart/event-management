import { UserEventList } from '../model/userEventsPage/UserEventList';
import { UserEventFilters } from '../model/userEventsPage/UserEventFilters';
import { UserEventIsFilterType } from '../model/userEventsPage/UserEventIsFilterType';
import { LocationType } from '../model/LocationType';

export enum UserEventsPageActionTypes {
  FETCH_USER_EVENTS = 'FETCH_USER_EVENTS',
  FETCH_USER_EVENTS_REQUEST = 'FETCH_USER_EVENTS_REQUEST',
  FETCH_USER_EVENTS_SUCCESS = 'FETCH_USER_EVENTS_SUCCESS',
  FETCH_USER_EVENTS_ERROR = 'FETCH_USER_EVENTS_ERROR',

  FETCH_USER_EVENTS_LOCATIONS = 'FETCH_USER_EVENTS_LOCATIONS',
  FETCH_USER_EVENTS_LOCATIONS_REQUEST = 'FETCH_USER_EVENTS_LOCATIONS_REQUEST',
  FETCH_USER_EVENTS_LOCATIONS_SUCCESS = 'FETCH_USER_EVENTS_LOCATIONS_SUCCESS',
  FETCH_USER_EVENTS_LOCATIONS_ERROR = 'FETCH_USER_EVENTS_LOCATIONS_ERROR',

  UPDATE_IS_FETCHING = 'UPDATE_IS_FETCHING',
  UPDATE_USER_FILTERS = 'UPDATE_USER_FILTERS',
  RESET_USER_FILTERS = 'RESET_USER_FILTERS',
  SET_FILTER_USER_EVENTS_MODE = 'SET_FILTER_USER_EVENTS_MODE',
  RESET_USER_EVENT_LIST_STORE = 'RESET_USER_EVENT_LIST_STORE',
}

export class FetchUserEventsAction {
  public readonly type = UserEventsPageActionTypes.FETCH_USER_EVENTS;
  public page: number;
  public limit: number;
  public isFilter: UserEventIsFilterType;
  public filters: UserEventFilters;

  constructor(page: number, limit: number, isFilter: UserEventIsFilterType, filters: UserEventFilters) {
    this.page = page;
    this.limit = limit;
    this.isFilter = isFilter;
    this.filters = filters;
  }
}

export class FetchUserEventsRequestAction {
  public readonly type = UserEventsPageActionTypes.FETCH_USER_EVENTS_REQUEST;
}

export class FetchUserEventsSuccessAction {
  public readonly type = UserEventsPageActionTypes.FETCH_USER_EVENTS_SUCCESS;
  public events: UserEventList[];
  public more: boolean;

  constructor(events: UserEventList[], more: boolean) {
    this.events = events;
    this.more = more;
  }
}

export class FetchUserEventsErrorAction {
  public readonly type = UserEventsPageActionTypes.FETCH_USER_EVENTS_ERROR;
}

export class FetchUserEventsLocationsAction {
  public readonly type = UserEventsPageActionTypes.FETCH_USER_EVENTS_LOCATIONS;
}

export class FetchUserEventsLocationsRequestAction {
  public readonly type = UserEventsPageActionTypes.FETCH_USER_EVENTS_LOCATIONS_REQUEST;
}

export class FetchUserEventsLocationsSuccessAction {
  public readonly type = UserEventsPageActionTypes.FETCH_USER_EVENTS_LOCATIONS_SUCCESS;
  public locations: LocationType[];

  constructor(locations: LocationType[]) {
    this.locations = locations;
  }
}

export class FetchUserEventsLocationsErrorAction {
  public readonly type = UserEventsPageActionTypes.FETCH_USER_EVENTS_LOCATIONS_ERROR;
}

export class SetIsFetchingAction {
  public readonly type = UserEventsPageActionTypes.UPDATE_IS_FETCHING;
  public isFetching: boolean;

  constructor(isFetching: boolean) {
    this.isFetching = isFetching;
  }
}

export class UpdateUserFiltersAction {
  public readonly type = UserEventsPageActionTypes.UPDATE_USER_FILTERS;
  public filters: UserEventFilters;

  constructor(filters: UserEventFilters) {
    this.filters = filters;
  }
}

export class ResetUserFiltersAction {
  public readonly type = UserEventsPageActionTypes.RESET_USER_FILTERS;
}

export class SetUserFilterModeAction {
  public readonly type = UserEventsPageActionTypes.SET_FILTER_USER_EVENTS_MODE;
}

export class ResetStoreAction {
  public readonly type = UserEventsPageActionTypes.RESET_USER_EVENT_LIST_STORE;
}

export const fetchUserEvents = (
  page: number,
  limit: number,
  isFilter: UserEventIsFilterType,
  filters: UserEventFilters
) => {
  return {
    type: UserEventsPageActionTypes.FETCH_USER_EVENTS,
    page: page,
    limit: limit,
    isFilter: isFilter,
    filters: filters,
  };
};

export const fetchUserEventsRequest = () => {
  return {
    type: UserEventsPageActionTypes.FETCH_USER_EVENTS_REQUEST,
  };
};

export const fetchUserEventsSuccess = (events: UserEventList[], more: boolean) => {
  return {
    type: UserEventsPageActionTypes.FETCH_USER_EVENTS_SUCCESS,
    events: events,
    more: more,
  };
};

export const fetchUserEventsError = () => {
  return {
    type: UserEventsPageActionTypes.FETCH_USER_EVENTS_ERROR,
  };
};

export const fetchUserEventsLocations = () => {
  return {
    type: UserEventsPageActionTypes.FETCH_USER_EVENTS_LOCATIONS,
  };
};

export const fetchUserEventsLocationsRequest = () => {
  return {
    type: UserEventsPageActionTypes.FETCH_USER_EVENTS_LOCATIONS_REQUEST,
  };
};

export const fetchUserEventsLocationsSuccess = (locations: LocationType[]) => {
  return {
    type: UserEventsPageActionTypes.FETCH_USER_EVENTS_LOCATIONS_SUCCESS,
    locations: locations.map((loc) => loc.name),
  };
};

export const fetchUserEventsLocationsError = () => {
  return {
    type: UserEventsPageActionTypes.FETCH_USER_EVENTS_LOCATIONS_ERROR,
  };
};

export const setIsFetching = (isFetching: boolean) => {
  return {
    type: UserEventsPageActionTypes.UPDATE_IS_FETCHING,
    isFetching: isFetching,
  };
};

export const updateUserFilters = (filters: UserEventFilters) => {
  return {
    type: UserEventsPageActionTypes.UPDATE_USER_FILTERS,
    filters: filters,
  };
};

export const resetUserFilters = () => {
  return {
    type: UserEventsPageActionTypes.RESET_USER_FILTERS,
  };
};

export const setUserFilterMode = () => {
  return {
    type: UserEventsPageActionTypes.SET_FILTER_USER_EVENTS_MODE,
  };
};

export const resetStore = () => {
  return {
    type: UserEventsPageActionTypes.RESET_USER_EVENT_LIST_STORE,
  };
};

export type UserEventsPageActions =
  | FetchUserEventsAction
  | FetchUserEventsRequestAction
  | FetchUserEventsSuccessAction
  | FetchUserEventsErrorAction
  | FetchUserEventsLocationsAction
  | FetchUserEventsLocationsRequestAction
  | FetchUserEventsLocationsSuccessAction
  | FetchUserEventsLocationsErrorAction
  | SetIsFetchingAction
  | UpdateUserFiltersAction
  | ResetUserFiltersAction
  | SetUserFilterModeAction
  | ResetStoreAction;
