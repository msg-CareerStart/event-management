import React, { useEffect, useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useStylesMapWrapper from '../../styles/MapWrapperStyle';
import '../../styles/Map.css';
import { LocationType } from '../../model/LocationType';
import UserMapDisplayLocationsDumb from './UserMapDisplayLocationsDumb';
import { EventCard } from '../../model/userHome/EventCard';
import UserMapDisplayChosenLocationDumb from './UserMapDisplayChosenLocationDumb';

interface Props {
  eventCards: EventCard[];
}

export interface EventWithLocation {
  event: EventCard;
  location: LocationType;
}

const UserMapEventsDumb: React.FC<Props> = (props: Props) => {
  const classesMap = useStylesMapWrapper();

  const [selectedEvent, setSelectedEvent] = useState<EventCard>({
    id: 0,
    title: '',
    occupancyRate: 0,
    startDate: '',
    endDate: '',
  });

  const submitLocation = (lat: string, long: string) => {
    setSelectedEvent(props.eventCards[0]);
  };

  useEffect(() => {
    console.log(props.eventCards);
  }, []);

  return (
    <div className={`${classesMap.mapWrapper} mapResponsive`}>
      <Map center={[46.77121, 23.623634]} zoom={13} doubleClickZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <UserMapDisplayLocationsDumb
          eventCards={props.eventCards}
          submitLocation={submitLocation}
        ></UserMapDisplayLocationsDumb>
      </Map>
    </div>
  );
};

export default UserMapEventsDumb;

/*
<UserMapDisplayLocationsDumb
            locations={props.userMapLocations}
            submitLocation={submitLocation}
          ></UserMapDisplayLocationsDumb>
  <UserMapDisplayChosenLocationDumb event={selectedEvent}></UserMapDisplayChosenLocationDumb>
*/
