import { EventStatistics } from '../model/EventStatistics';

export const FETCH_STATISTICS_EVENT = 'FETCH_STATISTICS_EVENT';
export const FETCH_STATISTICS_EVENT_REQUEST = 'FETCH_STATISTICS_EVENT_REQUEST';
export const FETCH_STATISTICS_EVENT_SUCCESS = 'FETCH_STATISTICS_EVENT_SUCCESS';
export const FETCH_STATISTICS_EVENT_ERROR = 'FETCH_STATISTICS_EVENT_ERROR';

export const fetchStatisticsEvent = () => {
  return {
    type: FETCH_STATISTICS_EVENT,
  };
};

export const fetchStatisticsEventRequest = () => {
  return {
    type: FETCH_STATISTICS_EVENT_REQUEST,
  };
};

export const fetchStatisticsEventSuccess = (events: EventStatistics[]) => {
  return {
    type: FETCH_STATISTICS_EVENT_SUCCESS,
    payload: events,
  };
};

export const fetchStatisticsEventFailure = (err: string) => {
  return {
    type: FETCH_STATISTICS_EVENT_ERROR,
    err: err,
  };
};
