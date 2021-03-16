import { EventReserveTicketType } from '../model/EventReserveTicketType';
import { ReserveTicketAction, ReserveTicketActionTypes } from '../actions/ReserveTicketsActions';

export interface ReserveFirstPageState {
  event: EventReserveTicketType;
  isLoading: boolean;
  isError: boolean;
  radioButtonState: string;
}

const initialState: ReserveFirstPageState = {
  isLoading: true,
  event: {
    id: 0,
    title: '',
    subtitle: '',
    locationAddress: '',
    locationName: '',
    startDate: '',
    endDate: '',
    startHour: '',
    endHour: '',
    ticketInfo: '',
  },
  radioButtonState: 'seat',
  isError: false,
};

export const ReservePageReducer = (
  state: ReserveFirstPageState = initialState,
  action: ReserveTicketAction
): ReserveFirstPageState => {
  switch (action.type) {
    case ReserveTicketActionTypes.RESERVE_EVENT_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ReserveTicketActionTypes.RESERVE_EVENT_FETCH_SUCCESS: {
      return {
        ...state,
        event: action.event,
        isLoading: false,
        isError: false,
      };
    }
    case ReserveTicketActionTypes.RESERVE_EVENT_ERROR: {
      return {
        ...state,
        isError: true,
      };
    }
    case ReserveTicketActionTypes.UPDATE_RADIOBUTTON:
      return {
        ...state,
        radioButtonState: action.radioButton,
      };
    default:
      return state;
  }
};

export default ReservePageReducer;
