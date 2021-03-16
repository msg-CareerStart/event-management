import { makeStyles } from "@material-ui/core/styles";
import themeDark from "./Apptheme";

const useStylesCards = makeStyles(() => ({
  occupancyCard: {
    marginTop: "20px",
    borderRadius: 16,
    "&:hover": {
      boxShadow: `0 6px 12px 0 grey`,
    },
  },

  title: {
    marginLeft: "12px",
    display: "block",
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
  cardTitle: {
    fontFamily: "LATO",
    fontWeight: 400,
    fontSize: "1.55rem",
    color: "#fff",
    marginBottom: "10px",
    textTransform: "uppercase",
    textAlign: "center",
  },
  listItem: {
    display: "block !important",
    paddingLeft: '10%',
    paddingRight: '10%'
  },
  list: {
    listStyleType: "none !important ",
  },
  card: {
    borderRadius: 16,
  },
  avatar: {
    backgroundColor: themeDark.palette.primary.dark,
    float: "left",
    padding: "3px",
    margin: "3px",
    marginRight: "20px",
    marginTop: "30px !important",
  },
  event: {
    float: "right",
  },
  block: {
    display: "inline !important",
    textAlign: 'left'
  },
  occupancyRate: {
    paddingLeft: "10px",
    margin: "2px",
  },
  dateRange: {
    margin: "2px",
    paddingLeft: "10px",
    paddingBottom: "30px",
  },
  dateIcon: {
    marginRight: "5px",
    verticalAlign: "middle",
  },
  dateText: {
    margin: "1px",
    display: "inline",
    marginBlockEnd: "5px",
    marginBlockStart: "0px",
  },
  dateEnd: {
    margin: "2px",
  },

  spacing: {
    margin: "5px",
  },
  adminHomeContainer: {
    padding: "20px",
  },
  text: {
    fontFamily: "LATO",
  },
  icon: {
    verticalAlign: "middle",
  },
}));

export default useStylesCards;
