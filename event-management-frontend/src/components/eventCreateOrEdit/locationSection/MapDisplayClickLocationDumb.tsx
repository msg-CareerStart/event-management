import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Button } from '@material-ui/core';
import { redMarkerPoint } from './markerPointIcons';
import useStylesMapWrapper from '../../../styles/MapWrapperStyle';
import { useTranslation } from 'react-i18next';
import { useStyles } from '../../../styles/CommonStyles';
import { LatLngExpression } from 'leaflet';
import { LocationType } from '../../../model/LocationType';
import { useDispatch } from 'react-redux';
import { addLocationToEvent } from '../../../actions/HeaderEventCrudActions';

interface Props {
  searchMarker: LatLngExpression[];
  searchLocation: LocationType;
  submitLocation: (id: number, lat: string, long: string, name: string) => void;
}

const MapDisplayClickLocationDumb = (props: Props) => {
  const classesMap = useStylesMapWrapper();
  const classes = useStyles();
  const { t } = useTranslation();

  const [showPopUp, setShowPopUp] = useState(true);
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();

  const closePopup = () => {
    setShowPopUp(false);
    setShow(false);
  };

  useEffect(() => {
    setShowPopUp(true);
  });

  useEffect(() => {
    setShow(true);
  }, [props.searchMarker]);

  return (
    <div>
      {show &&
        props.searchMarker.map((position: LatLngExpression, idx) => {
          return (
            <Marker key={idx} position={position} icon={redMarkerPoint}>
              {showPopUp && (
                <Popup>
                  <div className={classesMap.wrapperPopup}>
                    <h1 className={classesMap.locationTitle}>{props.searchLocation.name} </h1>
                    {props.searchLocation.address}
                    <br />{' '}
                    <Button
                      className={`${classes.mainButtonStyle} ${classes.pinkGradientButtonStyle} ${classesMap.buttonPopup}`}
                      onClick={(e: any) => {
                        closePopup();
                        dispatch(addLocationToEvent(props.searchLocation));
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
              )}
            </Marker>
          );
        })}
    </div>
  );
};

export default MapDisplayClickLocationDumb;
