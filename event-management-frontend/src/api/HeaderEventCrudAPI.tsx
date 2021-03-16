import { EventCrud } from '../model/EventCrud';
import { EventImage } from '../model/EventImage';
import { serverURL, s3URL } from './Api';
import { fetchWrapper } from './FetchWrapper';

export const fetchEventAPI = (id: string) => {
  return fetchWrapper(`${serverURL}/events/${id}`).then((response) => response.json());
};

export const deleteEventAPI = (id: string) => {
  return fetchWrapper(`${serverURL}/events/${id}`, { method: 'DELETE' });
};

export const addEventAPI = (event: EventCrud) => {
  return fetchWrapper(`${serverURL}/events`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  }).then((response) => response.json());
};

export const editEventAPI = (event: EventCrud) => {
  return fetchWrapper(`${serverURL}/events/${event.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  }).then((response) => response.json());
};

const sendImagesToAddAndDeteteToServer = async (newAddedImagesIds: string[], imagesToDelete: string[]) => {
  const pictures = { picturesToSave: newAddedImagesIds, picturesToDelete: imagesToDelete };
  return fetchWrapper(`${serverURL}/pictures`, {
    method: 'POST',
    body: JSON.stringify(pictures),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());
};

const saveEventImage = async (newAddedImages: File, newAddedImagesURLsToUpload: string) => {
  return fetch(newAddedImagesURLsToUpload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'image/*',
    },
    body: newAddedImages,
  }).then((res) => {
    return res.url;
  }); // the URL where the image was saved on S3
};

export const updateImagesFromS3 = async (images: EventImage[]) => {
  const newAddedImages = images.filter((img) => img.file !== undefined && img.deleted === undefined);
  const newAddedImagesIds = newAddedImages.map((image) => image.id) as string[];

  const imagesToDelete = images
    .filter((img) => img.deleted !== undefined && img.file === undefined)
    .map((img) => img.id) as string[];

  // get presigned URLs from the server to upload on S3 and send images server have to delete from s3
  const newAddedImagesURLsToUpload = await sendImagesToAddAndDeteteToServer(newAddedImagesIds, imagesToDelete);

  // upload images on S3 and save the images URL in order to send them back to server
  newAddedImages.forEach((newImage: EventImage, index: number) => {
    const urlS3 = newAddedImagesURLsToUpload[index];
    const indexImage = images.findIndex((im) => im.id === newImage.id);

    saveEventImage(newImage.file as File, urlS3);

    images[indexImage].url = `${s3URL}/${images[indexImage].id}`;
  });
  return images.filter((img) => img.deleted === undefined).map((img) => img.url);
};

export function fetchLocation() {
  return fetchWrapper(`${serverURL}/locations`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
}
