import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';
import { EventsPageState } from '../reducers/EventsPageReducer';
import { LocationPageState } from '../reducers/LocationPageReducer';
import { EventState } from '../reducers/HeaderEventCrudReducer';
import { TicketsPageState } from '../reducers/TicketsPageReducer';
import { OccupancyCardsState } from '../reducers/AdminHomePageReducer';
import { UserEventsPageState } from '../reducers/UserEventsPageReducer';
import { UserHomePageState } from '../reducers/UserHomePageReducer';
import { LoginPageState } from '../reducers/LoginPageReducer';
import { VerificationPageState } from '../reducers/ForgotPasswordVerificationPageReducer';
import { ReserveFirstPageState } from '../reducers/ReservePageReducer';
import { ReserveSecondPageState } from '../reducers/TicketReservationReducer';
import { RegistrationPageState } from '../reducers/RegistrationPageReducer';
import { UserEventDetailsState } from '../reducers/UserEventDetailsReducer';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export interface AppState {
  events: EventsPageState;
  eventCrud: EventState;
  location: LocationPageState;
  login: LoginPageState;
  registration: RegistrationPageState;
  forgotPasswordVerification: VerificationPageState;
  tickets: TicketsPageState;
  adminHomeCard: OccupancyCardsState;
  userEvents: UserEventsPageState;
  userHome: UserHomePageState;
  reserveTicket: ReserveFirstPageState;
  ticketCategories: ReserveSecondPageState;
  eventWithLocation: UserEventDetailsState;
}
