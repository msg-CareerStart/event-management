import React, { useEffect, useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useStylesMapWrapper from '../../styles/MapWrapperStyle';
import '../../styles/Map.css';
import { LatLngExpression } from 'leaflet';
import { AppState, store } from '../../store/store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { locationFetch, locationFetchSucces, locationisLoading } from '../../actions/LocationActions';
import { LocationType } from '../../model/LocationType';
import UserMapDisplayLocationsDumb from './UserMapDisplayLocationsDumb';
import UserMapDisplayChosenLocationDumb from './UserMapDisplayChosenLocationDumb';
import { fetchUserUpcomingEvents } from '../../actions/UserHomePageActions';
import { EventProps } from '../userHomePage/eventsSection/EventsSectionSmart';
import { UserEventList } from '../../model/userEventsPage/UserEventList';
import { a11yProps } from '../../utils/CrudStepperUtils';
import { EventCrud } from '../../model/EventCrud';
import { EventCard } from '../../model/userHome/EventCard';
import { fetchEventLocation } from '../../api/UserMapPageAPI';
import { UserMapPage } from '../../reducers/UserMapPageReducer';
import { fetchLocationFromIdLocation } from '../../actions/UserMapPageActions';
import { CircularProgress } from '@material-ui/core';
import { fetchAllEvents } from '../../actions/EventsPageActions';
import UserMapEventsDumb from './UserMapEventsDumb';

interface Props {
  isLoadingUpcomingEvents: boolean;
  eventCards: EventCard[];
  fetchUserUpcomingEv: (page: number, limit: number) => void;

  isLoadingSpecial: boolean;
  locationsSpecial: LocationType[];
  fetchLocationsSpecial: (id: number) => void;
}

export interface EventWithLocation {
  event: EventCard;
  location: LocationType;
}

const UserMapEventsSmart: React.FC<Props> = (props: Props) => {
  const classesMap = useStylesMapWrapper();

  useEffect(() => {
    props.fetchUserUpcomingEv(1, 10);
    console.log(props.eventCards);
    if (!props.isLoadingUpcomingEvents) {
      props.eventCards.map((event) => {
        props.fetchLocationsSpecial(event.id);
      });
      console.log(store.getState().userMap.locations);
    }
  }, []);

  return (
    <div>
      {props.isLoadingUpcomingEvents ? <CircularProgress /> : <UserMapEventsDumb eventCards={props.eventCards} />}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  isLoadingUpcomingEvents: state.userHome.upcoming.isLoading,
  eventCards: state.userHome.upcoming.events,

  isLoadingLocations: state.location.isLoading,
  locations: state.location.locations,

  allEvents: state.events.allEvents,
  isLoadingAllEvents: state.events.isLoading,

  isLoadingSpecial: state.userMap.isLoading,
  locationsSpecial: state.userMap.locations,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserUpcomingEv: (page: number, limit: number) => dispatch(fetchUserUpcomingEvents(page, limit)),
  fetchLocations: () => dispatch(locationFetch()),
  locationisLoading: (loadingStatus: boolean) => dispatch(locationisLoading(loadingStatus)),
  fetchEvents: () => dispatch(fetchAllEvents()),

  fetchLocationsSpecial: (id: number) => dispatch(fetchLocationFromIdLocation(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMapEventsSmart);
