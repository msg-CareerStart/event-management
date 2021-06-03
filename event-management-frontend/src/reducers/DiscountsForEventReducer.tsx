import {
  LOAD_DISCOUNTS_FOR_EVENT_FAILURE,
  LOAD_DISCOUNTS_FOR_EVENT_REQUEST,
  LOAD_DISCOUNTS_FOR_EVENT_SUCCESS,
} from '../actions/DiscountForEventActions';
import { DiscountsForEvent } from '../model/DiscountsForEvent';

export interface DiscountsForEventState {
  discounts: DiscountsForEvent[];
  isLoading: boolean;
  isError: boolean;
  err: string;
}

const initialState: DiscountsForEventState = {
  discounts: [],
  isLoading: true,
  isError: false,
  err: '',
};

export const DiscountsForEventReducer = (
  state: DiscountsForEventState = initialState,
  action: { type: string; payload: DiscountsForEvent[]; err: string }
) => {
  switch (action.type) {
    case LOAD_DISCOUNTS_FOR_EVENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_DISCOUNTS_FOR_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        discounts: action.payload,
      };
    case LOAD_DISCOUNTS_FOR_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        err: action.payload,
      };
    default:
      return state;
  }
};
