import { LocationType } from '../model/LocationType';
import {
  FETCH_LOCATION_FROM_ID_LOCATION_FAILURE,
  FETCH_LOCATION_FROM_ID_LOCATION_SUCCESS,
  UserMapPageActions,
} from '../actions/UserMapPageActions';

export interface UserMapPage {
  isLoading: boolean;
  isError: boolean;
  locations: LocationType[];
}

const initialState = {
  isLoading: true,
  isError: false,
  locations: [],
};

export const UserMapPageReducer = (state: UserMapPage = initialState, action: UserMapPageActions) => {
  switch (action.type) {
    case FETCH_LOCATION_FROM_ID_LOCATION_SUCCESS:
      return {
        ...state,
        isloading: false,
        location: state.locations.concat(action.location),
      };
    case FETCH_LOCATION_FROM_ID_LOCATION_FAILURE:
      return {
        ...state,
        isloading: false,
        isError: true,
      };
    default:
      return state;
  }
};
