import { makeStyles } from '@material-ui/core/styles';
import themeDark from './Apptheme';

const useStylesbuyTicketFirstPage = makeStyles(() => ({
  paperStyle: {
    display: 'flex',
    maxWidth: '900px',
    margin: '0 auto',
    minHeight: '150px',
    padding: '3%',
  },
  iconStyle: {
    width: 30,
    height: 30,
    color: 'black',
    paddingRight: '2%',
    verticalAlign: 'middle',
  },
  iconStyleLocation: {
    width: 30,
    height: 30,
    color: 'black',
    paddingRight: '2%',
  },
  radioGroup: {
    maxWidth: '900px',
    fontFamily: 'LATO !important',
  },
  nextButton: {
    position: 'absolute',
    bottom: '2%',
    marginRight: '3%',

    float: 'right',
    fontSize: 'large !important ',
    background: themeDark.palette.secondary.dark,
    '&:hover': {
      backgroundColor: '#f9c929',
    },
    '&:disabled': {
      backgroundColor: 'white !important',
      color: 'black !important',
      backgroundImage: 'linear-gradient(90deg, rgba(245,253,255,1) 0%, rgba(202,202,209,1) 1%)',
    },
    right: '15%',
  },
  link: {
    textDecoration: 'none',
  },
  title: { fontSize: 50, fontFamily: 'LATO !important', margin: '5px' },
  pagecontainer: {
    background: 'linear-gradient(45deg, #21C6F3 10%, #1E5FA4 90%)',
    minHeight: '105vh',
    paddingTop: '4%',
  },
  generalInfoContainer: {
    display: 'block',
    maxWidth: '900px',
    minHeight: '70px',
    padding: '3%',
    paddingTop: '5%',
    whiteSpace: 'pre-wrap',
  },
  newLineSpan: {
    display: 'inline-block',
    marginLeft: '1%',
    fontSize: '0.8em',
    fontFamily: 'LATO !important',
  },
  spacing: {
    margin: ' 10px ',
  },
  locationName: {
    fontWeight: 700,
    fontSize: '1rem',
  },
  styleInline: {
    display: 'inline-block',
    width: '60%',
  },
  textStyle: {
    fontSize: 16,
    fontFamily: 'LATO !important',
    marginTop: 10,
  },
  tag: {
    width: '50%',
    height: '50px',
    background: themeDark.palette.primary.dark,
    marginLeft: '-7.2%',
    '&:after': {
      marginTop: '0.5em',
      float: 'left',
      border: '1.5em solid #fff',
      borderRightColor: 'transparent',
    },
    color: 'white',
    paddingTop: '3%',
    paddingLeft: '5%',
    marginTop: '2%',
  },
  tagText: {
    fontSize: 16,
    fontFamily: 'LATO !important',
    textTransform: 'uppercase',
  },
  styleblock: {
    display: 'inline-block',
  },
  cancelButton: {
    position: 'absolute',
    bottom: '2%',
    marginLeft: '3%',
    fontSize: 'large !important ',
    background: themeDark.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: '#FF6171',
    },
    left: '15%',
  },
}));

export default useStylesbuyTicketFirstPage;
