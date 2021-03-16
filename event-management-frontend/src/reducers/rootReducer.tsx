import { combineReducers } from 'redux';
import { EventsPageReducer } from './EventsPageReducer';
import { TicketsPageReducer } from './TicketsPageReducer';
import HeaderReducer from './HeaderEventCrudReducer';
import LocationPageReducer from './LocationPageReducer';
import { UserHomePageReducer } from './UserHomePageReducer';
import { AdminHomePageReducer } from './AdminHomePageReducer';
import { UserEventsReducer } from './UserEventsPageReducer';
import UserEventDetailsReducer from './UserEventDetailsReducer';
import LoginPageReducer from './LoginPageReducer';
import VerificationPageReducer from './ForgotPasswordVerificationPageReducer';
import ReservePageReducer from './ReservePageReducer';
import TicketCategoriesReducer from './TicketReservationReducer';
import RegistrationPageReducer from './RegistrationPageReducer';

export default combineReducers({
  events: EventsPageReducer,
  tickets: TicketsPageReducer,
  eventCrud: HeaderReducer,
  location: LocationPageReducer,
  adminHomeCard: AdminHomePageReducer,
  userEvents: UserEventsReducer,
  eventWithLocation: UserEventDetailsReducer,
  userHome: UserHomePageReducer,
  login: LoginPageReducer,
  registration: RegistrationPageReducer,
  forgotPasswordVerification: VerificationPageReducer,
  reserveTicket: ReservePageReducer,
  ticketCategories: TicketCategoriesReducer,
});
