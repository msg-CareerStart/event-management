import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import ImagesSectionDumb from './ImagesSectionDumb';
import { EventImage } from '../../../model/EventImage';
import { updateEventImages } from '../../../actions/HeaderEventCrudActions'; // to modify import
import { AppState } from '../../../store/store';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import ImagesDialog from './ImagesDialog';

interface ImagesSectionProps {
  isError: boolean;
  isLoading: boolean;
  eventImages: EventImage[];
  updateEventImages: (images: EventImage[]) => void;
}

function ImagesSectionSmart({ isError, isLoading, eventImages, updateEventImages }: ImagesSectionProps) {
  const [images, setImages] = useState<EventImage[]>(eventImages);
  const [open, setOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<EventImage>();
  const [t] = useTranslation();

  const handleCloseConfirm = () => {
    setImageAsDeleted(itemToDelete as EventImage);
    setItemToDelete(undefined);
    setOpen(false);
  };

  const handleCloseDecline = () => {
    setItemToDelete(undefined);
    setOpen(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const byteArr = reader.result;
        const id = `image-${file.size}-${Date.now()}-${file.name}`; // image id
        const elem = { id: id, name: file.name, url: byteArr, file: file };
        setImages((prevState) => [...prevState, elem]);
      };
    });
  }, []);

  const setImageAsDeleted = (item: EventImage) => {
    var array = [...images];
    var index = array.indexOf(item);
    if (index !== -1) {
      array[index].deleted = true;
      setImages(array);
    }
  };

  const handleClickOpen = (item: EventImage) => {
    setItemToDelete(item);
    setOpen(true);
  };

  useEffect(() => {
    updateEventImages(images);
  }, [images, updateEventImages]);

  const { getRootProps, getInputProps } = useDropzone({ accept: 'image/*', onDrop });

  return (
    <>
      <ImagesSectionDumb
        t={t}
        isError={isError}
        isLoading={isLoading}
        images={images}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        setImages={setImages}
        handleClickOpen={handleClickOpen}
      />

      <ImagesDialog t={t} open={open} handleCloseDecline={handleCloseDecline} handleCloseConfirm={handleCloseConfirm} />
    </>
  );
}

const mapStateToProps = ({ eventCrud }: AppState) => ({
  eventImages: eventCrud.images,
  isError: eventCrud.isError,
  isLoading: eventCrud.isLoading,
});

export default connect(mapStateToProps, { updateEventImages })(ImagesSectionSmart);
