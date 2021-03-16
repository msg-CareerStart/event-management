import moment from 'moment';
import { EventFilters } from '../model/EventFilters';
import { EventSort } from '../model/EventSort';
import { serverURL } from './Api';
import { fetchWrapper } from './FetchWrapper';

const computeLimit = () => {
  let limit: { limit: string } = { limit: '5' };

  return limit;
};

const computeSize = () => {
  let size: { size: string } = { size: '5' };

  return size;
};

const computePage = (page: number) => {
  let pageToSend: { page: string } = { page: page.toString() };

  return pageToSend;
};

const computeSortQueryString = (sort: EventSort) => {
  let sortToSend: { sortCriteria: string; sortType: string } = {
    sortCriteria: sort.criteria === 'occRate' ? 'OCCUPANCY_RATE' : sort.criteria.toUpperCase(),
    sortType: sort.type === 'asc' ? '1' : '0',
  };

  return sortToSend;
};

const computeFilterQueryString = (filters: EventFilters) => {
  let filtersToSend: any = {};

  if (filters.title) {
    filtersToSend.title = filters.title;
  }
  if (filters.subtitle) {
    filtersToSend.subtitle = filters.subtitle;
  }
  if (filters.status !== 'none') {
    filtersToSend.status = filters.status;
  }
  if (filters.location) {
    filtersToSend.location = filters.location;
  }
  if (filters.startDate) {
    filtersToSend.startDate = moment(filters.startDate).format('YYYY-MM-DD');
  }
  if (filters.endDate) {
    filtersToSend.endDate = moment(filters.endDate).format('YYYY-MM-DD');
  }
  if (filters.rate || filters.rate === 0) {
    filtersToSend.rate = filters.rate;
    filtersToSend.rateSign = filters.rateSign;
  }
  if (filters.maxPeople || filters.maxPeople === 0) {
    filtersToSend.maxPeople = filters.maxPeople;
    filtersToSend.maxPeopleSign = filters.maxPeopleSign;
  }
  if (filters.startHour) {
    filtersToSend.startHour = filters.startHour;
  }
  if (filters.endHour) {
    filtersToSend.endHour = filters.endHour;
  }
  if (filters.highlighted || filters.highlighted === false) {
    filtersToSend.highlighted = filters.highlighted;
  }

  return filtersToSend;
};

export const fetchFilteredEvents = (filters: EventFilters, page: number) => {
  const filtersToSend = computeFilterQueryString(filters);
  const pageToSend = computePage(page);
  const limitToSend = computeLimit();
  const sizeToSend = computeSize();

  const url = new URL(`${serverURL}/events`);
  url.search = new URLSearchParams(filtersToSend).toString();
  url.search += '&';
  url.search += new URLSearchParams(pageToSend).toString();
  url.search += '&';
  url.search += new URLSearchParams(limitToSend).toString();
  url.search += '&';
  url.search += new URLSearchParams(sizeToSend).toString();

  return fetchWrapper(`${url}`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};

export const fetchSortedEvents = (sort: EventSort, filters: EventFilters, page: number) => {
  const filtersToSend = computeFilterQueryString(filters);
  const sortToSend = computeSortQueryString(sort);
  const limitToSend = computeLimit();
  const pageToSend = computePage(page);
  const sizeToSend = computeSize();

  const url = new URL(`${serverURL}/events`);

  if (filtersToSend !== {}) {
    url.search += new URLSearchParams(filtersToSend).toString();
    url.search += '&';
  }
  if (sortToSend.sortCriteria !== '') {
    url.search += new URLSearchParams(sortToSend).toString();
    url.search += '&';
  }

  url.search += new URLSearchParams(limitToSend).toString();
  url.search += '&';
  url.search += new URLSearchParams(pageToSend).toString();
  url.search += '&';
  url.search += new URLSearchParams(sizeToSend).toString();

  return fetchWrapper(`${url}`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};

export const fetchEvents = () => {
  return fetchWrapper(`${serverURL}/events?limit=5&page=0&size=5`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};

export const getLastNumber = (filters: EventFilters) => {
  const filtersToSend = computeFilterQueryString(filters);
  const limitToSend = computeLimit();
  const pageToSend = computePage(0);
  const sizeToSend = computeSize();

  const url = new URL(serverURL + '/events');
  url.search += new URLSearchParams(limitToSend).toString();
  url.search += '&';
  url.search += new URLSearchParams(pageToSend).toString();
  url.search += '&';
  url.search += new URLSearchParams(sizeToSend).toString();

  if (filtersToSend.length !== {}) {
    url.search += '&';
    url.search += new URLSearchParams(filtersToSend).toString();
  }

  return fetchWrapper(`${url}`)
    .then((response) => response.json())
    .then((json) => {
      return json.noPages;
    });
};

// Requests for home events

export const fetchHomeEvents = () => {
  // All home events
  const homeUrl = new URL(`${serverURL}/events/latest?page=0&size=2&limit=2`);

  return fetchWrapper(`${homeUrl}`)
    .then((response) => response.json())
    .then((json) => {
      return json.events;
    });
};

export const fetchPaginatedHomeEvents = (page: number) => {
  // Paginated home events requests
  const paginatedUrl = new URL(`${serverURL}/events/latest?page=${Number(page - 1)}&size=2&limit=2`);

  return fetchWrapper(`${paginatedUrl}`)
    .then((response) => response.json())
    .then((json) => {
      return json.events;
    });
};

export const getLastNumberHome = () => {
  // Last number from home events
  const url = `${serverURL}/events/latest?page=0&size=2&limit=2`;

  return fetchWrapper(`${url}`)
    .then((response) => response.json())
    .then((json) => {
      return json.noPages;
    });
};

export const validateTicketAPI = (ticketID: number, eventID: number) => {
  return fetchWrapper(`${serverURL}/tickets/validate/${ticketID}?idEvent=${eventID}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};
