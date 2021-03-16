import { EventCrud } from '../model/EventCrud';
import { EventImage } from '../model/EventImage';
import { EventFormErrors } from '../model/EventFormErrors';
import { TicketAvailabilityData } from '../model/TicketAvailabilityData';

export const LOAD_EVENT = 'LOAD_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const ADD_EVENT = 'ADD_EVENT';
export const EDIT_EVENT = 'EDIT_EVENT';

export const FETCH_EVENT_REQUEST = 'FETCH_EVENT_REQUEST';
export const FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS';
export const FETCH_EVENT_FAILURE = 'FETCH_EVENT_FAILURE';

export const DELETE_EVENT_REQUEST = 'DELETE_EVENT_REQUEST';
export const DELETE_EVENT_SUCCESS = 'DELETE_EVENT_SUCCESS';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

export const ADD_EVENT_REQUEST = 'ADD_EVENT_REQUEST';
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
export const ADD_EVENT_FAILURE = 'ADD_EVENT_FAILURE';

export const EDIT_EVENT_REQUEST = 'EDIT_EVENT_REQUEST';
export const EDIT_EVENT_SUCCESS = 'EDIT_EVENT_SUCCESS';
export const EDIT_EVENT_FAILURE = 'EDIT_EVENT_FAILURE';

export const UPDATE_EVENT_IMAGES = 'UPDATE_EVENT_IMAGES';
export const UPDATE_FORM_ERRORS = 'UPDATE_FORM_ERRORS';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';

export const RESET_STORE = 'RESET_STORE';
export const RESET_ERRORS = 'RESET_ERRORS';

export const ADD_EMPTY_CATEGORY_CARD = 'ADD_EMPTY_CATEGORY_CARD';
export const REMOVE_CATEGORY_CARD = 'REMOVE_CATEGORY_CARD';

//---------------------------------------------------for SAGA
export const loadEvent = (id: string) => {
  return {
    type: LOAD_EVENT,
    payload: id,
  };
};

export const deleteEvent = (id: string) => {
  return {
    type: DELETE_EVENT,
    payload: id,
  };
};

export const addEvent = (event: EventCrud, images: EventImage[]) => {
  return {
    type: ADD_EVENT,
    payload: { event: event, images: images },
  };
};

export const editEvent = (event: EventCrud, images: EventImage[]) => {
  return {
    type: EDIT_EVENT,
    payload: { event: event, images: images },
  };
};
//------------------------------------------------------

export const fetchEventRequest = () => {
  return {
    type: FETCH_EVENT_REQUEST,
  };
};

export const fetchEventSuccess = (product: EventCrud, ticketData: TicketAvailabilityData[]) => {
  return {
    type: FETCH_EVENT_SUCCESS,
    payload: product,
    ticketCategoryData: ticketData,
  };
};

export const fetchEventFailure = (error: string) => {
  return {
    type: FETCH_EVENT_FAILURE,
    payload: error,
  };
};

export const deleteEventRequest = () => {
  return {
    type: DELETE_EVENT_REQUEST,
  };
};

export const deleteEventSuccess = () => {
  return {
    type: DELETE_EVENT_SUCCESS,
  };
};

export const deleteEventFailure = (error: string) => {
  return {
    type: DELETE_EVENT_FAILURE,
    payload: error,
  };
};

export const addEventRequest = () => {
  return {
    type: ADD_EVENT_REQUEST,
  };
};

export const addEventSuccess = () => {
  return {
    type: ADD_EVENT_SUCCESS,
  };
};

export const addEventFailure = (error: string) => {
  return {
    type: ADD_EVENT_FAILURE,
    payload: error,
  };
};

export const editEventRequest = () => {
  return {
    type: EDIT_EVENT_REQUEST,
  };
};

export const editEventSuccess = () => {
  return {
    type: EDIT_EVENT_SUCCESS,
  };
};

export const editEventFailure = (error: string) => {
  return {
    type: EDIT_EVENT_FAILURE,
    payload: error,
  };
};

export const updateEventImages = (images: EventImage[]) => {
  return {
    type: UPDATE_EVENT_IMAGES,
    payload: images,
  };
};

export const updateFormErrors = (errors: EventFormErrors) => {
  return {
    type: UPDATE_FORM_ERRORS,
    payload: errors,
  };
};

export const updateEvent = (event: EventCrud) => {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
};

export const updateLocation = (idLocation: number) => {
  return {
    type: UPDATE_LOCATION,
    payload: idLocation,
  };
};

export const resetStore = () => {
  return {
    type: RESET_STORE,
  };
};

export const resetErrors = () => {
  return {
    type: RESET_ERRORS,
  }
}

//--------------- Category Card----------------------

export const addEmptyCategoryCard = () => {
  return {
    type: ADD_EMPTY_CATEGORY_CARD,
  };
};

export const removeCategoryCard = (id: number) => {
  return {
    type: REMOVE_CATEGORY_CARD,
    id: id,
  };
};
