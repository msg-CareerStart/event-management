import { EventFilters } from '../model/EventFilters';
import { EventSort } from '../model/EventSort';
import { Event } from '../model/Event';
import { Severity } from '../components/validateTicket/ValidateTicketAlert';

export const UPDATE_FILTERS = 'UPDATE_FILTERS';
export const FILTER_EVENTS = 'FILTER_EVENTS';
export const FILTER_EVENTS_SUCCESS = 'FILTER_EVENTS_SUCCESS';
export const FILTER_EVENTS_ERROR = 'FILTER_EVENTS_ERROR';
export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_EVENTS_REQUEST = 'FETCH_EVENTS_REQUEST';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR';
export const FETCH_HOME_EVENTS = 'FETCH_HOME_EVENTS';
export const FETCH_HOME_EVENTS_REQUEST = 'FETCH_HOME_EVENTS_REQUEST';
export const FETCH_HOME_EVENTS_SUCCESS = 'FETCH_HOME_EVENTS_SUCCESS';
export const FETCH_HOME_EVENTS_ERROR = 'FETCH_HOME_EVENTS_ERROR';

export const UPDATE_ERROR_RATE = 'UPDATE_ERROR_RATE';
export const UPDATE_ERROR_MAX_PEOPLE = 'UPDATE_ERROR_MAX_PEOPLE';
export const UPDATE_ERROR_START_DATE = 'UPDATE_ERROR_START_DATE';
export const UPDATE_ERROR_END_DATE = 'UPDATE_ERROR_END_DATE';
export const UPDATE_ERROR_START_HOUR = 'UPDATE_ERROR_START_HOUR';
export const UPDATE_ERROR_END_HOUR = 'UPDATE_ERROR_END_HOUR';

export const FETCH_CUSTOM_EVENTS = 'FETCH_CUSTOM_EVENTS';
export const FETCH_CUSTOM_EVENTS_REQUEST = 'FETCH_CUSTOM_EVENTS_REQUEST';
export const FETCH_CUSTOM_EVENTS_SUCCESS = 'FETCH_CUSTOM_EVENTS_SUCCESS';
export const FETCH_CUSTOM_EVENTS_ERROR = 'FETCH_CUSTOM_EVENTS_ERROR';

export const FETCH_CUSTOM_EVENTS_HOME = 'FETCH_CUSTOM_EVENTS_HOME';
export const FETCH_CUSTOM_EVENTS_REQUEST_HOME = 'FETCH_CUSTOM_EVENTS_REQUEST_HOME';
export const FETCH_CUSTOM_EVENTS_SUCCESS_HOME = 'FETCH_CUSTOM_EVENTS_SUCCESS_HOME';
export const FETCH_CUSTOM_EVENTS_ERROR_HOME = 'FETCH_CUSTOM_EVENTS_ERROR_HOME';

export const UPDATE_SORT_CRITERIA = 'UPDATE_SORT_CRITERIA';

export const INCREMENT_PAGE = 'INCREMENT_PAGE';
export const DECREMENT_PAGE = 'DECREMENT_PAGE';
export const INCREMENT_PAGE_HOME = 'INCREMENT_PAGE_HOME';
export const DECREMENT_PAGE_HOME = 'DECREMENT_PAGE_HOME';

export const RESET_PAGE = 'RESET_PAGE';
export const RESET_PAGE_HOME = 'RESET_PAGE_HOME';
export const RESET_FILTERS = 'RESET_FILTERS';

export const VALIDATE_TICKET = 'VALIDATE_TICKET';
export const VALIDATE_TICKET_REQUEST = 'VALIDATE_TICKET_REQUEST';
export const VALIDATE_TICKET_SUCCESS = 'VALIDATE_TICKET_SUCCESS';
export const VALIDATE_TICKET_ERROR = 'VALIDATE_TICKET_ERROR';
export const SET_IS_ERROR = 'SET_IS_ERROR';
export const SET_IS_VALID = 'SET_IS_VALID';
export const SET_TICKET_ID = 'SET_TICKET_ID';
export const SET_ALERT_VISIBLE = 'SET_ALERT_VISIBLE';
export const SET_ALERT_TITLE = 'SET_ALERT_TITLE';
export const SET_ALERT_DESCRIPTION = 'SET_ALERT_DESCRIPTION';
export const SET_ALERT_SEVERITY = 'SET_ALERT_SEVERITY';
export const CLEAR_VALIDATION_DATA = 'CLEAR_VALIDATION_DATA';

export const LAST_PAGE_HOME = 'LAST_PAGE_HOME';

export const updateFilters = (filters: EventFilters) => {
  return {
    type: UPDATE_FILTERS,
    payload: filters,
  };
};

export const filterEvents = (filters: EventFilters, page: number) => {
  return {
    type: FILTER_EVENTS,
    payload: filters,
    page: page,
  };
};

export const filterEventsSuccess = (result: Array<Event>) => {
  return {
    type: FILTER_EVENTS_SUCCESS,
    payload: result,
  };
};

export const filterEventsError = () => {
  return {
    type: FILTER_EVENTS_ERROR,
  };
};

export const fetchAllEvents = () => {
  return {
    type: FETCH_EVENTS,
  };
};

export const fetchEventsRequest = () => {
  return {
    type: FETCH_EVENTS_REQUEST,
  };
};

export const fetchEventsSuccess = (result: Array<Event>) => {
  return {
    type: FETCH_EVENTS_SUCCESS,
    payload: result,
  };
};

export const fetchEventsError = () => {
  return {
    type: FETCH_EVENTS_ERROR,
  };
};

export const fetchAllEventsHome = () => {
  return {
    type: FETCH_HOME_EVENTS,
  };
};

export const fetchEventsRequestHome = () => {
  return {
    type: FETCH_HOME_EVENTS_REQUEST,
  };
};

export const fetchEventsSuccessHome = (result: Array<Event>) => {
  return {
    type: FETCH_HOME_EVENTS_SUCCESS,
    payload: result,
  };
};

export const fetchEventsErrorHome = () => {
  return {
    type: FETCH_HOME_EVENTS_ERROR,
  };
};

export const fetchCustomEvents = (filters: EventFilters, sort: EventSort, page: number) => {
  return {
    type: FETCH_CUSTOM_EVENTS,
    payload: {
      filters: filters,
      sort: sort,
      page: page,
    },
  };
};

export const fetchCustomEventsRequest = () => {
  return {
    type: FETCH_CUSTOM_EVENTS_REQUEST,
  };
};

export const fetchCustomEventsSuccess = (events: Array<Event>) => {
  return {
    type: FETCH_CUSTOM_EVENTS_SUCCESS,
    payload: events,
  };
};

export const fetchCustomEventsError = () => {
  return {
    type: FETCH_CUSTOM_EVENTS_ERROR,
  };
};

export const fetchCustomEventsHome = (page: number) => {
  return {
    type: FETCH_CUSTOM_EVENTS_HOME,
    payload: {
      page: page,
    },
  };
};

export const fetchCustomEventsRequestHome = () => {
  return {
    type: FETCH_CUSTOM_EVENTS_REQUEST_HOME,
  };
};

export const fetchCustomEventsSuccessHome = (events: Array<Event>) => {
  return {
    type: FETCH_CUSTOM_EVENTS_SUCCESS_HOME,
    payload: events,
  };
};

export const fetchCustomEventsErrorHome = () => {
  return {
    type: FETCH_CUSTOM_EVENTS_ERROR_HOME,
  };
};

export const updateSortCriteria = (criteria: EventSort) => {
  return {
    type: UPDATE_SORT_CRITERIA,
    payload: criteria,
  };
};

export const incrementPage = () => {
  return {
    type: INCREMENT_PAGE,
  };
};

export const decrementPage = () => {
  return {
    type: DECREMENT_PAGE,
  };
};

export const resetPage = () => {
  return {
    type: RESET_PAGE,
  };
};

export const incrementPageHome = () => {
  return {
    type: INCREMENT_PAGE_HOME,
  };
};

export const decrementPageHome = () => {
  return {
    type: DECREMENT_PAGE_HOME,
  };
};

export const resetFilters = () => {
  return {
    type: RESET_FILTERS,
  };
};

export const validateTicket = (ticketID: number, eventID: number) => {
  return {
    type: VALIDATE_TICKET,
    ticketID: ticketID,
    eventID: eventID,
  };
};

export const validateTicketRequest = () => {
  return {
    type: VALIDATE_TICKET_REQUEST,
  };
};

export const validateTicketSuccess = (name: string, email: string) => {
  return {
    type: VALIDATE_TICKET_SUCCESS,
    name: name,
    email: email,
  };
};

export const validateTicketFailure = (errorStatus: number) => {
  return {
    type: VALIDATE_TICKET_ERROR,
    errorStatus: errorStatus,
  };
};

export const setIsError = (isError: boolean) => {
  return {
    type: SET_IS_ERROR,
    isError: isError,
  };
};

export const setIsValid = (isValid: boolean) => {
  return {
    type: SET_IS_VALID,
    isValid: isValid,
  };
};

export const setTicketID = (ticketID: number) => {
  return {
    type: SET_TICKET_ID,
    ticketID: ticketID,
  };
};

export const setAlertVisible = (alertVisible: boolean) => {
  return {
    type: SET_ALERT_VISIBLE,
    alertVisible: alertVisible,
  };
};

export const setAlertTitle = (alertTitle: string) => {
  return {
    type: SET_ALERT_TITLE,
    alertTitle: alertTitle,
  };
};

export const setAlertDescription = (alertDescription: string) => {
  return {
    type: SET_ALERT_DESCRIPTION,
    alertDescription: alertDescription,
  };
};

export const setAlertSeverity = (alertSeverity: Severity) => {
  return {
    type: SET_ALERT_SEVERITY,
    alertSeverity: alertSeverity,
  };
};

export const clearValidationData = () => {
  return {
    type: CLEAR_VALIDATION_DATA,
  };
};

export const setErrorRate = (message: string) => {
  return {
    type: UPDATE_ERROR_RATE,
    payload: message,
  };
};

export const setErrorMaxPeople = (message: string) => {
  return {
    type: UPDATE_ERROR_MAX_PEOPLE,
    payload: message,
  };
};

export const setErrorStartDate = (message: string) => {
  return {
    type: UPDATE_ERROR_START_DATE,
    payload: message,
  };
};

export const setErrorEndDate = (message: string) => {
  return {
    type: UPDATE_ERROR_END_DATE,
    payload: message,
  };
};

export const setErrorStartHour = (message: string) => {
  return {
    type: UPDATE_ERROR_START_HOUR,
    payload: message,
  };
};

export const setErrorEndHour = (message: string) => {
  return {
    type: UPDATE_ERROR_END_HOUR,
    payload: message,
  };
};

export const setLastPageHome = (page: number) => {
  return {
    type: LAST_PAGE_HOME,
    payload: page,
  };
};
