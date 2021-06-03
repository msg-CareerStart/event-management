export const LOAD_DISCOUNTS_FOR_EVENT = 'LOAD_DISCOUNTS_FOR_EVENT';
export const LOAD_DISCOUNTS_FOR_EVENT_REQUEST = 'LOAD_DISCOUNTS_FOR_EVENT_REQUEST';
export const LOAD_DISCOUNTS_FOR_EVENT_SUCCESS = 'LOAD_DISCOUNTS_FOR_EVENT_SUCCESS';
export const LOAD_DISCOUNTS_FOR_EVENT_FAILURE = 'LOAD_DISCOUNTS_FOR_EVENT_FAILURE';

export const loadDiscountsForEvent = (idEvent: number) => {
  return {
    type: LOAD_DISCOUNTS_FOR_EVENT,
    payload: idEvent,
  };
};

export const loadDiscountsForEventRequest = () => {
  return {
    type: LOAD_DISCOUNTS_FOR_EVENT_REQUEST,
  };
};

export const loadDiscountsForEventSuccess = (discounts: any) => {
  return {
    type: LOAD_DISCOUNTS_FOR_EVENT_SUCCESS,
    payload: discounts,
  };
};

export const loadDiscountsForEventFailure = (err: string) => {
  return {
    type: LOAD_DISCOUNTS_FOR_EVENT_FAILURE,
    err: err,
  };
};
