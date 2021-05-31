import { FETCH_STATISTICS_EVENT_REQUEST, FETCH_STATISTICS_EVENT_SUCCESS } from '../actions/EventStatisticsAction';
import { EventStatistics } from '../model/EventStatistics';

export interface EventStatisticsPageState {
  events: EventStatistics[];
  isLoading: boolean;
  isError: boolean;
  err: string;
}

const initialState: EventStatisticsPageState = {
  events: [],
  isLoading: true,
  isError: false,
  err: '',
};

export const EventsStatisticsReducer = (
  state: EventStatisticsPageState = initialState,
  action: { type: string; payload: EventStatistics[]; err: string }
) => {
  switch (action.type) {
    case FETCH_STATISTICS_EVENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_STATISTICS_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: action.payload,
      };
    case FETCH_STATISTICS_EVENT_REQUEST:
      return {
        ...state,
        isLoading: false,
        isError: true,
        err: action.payload,
      };
    default:
      return state;
  }
};
