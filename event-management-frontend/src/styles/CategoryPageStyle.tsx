import { makeStyles, Theme } from '@material-ui/core';

export const useStylesCategoryPage = makeStyles((theme: Theme) => ({
  alignMe: {
    float: 'left',
    marginLeft: '9%',
  },
  title: {
    float: 'left',
    marginLeft: '12%',
  },
  maxTickets: {
    width: '100%',
    margin: theme.spacing(1),
  },
  inlineHeader: {
    display: 'inline-flex',
    float: 'left',
    marginLeft: '9%',
    width: '100%',
  },
  gridStyle: {
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
  },
  gridStyleHeader: {
    marginTop: '5%',
    marginLeft: '6%',
  },
  ticketInfoStyle: {
    width: '100%',
    margin: theme.spacing(1),
  },

  button: {
    margin: theme.spacing(1),
    width: '90%',
    marginBottom: '20px',
    height: '50px',
    textAlign: 'center',
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    // background: "linear-gradient(90deg, #f9c929 20%, #f2ac0a 90%)",
    borderRadius: '30px',
  },
}));
