import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { blackMarkerPoint } from './userMarkerPointIcons';
import useStylesMapWrapper from '../../styles/MapWrapperStyle';
import { LocationType } from '../../model/LocationType';
import { useHistory } from 'react-router-dom';
import { EventCard } from '../../model/userHome/EventCard';
import { UserEventList } from '../../model/userEventsPage/UserEventList';
import { fetchEventLocation } from '../../api/UserMapPageAPI';
import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { EventWithLocation } from './UserMapEventsDumb';

interface Props {
  submitLocation: (lat: string, long: string) => void;
  eventCards: EventCard[];
}

const UserMapDisplayLocationsDumb = (props: Props) => {
  const classesMap = useStylesMapWrapper();

  const history = useHistory();

  const goToEventDetails = (eventId: number) => {
    history.push(`/user/events/${eventId}`);
  };

  useEffect(() => {}, []);

  return (
    <div>
      {props.eventCards.map((e) => (
        <Marker
          onClick={() => {
            return props.submitLocation('46', '23');
          }}
          key={e.id}
          position={[46, 23]}
          icon={blackMarkerPoint}
        >
          <Popup>
            <div className={classesMap.wrapperPopup}>
              <p className={classesMap.locationAddress}>
                {'Loc name'}
                {', '}
                {'Loc address'}
              </p>
              <h1 className={classesMap.locationTitle} onClick={() => goToEventDetails(e.id)}>
                {e.title}
                {', '}
                {e.startDate}
                {', '}
                {e.startDate}
              </h1>
            </div>
          </Popup>
        </Marker>
      ))}
    </div>
  );
};

export default UserMapDisplayLocationsDumb;

/*
   {props.events.map((e) => (
        <Marker
          onClick={() => {
            console.log(props.events);
            return props.submitLocation(e.location.latitude, e.location.longitude);
          }}
          key={e.event.id}
          position={[parseFloat(e.location.latitude), parseFloat(e.location.longitude)]}
          icon={blackMarkerPoint}
        >
          <Popup>
            <div className={classesMap.wrapperPopup}>
              <p className={classesMap.locationAddress}>
                {e.location.name}
                {', '}
                {e.location.address}
              </p>
              <h1 className={classesMap.locationTitle} onClick={() => goToEventDetails(e.event.id)}>
                {e.event.title}
                {', '}
                {e.event.startDate}
                {', '}
                {e.event.startDate}
              </h1>
            </div>
          </Popup>
        </Marker>
      ))}
*/
