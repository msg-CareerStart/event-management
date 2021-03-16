import { makeStyles } from "@material-ui/core";

export const userEventDetailsStyles = makeStyles(theme => ({
  grid: {
    background: 'linear-gradient(45deg, #21C6F3 10%, #1E5FA4 90%)',
    width: '100%',
    margin: '0px',
    flexGrow: 1,
  },
  typographyTitle: {
    fontSize: 22,
    textTransform: "uppercase",
    textAlign: "center"
  },
  typographySubtitle: {
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center"
  },
  position: {
    marginTop: "2vh",
    marginBottom: "2vh",
  },
  disabled: {
    '&:disabled': {
      backgroundColor: 'white !important',
      color: 'white !important',
      backgroundImage: 'linear-gradient(90deg, rgba(245,253,255,1) 0%, rgba(202,202,209,1) 1%)',
    },
  },
}));
