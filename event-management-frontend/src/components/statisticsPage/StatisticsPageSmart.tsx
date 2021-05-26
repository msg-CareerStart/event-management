import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAllEvents } from '../../actions/EventsPageActions';
import { AppState } from '../../store/store';

import { Dispatch } from 'redux';
import { Paper } from '@material-ui/core';
import { eventDetailsStyles } from '../../styles/EventDetailsStyle';
import OverviewSmart from '../eventCreateOrEdit/overviewSection/OverviewSmart';
import StepperStatistics from './StepperStatistics';
import MapWrapper from '../eventCreateOrEdit/locationSection/Map';
import LocationStatisticsOverview from './LocationStatisticsOverview';
import { LocationType } from '../../model/LocationType';
import { locationFetch } from '../../actions/LocationActions';

interface Props {
  match: any;
  isAdmin: boolean;
  events: [];
  locations: LocationType[];
  fetchAllEvents: () => { type: string };
  locationFetch: () => { type: string };
}

function StatisticsPage({ match, isAdmin, events, locations, fetchAllEvents, locationFetch }: Props) {
  const backgroundStyle = eventDetailsStyles();
  let newEvent = match.path === '/admin/newEvent';
  const [open, setOpen] = useState(false);
  const [msgUndo, setMsgUndo] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogDescription, setDialogDescription] = useState('');
  const overviewComponent = (
    <OverviewSmart
      newEvent={newEvent}
      isAdmin={isAdmin}
      setOpen={setOpen}
      setMsgUndo={setMsgUndo}
      setDialogTitle={setDialogTitle}
      setDialogDescription={setDialogDescription}
    />
  );

  const [idLocation, setidLocation] = useState('');
  const locationComponent = <MapWrapper locationStatus={idLocation} setlocationStatus={setidLocation} />;
  const locComponent = <LocationStatisticsOverview locations={locations} />;

  useEffect(() => {
    fetchAllEvents();
    locationFetch();
  }, []);

  return (
    <Paper className={backgroundStyle.paper}>
      <StepperStatistics eventsComponent={overviewComponent} locationComponent={locComponent} />
    </Paper>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    events: state.events.allEvents,
    locations: state.location.locations,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchAllEvents: () => dispatch(fetchAllEvents()),
    locationFetch: () => dispatch(locationFetch()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsPage);
