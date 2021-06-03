import { makeStyles } from '@material-ui/core';

export const useAdministrationPageStyle = makeStyles((theme) => ({
  paperBig: {
    marginTop: '0%',
    width: '100%',
    height: '91.5vh',
    background: 'linear-gradient(45deg, #21C6F3 50%, #1E5FA4 90%)',
    overflow: 'hidden',
  },
  paperSmall: {
    marginTop: '0%',
    width: '100%',
    background: 'linear-gradient(45deg, #21C6F3 50%, #1E5FA4 90%)',
  },
  formControl: {
    marginTop: '10vh',
    marginBottom: '8%',
    marginRight: 'auto',
    marginLeft: 'auto',
    minWidth: 200,
  },
  rootResponsive: {
    '& .MuiTab-root': {
      minWidth: '20px',
      padding: '0',
    },
    '& .MuiGrid-grid-xs': {
      maxWidth: '50%',
    },
  },
  root: {
    display: 'flex',
    color: theme.palette.text.primary,
    height: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.primary.dark}`,
  },
  tab: {
    paddingBottom: '25px',
    paddingTop: '25px',
  },
  iconTabs: {
    borderRight: `1px solid ${theme.palette.primary.dark}`,
    marginTop: '60px',
  },
  component: {
    width: '75%',
  },
  buttonWrapperBig: {
    width: '15%',
    top: '570px',
    position: 'absolute',
    alignContent: 'center',
  },
  buttonWrapperSmall: {
    width: '15%',
    top: '620px',
    position: 'absolute',
    alignContent: 'center',
  },
  button: {
    width: '100%',
  },
}));
