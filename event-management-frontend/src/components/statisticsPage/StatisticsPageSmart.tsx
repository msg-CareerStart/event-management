import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAllEvents, fetchAllExistingEvents } from '../../actions/EventsPageActions';
import { AppState } from '../../store/store';

import { Dispatch } from 'redux';
import { CircularProgress, Paper } from '@material-ui/core';
import { eventDetailsStyles } from '../../styles/EventDetailsStyle';
import StepperStatistics from './StepperStatistics';
import LocationStatisticsOverview from './LocationStatisticsOverview';
import { LocationType } from '../../model/LocationType';
import { locationFetch } from '../../actions/LocationActions';
import EventStatisticsOverview from './EventStatisticsOverview';
import { EventStatisticsPageState } from '../../reducers/EventStatisticsPageReducer';
import { fetchStatisticsEvent } from '../../actions/EventStatisticsAction';
import { fetchAllLocationsStatistics } from '../../actions/LocationStatisticsAction';

interface Props {
  match: any;
  events: [];
  locations: LocationType[];
  eventStatistics: EventStatisticsPageState;
  fetchStatisticsEvent: () => { type: string };
  fetchAllExistingEvents: () => { type: string };
  locationFetch: () => { type: string };
  fetchAllLocationsStatistics: () => { type: string };
}

function StatisticsPage({
  events,
  locations,
  eventStatistics,
  fetchStatisticsEvent,
  fetchAllExistingEvents,
  locationFetch,
  fetchAllLocationsStatistics,
}: Props) {
  const backgroundStyle = eventDetailsStyles();
  const eventsOverviewStatistics = <EventStatisticsOverview events={events} />;
  const locationComponent = <LocationStatisticsOverview locations={locations} events={events} />;

  useEffect(() => {
    fetchAllExistingEvents();
    locationFetch();
    fetchStatisticsEvent();
    fetchAllLocationsStatistics();
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
    fetchAllLocationsStatistics: () => dispatch(fetchAllLocationsStatistics()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsPage);
