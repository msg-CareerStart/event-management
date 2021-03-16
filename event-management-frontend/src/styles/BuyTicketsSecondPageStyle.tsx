import { makeStyles, Theme, withStyles, Tooltip } from '@material-ui/core';

export const BuyTicketsSecondPageStyle = makeStyles((theme: Theme) => ({
  prevButtonStyle: {
    background: theme.palette.secondary.dark,
    transform: 'rotate(-180deg)',
    '&:hover': {
      backgroundColor: '#f9c929',
    },
  },
  nextButtonStyle: {
    background: theme.palette.secondary.dark,
    '&:hover': {
      backgroundColor: '#f9c929',
    },
  },
  cancelButtonStyle: {
    background: theme.palette.secondary.contrastText,
    transform: 'rotate(-180deg)',
    '&:hover': {
      backgroundColor: '#FF6171',
    },
  },
  positionLeft: {
    position: 'absolute',
    bottom: '2%',
    left: '15%',
    marginRight: 0,
    marginLeft: '3%',
  },
  positionRight: {
    position: 'absolute',
    bottom: '2%',
    right: '15%',
    marginLeft: 0,
    marginRight: '3%',
  },
}));

export const buyTicketsSecondPageDumbStyle = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '92.3vh',
    background: 'linear-gradient(45deg, #21C6F3 50%, #1E5FA4 90%)',
    paddingTop: '4%',
  },
  wrapper: {
    minWidth: '30vw',
    minHeight: '40vh',
    background: 'white',
  },
  position: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    backgroundColor: 'white',
    maxWidth: '40vw',
    minHeight: '40vh',
    maxHeight: '60vh',
    paddinggBottom: '3vh',
  },
  background: {
    backgroundColor: 'white',
    padding: '10vh 20vw',
  },
  scroll: {
    overflowY: 'scroll',
  },
  paperStyle: {
    display: 'block',
    height: '60vh',
    maxWidth: '900px',

    minHeight: '150px',
    padding: '3%',
    overflowY: 'scroll',
    margin: '0 auto',
  },
}));

export const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);
