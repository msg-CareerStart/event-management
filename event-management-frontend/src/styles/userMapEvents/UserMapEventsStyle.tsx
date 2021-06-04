import { makeStyles } from '@material-ui/core';

export const useUserMapEvents = makeStyles((theme) => ({
  wrapperPopup: {
    width: '200px',
  },
  locationAddress: {
    margin: '0 !important',
    fontSize: '14px',
  },
  locationTitle: {
    cursor: 'pointer',
    color: '#0000FF',
    marginBottom: '0px',
    fontWeight: 'bold',
    fontSize: '14px',
    textDecoration: 'underline',
  },
  eventDetails: {
    fontSize: '14px',
    marginTop: '0px',
  },
}));
