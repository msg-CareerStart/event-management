import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Button } from '@material-ui/core';
import { blackMarkerPoint } from './markerPointIcons';
import useStylesMapWrapper from '../../../styles/MapWrapperStyle';
import { useStyles } from '../../../styles/CommonStyles';
import { useTranslation } from 'react-i18next';
import { LocationType } from '../../../model/LocationType';

interface Props {
  locations: LocationType[];
  submitLocation: (id: number, lat: string, long: string, name: string) => void;
}

const MapDisplayLocationsDumb = (props: Props) => {
  const classesMap = useStylesMapWrapper();
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      {props.locations.map((location) => (
        <Marker
          key={location.id}
          position={[parseFloat(location.latitude), parseFloat(location.longitude)]}
          icon={blackMarkerPoint}
        >
          <Popup>
            <div className={classesMap.wrapperPopup}>
              <h1 className={classesMap.locationTitle}>{location.name} </h1>
              <p className={classesMap.locationAddress}>{location.address}</p>
              <Button
                className={`${classes.mainButtonStyle} ${classes.pinkGradientButtonStyle} ${classesMap.buttonPopup}`}
                onClick={(e) => {
                  return props.submitLocation(location.id, location.latitude, location.longitude, location.name);
                }}
                disabled={false}
              >
                {t('location.selectButton')}
              </Button>
            </div>
          </Popup>
        </Marker>
      ))}
    </div>
  );
};

export default MapDisplayLocationsDumb;
