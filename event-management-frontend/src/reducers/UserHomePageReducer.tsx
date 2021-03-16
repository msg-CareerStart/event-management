import { Booking } from '../model/userHome/Booking';
import { EventCard } from '../model/userHome/EventCard';
import { UserHomePageActionTypes, UserHomePageActions } from '../actions/UserHomePageActions';

export interface HighlightedEvent {
  id: number;
  title: string;
  description: string;
  startTime: string;
  startDate: string;
  endTime: string;
  endDate: string;
  location: string;
  picture: string;
}

export interface UserHomePageState {
  bookings: {
    bookings: Booking[];
    isError: boolean;
    isLoading: boolean;
  };
  past: {
    events: EventCard[];
    page: number;
    limit: number;
    isMore: boolean;
    noPages: number;
    isError: boolean;
    isLoading: boolean;
  };
  upcoming: {
    events: EventCard[];
    page: number;
    limit: number;
    isMore: boolean;
    noPages: number;
    isError: boolean;
    isLoading: boolean;
  };
  highlightedEvents: HighlightedEvent[];
  isLoading: boolean;
  isError: boolean;
}

const initialState = {
  bookings: {
    bookings: [],
    isError: false,
    isLoading: false,
  },
  past: {
    events: [],
    page: 0,
    limit: 3,
    isMore: false,
    noPages: 0,
    isError: false,
    isLoading: false,
  },
  upcoming: {
    events: [],
    page: 0,
    limit: 3,
    isMore: false,
    noPages: 0,
    isError: false,
    isLoading: false,
  },
  highlightedEvents: [],
  isLoading: true,
  isError: false,
};

export const UserHomePageReducer = (state: UserHomePageState = initialState, action: UserHomePageActions) => {
  switch (action.type) {
    case UserHomePageActionTypes.FETCH_BOOKINGS_REQUEST:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          isLoading: true,
        },
      };
    case UserHomePageActionTypes.FETCH_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          isLoading: false,
          bookings: action.bookings,
        },
      };
    case UserHomePageActionTypes.FETCH_BOOKINGS_ERROR:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          isLoading: false,
          isError: true,
        },
      };
    case UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_REQUEST:
      return {
        ...state,
        past: {
          ...state.past,
          isLoading: true,
        },
      };
    case UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_SUCCESS:
      return {
        ...state,
        past: {
          ...state.past,
          events: action.events,
          isMore: action.more,
          noPages: action.noPages,
          isLoading: false,
        },
      };
    case UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_ERROR:
      return {
        ...state,
        past: {
          ...state.past,
          isLoading: false,
          isError: true,
        },
      };
    case UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_REQUEST:
      return {
        ...state,
        upcoming: {
          ...state.upcoming,
          isLoading: true,
        },
      };
    case UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_SUCCESS:
      return {
        ...state,
        upcoming: {
          ...state.upcoming,
          events: action.events,
          isMore: action.more,
          noPages: action.noPages,
          isLoading: false,
        },
      };
    case UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_ERROR:
      return {
        ...state,
        upcoming: {
          ...state.upcoming,
          isLoading: false,
          isError: true,
        },
      };
    case UserHomePageActionTypes.UPDATE_PAST_EVENTS_PAGE:
      return {
        ...state,
        past: {
          ...state.past,
          page: action.page,
        },
      };
    case UserHomePageActionTypes.UPDATE_UPCOMING_EVENTS_PAGE:
      return {
        ...state,
        upcoming: {
          ...state.upcoming,
          page: action.page,
        },
      };
    case UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_SUCCESS:
      return {
        ...state,
        highlightedEvents: action.events,
        isLoading: false,
      };

    case UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};
