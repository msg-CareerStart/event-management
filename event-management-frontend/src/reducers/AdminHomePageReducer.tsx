import { OccupancyCardType } from '../model/OcuupancyCardsType';
import { AdminHomePageAction, AdminHomePageActionTypes } from '../actions/AdminHomePageActions';

export interface OccupancyCardsState {
  upcomingEvents: OccupancyCardType[];
  historyEvents: OccupancyCardType[];
  isLoading: boolean;
  isError: boolean;
}

const initialStateOccupancyCards: OccupancyCardsState = {
  upcomingEvents: [],
  historyEvents: [],
  isLoading: true,
  isError: false,
};

export const AdminHomePageReducer = (
  state: OccupancyCardsState = initialStateOccupancyCards,
  action: AdminHomePageAction
): OccupancyCardsState => {
  switch (action.type) {
    case AdminHomePageActionTypes.UPCOMING_EVENTS_LOADING: {
      return {
        ...state,
        isLoading: action.loadingStatus,
      };
    }
    case AdminHomePageActionTypes.UPCOMING_EVENTS_FETCH_SUCCESS: {
      return {
        ...state,
        upcomingEvents: action.upcomingEvents,
        isLoading: false,
        isError: false,
      };
    }
    case AdminHomePageActionTypes.UPCOMING_EVENTS_ERROR: {
      return {
        ...state,
        isError: false,
        isLoading: true,
      };
    }
    case AdminHomePageActionTypes.HISTORY_EVENTS_LOADING: {
      return {
        ...state,
        isLoading: action.loadingStatus,
      };
    }
    case AdminHomePageActionTypes.HISTORY_EVENTS_FETCH_SUCCESS: {
      return {
        ...state,
        historyEvents: action.historyEvents,
        isLoading: false,
        isError: false,
      };
    }
    case AdminHomePageActionTypes.HISTORY_EVENTS_ERROR: {
      return {
        ...state,
        isError: action.errorStatus,
        isLoading: true,
      };
    }

    default:
      return state;
  }
};
