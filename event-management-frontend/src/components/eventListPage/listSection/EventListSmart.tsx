import React from 'react';
import EventDetailsDumb from "./EventDetailsDumb";
import { connect } from 'react-redux';
import { fetchAllEvents } from '../../../actions/EventsPageActions'
import { AppState } from "../../../store/store";
import EventListDumb from "./EventListDumb";
import { fetchCustomEvents, updateSortCriteria, incrementPage, decrementPage, resetFilters } from "../../../actions/EventsPageActions";
import { EventFilters } from "../../../model/EventFilters";
import EventDetailsMobileDumb from "./EventDetailsMobileDumb";
import { EventSort } from '../../../model/EventSort';
import { Event } from "../../../model/Event";
import { Dispatch } from 'redux';

interface Props {
    events: [];
    eventsSort: EventSort;
    filters: EventFilters;
    isLoading: boolean;
    isError: boolean;
    page: number;
    noPages: number;
    fetchAllEvents: () => { type: string; };
    fetchCustomEvents: (filters: EventFilters, sort: EventSort, page: number) => void;
    updateSortCriteria: (sortCriteria: EventSort) => void;
    incrementPage: () => void;
    decrementPage: () => void;
    resetFilters: () => void;
}

interface State {
    sortCriteria: string;
    sortType: string;
}

class EventListSmart extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sortCriteria: '',
            sortType: '',
        };
    }

    componentWillMount() {
        this.props.fetchAllEvents();
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevProps.eventsSort.criteria !== this.props.eventsSort.criteria ||
            prevProps.eventsSort.type !== this.props.eventsSort.type ||
            prevProps.page !== this.props.page) {
            this.props.fetchCustomEvents(this.props.filters, this.props.eventsSort, this.props.page);
        }
    }

    componentWillUnmount() {
        this.props.resetFilters();
    }

    render() {
        let { events } = this.props;

        const handleSortEvent = (criteria: string, type: string) => {
            const sortParams: EventSort = {
                criteria: criteria,
                type: type
            }
            if (sortParams.criteria === undefined || (criteria === this.state.sortCriteria && type === this.state.sortType)) {
                return
            }
            this.setState({ sortCriteria: criteria, sortType: type });
        }

        const goToPrevPage = () => {
            if (this.props.page < 1) {
                return
            } else {
                this.props.decrementPage();
            }
        }

        const goToNextPage = () => {
            if (this.props.page + 1 >= this.props.noPages) {
                return
            } else {
                this.props.incrementPage();
            }
        }

        // Using the map function, we will get all the events from the array 
        const eventDetails = events?.map((event: Event) =>
            <EventDetailsDumb key={event.id} event={event} />);
        // On mobile we would like to keep only title and date
        const eventDetailsMobile = events?.map((event: Event) =>
            <EventDetailsMobileDumb key={event.id} event={event} />);

        return (
            <EventListDumb
                isLoading={this.props.isLoading}
                isError={this.props.isError}

                updateSortCriteria={this.props.updateSortCriteria}
                incrementPage={goToNextPage}
                decrementPage={goToPrevPage}
                sort={this.props.eventsSort}
                filters={this.props.filters}
                page={this.props.page}
                noPages={this.props.noPages}

                eventsDetails={eventDetails}
                eventsDetailsMobile={eventDetailsMobile}
                handleSortEvent={handleSortEvent}
                goToPrevPage={goToPrevPage}
                goToNextPage={goToNextPage} />
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    events: state.events.allEvents,
    isLoading: state.events.isLoading,
    isError: state.events.isError,
    eventsSort: state.events.eventsSort,
    page: state.events.page,
    filters: state.events.filters,
    noPages: state.events.noPages
});


const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchAllEvents: () => dispatch(fetchAllEvents()),
    fetchCustomEvents: (filters: EventFilters, sort: EventSort, page: number) => dispatch(fetchCustomEvents(filters, sort, page)),
    updateSortCriteria: (sortCriteria: EventSort) => dispatch(updateSortCriteria(sortCriteria)),
    incrementPage: () => dispatch(incrementPage()),
    decrementPage: () => dispatch(decrementPage()),
    resetFilters: () => dispatch(resetFilters())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventListSmart);
