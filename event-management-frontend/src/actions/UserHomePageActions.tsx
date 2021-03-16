import { HighlightedEvent } from '../reducers/UserHomePageReducer';
import { EventCard } from '../model/userHome/EventCard';
import { Booking } from '../model/userHome/Booking';

export enum UserHomePageActionTypes {
  FETCH_BOOKINGS = 'FETCH_BOOKINGS',
  FETCH_BOOKINGS_REQUEST = 'FETCH_BOOKINGS_REQUEST',
  FETCH_BOOKINGS_SUCCESS = 'FETCH_BOOKINGS_SUCCESS',
  FETCH_BOOKINGS_ERROR = 'FETCH_BOOKINGS_ERROR',

  FETCH_USER_PAST_EVENTS = 'FETCH_USER_PAST_EVENTS',
  FETCH_USER_PAST_EVENTS_REQUEST = 'FETCH_USER_PAST_EVENTS_REQUEST',
  FETCH_USER_PAST_EVENTS_SUCCESS = 'FETCH_USER_PAST_EVENTS_SUCCESS',
  FETCH_USER_PAST_EVENTS_ERROR = 'FETCH_USER_PAST_EVENTS_ERROR',

  FETCH_USER_UPCOMING_EVENTS = 'FETCH_USER_UPCOMING_EVENTS',
  FETCH_USER_UPCOMING_EVENTS_REQUEST = 'FETCH_USER_UPCOMING_EVENTS_REQUEST',
  FETCH_USER_UPCOMING_EVENTS_SUCCESS = 'FETCH_USER_UPCOMING_EVENTS_SUCCESS',
  FETCH_USER_UPCOMING_EVENTS_ERROR = 'FETCH_USER_UPCOMING_EVENTS_ERROR',

  UPDATE_PAST_EVENTS_PAGE = 'UPDATE_PAST_EVENTS_PAGE',
  UPDATE_UPCOMING_EVENTS_PAGE = 'UPDATE_UPCOMING_EVENTS_PAGE',
  
  FETCH_HIGHLIGHTED_EVENTS = 'FETCH_HIGHLIGHTED_EVENTS',
  FETCH_HIGHLIGHTED_EVENTS_REQUEST = 'FETCH_HIGHLIGHTED_EVENTS_REQUEST',
  FETCH_HIGHLIGHTED_EVENTS_SUCCESS = 'FETCH_HIGHLIGHTED_EVENTS_SUCCESS',
  FETCH_HIGHLIGHTED_EVENTS_ERROR = 'FETCH_HIGHLIGHTED_EVENTS_ERROR',
}

export class FetchBookingsAction {
  public readonly type = UserHomePageActionTypes.FETCH_BOOKINGS;
}

export class FetchBookingsRequestAction {
  public readonly type = UserHomePageActionTypes.FETCH_BOOKINGS_REQUEST;
}

export class FetchBookingsSuccessAction {
  public readonly type = UserHomePageActionTypes.FETCH_BOOKINGS_SUCCESS;
  public bookings: Booking[];

  constructor(bookings: Booking[]) {
    this.bookings = bookings;
  }
}

export class FetchBookingsErrorAction {
  public readonly type = UserHomePageActionTypes.FETCH_BOOKINGS_ERROR;
}

export class FetchUserPastEventsAction {
  public readonly type = UserHomePageActionTypes.FETCH_USER_PAST_EVENTS;
  public page: number;
  public limit: number;

  constructor(page: number, limit: number) {
    this.page = page;
    this.limit = limit;
  }
}

export class FetchUserPastEventsRequestAction {
  public readonly type = UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_REQUEST;
}

export class FetchUserPastEventsSuccessAction {
  public readonly type = UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_SUCCESS;
  public events: EventCard[];
  public more: boolean;
  public noPages: number;

  constructor(events: EventCard[], more: boolean, noPages: number) {
    this.events = events;
    this.more = more;
    this.noPages = noPages;
  }
}

export class FetchUserPastEventsErrorAction {
  public readonly type = UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_ERROR;
}

export class FetchUserUpcomingEventsAction {
  public readonly type = UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS;
  public page: number;
  public limit: number;

  constructor(page: number, limit: number) {
    this.page = page;
    this.limit = limit;
  }
}

export class FetchUserUpcomingEventsRequestAction {
  public readonly type = UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_REQUEST;
}

export class FetchUserUpcomingEventsSuccessAction {
  public readonly type = UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_SUCCESS;
  public events: EventCard[];
  public more: boolean;
  public noPages: number;

  constructor(events: EventCard[], more: boolean, noPages: number) {
    this.events = events;
    this.more = more;
    this.noPages = noPages;
  }
}

export class FetchUserUpcomingEventsErrorAction {
  public readonly type = UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_ERROR;
}

export class UpdatePastEventsPage {
  public readonly type = UserHomePageActionTypes.UPDATE_PAST_EVENTS_PAGE;
  public page: number;

  constructor(page: number) {
    this.page = page;
  }
}

export class UpdateUpcomingEventsPage {
  public readonly type = UserHomePageActionTypes.UPDATE_UPCOMING_EVENTS_PAGE;
  public page: number;

  constructor(page: number) {
    this.page = page;
  }
}

export class FetchHighlightedEventsAction {
  public readonly type = UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS;
}

export class FetchHighlightedEventsRequestAction {
  public readonly type = UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_REQUEST;
}

export class FetchHighlightedEventsSuccessAction {
  public readonly type = UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_SUCCESS;
  public events: HighlightedEvent[];

  constructor(events: HighlightedEvent[]) {
    this.events = events;
  }
}

export class FetchHighlightedEventsErrorAction {
  public readonly type = UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_ERROR;
}

export type UserHomePageActions =
  | FetchHighlightedEventsAction
  | FetchHighlightedEventsRequestAction
  | FetchHighlightedEventsSuccessAction
  | FetchHighlightedEventsErrorAction
  | FetchBookingsAction
  | FetchBookingsRequestAction
  | FetchBookingsSuccessAction
  | FetchBookingsErrorAction
  | FetchUserPastEventsAction
  | FetchUserPastEventsRequestAction
  | FetchUserPastEventsSuccessAction
  | FetchUserPastEventsErrorAction
  | FetchUserUpcomingEventsAction
  | FetchUserUpcomingEventsRequestAction
  | FetchUserUpcomingEventsSuccessAction
  | FetchUserUpcomingEventsErrorAction
  | UpdatePastEventsPage
  | UpdateUpcomingEventsPage;

export const fetchBookings = () => {
  return {
    type: UserHomePageActionTypes.FETCH_BOOKINGS,
  };
};

export const fetchBookingsRequest = () => {
  return {
    type: UserHomePageActionTypes.FETCH_BOOKINGS_REQUEST,
  };
};

export const fetchBookingsSuccess = (bookings: Booking[]) => {
  return {
    type: UserHomePageActionTypes.FETCH_BOOKINGS_SUCCESS,
    bookings: bookings,
  };
};

export const fetchBookingsError = () => {
  return {
    type: UserHomePageActionTypes.FETCH_BOOKINGS_ERROR,
  };
};

export const fetchUserPastEvents = (page: number, limit: number) => {
  return {
    type: UserHomePageActionTypes.FETCH_USER_PAST_EVENTS,
    page: page,
    limit: limit,
  };
};

export const fetchUserPastEventsRequest = () => {
  return {
    type: UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_REQUEST,
  };
};

export const fetchUserPastEventsSuccess = (events: EventCard[], more: boolean, noPages: number) => {
  return {
    type: UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_SUCCESS,
    events: events,
    more: more,
    noPages: noPages,
  };
};

export const fetchUserPastEventsError = () => {
  return {
    type: UserHomePageActionTypes.FETCH_USER_PAST_EVENTS_ERROR,
  };
};

export const fetchUserUpcomingEvents = (page: number, limit: number) => {
  return {
    type: UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS,
    page: page,
    limit: limit,
  };
};

export const fetchUserUpcomingEventsRequest = () => {
  return {
    type: UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_REQUEST,
  };
};

export const fetchUserUpcomingEventsSuccess = (events: EventCard[], more: boolean, noPages: number) => {
  return {
    type: UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_SUCCESS,
    events: events,
    more: more,
    noPages: noPages,
  };
};

export const fetchUserUpcomingEventsError = () => {
  return {
    type: UserHomePageActionTypes.FETCH_USER_UPCOMING_EVENTS_ERROR,
  };
};

export const updatePastEventsPage = (page: number) => {
  return {
    type: UserHomePageActionTypes.UPDATE_PAST_EVENTS_PAGE,
    page: page,
  };
};

export const updateUpcomingEventsPage = (page: number) => {
  return {
    type: UserHomePageActionTypes.UPDATE_UPCOMING_EVENTS_PAGE,
    page: page,
  };
};

export const fetchHighlightedEvents = (): FetchHighlightedEventsAction => {
  return {
    type: UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS,
  };
};

export const fetchHighlightedEventsRequest = (): FetchHighlightedEventsRequestAction => {
  return {
    type: UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_REQUEST,
  };
};

export const fetchHighlightedEventsSuccess = (events: HighlightedEvent[]): FetchHighlightedEventsSuccessAction => {
  return {
    type: UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_SUCCESS,
    events: events,
  };
};

export const fetchHighlightedEventsError = (): FetchHighlightedEventsErrorAction => {
  return {
    type: UserHomePageActionTypes.FETCH_HIGHLIGHTED_EVENTS_ERROR,
  };
};
