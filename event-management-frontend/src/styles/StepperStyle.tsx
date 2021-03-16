import { makeStyles, Theme } from "@material-ui/core";

export const stepperStyles = makeStyles((theme: Theme) => ({
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
    marginTop: "60px",
  },
}));
