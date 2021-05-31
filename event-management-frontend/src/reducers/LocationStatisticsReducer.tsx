import {
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
  isLoading: false,
  error: '',
};

export const LocationStatisticsReducer = (state: LocationPageStatistics = initialState, action: any) => {
  switch (action.type) {
    case LOCATIONS_FETCH_STATISTICS_SUCCESS: {
      console.log(action.payload);
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
