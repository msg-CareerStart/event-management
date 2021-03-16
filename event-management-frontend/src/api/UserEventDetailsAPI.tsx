import { fetchWrapper } from './FetchWrapper';
import { serverURL } from './Api';

export const fetchEventWithLocationsAPI = (id: string) => {
  return fetchWrapper(`${serverURL}/events/${id}?type=userEventDetails`).then((response) => response.json());
};
