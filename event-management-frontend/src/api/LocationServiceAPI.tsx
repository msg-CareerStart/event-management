import { serverURL } from './Api';
import { fetchWrapper } from './FetchWrapper';

export const fetchLocationStatistics = () => {
  return fetchWrapper(`${serverURL}/locations/statistics`).then((response) => response.json());
};
