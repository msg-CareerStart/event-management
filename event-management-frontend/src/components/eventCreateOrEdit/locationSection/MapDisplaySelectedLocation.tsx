import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { greenMarkerPoint } from './markerPointIcons';
import useStylesMapWrapper from '../../../styles/MapWrapperStyle';
import { useTranslation } from 'react-i18next';
import { LatLngExpression } from 'leaflet';

interface Props {
  selectedMarker: LatLngExpression[];
  currentLocation: string;
}

const MapDisplaySelectedLocationDumb = (props: Props) => {
  const classesMap = useStylesMapWrapper();
  const { t } = useTranslation();

  return (
    <div>
      {props.selectedMarker.map((position: LatLngExpression, idx: number) => {
        return (
          <Marker key={idx} position={position} icon={greenMarkerPoint}>
            <Popup>
              <div className={classesMap.wrapperPopup}>
                <h1 className={classesMap.locationTitle}> {props.currentLocation} </h1>
                <p className={classesMap.text}>{t('location.selectedLocationMessage')}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </div>
  );
};

export default MapDisplaySelectedLocationDumb;
