import { serverURL } from './Api';
import { fetchWrapper } from './FetchWrapper';

export const fetchEventLocation = (id: number) => {
  let url = `${serverURL}/events/${id}/locations`;

  return fetchWrapper(url)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};
