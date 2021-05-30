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
}

const UserMapEventsDumb: React.FC<Props> = (props: Props) => {
  const classesMap = useStylesMapWrapper();
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
    props.eventCardsWithLocation.map((e) => {
      if (e.location.latitude === lat && e.location.longitude === long) {
        setSelectedEvent(e);
        setShow(true);
      }
    });
  };

  return (
    <div className={`${classesMap.mapWrapper} mapResponsive`}>
      <Map center={[46.77121, 23.623634]} zoom={13} doubleClickZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <UserMapDisplayLocationsDumb
          eventCards={props.eventCardsWithLocation}
          submitLocation={submitLocation}
        ></UserMapDisplayLocationsDumb>

        {show && <UserMapDisplayChosenLocationDumb event={selectedEvent}></UserMapDisplayChosenLocationDumb>}
      </Map>
    </div>
  );
};
export default UserMapEventsDumb;
