import { serverURL } from './Api';
import { fetchWrapper } from './FetchWrapper';
import { TicketFilters } from '../model/TicketFilters';
import moment from 'moment';

export const fetchTicketsPaginated = (page: number, filters: TicketFilters) => {
  let paginatedUrl = serverURL + '/tickets/filter?page=' + (page - 1) + '&size=15';

  if (filters.title !== '') {
    paginatedUrl += '&title=' + filters.title;
  }
  if (filters.startDate !== undefined) {
    paginatedUrl += '&startDate=' + moment(filters.startDate).format('YYYY-MM-DD');
  }
  if (filters.endDate !== undefined) {
    paginatedUrl += '&endDate=' + moment(filters.endDate).format('YYYY-MM-DD');
  }

  return fetchWrapper(`${paginatedUrl}`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};
