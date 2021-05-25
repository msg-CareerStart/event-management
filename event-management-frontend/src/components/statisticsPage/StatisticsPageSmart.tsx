import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAllEvents } from '../../actions/EventsPageActions';
import { AppState } from '../../store/store';

import { Dispatch } from 'redux';
import { Paper } from '@material-ui/core';
import { eventDetailsStyles } from '../../styles/EventDetailsStyle';
import OverviewSmart from '../eventCreateOrEdit/overviewSection/OverviewSmart';
import StepperStatistics from './StepperStatistics';
import ImagesSectionSmart from '../eventCreateOrEdit/imagesSection/ImagesSectionSmart';
import CategoryPageSmart from '../eventCreateOrEdit/ticketsSection/CategoryPage/CategoryPageSmart';
import MapWrapper from '../eventCreateOrEdit/locationSection/Map';

interface Props {
  match: any;
  isAdmin: boolean;
  events: [];
  fetchAllEvents: () => { type: string };
}

function StatisticsPage({ match, isAdmin, events, fetchAllEvents }: Props) {
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

  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <Paper className={backgroundStyle.paper}>
      <StepperStatistics eventsComponent={overviewComponent} locationComponent={locationComponent} />
    </Paper>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    events: state.events.allEvents,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchAllEvents: () => dispatch(fetchAllEvents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsPage);
