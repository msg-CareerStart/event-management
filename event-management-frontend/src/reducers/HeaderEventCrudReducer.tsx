import {
  FETCH_EVENT_REQUEST,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAILURE,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  EDIT_EVENT_REQUEST,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_FAILURE,
  UPDATE_EVENT_IMAGES,
  UPDATE_FORM_ERRORS,
  UPDATE_EVENT,
  UPDATE_LOCATION,
  RESET_STORE,
  ADD_EMPTY_CATEGORY_CARD,
  REMOVE_CATEGORY_CARD,
  RESET_ERRORS,
  ADD_LOCATION_FAILURE,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_TO_EVENT,
  ADD_EMPTY_DISCOUNT_CARD,
  REMOVE_DISCOUNT_CARD,
} from '../actions/HeaderEventCrudActions';
import { EventCrud } from '../model/EventCrud';
import { EventImage } from '../model/EventImage';
import { EventFormErrors, CategoryCardErrors, DiscountCardErrors } from '../model/EventFormErrors';
import { TicketAvailabilityData } from '../model/TicketAvailabilityData';
import { CategoryCardItem } from '../model/TicketType';
import { LocationType } from '../model/LocationType';
import { DiscountCardItem } from '../model/DiscountType';

export interface EventState {
  eventIsLoading: boolean;
  event: EventCrud;
  ticketData: TicketAvailabilityData[];
  error: string;
  isError: boolean;
  isLoading: boolean;
  images: EventImage[];
  formErrors: EventFormErrors;
  locationAddress: string;
  locationName: string;
  isDeleted: boolean;
  isSaved: boolean;
  location: LocationType;

  modifyEventError: boolean;
}

let today = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
const dateAndTime = today.split('T');
const currDate = dateAndTime[0];
const currTime = dateAndTime[1].replace(/:\d\d([ ap]|$)/, '$1');

export const noDiscountCardError: DiscountCardErrors = {
  code: '',
  percentage: '',
  startDate: '',
  endDate: '',
};

export const noCardError: CategoryCardErrors = {
  title: '',
  subtitle: '',
  price: '',
  description: '',
  ticketsPerCategory: '',
  discountDtoList: [noDiscountCardError],
};

export const emptyCard: CategoryCardItem = {
  id: -1,
  title: '',
  subtitle: '',
  price: 0,
  description: '',
  ticketsPerCategory: 0,
  available: true,
  discountDtoList: [],
};

export const emptyDiscount: DiscountCardItem = {
  id: -1,
  code: '',
  percentage: 0,
  startDate: '',
  endDate: '',
};

export const newTicket: TicketAvailabilityData = {
  title: '',
  remaining: -1,
  sold: 0,
};

export const initialState: EventState = {
  eventIsLoading: false,
  event: {
    id: -1,
    title: '',
    subtitle: '',
    status: true,
    highlighted: false,
    description: '',
    observations: '',
    location: -1,
    startDate: currDate,
    endDate: currDate,
    startHour: currTime,
    endHour: currTime,
    maxPeople: 0,
    picturesUrlSave: [],
    picturesUrlDelete: [],
    ticketsPerUser: 0,
    noTicketEvent: true,
    ticketCategoryDtoList: [],
    ticketCategoryToDelete: [],
    discountsToDelete: [],
    ticketInfo: '',
  },
  ticketData: [newTicket],
  formErrors: {
    title: '',
    subtitle: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    maxPeople: '',
    ticketsPerUser: '',
    ticketInfo: '',
    ticketCategoryDtoList: [noCardError],
  },
  error: '',
  isError: false,
  isLoading: false,
  images: [],

  locationAddress: '',
  locationName: '',

  isDeleted: false,
  isSaved: false,

  location: {
    id: 0,
    name: '',
    address: '',
    latitude: '',
    longitude: '',
  },

  modifyEventError: false,
};

const getEventImages = (imagesStr: string[]) => {
  const images = imagesStr.map((img: string) => {
    let fullName = img.split('/').pop();
    return { id: fullName, name: fullName, url: img };
  });
  return images as EventImage[];
};

const HeaderReducer = (
  state = initialState,
  action: { type: string; payload: EventCrud; id: number; ticketCategoryData: TicketAvailabilityData[] }
) => {
  switch (action.type) {
    case ADD_LOCATION_TO_EVENT:
      return {
        ...state,
        location: action.payload,
      };
    case ADD_LOCATION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_LOCATION_SUCCESS:
      var loc = state.location;
      loc.id = action.payload.id;
      return {
        ...state,
        location: loc,
      };
    case RESET_ERRORS:
      return {
        ...state,
        isError: false,
        modifyEventError: false,
        error: '',
      };

    case RESET_STORE:
      return {
        ...initialState,
      };

    case UPDATE_LOCATION:
      const newEvent = JSON.parse(JSON.stringify(state.event));
      newEvent.location = action.payload;
      return {
        ...state,
        event: newEvent,
      };

    case FETCH_EVENT_REQUEST:
      return {
        ...state,
        eventIsLoading: true,
        isLoading: true,
      };

    case FETCH_EVENT_SUCCESS:
      let ticketCategoryErrors: CategoryCardErrors[] = [];
      action.payload.ticketCategoryDtoList.forEach((data, index) => {
        ticketCategoryErrors.push({
          title: '',
          subtitle: '',
          price: '',
          description: '',
          ticketsPerCategory: '',
          discountDtoList: [],
        });
        action.payload.ticketCategoryDtoList[index].discountDtoList.forEach((data, index) => {
          ticketCategoryErrors[ticketCategoryErrors.length - 1].discountDtoList.push({
            code: '',
            percentage: '',
            startDate: '',
            endDate: '',
          });
        });
      });
      return {
        ...state,
        eventIsLoading: false,
        event: action.payload,
        ticketData: action.ticketCategoryData,
        error: '',
        isError: false,
        isLoading: false,
        images: getEventImages(action.payload.picturesUrlSave),
        formErrors: {
          ...state.formErrors,
          ticketCategoryDtoList: ticketCategoryErrors,
        },
      };

    case FETCH_EVENT_FAILURE:
      return {
        ...state,
        eventIsLoading: false,
        event: action.payload,
        isError: true,
        isLoading: false,
      };
    //--------------------------------------
    case DELETE_EVENT_REQUEST:
      return {
        ...state,
        eventIsLoading: true,
      };

    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        ...initialState,
        isDeleted: true,
        eventIsLoading: false,
        error: '',
        modifyEventError: false,
      };

    case DELETE_EVENT_FAILURE:
      return {
        ...state,
        eventIsLoading: false,
        error: action.payload,
        modifyEventError: true,
      };

    //--------------------------------------------
    case ADD_EVENT_REQUEST:
      return {
        ...state,
        eventIsLoading: true,
      };

    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        eventIsLoading: false,
        isSaved: true,
        modifyEventError: false,
        error: '',
      };

    case ADD_EVENT_FAILURE:
      return {
        ...state,
        eventIsLoading: false,
        modifyEventError: true,
        error: action.payload,
      };
    //-------------------------------------
    case EDIT_EVENT_REQUEST:
      return {
        ...state,
        eventIsLoading: true,
      };

    case EDIT_EVENT_SUCCESS:
      return {
        ...state,
        eventIsLoading: false,
        isSaved: true,
        error: '',
        modifyEventError: false,
      };

    case EDIT_EVENT_FAILURE:
      return {
        ...state,
        eventIsLoading: false,
        error: action.payload,
        modifyEventError: true,
      };

    case UPDATE_EVENT_IMAGES:
      return {
        ...state,
        images: action.payload,
        isError: false,
      };

    case UPDATE_FORM_ERRORS:
      return {
        ...state,
        formErrors: action.payload,
      };

    case UPDATE_EVENT:
      return {
        ...state,
        event: action.payload,
      };

    case ADD_EMPTY_CATEGORY_CARD:
      let nextId = state.event.ticketCategoryDtoList[state.event.ticketCategoryDtoList.length - 1]
        ? Math.abs(state.event.ticketCategoryDtoList[state.event.ticketCategoryDtoList.length - 1].id) + 1
        : 1;
      nextId *= -1;
      return {
        ...state,
        event: {
          ...state.event,
          ticketCategoryDtoList: [
            ...state.event.ticketCategoryDtoList,
            {
              id: nextId,
              title: '',
              subtitle: '',
              price: 0,
              description: '',
              ticketsPerCategory: 0,
              available: true,
              discountDtoList: [],
            },
          ],
        },
        formErrors: {
          ...state.formErrors,
          ticketCategoryDtoList: [
            ...state.formErrors.ticketCategoryDtoList,
            {
              title: '',
              subtitle: '',
              price: '',
              description: '',
              ticketsPerCategory: '',
              discountDtoList: [{ code: '', percentage: 1, startDate: '', endDate: '' }],
            },
          ],
        },
      };

    case REMOVE_CATEGORY_CARD: {
      let copiedTicketCategoryToDelete = [...state.event.ticketCategoryToDelete];
      if (action.id > 0) {
        copiedTicketCategoryToDelete.push(action.id);
      }
      return {
        ...state,
        event: {
          ...state.event,
          ticketCategoryDtoList: state.event.ticketCategoryDtoList.filter((data) => data.id !== action.id),
          ticketCategoryToDelete: copiedTicketCategoryToDelete,
        },
      };
    }

    case ADD_EMPTY_DISCOUNT_CARD: {
      let element = state.event.ticketCategoryDtoList.findIndex((ticketCategory) => ticketCategory.id === action.id);
      let nextDiscount = 0;
      state.event.ticketCategoryDtoList.forEach((ticketCategory) => {
        ticketCategory.discountDtoList.forEach((discount) => {
          if (Math.abs(discount.id) > nextDiscount) {
            nextDiscount = Math.abs(discount.id);
          }
        });
      });
      nextDiscount = nextDiscount + 1;
      nextDiscount *= -1;
      let copiedTicketCategories = [...state.event.ticketCategoryDtoList];
      let copiedFormErrorTicketCategories = [...state.formErrors.ticketCategoryDtoList];
      copiedTicketCategories.forEach((ticketCategory: CategoryCardItem, index: number) => {
        if (index === element) {
          ticketCategory.discountDtoList = [...state.event.ticketCategoryDtoList[index].discountDtoList];
          ticketCategory.discountDtoList.push({
            id: nextDiscount,
            code: '',
            percentage: 1,
            startDate: '',
            endDate: '',
          });
        } else {
          ticketCategory.discountDtoList = [...state.event.ticketCategoryDtoList[index].discountDtoList];
        }
      });
      copiedFormErrorTicketCategories.forEach((formErrorTicketCategory: CategoryCardErrors, index: number) => {
        if (index === element) {
          console.log(state.formErrors.ticketCategoryDtoList[index]);
          formErrorTicketCategory.discountDtoList = [...state.formErrors.ticketCategoryDtoList[index].discountDtoList];
          formErrorTicketCategory.discountDtoList.push({ code: '', percentage: '', startDate: '', endDate: '' });
        }
      });

      return {
        ...state,
        event: {
          ...state.event,
          ticketCategoryDtoList: copiedTicketCategories,
        },
        formErrors: {
          ...state.formErrors,
          ticketCategoryDtoList: copiedFormErrorTicketCategories,
        },
      };
    }

    case REMOVE_DISCOUNT_CARD: {
      let copiedTicketCategories = [...state.event.ticketCategoryDtoList];
      copiedTicketCategories.forEach((ticketCategory, index) => {
        ticketCategory.discountDtoList = [...state.event.ticketCategoryDtoList[index].discountDtoList].filter(
          (discount) => discount.id !== action.id
        );
      });
      let copiedDiscountsToDelete;
      if (action.id > 0) {
        if (state.event.discountsToDelete === null || state.event.discountsToDelete === undefined) {
          copiedDiscountsToDelete = [action.id];
        } else {
          copiedDiscountsToDelete = [...state.event.discountsToDelete];
          copiedDiscountsToDelete.push(action.id);
        }
      }
      return {
        ...state,
        event: {
          ...state.event,
          ticketCategoryDtoList: copiedTicketCategories,
          discountsToDelete: copiedDiscountsToDelete,
        },
      };
    }
    default:
      return state;
  }
};

export default HeaderReducer;
