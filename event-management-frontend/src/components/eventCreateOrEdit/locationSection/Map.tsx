import React, { useEffect, useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import useStylesMapWrapper from '../../../styles/MapWrapperStyle';
import '../../../styles/Map.css';
import { LatLngExpression } from 'leaflet';
import { AppState } from '../../../store/store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  locationFetch,
  locationFetchSucces,
  locationisLoading,
  updateSearchValue,
} from '../../../actions/LocationActions';
import SearchBar from './SearchBar';
import { updateLocation } from '../../../actions/HeaderEventCrudActions';
import MapDisplayLocationsDumb from './MapdisplayLocationsDumb';
import MapDisplaySelectedLocationDumb from './MapDisplaySelectedLocation';
import MapDisplaySearchMarker from './MapDisplaySearchMarker';
import { LocationType } from '../../../model/LocationType';

interface Props {
  isLoading: boolean;
  locations: LocationType[];
  locationisLoading: (loadingStatus: boolean) => void;
  locationFetchSuccess: (locations: LocationType[]) => void;
  locationFetch: () => void;
  updateLocation: (id: number) => void;
  locationStatus: string;
  setlocationStatus: (locationStatus: string) => void;
  idLocation: number;
  searchValue: string;
  updateSearchValue: (searchValue: string) => void;
}
interface OwnProps {
  locationStatus: string;
  setlocationStatus: (locationStatus: string) => void;
}

const MapWrapper: React.FC<Props> = (props: Props) => {
  const classesMap = useStylesMapWrapper();
  const [position, setPosition]: any = useState([46.77121, 23.623634]);
  const [currentLocation, setcurrentLocation] = useState('');
  const [searchLocation, setsearchLocation] = useState({
    id: 0,
    name: '',
    address: '',
    latitude: '',
    longitude: '',
  });
  const [selectedMarker, setSelectedMarker] = useState<LatLngExpression[]>([]);
  const [searchMarker, setSearchMarker] = useState<LatLngExpression[]>([]);

  useEffect(() => {
    props.locationFetch();
    props.locationisLoading(false);
  }, []);

  useEffect(() => {
    const location = props.locations.find((loc) => loc.id === props.idLocation);

    if (location !== undefined) {
      const markers: LatLngExpression[] = [];
      markers.push([parseFloat(location.latitude), parseFloat(location.longitude)]);
      setSelectedMarker(markers);
      setcurrentLocation(location.name);
    }
  }, [props.locations]);

  const submitLocation = (id: number, lat: string, long: string, name: string) => {
    setSearchMarker([]);

    const markers: LatLngExpression[] = [];
    markers.push([parseFloat(lat), parseFloat(long)]);
    setSelectedMarker(markers);
    props.updateLocation(id);
    const ids = String(id);
    props.setlocationStatus(ids);
    setcurrentLocation(name);
  };

  return (
    <div className={`${classesMap.mapWrapper} mapResponsive`}>
      <div className={classesMap.searchBar}>
        <SearchBar
          myLocations={props.locations}
          searchValue={props.searchValue}
          updateSearchValue={props.updateSearchValue}
          setLocation={setsearchLocation}
          location={searchLocation}
          position={position}
          setPosition={setPosition}
          searchMarker={searchMarker}
          setsearchMarker={setSearchMarker}
        ></SearchBar>
      </div>

      <Map center={position} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <MapDisplayLocationsDumb locations={props.locations} submitLocation={submitLocation}></MapDisplayLocationsDumb>
        <MapDisplaySelectedLocationDumb currentLocation={currentLocation} selectedMarker={selectedMarker} />
        <MapDisplaySearchMarker
          searchMarker={searchMarker}
          searchLocation={searchLocation}
          submitLocation={submitLocation}
        ></MapDisplaySearchMarker>
      </Map>
    </div>
  );
};
const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  locations: state.location.locations,
  isLoading: state.location.isLoading,
  locationStatus: ownProps.locationStatus,
  setlocationStatus: ownProps.setlocationStatus,
  idLocation: state.eventCrud.event.location,
  searchValue: state.location.searchValue,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  locationFetch: () => dispatch(locationFetch()),
  locationFetchSuccess: (locations: LocationType[]) => dispatch(locationFetchSucces(locations)),
  locationisLoading: (loadingStatus: boolean) => dispatch(locationisLoading(loadingStatus)),
  updateLocation: (idLocation: number) => dispatch(updateLocation(idLocation)),
  updateSearchValue: (searchValue: string) => dispatch(updateSearchValue(searchValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapWrapper);
