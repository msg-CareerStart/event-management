import { makeStyles } from '@material-ui/core';

export const useValidateTicketStyles = makeStyles((theme) => ({
  qrReaderStyle: {
    width: '100%',
  },

  alertButtons: {
    display: 'flex',
    width: '90%',
  },

  nextButton: {
    height: '35px',
    maxWidth: '150px',
    minWidth: '100px',
    marginTop: theme.spacing(2),
  },

  exitButton: {
    height: '35px',
    maxWidth: '150px',
    minWidth: '100px',
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
  },

  titleStyle: {
    fontSize: '1.2em',
    fontWeight: 'bold',
  },

  alertDescription: {},

  alertIconStyle: {
    '& .MuiAlert-icon': {
      fontSize: '2em',
      height: '10px',
    },
    fontSize: '1.1em',
  },

  alertStyle: {
    zIndex: 1,
    position: 'absolute',
  },

  root: {
    marginTop: '0',
    width: '100%',
    minHeight: '99.9vh',
    background: 'linear-gradient(45deg, #21C6F3 50%, #1E5FA4 90%)',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    position: 'relative',
  },

  wrapper: { position: 'relative' },

  loading: {
    marginTop: theme.spacing(1),
    marginLeft: '45%',
  },

  loadingContainer: {
    position: 'absolute',
  },
}));
