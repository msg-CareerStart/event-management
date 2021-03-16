export interface EventImage {
  id: string;
  name: string;
  url: any;
  deleted?: boolean; // the image was deleted
  file?: File; // the images was added now
}
