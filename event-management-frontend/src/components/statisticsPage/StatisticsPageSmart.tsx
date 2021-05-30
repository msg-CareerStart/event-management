import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAllEvents, fetchAllExistingEvents } from '../../actions/EventsPageActions';
import { AppState } from '../../store/store';

import { Dispatch } from 'redux';
import { CircularProgress, Paper } from '@material-ui/core';
import { eventDetailsStyles } from '../../styles/EventDetailsStyle';
import OverviewSmart from '../eventCreateOrEdit/overviewSection/OverviewSmart';
import StepperStatistics from './StepperStatistics';
import MapWrapper from '../eventCreateOrEdit/locationSection/Map';
import LocationStatisticsOverview from './LocationStatisticsOverview';
import { LocationType } from '../../model/LocationType';
import { locationFetch } from '../../actions/LocationActions';
import EventStatisticsOverview from './EventStatisticsOverview';
import { EventStatisticsPageState } from '../../reducers/EventStatisticsPageReducer';
import { fetchStatisticsEvent } from '../../actions/EventStatisticsAction';

interface Props {
  match: any;
  isAdmin: boolean;
  events: [];
  locations: LocationType[];
  eventStatistics: EventStatisticsPageState;
  fetchStatisticsEvent: () => void;
  fetchAllExistingEvents: () => { type: string };
  locationFetch: () => { type: string };
}

function StatisticsPage({
  match,
  isAdmin,
  events,
  locations,
  eventStatistics,
  fetchStatisticsEvent,
  fetchAllExistingEvents,
  locationFetch,
}: Props) {
  const backgroundStyle = eventDetailsStyles();
  let newEvent = match.path === '/admin/newEvent';

  const eventsOverviewStatistics = <EventStatisticsOverview events={events} />;

  const locationComponent = <LocationStatisticsOverview locations={locations} />;

  useEffect(() => {
    fetchAllExistingEvents();
    locationFetch();
    fetchStatisticsEvent();
  }, [fetchStatisticsEvent, fetchAllEvents, locationFetch]);

  return (
    <div>
      {eventStatistics.isLoading ? (
        <CircularProgress />
      ) : (
        <Paper className={backgroundStyle.paper}>
          <StepperStatistics eventsComponent={eventsOverviewStatistics} locationComponent={locationComponent} />
        </Paper>
      )}
    </div>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    eventStatistics: state.eventStatistics,
    events: state.events.allEvents,
    locations: state.location.locations,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchAllExistingEvents: () => dispatch(fetchAllExistingEvents()),
    locationFetch: () => dispatch(locationFetch()),
    fetchStatisticsEvent: () => dispatch(fetchStatisticsEvent()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsPage);
