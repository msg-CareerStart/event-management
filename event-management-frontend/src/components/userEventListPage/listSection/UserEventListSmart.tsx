import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import UserEventListDumb from './UserEventListDumb';
import { LinearProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { UserEventList } from '../../../model/userEventsPage/UserEventList';
import { fetchUserEvents, setIsFetching, resetStore } from '../../../actions/UserEventsPageActions';
import { AppState } from '../../../store/store';
import { useTranslation } from 'react-i18next';
import { UserEventFilters } from '../../../model/userEventsPage/UserEventFilters';
import { UserEventIsFilterType } from '../../../model/userEventsPage/UserEventIsFilterType';

interface UserEventListProps {
  events: UserEventList[];
  isError: boolean;
  isMore: boolean;
  isFetching: boolean;
  page: number;
  limit: number;
  filters: UserEventFilters;
  isFilter: UserEventIsFilterType;
  setIsFetching: (isLoading: boolean) => void;
  fetchUserEvents: (page: number, limit: number, isFilter: UserEventIsFilterType, filters: UserEventFilters) => void;
  resetState: () => void;
}

function UserEventListSmart({
  events,
  isError,
  isMore,
  isFetching,
  isFilter,
  filters,
  page,
  limit,
  fetchUserEvents,
  setIsFetching,
  resetState,
}: UserEventListProps) {
  const history = useHistory();
  const [translation] = useTranslation();

  useEffect(() => {
    if (!isFetching) return;

    if (isMore) {
      fetchUserEvents(page, limit, isFilter, filters);
    }
  }, [isFetching]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (isMore) {
        setIsFetching(true);
      }
    }
  };

  useEffect(() => {
    fetchUserEvents(page, limit, isFilter, filters);
  }, [isFilter]);

  useEffect(() => {
    return () => resetState();
  }, [resetState]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const goToEventDetails = (eventId: number) => {
    history.push(`/user/events/${eventId}`);
  };

  return (
    <>
      {isError ? (
        <p style={{ textAlign: 'center' }}> {translation('userEventList.errorMessage')} </p>
      ) : isFetching && events.length === 0 ? (
        <LinearProgress />
      ) : !isFetching && events.length === 0 ? (
        <p style={{ textAlign: 'center' }}> {translation('userEventList.noResults')} </p>
      ) : (
        <UserEventListDumb translation={translation} events={events} goToEventDetails={goToEventDetails} />
      )}
      {isFetching && events.length ? <LinearProgress style={{ margin: '30px' }} /> : <></>}
    </>
  );
}

const mapStateToProps = (state: AppState) => ({
  events: state.userEvents.events,
  isError: state.userEvents.isError,
  page: state.userEvents.page,
  limit: state.userEvents.limit,
  isMore: state.userEvents.isMore,
  isFetching: state.userEvents.isFetching,
  isFilter: state.userEvents.isFilter,
  filters: state.userEvents.filters,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserEvents: (page: number, limit: number, isFilter: UserEventIsFilterType, filters: UserEventFilters) =>
    dispatch(fetchUserEvents(page, limit, isFilter, filters)),
  setIsFetching: (isFetching: boolean) => dispatch(setIsFetching(isFetching)),
  resetState: () => dispatch(resetStore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEventListSmart);
