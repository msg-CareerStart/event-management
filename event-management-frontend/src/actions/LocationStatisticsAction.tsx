import { LocationStatistics } from '../model/LocationStatistics';

export const LOCATIONS_FETCH_STATISTICS = 'LOCATIONS_FETCH_STATISTICS';
export const LOCATIONS_FETCH_STATISTICS_SUCCESS = 'LOCATIONS_FETCH_STATISTICS_SUCCESS';
export const LOCATIONS_FETCH_STATISTICS_ERROR = 'LOCATIONS_FETCH_STATISTICS_ERROR';

export const fetchAllLocationsStatistics = () => {
  return {
    type: LOCATIONS_FETCH_STATISTICS,
  };
};

export const fetchAllLocationsStatisticsSuccess = (locationsStatistics: LocationStatistics[]) => {
  console.log('SUCCES IN LocationActions');
  return {
    type: LOCATIONS_FETCH_STATISTICS_SUCCESS,
    payload: locationsStatistics,
  };
};

export const fetchAllLocationsStatisticsError = (errorStatus: string) => {
  console.log('ERROR IN LocationActions');
  return {
    type: LOCATIONS_FETCH_STATISTICS_ERROR,
    errorStatus: errorStatus,
  };
};
