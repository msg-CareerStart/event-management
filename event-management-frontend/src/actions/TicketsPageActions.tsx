export const FETCH_TICKETS = 'FETCH_TICKETS'
export const FETCH_TICKETS_REQUEST = 'FETCH_TICKETS_REQUEST'
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS'
export const FETCH_TICKETS_ERROR = 'FETCH_TICKETS_ERROR'

export const fetchAllTickets = () => {
    return {
        type: FETCH_TICKETS,
    }
}

export const fetchTicketsRequest = () => {
    return {
        type: FETCH_TICKETS_REQUEST,
    }
}

export const fetchTicketsSuccess = (result: any) => {
    return {
        type: FETCH_TICKETS_SUCCESS,
        payload: result
    }
}

export const fetchTicketsError = () => {
    return {
        type: FETCH_TICKETS_ERROR,
    }
}