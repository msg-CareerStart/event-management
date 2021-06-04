import React, { useEffect, useState } from 'react';
import { EventCard } from '../../model/userHome/EventCard';
import { fetchUserUpcomingEvents } from '../../actions/UserHomePageActions';
import { AppState } from '../../store/store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { EventProps } from '../userHomePage/eventsSection/EventsSectionSmart';
import { LocationType } from '../../model/LocationType';
import UserMapEventsDumb from './UserMapEventsDumb';
import { MAX_NUMBER_EVENTS } from './userMapConstants';

interface UserHomePageProps {
  upcomingEvents: EventProps;
  fetchUserUpcomingEvents: (page: number, limit: number) => void;
}

export interface EventCardsWithLoction {
  eventCards: EventCard[];
  location: LocationType;
}

const UserMapEventsSmart = (props: UserHomePageProps) => {
  const [eventCardsWithLocation, setEventCardsWithLocation] = useState<EventCardsWithLoction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  let result: EventCardsWithLoction[] = [];

  const [selectedEvent, setSelectedEvent] = useState<EventCardsWithLoction>({
    eventCards: [],
    location: {
      id: 0,
      name: '',
      address: '',
      latitude: '',
      longitude: '',
    },
  });
  const [show, setShow] = useState(false);

  const submitLocation = (lat: string, long: string) => {
    eventCardsWithLocation.map((e) => {
      if (e.location.latitude === lat && e.location.longitude === long) {
        setSelectedEvent(e);
        setShow(true);
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);

    fetchUserUpcomingEvents(0, MAX_NUMBER_EVENTS);

    let locations: LocationType[] = [];
    props.upcomingEvents.events.map((x) => {
      if (-1 === locations.findIndex((element) => element.id === x.locationDto.id)) {
        locations.push(x.locationDto);
      }
    });
    locations.map((loc) => {
      let events: EventCard[] = [];
      props.upcomingEvents.events.map((x) => {
        if (x.locationDto.id === loc.id) {
          events.push(x);
        }
      });
      result.push({ location: loc, eventCards: events });
    });
    setEventCardsWithLocation(result);

    setIsLoading(false);
  }, []);

  return (
    <div>
      {isLoading || props.upcomingEvents.isLoading ? (
        <CircularProgress />
      ) : (
        <UserMapEventsDumb
          eventCardsWithLocation={eventCardsWithLocation}
          show={show}
          selectedEvent={selectedEvent}
          submitLocation={submitLocation}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  upcomingEvents: state.userHome.upcoming,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserUpcomingEvents: (page: number, limit: number) => dispatch(fetchUserUpcomingEvents(page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMapEventsSmart);
