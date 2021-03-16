import Booking from '../model/Booking';
import { TicketsPerCateory, TicketNames } from '../model/UserReserveTicket';
import {
  TicketsStepFormErrors,
  TicketAvailabilityData,
  EmailStepFormErrors,
  NamesStepFormErrors,
} from '../model/BuyTicketsSecondPage';

export const LOAD_TICKET_CATEGORIES = 'LOAD_TICKET_CATEGORIES';
export const ADD_BOOKINGS = 'ADD_BOOKINGS';

export const FETCH_TICKET_CATEGORIES_REQUEST = 'FETCH_TICKET_CATEGORIES_REQUEST';
export const FETCH_TICKET_CATEGORIES_SUCCESS = 'FETCH_TICKET_CATEGORIES_SUCCESS';
export const FETCH_TICKET_CATEGORIES_FAILURE = 'FETCH_TICKET_CATEGORIES_FAILURE';

export const ADD_BOOKINGS_REQUEST = 'ADD_BOOKINGS_REQUEST';
export const ADD_BOOKINGS_SUCCESS = 'ADD_BOOKINGS_SUCCESS';
export const ADD_BOOKINGS_FAILURE = 'ADD_BOOKINGS_FAILURE';

export const UPDATE_BOOKINGS = 'UPDATE_BOOKINGS';
export const UPDATE_TICKET_AMOUNT = 'UPDATE_TICKET_AMOUNT';
export const UPDATE_TICKET_NAME = 'UPDATE_TICKET_NAME';
export const UPDATE_CHECKED = 'UPDATE_CHECKED';
export const UPDATE_TICKETS_STEP_FORM_ERRORS = 'UPDATE_TICKETS_STEP_FORM_ERRORS';
export const UPDATE_EMAIL_FORM_ERRORS = 'UPDATE_EMAIL_FORM_ERRORS';
export const UPDATE_NAMES_STEP_FORM_ERRORS = 'UPDATE_NAMES_STEP_FORM_ERRORS';

export const RESET_ERRORS = 'RESET_ERRORS';

//---------------------------------------------------for SAGA
export const loadTicketCategories = (idEvent: string) => {
  return {
    type: LOAD_TICKET_CATEGORIES,
    payload: idEvent,
  };
};

export const addBookings = (booking: Booking) => {
  return {
    type: ADD_BOOKINGS,
    payload: { bookings: booking },
  };
};

//------------------------------------------------------ FETCH

export const fetchTicketCategoriesRequest = () => {
  return {
    type: FETCH_TICKET_CATEGORIES_REQUEST,
  };
};

export const fetchTicketCategoriesSuccess = (ticketCategories: TicketAvailabilityData[]) => {
  return {
    type: FETCH_TICKET_CATEGORIES_SUCCESS,
    payload: ticketCategories,
  };
};

export const fetchTicketCategoriesFailure = (error: string) => {
  return {
    type: FETCH_TICKET_CATEGORIES_FAILURE,
    payload: error,
  };
};

//---------------------------------------------------------- POST

export const addBookingsRequest = () => {
  return {
    type: ADD_BOOKINGS_REQUEST,
  };
};

export const addBookingsSuccess = () => {
  return {
    type: ADD_BOOKINGS_SUCCESS,
  };
};

export const addBookingsFailure = (error: string) => {
  return {
    type: ADD_BOOKINGS_FAILURE,
    payload: error,
  };
};

//--------------------------------------------------------- UPDATE
export const updateBookings = (booking: Booking) => {
  return {
    type: UPDATE_BOOKINGS,
    payload: booking,
  };
};

export const updateTicketAmount = (ticketAmount: TicketsPerCateory[]) => {
  return {
    type: UPDATE_TICKET_AMOUNT,
    payload: ticketAmount,
  };
};

export const updateTicketNames = (ticketNames: TicketNames[]) => {
  return {
    type: UPDATE_TICKET_NAME,
    payload: ticketNames,
  };
};

export const updateChecked = (checked: boolean) => {
  return {
    type: UPDATE_CHECKED,
    payload: checked,
  };
};

export const updateTicketsStepFormErrors = (ticketsStepFormErrors: TicketsStepFormErrors[]) => {
  return {
    type: UPDATE_TICKETS_STEP_FORM_ERRORS,
    payload: ticketsStepFormErrors,
  };
};

export const updateEmailFormErrors = (emailFormErrors: EmailStepFormErrors) => {
  return {
    type: UPDATE_EMAIL_FORM_ERRORS,
    payload: emailFormErrors,
  };
};

export const updateNamesStepFormErrors = (namesStepFormErrors: NamesStepFormErrors[]) => {
  return {
    type: UPDATE_NAMES_STEP_FORM_ERRORS,
    payload: namesStepFormErrors,
  };
};

export const resetErrors = () => {
  return {
    type: RESET_ERRORS,
  }
}
