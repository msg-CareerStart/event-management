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
          onClick={() => props.submitLocation(e.location.latitude, e.location.longitude)}
          key={e.location.id}
          position={[parseFloat(e.location.latitude), parseFloat(e.location.longitude)]}
          icon={blackMarkerPoint}
        >
          <Popup>
            <div className={classesMap.wrapperPopup}>
              <div className={classesMap.locationAddress}>
                {e.location.name}
                {', '}
                {e.location.address}
              </div>
              {e.eventCards.map((x) => (
                <div key={x.id}>
                  <div className={classesMap.locationTitle} onClick={() => goToEventDetails(x.id)}>
                    {x.title}
                  </div>
                  <div>
                    {x.startDate} , {x.startHour.substring(0, x.startHour.length - 3)}
                  </div>
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
