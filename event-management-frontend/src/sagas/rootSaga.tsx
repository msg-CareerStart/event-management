import { all } from 'redux-saga/effects';
import {
  watchFetchFilteredEventsAsync,
  watchFetchEventsAsync,
  watchFetchCustomEventsAsync,
  watchFetchHomeEventsAsync,
  watchFetchCustomHomeEventsAsync,
  watchValidateTicket,
} from './EventsPageSaga';
import {
  watchLoadEventAsync,
  watchEditEventAsync,
  watchAddEventAsync,
  watchDeletEventAsync,
} from './HeaderEventCrudSaga';
import { watchFetchLocationAsync } from './LocationPageSaga';
import { watchLoadTicketCategoriesAsync, watchAddBookingsAsync } from './TicketReservationSaga';
import { watchFetchReserveEventAsync } from './ReservePageSaga';
import { watchFetchTicketsAsync } from './TicketsPageSaga';
import { watchFetchUpcomingEventsAsync, watchFetchHistoryEventsAsync } from './AdminHomePageSaga';
import { watchFetchUserEventsAsync, watchFetchUserEventsLocationsAsync } from './UserEventsPageSaga';
import { watchLoadEventWithLocationAsync } from './UserEventDetailsSaga';
import {
  watchFetchBookingsAsync,
  watchFetchUserPastEventsAsync,
  watchFetchUserUpcomingEventsAsync,
  watchFetchHighlightedEventsAsync,
} from './UserHomePageSaga';

export default function* rootSaga() {
  yield all([
    watchFetchFilteredEventsAsync(),
    watchFetchEventsAsync(),
    watchFetchHomeEventsAsync(),
    watchFetchCustomEventsAsync(),
    watchFetchCustomHomeEventsAsync(),

    watchFetchTicketsAsync(),

    watchFetchBookingsAsync(),
    watchFetchUserPastEventsAsync(),
    watchFetchUserUpcomingEventsAsync(),
    watchLoadTicketCategoriesAsync(),
    watchAddBookingsAsync(),

    watchLoadEventAsync(),
    watchDeletEventAsync(),
    watchAddEventAsync(),
    watchEditEventAsync(),

    watchFetchLocationAsync(),

    watchFetchCustomEventsAsync(),
    watchFetchCustomHomeEventsAsync(),

    watchFetchUpcomingEventsAsync(),
    watchFetchHistoryEventsAsync(),

    watchFetchUserEventsAsync(),
    watchFetchUserEventsLocationsAsync(),

    watchLoadEventWithLocationAsync(),
    watchFetchHighlightedEventsAsync(),

    watchValidateTicket(),

    watchFetchReserveEventAsync(),
  ]);
}
