import { serverURL } from './Api';
import { fetchWrapper } from './FetchWrapper';

const url = new URL(`${serverURL}/locations`);

export const getLocationsStatistics = () => {
  const statisticsURL = `${URL}/statistics`;

  return fetchWrapper(`${statisticsURL}`)
    .then((response) => response.json())
    .then((json) => {
      return json.locations;
    });
};
