import { serverURL } from './Api';
import { fetchWrapper } from './FetchWrapper';

export function fetchUpcomingEventsAPI() {
  return fetchWrapper(`${serverURL}/events/upcoming`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
}

export function fetchHistoryEventsAPI() {
  return fetchWrapper(`${serverURL}/events/history`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
}
