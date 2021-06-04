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
            <div className={classesMap.locationAddress}>
              {props.event.location.name}
              {', '}
              {props.event.location.address}
            </div>
            {props.event.eventCards.map((x) => (
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
      );
    </div>
  );
};

export default UserMapDisplayChosenLocationDumb;
