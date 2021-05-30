import { LocationAction, LocationActionTypes } from '../actions/LocationActions';
import { LocationStatistics } from '../model/LocationStatistics';

export interface LocationPageStatistics {
  locations: LocationStatistics[];
  isLoading: boolean;
  error: string;
}

const initialState: LocationPageStatistics = {
  locations: [],
  isLoading: false,
  error: '',
};

export const LocationStatisticsReducer = (
  state: LocationPageStatistics = initialState,
  action: LocationAction
): LocationPageStatistics => {
  switch (action.type) {
    case LocationActionTypes.LOCATIONS_FETCH_STATISTICS_SUCCESS: {
      return {
        ...state,
        locations: action.locationsStatistics,
      };
    }
    case LocationActionTypes.LOCATIONS_FETCH_STATISTICS_ERROR: {
      return {
        ...state,
        error: action.errorStatus,
      };
    }
    default:
      return state;
  }
};

export default LocationStatisticsReducer;
