import {
  FETCH_TICKET_CATEGORIES_REQUEST,
  FETCH_TICKET_CATEGORIES_SUCCESS,
  FETCH_TICKET_CATEGORIES_FAILURE,
  ADD_BOOKINGS_REQUEST,
  ADD_BOOKINGS_SUCCESS,
  ADD_BOOKINGS_FAILURE,
  UPDATE_BOOKINGS,
  UPDATE_TICKET_AMOUNT,
  UPDATE_TICKET_NAME,
  UPDATE_CHECKED,
  UPDATE_TICKETS_STEP_FORM_ERRORS,
  UPDATE_EMAIL_FORM_ERRORS,
  UPDATE_NAMES_STEP_FORM_ERRORS,
  RESET_ERRORS,
} from '../actions/TicketReservationActions';
import Booking from '../model/Booking';
import { TicketsPerCateory, TicketNames } from '../model/UserReserveTicket';
import {
  TicketsStepFormErrors,
  TicketAvailabilityData,
  EmailStepFormErrors,
  NamesStepFormErrors,
} from '../model/BuyTicketsSecondPage';

export interface ReserveSecondPageState {
  ticketCategory: TicketAvailabilityData[];
  isError: boolean;
  isLoading: boolean;
  isErrorTicketCategories: boolean;
  isLoadingTicketCategories: boolean;
  errorMsg: string;

  booking: Booking;
  ticketAmount: TicketsPerCateory[];
  ticketNames: TicketNames[];
  checked: boolean;

  ticketsStepFormErrors: TicketsStepFormErrors[];
  emailFormErrors: EmailStepFormErrors;
  namesStepFormErrors: NamesStepFormErrors[];
}

const initialBooking = {
  bookingDate: '',
  eventId: '',
  email: '',
  tickets: [],
};

const initialState: ReserveSecondPageState = {
  ticketCategory: [
    {
      title: '',
      remaining: 0,
      sold: 0,
    },
  ],
  isError: false,
  isLoading: false,
  isErrorTicketCategories: false,
  isLoadingTicketCategories: false,
  errorMsg: '',

  booking: initialBooking,
  ticketAmount: [],
  ticketNames: [],
  checked: false,

  ticketsStepFormErrors: [],
  emailFormErrors: { error: '' },
  namesStepFormErrors: [],
};

const TicketCategoriesReducer = (
  state = initialState,
  action: { type: string; payload: TicketAvailabilityData[] | Booking }
) => {
  switch (action.type) {
    case RESET_ERRORS:
      return {
        ...state,
        isError: false,
        errorMsg: '',
      }
    case FETCH_TICKET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        isLoadingTicketCategories: true,
      };
    case FETCH_TICKET_CATEGORIES_SUCCESS:
      return {
        ...state,
        ticketCategory: action.payload as TicketAvailabilityData[],
        isErrorTicketCategories: false,
        isLoadingTicketCategories: false,
      };
    case FETCH_TICKET_CATEGORIES_FAILURE:
      return {
        ...state,
        ticketCategory: action.payload as TicketAvailabilityData[],
        isErrorTicketCategories: true,
        isLoadingTicketCategories: false,
      };
    case ADD_BOOKINGS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_BOOKINGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_BOOKINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload,
      };
    case UPDATE_BOOKINGS:
      return {
        ...state,
        booking: action.payload as Booking,
      };
    case UPDATE_TICKET_AMOUNT:
      return {
        ...state,
        ticketAmount: action.payload,
      };
    case UPDATE_TICKET_NAME:
      return {
        ...state,
        ticketNames: action.payload,
      };
    case UPDATE_CHECKED:
      return {
        ...state,
        checked: action.payload,
      };
    case UPDATE_TICKETS_STEP_FORM_ERRORS:
      return {
        ...state,
        ticketsStepFormErrors: action.payload,
      };
    case UPDATE_EMAIL_FORM_ERRORS:
      return {
        ...state,
        emailFormErrors: action.payload,
      };
    case UPDATE_NAMES_STEP_FORM_ERRORS:
      return {
        ...state,
        namesStepFormErrors: action.payload,
      };
    default:
      return state;
  }
};

export default TicketCategoriesReducer;
