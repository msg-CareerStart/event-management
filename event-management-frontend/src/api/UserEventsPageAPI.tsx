import { serverURL } from './Api';
import { fetchWrapper } from './FetchWrapper';
import { UserEventFilters } from '../model/userEventsPage/UserEventFilters';
import { UserEventType } from '../model/userEventsPage/UserEventType';

const computeFilterStringQuery = (filters: UserEventFilters | undefined, page: number, size: number) => {
  let query: any = {};

  query.page = page;
  query.size = size;

  if (filters && filters.title) {
    query.title = filters.title;
  }
  if (filters && (filters.rate || filters.rate === 0)) {
    query.rate = filters.rate;
    query.rateSign = filters.rateSign;
  }
  if (filters && filters.locations.length) {
    query.multipleLocations = filters.locations;
  }

  return query;
};

export const fetchEvents = (page: number, limit: number, filters?: UserEventFilters) => {
  const url = `${serverURL}/events/user/${
    !filters || filters.type === UserEventType.UPCOMING ? 'upcoming?' : 'history?'
  }`;

  const urlQuery = new URL(url);
  const stringQuery = computeFilterStringQuery(filters, page, limit);
  urlQuery.search = new URLSearchParams(stringQuery).toString();

  return fetchWrapper(`${urlQuery}`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};

export const fetchEventsLocations = () => {
  const url = `${serverURL}/locations`;

  return fetchWrapper(url)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};
