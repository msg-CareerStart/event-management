import { serverURL } from './Api';
import { fetchWrapper } from './FetchWrapper';

export const dowloadCSV = async (url: string, name: string) => {
  const response = await fetch(url);
  const data = await response.text();
  const blob = new Blob([data], { type: 'data:text/csv;charset=utf-8,' });
  const blobURL = window.URL.createObjectURL(blob);

  // Create new tag for download file
  const anchor = document.createElement('a');
  anchor.download = name;
  anchor.href = blobURL;
  anchor.dataset.downloadurl = ['text/csv', anchor.download, anchor.href].join(':');
  anchor.click();
};

export const importTickets = (csv: FormData) => {
  return fetchWrapper(`${serverURL}/tickets/import`, {
    method: 'POST',
    body: csv,
  })
    .then((response) => response)
    .catch((error) => {
      console.log('error:', error);
    });
};

export const importEvents = (csv: FormData) => {
  return fetchWrapper(`${serverURL}/events/import`, {
    method: 'POST',
    body: csv,
  })
    .then((response) => response)
    .catch((error) => {
      console.log('error:', error);
    });
};
