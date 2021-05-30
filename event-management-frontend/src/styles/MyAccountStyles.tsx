import { makeStyles } from '@material-ui/core';

export const myAccountStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  grid: {
    width: '100%',
    margin: 0,
  },

  gridpadding: {
    padding: '2%',
  },

  typography: {
    padding: '1%',
    fontSize: '2em',
    color: theme.palette.primary.dark,
  },

  typographyInfo: {
    fontSize: '1em',
    color: theme.palette.primary.dark,
  },

  formControl: {
    minWidth: 100,
    marginBottom: '1.2em',
  },
  fundal: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '5%',
    marginBottom: '5%',
    marginLeft: '5%',
  },
  checkbox: {
    color: theme.palette.secondary.dark,
  },
  newBkg: {
    background: 'linear-gradient(45deg, #f9c929 10%, #f2ac0a 90%)',
  },
  margin: {
    marginTop: '1%',
    marginBottom: '1%',
  },
}));
