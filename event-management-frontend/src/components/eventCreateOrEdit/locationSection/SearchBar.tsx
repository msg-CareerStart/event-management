import React, { useState, useEffect } from 'react';
import useStylesSearchBar from '../../../styles/SearchBarStyle';
import { Input, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslation } from 'react-i18next';
import { LatLngExpression } from 'leaflet';
import RenderSuggestions from './SearchBarSuggestions';
import { LocationType } from '../../../model/LocationType';
import { ORS_URL } from './MapUtils';

interface Props {
  myLocations: LocationType[];
  searchValue: string;
  updateSearchValue: (searchValue: string) => void;
  setLocation: (location: LocationType) => void;
  location: {
    id: number;
    name: string;
    address: string;
    latitude: string;
    longitude: string;
  };
  position: string[];
  setPosition: (position: string[]) => void;
  searchMarker: LatLngExpression[];
  setsearchMarker: (searchMarker: LatLngExpression[]) => void;
}

function getUserDataWithPromise(props: string) {
  const searchString = ORS_URL + process.env.REACT_APP_OPENROUTESERVICE_KEY + '&text=';
  let find = searchString.concat(props);
  if (props.length == 0) {
    return new Promise(function (resolve, reject) {});
  }

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  return new Promise(function (resolve, reject) {
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status < 300) {
          resolve(xhr.response);
        }
      }
    };
    xhr.open('GET', find, true);
    xhr.send();
  });
}

const SearchBar = (props: Props) => {
  const classesSearch = useStylesSearchBar();
  const [flag, setFlag] = useState(true);
  const [suggestions, setSuggestions] = useState<LocationType[]>([]);
  const [locations, setLocations] = useState<LocationType[]>([]);
  const { t } = useTranslation();

  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    setShowSuggestions(true);
    const foundLocations: LocationType[] = [];
    const results = getUserDataWithPromise(props.searchValue).then((result: any) => {
      result.features.map((element: any) => {
        const location: LocationType = {
          id: 0,
          name: element.properties.name,
          address: element.properties.label,
          latitude: element.geometry.coordinates[1],
          longitude: element.geometry.coordinates[0],
        };
        foundLocations.push(location);
      });
      return result;
    });

    setLocations(foundLocations);

    if (props.searchValue.length > 0 && flag) {
      const results = props.myLocations.filter((item) =>
        item.name.toLowerCase().includes(props.searchValue.toLowerCase())
      );
      setSuggestions(results.concat(locations));
    } else {
      setSuggestions([]);
      setFlag(true);
    }
  }, [props.searchValue]);

  const searchLocationCoord = (value: LocationType) => {
    props.setLocation(value);
    props.setPosition([value.latitude, value.longitude]);
    props.setsearchMarker([[parseFloat(value.latitude), parseFloat(value.longitude)]]);
  };
  const suggestionSelected = (value: LocationType) => {
    setSuggestions([]);
    props.updateSearchValue(value.address);
    setFlag(false);
    searchLocationCoord(value);
    setShowSuggestions(false);
  };
  return (
    <div className={classesSearch.searchBar}>
      <Input
        placeholder={t('location.searchBarText')}
        className={classesSearch.searchBarInput}
        value={props.searchValue}
        onChange={(e) => props.updateSearchValue(e.target.value)}
        type="text"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
      {showSuggestions && (
        <RenderSuggestions
          suggestions={suggestions}
          suggestionSelected={suggestionSelected}
          setSuggestions={setSuggestions}
        ></RenderSuggestions>
      )}
    </div>
  );
};

export default SearchBar;
