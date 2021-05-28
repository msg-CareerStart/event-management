import React, { useEffect } from 'react';
import { EventCard } from '../../model/userHome/EventCard';
import { fetchUserUpcomingEvents } from '../../actions/UserHomePageActions';
import { AppState } from '../../store/store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { EventProps } from '../userHomePage/eventsSection/EventsSectionSmart';
import UserMapEventsDumb from './UserMapEventsDumb';

interface UserHomePageProps {
  upcomingEvents: EventProps;
  fetchUserUpcomingEvents: (page: number, limit: number) => void;
}

function UserMapTest({ upcomingEvents, fetchUserUpcomingEvents }: UserHomePageProps) {
  useEffect(() => {
    fetchUserUpcomingEvents(0, 3);
  }, [fetchUserUpcomingEvents]);

  return (
    <div>
      {upcomingEvents.isLoading ? <CircularProgress /> : <UserMapEventsDumb eventCards={upcomingEvents.events} />}
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  upcomingEvents: state.userHome.upcoming,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserUpcomingEvents: (page: number, limit: number) => dispatch(fetchUserUpcomingEvents(page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMapTest);
