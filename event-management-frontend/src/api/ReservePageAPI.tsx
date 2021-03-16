import { fetchWrapper } from './FetchWrapper';
import { serverURL } from './Api';

export function fetchReserveEventAPI(id: number) {
  return fetchWrapper(`${serverURL}/events/${id}?type=bookingEventDetails`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
}
