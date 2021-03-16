import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Grid, LinearProgress } from '@material-ui/core';
import { useStyle } from '../../../styles/ImagesSectionStyles';
import { EventImage } from '../../../model/EventImage';
import CancelIcon from '@material-ui/icons/Cancel';
import { TFunction } from 'i18next';

interface ImagesSectionProps {
  t: TFunction;
  isError: boolean;
  isLoading: boolean;
  getRootProps: any;
  getInputProps: any;
  images: EventImage[];
  setImages: (images: EventImage[]) => void;
  handleClickOpen: (item: EventImage) => void;
}

function ImagesSectionDumb({
  t,
  isError,
  isLoading,
  getRootProps,
  getInputProps,
  images,
  setImages,
  handleClickOpen,
}: ImagesSectionProps) {
  const classes = useStyle();

  return (
    <div className={classes.imagesArea}>
      <div {...getRootProps()} className={classes.dragndrop}>
        <input {...getInputProps()} />
        <p> {t('images.imageDragAndDrop')} </p>
      </div>

      <div className={classes.imagesContainerWrapper}>
        {isError ? (
          <p>{t('images.imageErrorMessage')}</p>
        ) : isLoading ? (
          <LinearProgress />
        ) : images.length !== 0 ? (
          <ReactSortable
            list={images}
            setList={setImages}
            direction="horizontal"
            animation={150}
            className={`${classes.imagesContainer} MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3`}
          >
            {images
              .filter((item) => item.deleted === undefined)
              .map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={item.id} className={classes.imageWrapper}>
                  <CancelIcon onClick={() => handleClickOpen(item)} className={classes.deleteButton} />

                  <img alt={item.name} src={item.url} className={classes.image} />
                </Grid>
              ))}
          </ReactSortable>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default ImagesSectionDumb;
