import { LocationAction, LocationActionTypes } from '../actions/LocationActions';
import { LocationType } from '../model/LocationType';

export interface LocationPageState {
  locations: LocationType[];
  isLoading: boolean;
  error: string;
  searchValue: string;
}

const initialState: LocationPageState = {
  isLoading: true,
  locations: [],
  error: '',
  searchValue: '',
};

export const LocationPageReducer = (
  state: LocationPageState = initialState,
  action: LocationAction
): LocationPageState => {
  switch (action.type) {
    case LocationActionTypes.LOCATION_LOADING: {
      return {
        ...state,
        isLoading: action.loadingStatus,
      };
    }
    case LocationActionTypes.LOCATION_FETCH_SUCCESS: {
      return {
        ...state,
        locations: action.locations,
      };
    }
    case LocationActionTypes.LOCATION_ERROR: {
      return {
        ...state,
        error: action.errorStatus,
      };
    }
    case LocationActionTypes.UPDATE_SEARCH_VALUE: {
      return {
        ...state,
        searchValue: action.searchValue,
      };
    }
    default:
      return state;
  }
};

export default LocationPageReducer;
