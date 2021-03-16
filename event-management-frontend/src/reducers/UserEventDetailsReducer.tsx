import { EventCrud } from '../model/EventCrud';
import { EventImage } from '../model/EventImage';
import { EventWithLocation } from '../model/EventWithLocation';
import { UserEventDetailsActions, UserEventDetailsActionTypes } from '../actions/UserEventDetailsActions';

export interface UserEventDetailsState {
  event: EventCrud;
  isError: boolean;
  isLoading: boolean;
  images: EventImage[];

  locationAddress: string;
  locationName: string;
}

let today = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
const dateAndTime = today.split('T');
const currDate = dateAndTime[0];
const currTime = dateAndTime[1].replace(/:\d\d([ ap]|$)/, '$1');

const initialState: UserEventDetailsState = {
  event: {
    id: -1,
    title: '',
    subtitle: '',
    status: true,
    highlighted: false,
    description: '',
    observations: '',
    location: 1,
    startDate: currDate,
    endDate: currDate,
    startHour: currTime,
    endHour: currTime,
    maxPeople: 0,
    picturesUrlSave: [],
    picturesUrlDelete: [],
    ticketsPerUser: 0,
    noTicketEvent: true,
    ticketCategoryDtoList: [
      { id: -1, title: '', subtitle: '', price: 0, description: '', ticketsPerCategory: 0, available: true },
    ],
    ticketCategoryToDelete: [],
    ticketInfo: '',
  },
  isError: false,
  isLoading: false,
  images: [],

  locationAddress: '',
  locationName: '',
};

const getEventImages = (imagesStr: string[]) => {
  const images = imagesStr.map((img: string) => {
    let fullName = img.split('/').pop();
    return { id: fullName, name: fullName, url: img };
  });
  return images as EventImage[];
};

const UserEventDetailsReducer = (state = initialState, action: UserEventDetailsActions) => {
  switch (action.type) {
    case UserEventDetailsActionTypes.FETCH_EVENT_WITH_LOCATION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UserEventDetailsActionTypes.FETCH_EVENT_WITH_LOCATION_SUCCESS:
      return {
        ...state,
        event: action.event.eventDto,
        locationAddress: action.event.locationAddress,
        locationName: action.event.locationName,
        isError: false,
        isLoading: false,
        images: getEventImages(action.event.eventDto.picturesUrlSave),
      };
    case UserEventDetailsActionTypes.FETCH_EVENT_WITH_LOCATION_FAILURE:
      return {
        ...state,
        loading: false,
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default UserEventDetailsReducer;
