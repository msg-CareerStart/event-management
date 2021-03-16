import { makeStyles } from "@material-ui/core";

export const headerCrudDumbStyles = makeStyles({
  grid: {
    background: 'linear-gradient(45deg, #21C6F3 10%, #1E5FA4 90%)',
    width: '100%',
    margin: 0,
    flexGrow: 1,
    paddingTop: '4px',
    paddingBottom: '4px',
  },
  secondGrid: {
    width: '100%',
    margin: 0,
    flexGrow: 1,
  },
  position: {
    marginLeft: "5%"
  },
  typography: {
    fontSize: 22,
    fontFamily: 'Monospace',
    textTransform: 'uppercase'
  },
});
