import { Ticket } from '../model/Ticket';
import { TicketFilters } from '../model/TicketFilters';

export const FETCH_TICKETS = 'FETCH_TICKETS';
export const FETCH_TICKETS_REQUEST = 'FETCH_TICKETS_REQUEST';
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';
export const FETCH_TICKETS_ERROR = 'FETCH_TICKETS_ERROR';
export const INCREMENT_PAGE = 'INCREMENT_PAGE';
export const UPDATE_FILTERS_TICKETS = 'UPDATE_FILTERS_TICKETS';
export const RESET_FILTERS_TICKETS = 'RESET_FILTERS_TICKETS';
export const RESET_PAGE_TICKETS = 'RESET_PAGE_TICKETS';
export const UPDATE_IS_FETCHING = 'UPDATE_IS_FETCHING';
export const RESET_STATE_TICKETS = 'RESET_STATE_TICKETS';

export const setIsFetching = (isFetching: boolean) => {
  return {
    type: UPDATE_IS_FETCHING,
    payload: isFetching,
  };
};

export const fetchTickets = (page: number, filters: TicketFilters) => {
  return {
    type: FETCH_TICKETS,
    payload: {
      page: page,
      filters: filters,
    },
  };
};

export const fetchTicketsRequest = () => {
  return {
    type: FETCH_TICKETS_REQUEST,
  };
};

export const fetchTicketsSuccess = (tickets: Array<Ticket>) => {
  return {
    type: FETCH_TICKETS_SUCCESS,
    payload: tickets,
  };
};

export const fetchTicketsError = () => {
  return {
    type: FETCH_TICKETS_ERROR,
  };
};

export const incrementPage = () => {
  return {
    type: INCREMENT_PAGE,
  };
};

export const updateFilters = (filters: TicketFilters) => {
  return {
    type: UPDATE_FILTERS_TICKETS,
    payload: filters,
  };
};

export const resetFilters = () => {
  return {
    type: RESET_FILTERS_TICKETS,
  };
};

export const resetPage = () => {
  return {
    type: RESET_PAGE_TICKETS,
  };
};

export const resetState = () => {
  return {
    type: RESET_STATE_TICKETS,
  };
};
