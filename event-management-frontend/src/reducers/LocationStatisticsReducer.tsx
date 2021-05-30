import { LocationAction, LocationActionTypes } from '../actions/LocationActions';
import { LocationStatistics } from '../model/LocationStatistics';

export const LOCATIONS_FETCH_STATISTICS_SUCCESS = 'LOCATIONS_FETCH_STATISTICS_SUCCESS';
export const LOCATIONS_FETCH_STATISTICS_ERROR = 'LOCATIONS_FETCH_STATISTICS_ERROR';

const initialState: LocationStatistics = {
  id: 0,
  events: [],
  error: '',
};

export const LocationStatisticsReducer = (
  state: LocationStatistics = initialState,
  action: LocationAction
): LocationStatistics => {
  switch (action.type) {
    case LOCATIONS_FETCH_STATISTICS_SUCCESS: {
      return {
        ...state,
        events: action.locationStatistics,
      };
    }
    case LocationActionTypes.LOCATIONS_FETCH_STATISTICS_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export default LocationStatisticsReducer;
