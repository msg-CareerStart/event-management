import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Button } from '@material-ui/core';
import { redMarkerPoint } from './markerPointIcons';
import useStylesMapWrapper from '../../../styles/MapWrapperStyle';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../../../styles/CommonStyles';
import { LatLngExpression } from 'leaflet';
import { LocationType } from '../../../model/LocationType';

interface Props {
  searchMarker: LatLngExpression[];
  submitLocation: (id: number, lat: string, long: string, name: string) => void;
  searchLocation: LocationType;
}

const MapDisplaySearchMarker = (props: Props) => {
  const classesMap = useStylesMapWrapper();
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      {props.searchMarker.map((position: LatLngExpression, idx) => {
        return (
          <Marker key={idx} position={position} icon={redMarkerPoint}>
            <Popup>
              <div className={classesMap.wrapperPopup}>
                <h1 className={classesMap.locationTitle}>{props.searchLocation.name} </h1>
                {props.searchLocation.address}
                <br />{' '}
                <Button
                  className={`${classes.mainButtonStyle} ${classes.pinkGradientButtonStyle} ${classesMap.buttonPopup}`}
                  onClick={(e) => {
                    return props.submitLocation(
                      props.searchLocation.id,
                      props.searchLocation.latitude,
                      props.searchLocation.longitude,
                      props.searchLocation.name
                    );
                  }}
                  disabled={false}
                >
                  {t('location.selectButton')}
                </Button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </div>
  );
};

export default MapDisplaySearchMarker;
