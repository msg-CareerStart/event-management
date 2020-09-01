import {headersAuth, serverURL} from "./Api";
import { fetchWrapper } from "./FetchWrapper";
import {TicketFilters} from "../model/TicketFilters";
import moment from 'moment';


export const fetchTicketsPaginated = (page: number, filters: TicketFilters) => {
    let paginatedUrl = serverURL + "/tickets/filter?page=" + (page-1) + "&size=2";

    filters.title !== '' ? paginatedUrl += "&title=" + filters.title:
        filters.startDate !== undefined ? paginatedUrl += "&startDate=" +
          moment(filters.startDate).format('YYYY-MM-DD') :
            filters.endDate !== undefined ? paginatedUrl += "&endDate=" +
              moment(filters.endDate).format('YYYY-MM-DD') : paginatedUrl += "";

    return fetchWrapper(`${paginatedUrl}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json.tickets;
        });
}
