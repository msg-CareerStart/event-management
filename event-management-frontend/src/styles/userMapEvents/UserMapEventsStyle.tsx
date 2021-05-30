import { makeStyles } from '@material-ui/core';

export const useUserMapEvents = makeStyles((theme) => ({
  wrapperPopup: {
    width: '200px',
  },
  locationAddress: {
    margin: '0 !important',
    fontSize: '13px',
  },
  locationTitle: {
    display: 'inline',
    verticalAlign: 'top',
    fontSize: '14px',
  },
  eventDetails: {
    display: 'inline',
    verticalAlign: 'top',
    fontSize: '14px',
  },
}));
