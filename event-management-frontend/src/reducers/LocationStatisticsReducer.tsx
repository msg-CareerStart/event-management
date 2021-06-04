import {
  LOCATIONS_FETCH_STATISTICS,
  LOCATIONS_FETCH_STATISTICS_ERROR,
  LOCATIONS_FETCH_STATISTICS_SUCCESS,
} from '../actions/LocationStatisticsAction';
import { LocationStatistics } from '../model/LocationStatistics';

export interface LocationPageStatistics {
  locations: LocationStatistics[];
  isLoading: boolean;
  error: string;
}

const initialState: LocationPageStatistics = {
  locations: [],
  isLoading: true,
  error: '',
};

export const LocationStatisticsReducer = (
  state = initialState,
  action: { type: string; payload: LocationStatistics; errorStatus: string }
) => {
  switch (action.type) {
    case LOCATIONS_FETCH_STATISTICS: {
      return {
        ...state,
        locations: action.payload,
      };
    }
    case LOCATIONS_FETCH_STATISTICS_SUCCESS: {
      return {
        ...state,
        locations: action.payload,
      };
    }
    case LOCATIONS_FETCH_STATISTICS_ERROR: {
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
