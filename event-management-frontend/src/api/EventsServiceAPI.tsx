import { EventFilters } from "../model/EventFilters";
import moment from 'moment'
import { EventSort } from "../model/EventSort";
import { headersAuth, serverURL, serverEventsURL } from "./Api";
import { fetchWrapper } from "./FetchWrapper";


const computeLimit = () => {
    let limit: { limit: string } = { limit: "2"};

    return limit;
}

const computePage = (page: number) => {
    let pageToSend: { page: string } = { page: page.toString()};

    return pageToSend
}

const computeSortQueryString = (sort: EventSort) => {
    let sortToSend: { sortCriteria: string, sortType: string } = {
        sortCriteria: sort.criteria === "occRate" ? "OCCUPANCY_RATE" : sort.criteria.toUpperCase(),
        sortType: sort.type === "asc" ? "1" : "0"
    }

    return sortToSend;
}

const computeFilterQueryString = (filters: EventFilters) => {
    let filtersToSend: any = {}

    if (filters.title) {
        filtersToSend.title = filters.title
    }
    if (filters.subtitle) {
        filtersToSend.subtitle = filters.subtitle
    }
    if (filters.status !== 'none') {
        filtersToSend.status = filters.status
    }
    if (filters.location) {
        filtersToSend.location = filters.location
    }
    if (filters.startDate) {
        filtersToSend['startDate'] = moment(filters.startDate).format("YYYY-MM-DD")
    }
    if (filters.endDate) {
        filtersToSend['endDate'] = moment(filters.endDate).format("YYYY-MM-DD")
    }
    if (filters.rate) {
        filtersToSend['rate'] = filters.rate
        filtersToSend['rateSign'] = filters.rateSign
    }
    if (filters.maxPeople) {
        filtersToSend['maxPeople'] = filters.maxPeople
        filtersToSend['maxPeopleSign'] = filters.maxPeopleSign
    }
    if (filters.startHour) {
        filtersToSend['startHour'] = filters.startHour
    }
    if (filters.endHour) {
        filtersToSend['endHour'] = filters.endHour
    }
    if (filters.highlighted) {
        filtersToSend['highlighted'] = filters.highlighted
    }

    return filtersToSend
}

export const fetchFilteredEvents = (filters: EventFilters, page: number) => {
    const filtersToSend = computeFilterQueryString(filters);
    const pageToSend = computePage(page);
    const limitToSend = computeLimit();

    const url = new URL(serverEventsURL);
    console.log(page)
    url.search = new URLSearchParams(filtersToSend).toString();
    url.search += "&";
    url.search += new URLSearchParams(pageToSend).toString();
    url.search += "&";
    url.search += new URLSearchParams(limitToSend).toString();

    return fetchWrapper(`${url}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json.events;
        });
}

export const fetchSortedEvents = (sort: EventSort, filters: EventFilters, page: number) => {
    const filtersToSend = computeFilterQueryString(filters);
    const sortToSend = computeSortQueryString(sort);
    const limitToSend = computeLimit();
    const pageToSend = computePage(page);

    const url = new URL(serverEventsURL);
    if (filtersToSend.length !== undefined) {
        url.search = new URLSearchParams(filtersToSend).toString();
        url.search += "&";
    } else if (sortToSend.sortCriteria !== '') {
        url.search += new URLSearchParams(sortToSend).toString();
        url.search += "&";
    }

    url.search += new URLSearchParams(limitToSend).toString();
    url.search += "&";
    url.search += new URLSearchParams(pageToSend).toString();

    return fetchWrapper(`${url}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json.events;
        });
}

export const fetchEvents = () => {
    console.log("here")
    return fetchWrapper(`${serverURL}/events?limit=2&page=0&size=2`, { headers: headersAuth })
        .then(response => response.json())
        .then(json => {
            return json.events;
        })
}

export const changePage = (filters: EventFilters, sort: EventSort, page: number) => {
    const filtersToSend = computeFilterQueryString(filters);
    const sortToSend = computeSortQueryString(sort);
    const limitToSend = computeLimit();
    const pageToSend = computePage(page);

    const url = new URL(serverEventsURL);
    url.search = new URLSearchParams(filtersToSend).toString();
    url.search += "&";
    url.search += new URLSearchParams(sortToSend).toString();
    url.search += "&";
    url.search += new URLSearchParams(limitToSend).toString();
    url.search += "&";
    url.search += new URLSearchParams(pageToSend).toString();

    fetchWrapper(`${url}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json.events;
        });
}

export const getLastNumber = (filters: EventFilters) => {
    const filtersToSend = computeFilterQueryString(filters);
    const limit = computeLimit();

    const url = new URL(serverURL + "/events?page=0&size=2&limit=2");

    url.search = new URLSearchParams(filtersToSend).toString();
    url.search += "&";
    url.search += new URLSearchParams(limit).toString();

    return fetchWrapper(`${url}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json.noPages
        });
}

// Requests for home events

export const fetchHomeEvents = () => {
    // All home events
    const homeUrl = new URL(serverEventsURL + "/latest?page=0&size=2&limit=2");

    return fetchWrapper(`${homeUrl}`, { headers: headersAuth })
        .then(response => response.json())
        .then(json => {
            return json.events;
        })
}

export const fetchPaginatedHomeEvents = (page: number) => {
    // Paginated home events requests
    const paginatedUrl = new URL(serverEventsURL + "/latest?page=" + Number(page - 1) + "&size=2&limit=2");

    return fetchWrapper(`${paginatedUrl}`, { headers: headersAuth })
        .then((response) => response.json())
        .then((json) => {
            return json.events;
        });
}

export const getLastNumberHome =  () => {
    // Last number from home events
    const url = serverEventsURL + "/latest?page=0&size=2&limit=2"

    return fetchWrapper(`${url}`, {headers: headersAuth})
        .then((response) => response.json())
        .then((json) => {
            return json.noPages
        });
}
