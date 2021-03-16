import { OccupancyCardType } from '../model/OcuupancyCardsType';

export enum AdminHomePageActionTypes {
  UPCOMING_EVENTS_FETCH = 'UPCOMING_EVENTS_FETCH',
  UPCOMING_EVENTS_LOADING = 'UPCOMING_EVENTS_LOADING',
  UPCOMING_EVENTS_FETCH_SUCCESS = 'UPCOMING_EVENTS_FETCH_SUCCESS',
  UPCOMING_EVENTS_ERROR = 'UPCOMING_EVENTS_ERROR',
  HISTORY_EVENTS_FETCH = 'HISTORY_EVENTS_FETCH',
  HISTORY_EVENTS_LOADING = 'HISTORY_EVENTS_LOADING',
  HISTORY_EVENTS_FETCH_SUCCESS = 'HISTORY_EVENTS_FETCH_SUCCESS',
  HISTORY_EVENTS_ERROR = 'HISTORY_EVENTS_FETCH_ERROR',
}

export class UpcomingEventsFetchAction {
  public readonly type = AdminHomePageActionTypes.UPCOMING_EVENTS_FETCH;
}
export class UpcomingEventsLoadingStatusAction {
  public readonly type = AdminHomePageActionTypes.UPCOMING_EVENTS_LOADING;
  public loadingStatus: boolean;

  constructor(loadingStatus: boolean) {
    this.loadingStatus = loadingStatus;
  }
}

export class UpcomingEventsErrorAction {
  public readonly type = AdminHomePageActionTypes.UPCOMING_EVENTS_ERROR;
  public errorStatus: boolean;

  constructor(errorStatus: boolean) {
    this.errorStatus = errorStatus;
  }
}

export class UpcomingEventsFetchSuccessAction {
  public readonly type = AdminHomePageActionTypes.UPCOMING_EVENTS_FETCH_SUCCESS;
  public upcomingEvents: OccupancyCardType[];

  constructor(upcomingEvents: OccupancyCardType[]) {
    this.upcomingEvents = upcomingEvents;
  }
}

export class HistoryEventsFetchAction {
  public readonly type = AdminHomePageActionTypes.HISTORY_EVENTS_FETCH;
}
export class HistoryEventsLoadingStatusAction {
  public readonly type = AdminHomePageActionTypes.HISTORY_EVENTS_LOADING;
  public loadingStatus: boolean;

  constructor(loadingStatus: boolean) {
    this.loadingStatus = loadingStatus;
  }
}

export class HistoryEventsErrorAction {
  public readonly type = AdminHomePageActionTypes.HISTORY_EVENTS_ERROR;
  public errorStatus: boolean;

  constructor(errorStatus: boolean) {
    this.errorStatus = errorStatus;
  }
}

export class HistoryEventsFetchSuccessAction {
  public readonly type = AdminHomePageActionTypes.HISTORY_EVENTS_FETCH_SUCCESS;
  public historyEvents: OccupancyCardType[];

  constructor(historyEvents: OccupancyCardType[]) {
    this.historyEvents = historyEvents;
  }
}

export type AdminHomePageAction =
  | UpcomingEventsFetchAction
  | UpcomingEventsLoadingStatusAction
  | UpcomingEventsErrorAction
  | UpcomingEventsFetchSuccessAction
  | HistoryEventsFetchAction
  | HistoryEventsLoadingStatusAction
  | HistoryEventsErrorAction
  | HistoryEventsFetchSuccessAction;

export const upcomingEventsisLoading = (loadingStatus: boolean): UpcomingEventsLoadingStatusAction => {
  return {
    type: AdminHomePageActionTypes.UPCOMING_EVENTS_LOADING,
    loadingStatus: loadingStatus,
  };
};

export const upcomingEventsError = (errorStatus: boolean): UpcomingEventsErrorAction => {
  return {
    type: AdminHomePageActionTypes.UPCOMING_EVENTS_ERROR,
    errorStatus: errorStatus,
  };
};

export const upcomingEventsFetchSucces = (upcomingEvents: OccupancyCardType[]): UpcomingEventsFetchSuccessAction => {
  return {
    type: AdminHomePageActionTypes.UPCOMING_EVENTS_FETCH_SUCCESS,
    upcomingEvents: upcomingEvents,
  };
};

export const upcomingEventsFetch = (): UpcomingEventsFetchAction => {
  return {
    type: AdminHomePageActionTypes.UPCOMING_EVENTS_FETCH,
  };
};

export const historyEventsisLoading = (loadingStatus: boolean): HistoryEventsLoadingStatusAction => {
  return {
    type: AdminHomePageActionTypes.HISTORY_EVENTS_LOADING,
    loadingStatus: loadingStatus,
  };
};

export const historyEventsError = (errorStatus: boolean): HistoryEventsErrorAction => {
  return {
    type: AdminHomePageActionTypes.HISTORY_EVENTS_ERROR,
    errorStatus: errorStatus,
  };
};

export const historyEventsFetchSucces = (historyEvents: OccupancyCardType[]): HistoryEventsFetchSuccessAction => {
  return {
    type: AdminHomePageActionTypes.HISTORY_EVENTS_FETCH_SUCCESS,
    historyEvents: historyEvents,
  };
};

export const historyEventsFetch = (): HistoryEventsFetchAction => {
  return {
    type: AdminHomePageActionTypes.HISTORY_EVENTS_FETCH,
  };
};
