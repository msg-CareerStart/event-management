import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { blackMarkerPoint } from './userMarkerPointIcons';
import { useHistory } from 'react-router-dom';
import { EventCardsWithLoction } from './UserMapEventsSmart';
import { useUserMapEvents } from '../../styles/userMapEvents/UserMapEventsStyle';

interface Props {
  submitLocation: (lat: string, long: string) => void;
  eventCards: EventCardsWithLoction[];
}

const UserMapDisplayLocationsDumb = (props: Props) => {
  const classesMap = useUserMapEvents();
  const history = useHistory();
  const goToEventDetails = (eventId: number) => {
    history.push(`/user/events/${eventId}`);
  };

  return (
    <div>
      {props.eventCards.map((e) => (
        <Marker
          onClick={() => {
            return props.submitLocation(e.location.latitude, e.location.longitude);
          }}
          key={e.location.id}
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
              {e.eventCards.map((x) => (
                <div key={x.id}>
                  <h1 className={classesMap.locationTitle} onClick={() => goToEventDetails(x.id)}>
                    {x.title}
                  </h1>
                  <p className={classesMap.eventDetails}>
                    {' '}
                    {', '}
                    {x.startDate}
                    {', '}
                    {x.startHour}
                  </p>
                </div>
              ))}
            </div>
          </Popup>
        </Marker>
      ))}
    </div>
  );
};

export default UserMapDisplayLocationsDumb;
