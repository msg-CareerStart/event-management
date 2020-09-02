import Ticket from './Ticket';

export default interface Booking {
  bookingDate: string;
  eventId: string | number;
  email: string;
  tickets: Ticket[];
}
