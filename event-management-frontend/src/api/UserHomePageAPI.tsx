import { serverURL } from './Api';
import { fetchWrapper } from './FetchWrapper';
import { Booking } from '../model/userHome/Booking';
import { BookingServer } from '../model/userHome/BookingServer';

export const fetchBookings = () => {
  let url = `${serverURL}/bookings`;

  return fetchWrapper(url)
    .then((response) => response.json())
    .then((json) => {
      return convertToBooking(json);
    });
};

export const fetchPastEvents = (page: number, limit: number) => {
  let url = `${serverURL}/events/user/past?page=${page}&size=${limit}`;

  return fetchWrapper(url)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};

export const fetchUpcomingEvents = (page: number, limit: number) => {
  let url = `${serverURL}/events/user/future?page=${page}&size=${limit}`;

  return fetchWrapper(url)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};

const convertToBooking = (bookings_from_server: BookingServer[]) => {
  let bookings: Booking[] = [];

  bookings_from_server.forEach((booking: BookingServer) => {
    const result = booking.list.map((date: string) => {
      return {
        id: booking.id,
        date: date,
        title: booking.title,
      };
    });
    bookings = bookings.concat(result);
  });
  return bookings;
};

export const fetchHighlightedEvents = () => {
  let url = `${serverURL}/events/highlighted`;

  return fetchWrapper(url)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};
