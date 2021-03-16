import {
  UPDATE_FILTERS,
  FILTER_EVENTS_SUCCESS,
  FILTER_EVENTS_ERROR,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_ERROR,
  FETCH_EVENTS_REQUEST,
  FETCH_HOME_EVENTS_SUCCESS,
  FETCH_HOME_EVENTS_ERROR,
  FETCH_HOME_EVENTS_REQUEST,
  FILTER_EVENTS,
  UPDATE_SORT_CRITERIA,
  FETCH_CUSTOM_EVENTS_REQUEST,
  FETCH_CUSTOM_EVENTS_SUCCESS,
  FETCH_CUSTOM_EVENTS_ERROR,
  FETCH_CUSTOM_EVENTS_HOME,
  FETCH_CUSTOM_EVENTS_REQUEST_HOME,
  FETCH_CUSTOM_EVENTS_SUCCESS_HOME,
  FETCH_CUSTOM_EVENTS_ERROR_HOME,
  INCREMENT_PAGE,
  DECREMENT_PAGE,
  INCREMENT_PAGE_HOME,
  DECREMENT_PAGE_HOME,
  RESET_PAGE,
  RESET_PAGE_HOME,
  RESET_FILTERS,
  VALIDATE_TICKET_ERROR,
  VALIDATE_TICKET_SUCCESS,
  VALIDATE_TICKET_REQUEST,
  SET_IS_ERROR,
  SET_IS_VALID,
  SET_TICKET_ID,
  SET_ALERT_VISIBLE,
  SET_ALERT_TITLE,
  SET_ALERT_DESCRIPTION,
  SET_ALERT_SEVERITY,
  UPDATE_ERROR_RATE,
  UPDATE_ERROR_MAX_PEOPLE,
  UPDATE_ERROR_START_DATE,
  UPDATE_ERROR_END_DATE,
  UPDATE_ERROR_START_HOUR,
  UPDATE_ERROR_END_HOUR,
  LAST_PAGE_HOME,
  CLEAR_VALIDATION_DATA,
} from '../actions/EventsPageActions';
import { Severity, initialSeverity } from '../components/validateTicket/ValidateTicketAlert';
import { MathRelation } from '../model/MathRelation';
import { EventFilters } from '../model/EventFilters';
import { EventSort } from '../model/EventSort';

export interface EventsPageState {
  filters: EventFilters;
  errors: {
    errorRate: string;
    errorMaxPeople: string;
    errorStartDate: string;
    errorEndDate: string;
    errorStartHour: string;
    errorEndHour: string;
  };
  allEvents: [];
  allEventsHome: [];
  isLoading: boolean;
  isError: boolean;
  isValid: boolean;
  errorStatus: number;
  ticketCustomerName: string;
  ticketCustomerEmail: string;
  isLoadingHome: boolean;
  isErrorHome: boolean;
  eventsSort: EventSort;
  page: number;
  homePage: number;
  ticketID: number;
  alertVisible: boolean;
  alertTitle: string;
  alertDescription: string;
  alertSeverity: Severity;
  noPages: number;
  lastPageHome: number;
}

const initialState: EventsPageState = {
  filters: {
    title: '',
    subtitle: '',
    status: 'none',
    highlighted: undefined,
    location: '',
    startDate: undefined,
    endDate: undefined,
    startHour: undefined,
    endHour: undefined,
    rate: '',
    rateSign: MathRelation.GREATER,
    maxPeople: '',
    maxPeopleSign: MathRelation.GREATER,
  },
  errors: {
    errorRate: '',
    errorMaxPeople: '',
    errorStartDate: '',
    errorEndDate: '',
    errorStartHour: '',
    errorEndHour: '',
  },
  isLoading: false,
  isError: false,
  isValid: false,
  errorStatus: 0,
  ticketCustomerName: '',
  ticketCustomerEmail: '',
  isLoadingHome: true,
  isErrorHome: false,
  allEvents: [],
  allEventsHome: [],
  eventsSort: { criteria: '', type: '' },
  ticketID: 0,
  alertVisible: false,
  alertTitle: '',
  alertDescription: '',
  alertSeverity: initialSeverity,
  page: 0,
  homePage: 1,
  noPages: 0,
  lastPageHome: 0,
};

interface ReducerActionProps {
  type: string;
  payload: any;
  sort: any;
  page: number;
  errorStatus: number;
  name: string;
  email: string;
  error: boolean;
  isValid: boolean;
  ticketID: number;
  alertVisible: boolean;
  alertTitle: string;
  alertDescription: string;
  alertSeverity: Severity;
}

export const EventsPageReducer = (state = initialState, action: ReducerActionProps) => {
  switch (action.type) {
    case LAST_PAGE_HOME:
      return {
        ...state,
        lastPageHome: action.payload,
      };
    case INCREMENT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case DECREMENT_PAGE:
      return {
        ...state,
        page: state.page - 1,
      };
    case INCREMENT_PAGE_HOME:
      return {
        ...state,
        homePage: state.homePage + 1,
      };
    case DECREMENT_PAGE_HOME:
      return {
        ...state,
        homePage: state.homePage - 1,
      };
    case RESET_PAGE:
      return {
        ...state,
        page: 0,
      };
    case RESET_PAGE_HOME:
      return {
        ...state,
        homePage: 1,
      };
    case RESET_FILTERS:
      return {
        ...state,
        filters: {
          title: '',
          subtitle: '',
          status: 'none',
          highlighted: undefined,
          location: '',
          startDate: undefined,
          endDate: undefined,
          startHour: undefined,
          endHour: undefined,
          rate: '',
          rateSign: MathRelation.GREATER,
          maxPeople: '',
          maxPeopleSign: MathRelation.GREATER,
        },
        page: 0,
        eventsSort: { criteria: '', type: '' },
        allEvents: [],
        isLoading: false,
        isError: false,
      };
    case UPDATE_SORT_CRITERIA:
      return {
        ...state,
        eventsSort: action.payload,
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case FILTER_EVENTS:
      return {
        ...state,
        eventsSort: { criteria: '', type: '' },
      };
    case FILTER_EVENTS_SUCCESS:
      return {
        ...state,
        allEvents: action.payload.events,
        noPages: action.payload.noPages,
      };
    case FILTER_EVENTS_ERROR:
      return {
        ...state,
      };
    case FETCH_EVENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        allEvents: action.payload.events,
        noPages: action.payload.noPages,
        isLoading: false,
        isError: false,
      };
    case FETCH_EVENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case FETCH_CUSTOM_EVENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_CUSTOM_EVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        allEvents: action.payload.events,
        noPages: action.payload.noPages,
      };
    case FETCH_CUSTOM_EVENTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case FETCH_HOME_EVENTS_REQUEST:
      return {
        ...state,
        isLoadingHome: true,
      };
    case FETCH_HOME_EVENTS_SUCCESS:
      return {
        ...state,
        isLoadingHome: false,
        isErrorHome: false,
        allEventsHome: action.payload,
      };
    case FETCH_HOME_EVENTS_ERROR:
      return {
        ...state,
        isLoadingHome: false,
        isErrorHome: true,
      };
    case FETCH_CUSTOM_EVENTS_REQUEST_HOME:
      return {
        ...state,
        isLoadingHome: true,
        isErrorHome: false,
      };
    case FETCH_CUSTOM_EVENTS_HOME:
      return {
        ...state,
      };
    case FETCH_CUSTOM_EVENTS_SUCCESS_HOME:
      return {
        ...state,
        isLoadingHome: false,
        isErrorHome: false,
        allEventsHome: action.payload,
      };

    case FETCH_CUSTOM_EVENTS_ERROR_HOME:
      return {
        ...state,
        isLoadingHome: false,
        isErrorHome: true,
      };

    case VALIDATE_TICKET_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorStatus: '',
        isValid: false,
      };

    case VALIDATE_TICKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isValid: true,
        ticketCustomerName: action.name,
        ticketCustomerEmail: action.email,
        errorStatus: '',
      };

    case VALIDATE_TICKET_ERROR:
      return {
        ...state,
        isValid: false,
        isLoading: false,
        isError: true,
        errorStatus: action.errorStatus,
      };

    case SET_IS_ERROR:
      return {
        ...state,
        isError: action.error,
      };

    case SET_IS_VALID:
      return {
        ...state,
        isValid: action.isValid,
      };

    case SET_TICKET_ID:
      return {
        ...state,
        ticketID: action.ticketID,
      };

    case SET_ALERT_VISIBLE:
      return {
        ...state,
        alertVisible: action.alertVisible,
      };

    case SET_ALERT_TITLE:
      return {
        ...state,
        alertTitle: action.alertTitle,
      };

    case SET_ALERT_DESCRIPTION:
      return {
        ...state,
        alertDescription: action.alertDescription,
      };

    case SET_ALERT_SEVERITY:
      return {
        ...state,
        alertSeverity: action.alertSeverity,
      };

    case UPDATE_ERROR_RATE:
      return {
        ...state,
        errors: {
          ...state.errors,
          errorRate: action.payload,
        },
      };
    case UPDATE_ERROR_MAX_PEOPLE:
      return {
        ...state,
        errors: {
          ...state.errors,
          errorMaxPeople: action.payload,
        },
      };
    case UPDATE_ERROR_START_DATE:
      return {
        ...state,
        errors: {
          ...state.errors,
          errorStartDate: action.payload,
        },
      };
    case UPDATE_ERROR_END_DATE:
      return {
        ...state,
        errors: {
          ...state.errors,
          errorEndDate: action.payload,
        },
      };
    case UPDATE_ERROR_START_HOUR:
      return {
        ...state,
        errors: {
          ...state.errors,
          errorStartHour: action.payload,
        },
      };
    case UPDATE_ERROR_END_HOUR:
      return {
        ...state,
        errors: {
          ...state.errors,
          errorEndHour: action.payload,
        },
      };

    case CLEAR_VALIDATION_DATA:
      return {
        ...state,
        ticketID: 0,
        alertVisible: false,
        alertTitle: '',
        alertDescription: '',
        alertSeverity: initialSeverity,
      };
    default:
      return state;
  }
};
