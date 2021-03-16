import { UserEventList } from '../model/userEventsPage/UserEventList';
import { UserEventFilters } from '../model/userEventsPage/UserEventFilters';
import { UserEventType } from '../model/userEventsPage/UserEventType';
import { UserMathRelation } from '../model/userEventsPage/UserMathRelation';
import { UserEventIsFilterType } from '../model/userEventsPage/UserEventIsFilterType';
import { UserEventsPageActionTypes, UserEventsPageActions } from '../actions/UserEventsPageActions';

const INITIAL_PAGE = 0;
const DEFAULT_LIMIT = 6;

export interface UserEventsPageState {
  events: UserEventList[];
  isError: boolean;
  isFetching: boolean;
  page: number;
  limit: number;
  isMore: boolean;
  filters: UserEventFilters;
  locations: string[];
  isLocationsLoading: boolean;
  isLocationsError: boolean;
  isFilter: UserEventIsFilterType;
}

const initialState = {
  events: [] as UserEventList[],
  isError: false,
  isFetching: false,
  page: INITIAL_PAGE,
  limit: DEFAULT_LIMIT,
  isMore: false,
  filters: {
    title: '',
    locations: [],
    rate: '',
    rateSign: UserMathRelation.GREATER,
    type: UserEventType.UPCOMING,
  },
  locations: [],
  isLocationsLoading: false,
  isLocationsError: false,
  isFilter: UserEventIsFilterType.NOT_IN_USE,
};

export const UserEventsReducer = (state = initialState, action: UserEventsPageActions) => {
  switch (action.type) {
    case UserEventsPageActionTypes.FETCH_USER_EVENTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case UserEventsPageActionTypes.FETCH_USER_EVENTS_SUCCESS:
      return {
        ...state,
        events: state.events.concat(action.events),
        isMore: action.more,
        isFetching: false,
        page: state.page + 1,
      };
    case UserEventsPageActionTypes.FETCH_USER_EVENTS_ERROR:
      return {
        ...state,
        isError: true,
        isMore: false,
        isFetching: false,
      };
    case UserEventsPageActionTypes.FETCH_USER_EVENTS_LOCATIONS_REQUEST:
      return {
        ...state,
        isLocationsLoading: true,
      };
    case UserEventsPageActionTypes.FETCH_USER_EVENTS_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.locations,
        isLocationsLoading: false,
      };
    case UserEventsPageActionTypes.FETCH_USER_EVENTS_LOCATIONS_ERROR:
      return {
        ...state,
        isLocationsLoading: false,
        isLocationsError: true,
      };
    case UserEventsPageActionTypes.UPDATE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case UserEventsPageActionTypes.UPDATE_USER_FILTERS:
      return {
        ...state,
        filters: action.filters,
      };
    case UserEventsPageActionTypes.RESET_USER_FILTERS:
      return {
        ...state,
        events: state.isFilter === UserEventIsFilterType.NOT_IN_USE ? state.events : [],
        page: state.isFilter === UserEventIsFilterType.NOT_IN_USE ? state.page : INITIAL_PAGE,
        isMore: state.isFilter === UserEventIsFilterType.NOT_IN_USE ? state.isMore : false,
        isFilter: UserEventIsFilterType.NOT_IN_USE,
        filters: {
          title: '',
          locations: [],
          rate: '',
          rateSign: UserMathRelation.GREATER,
          type: UserEventType.UPCOMING,
        },
      };
    case UserEventsPageActionTypes.SET_FILTER_USER_EVENTS_MODE:
      return {
        ...state,
        page: INITIAL_PAGE,
        isMore: false,
        events: [],
        isFilter:
          state.isFilter === UserEventIsFilterType.NOT_IN_USE
            ? UserEventIsFilterType.IN_USE_STATE_1
            : state.isFilter === UserEventIsFilterType.IN_USE_STATE_1
            ? UserEventIsFilterType.IN_USE_STATE_2
            : UserEventIsFilterType.IN_USE_STATE_1,
      };
    case UserEventsPageActionTypes.RESET_USER_EVENT_LIST_STORE:
      return {
        events: [],
        isError: false,
        isFetching: false,
        page: INITIAL_PAGE,
        limit: DEFAULT_LIMIT,
        isMore: false,
        filters: {
          title: '',
          locations: [],
          rate: '',
          rateSign: UserMathRelation.GREATER,
          type: UserEventType.UPCOMING,
        },
        locations: [],
        isLocationsLoading: false,
        isLocationsError: false,
        isFilter: UserEventIsFilterType.NOT_IN_USE,
      };
    default:
      return state;
  }
};
