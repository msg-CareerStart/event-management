import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { greenMarkerPoint } from './userMarkerPointIcons';
import { useHistory } from 'react-router-dom';
import { EventCardsWithLoction } from './UserMapEventsSmart';
import { useUserMapEvents } from '../../styles/userMapEvents/UserMapEventsStyle';

interface Props {
  event: EventCardsWithLoction;
}

const UserMapDisplayChosenLocationDumb = (props: Props) => {
  const classesMap = useUserMapEvents();
  const history = useHistory();
  const goToEventDetails = (eventId: number) => {
    history.push(`/user/events/${eventId}`);
  };

  return (
    <div>
      <Marker
        key={props.event.location.id}
        position={[parseFloat(props.event.location.latitude), parseFloat(props.event.location.longitude)]}
        icon={greenMarkerPoint}
      >
        <Popup>
          <div className={classesMap.wrapperPopup}>
            <p className={classesMap.locationAddress}>
              {props.event.location.name}
              {', '}
              {props.event.location.address}
            </p>
            {props.event.eventCards.map((x) => (
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
      );
    </div>
  );
};

export default UserMapDisplayChosenLocationDumb;
