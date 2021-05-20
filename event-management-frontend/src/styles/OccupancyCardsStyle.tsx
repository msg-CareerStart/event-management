import { makeStyles } from '@material-ui/core/styles';
import themeDark from './Apptheme';

const useStylesCards = makeStyles(() => ({
  occupancyCard: {
    marginTop: '20px',
    borderRadius: 16,
    '&:hover': {
      boxShadow: `0 6px 12px 0 grey`,
    },
  },
  title: {
    marginLeft: '12px',
    display: 'block',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    cursor: 'grab',
    color: '#133655',
  },
  cardTitle: {
    fontFamily: 'LATO',
    fontWeight: 100,
    fontSize: '1.5rem',
    color: '#fff',
    marginBottom: '10px',
    textTransform: 'uppercase',
    textAlign: 'left',
    paddingLeft: '10%',
  },
  listItem: {
    display: 'block !important',
    paddingLeft: '10%',
    paddingRight: '10%',
    width: '50%',
    minWidth: '50%',
  },
  list: {
    listStyleType: 'none !important ',
  },
  card: {
    borderRadius: 16,
  },
  avatar: {
    backgroundColor: themeDark.palette.primary.dark,
    float: 'left',
    padding: '3px',
    margin: '3px',
    marginRight: '20px',
    marginTop: '30px !important',
  },
  event: {
    float: 'right',
  },
  block: {
    display: 'inline !important',
    textAlign: 'left',
  },
  occupancyRate: {
    paddingLeft: '10px',
    margin: '2px',
  },
  dateRange: {
    margin: '2px',
    paddingLeft: '10px',
    paddingBottom: '30px',
    color: '#f2ac0a',
  },
  dateIcon: {
    marginRight: '5px',
    verticalAlign: 'middle',
  },
  dateText: {
    margin: '1px',
    display: 'inline',
    marginBlockEnd: '5px',
    marginBlockStart: '0px',
  },
  dateEnd: {
    margin: '2px',
  },

  spacing: {
    margin: '5px',
  },
  adminHomeContainer: {
    padding: '20px',
  },
  text: {
    fontFamily: 'LATO',
  },
  icon: {
    verticalAlign: 'middle',
  },
  locationIcon: {
    marginleft: '5px',
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageCover: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  leftFlex: {
    minWidth: '50%',
  },
  imageContent: {
    display: 'block',
    maxWidth: '350px',
    maxHeight: '350px',
    width: 'auto',
    height: 'auto',
    borderRadius: '4%',
  },
}));

export default useStylesCards;
