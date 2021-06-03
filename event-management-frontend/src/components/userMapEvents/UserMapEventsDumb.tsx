import React, { useEffect, useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useStylesMapWrapper from '../../styles/MapWrapperStyle';
import '../../styles/Map.css';
import UserMapDisplayLocationsDumb from './UserMapDisplayLocationsDumb';
import { EventCardsWithLoction } from './UserMapEventsSmart';
import UserMapDisplayChosenLocationDumb from './UserMapDisplayChosenLocationDumb';

interface Props {
  eventCardsWithLocation: EventCardsWithLoction[];
  show: boolean;
  selectedEvent: EventCardsWithLoction;
  submitLocation: (lat: string, long: string) => void;
}

const UserMapEventsDumb: React.FC<Props> = (props: Props) => {
  const classesMap = useStylesMapWrapper();

  return (
    <div className={`${classesMap.mapWrapper} mapResponsive`}>
      <Map center={[46.77121, 23.623634]} zoom={13} doubleClickZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <UserMapDisplayLocationsDumb
          eventCards={props.eventCardsWithLocation}
          submitLocation={props.submitLocation}
        ></UserMapDisplayLocationsDumb>

        {props.show && (
          <UserMapDisplayChosenLocationDumb event={props.selectedEvent}></UserMapDisplayChosenLocationDumb>
        )}
      </Map>
    </div>
  );
};
export default UserMapEventsDumb;
