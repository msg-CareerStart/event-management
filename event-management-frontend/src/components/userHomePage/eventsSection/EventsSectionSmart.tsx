import React, { useEffect } from 'react';
import EventsSectionDumb from './EventsSectionDumb';
import { connect } from 'react-redux';
import { AppState } from '../../../store/store';
import { Dispatch } from 'redux';
import { EventCard } from '../../../model/userHome/EventCard';
import {
  fetchUserPastEvents,
  fetchUserUpcomingEvents,
  updatePastEventsPage,
  updateUpcomingEventsPage,
} from '../../../actions/UserHomePageActions';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface EventProps {
  events: EventCard[];
  page: number;
  limit: number;
  isMore: boolean;
  noPages: number;
  isError: boolean;
  isLoading: boolean;
}

interface UserHomePageProps {
  past?: boolean;
  pastEvents: EventProps;
  upcomingEvents: EventProps;
  fetchUserPastEvents: (page: number, limit: number) => void;
  fetchUserUpcomingEvents: (page: number, limit: number) => void;
  updatePastEventsPage: (page: number) => void;
  updateUpcomingEventsPage: (page: number) => void;
}

function EventsSectionSmart({
  past,
  pastEvents,
  upcomingEvents,
  fetchUserPastEvents,
  fetchUserUpcomingEvents,
  updatePastEventsPage,
  updateUpcomingEventsPage,
}: UserHomePageProps) {
  const events = past ? pastEvents.events : upcomingEvents.events;
  const page = past ? pastEvents.page : upcomingEvents.page;
  const limit = past ? pastEvents.limit : upcomingEvents.limit;
  const noPages = past ? pastEvents.noPages : upcomingEvents.noPages;
  const isError = past ? pastEvents.isError : upcomingEvents.isError;
  const isLoading = past ? pastEvents.isLoading : upcomingEvents.isLoading;
  const fetchEvents = past ? fetchUserPastEvents : fetchUserUpcomingEvents;
  const updatePage = past ? updatePastEventsPage : updateUpcomingEventsPage;
  const [translation] = useTranslation();
  const history = useHistory();

  useEffect(() => {
    fetchEvents(page, limit);
  }, [page, limit, fetchEvents]);

  const handleOnClick = (id: number) => {
    history.push(`/user/events/${id}`);
  };

  const updatePageNumber = (newPageNumber: number) => {
    if (newPageNumber < 0 || newPageNumber >= noPages) return;
    updatePage(newPageNumber);
  };

  return (
    <EventsSectionDumb
      past={past}
      events={events}
      isLoading={isLoading}
      isError={isError}
      noPages={noPages}
      page={page}
      translation={translation}
      updatePageNumber={updatePageNumber}
      handleOnClick={handleOnClick}
    />
  );
}

const mapStateToProps = (state: AppState) => ({
  pastEvents: state.userHome.past,
  upcomingEvents: state.userHome.upcoming,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserPastEvents: (page: number, limit: number) => dispatch(fetchUserPastEvents(page, limit)),
  fetchUserUpcomingEvents: (page: number, limit: number) => dispatch(fetchUserUpcomingEvents(page, limit)),
  updatePastEventsPage: (page: number) => dispatch(updatePastEventsPage(page)),
  updateUpcomingEventsPage: (page: number) => dispatch(updateUpcomingEventsPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsSectionSmart);
