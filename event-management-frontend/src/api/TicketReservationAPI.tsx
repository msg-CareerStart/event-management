import { serverURL } from './Api';
import { fetchWrapper } from './FetchWrapper';
import Booking from '../model/Booking';

export const fetchTicketCategoriesAPI = (idEvent: string) => {
  return fetchWrapper(`${serverURL}/tickets/remaining/${idEvent}`).then((response) => response.json());
};

export const addBookingsAPI = (booking: Booking) => {
  return fetchWrapper(`${serverURL}/bookings`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  }).then((response) => response.json());
};
