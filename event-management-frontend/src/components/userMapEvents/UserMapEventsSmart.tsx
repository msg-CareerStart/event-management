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
  var result: EventCardsWithLoction[] = [];

  useEffect(() => {
    setIsLoading(true);

    fetchUserUpcomingEvents(0, 30);

    var locations: LocationType[] = [];
    props.upcomingEvents.events.map((x) => {
      if (-1 === locations.findIndex((element) => element.id === x.locationDto.id)) {
        locations.push(x.locationDto);
      }
    });
    locations.map((loc) => {
      var events: EventCard[] = [];
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
        <UserMapEventsDumb eventCardsWithLocation={eventCardsWithLocation} />
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
