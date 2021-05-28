import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { greenMarkerPoint } from './userMarkerPointIcons';
import { LatLngExpression, marker } from 'leaflet';
import useStylesMapWrapper from '../../styles/MapWrapperStyle';
import { useHistory } from 'react-router-dom';
import { AppState } from '../../store/store';
import { connect } from 'react-redux';
import { EventCard } from '../../model/userHome/EventCard';
import { fetchEventLocation } from '../../api/UserMapPageAPI';
import { LocationType } from '../../model/LocationType';
import { EventWithLocation } from './UserMapEventsDumb';

interface Props {
  event: EventCard;
}

const UserMapDisplayChosenLocationDumb = (props: Props) => {
  const classesMap = useStylesMapWrapper();

  const history = useHistory();

  const goToEventDetails = (eventId: number) => {
    history.push(`/user/events/${eventId}`);
  };

  return (
    <div>
      <Marker key={props.event.id} position={[46, 23]} icon={greenMarkerPoint}>
        <Popup>
          <div className={classesMap.wrapperPopup}>
            <p className={classesMap.locationAddress}>
              {'Loc name'}
              {', '}
              {'Loc address'}
            </p>
            <h1 className={classesMap.locationTitle} onClick={() => goToEventDetails(props.event.id)}>
              {props.event.title}
              {', '}
              {props.event.startDate}
              {', '}
              {props.event.startDate}
            </h1>
          </div>
        </Popup>
      </Marker>
      );
    </div>
  );
};

export default UserMapDisplayChosenLocationDumb;
