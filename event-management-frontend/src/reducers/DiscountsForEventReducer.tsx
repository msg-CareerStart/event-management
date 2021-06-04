import {
  loadAppliedDiscounts,
  LOAD_APPLIED_DISCOUNTS,
  LOAD_DISCOUNTS_FOR_EVENT_FAILURE,
  LOAD_DISCOUNTS_FOR_EVENT_REQUEST,
  LOAD_DISCOUNTS_FOR_EVENT_SUCCESS,
} from '../actions/DiscountForEventActions';
import { DiscountsForEvent } from '../model/DiscountsForEvent';

export interface ReturnedDiscount {
  CategoryId: number;
  DiscountId: number;
  DiscountCode: string;
  percentage: number;
  CategoryTitle: string;
}

export interface DiscountsForEventState {
  discounts: DiscountsForEvent[];
  isLoading: boolean;
  isError: boolean;
  err: string;
  appliedDiscounts: ReturnedDiscount[];
}

const initialState: DiscountsForEventState = {
  discounts: [],
  isLoading: true,
  isError: false,
  err: '',
  appliedDiscounts: [],
};

export const DiscountsForEventReducer = (
  state: DiscountsForEventState = initialState,
  action: { type: string; payload: DiscountsForEvent[]; err: string; discount: ReturnedDiscount }
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
    case LOAD_APPLIED_DISCOUNTS:
      let localState = { ...state };
      localState.discounts = [...state.discounts];
      localState.appliedDiscounts = [...state.appliedDiscounts];

      localState.appliedDiscounts.forEach((element) => {
        if (element.CategoryId === action.discount.CategoryId) {
          element.DiscountId = action.discount.DiscountId;
        } else {
          let newDiscount: ReturnedDiscount = {
            CategoryId: action.discount.CategoryId,
            DiscountId: action.discount.DiscountId,
            percentage: action.discount.percentage,
            DiscountCode: action.discount.DiscountCode,
            CategoryTitle: action.discount.CategoryTitle,
          };
          localState.appliedDiscounts.push(newDiscount);
        }
      });
      if (localState.appliedDiscounts.length === 0) {
        let newDiscount: ReturnedDiscount = {
          CategoryId: action.discount.CategoryId,
          DiscountId: action.discount.DiscountId,
          percentage: action.discount.percentage,
          DiscountCode: action.discount.DiscountCode,
          CategoryTitle: action.discount.CategoryTitle,
        };
        localState.appliedDiscounts.push(newDiscount);
      }
      return localState;
    default:
      return state;
  }
};
