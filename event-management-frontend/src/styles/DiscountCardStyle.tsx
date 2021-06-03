import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStylesDiscountCard = makeStyles((theme: Theme) => ({
  cardStyle: {
    float: 'left',
    width: '100%',
    paddingRight: '5%',
  },

  marginBasic: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  marginShort: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  inputPrice: {
    maxHeight: '4px',
  },

  inputBasic: {
    height: '40px',
  },

  date: {
    paddingBottom: '5px',
  },
}));
