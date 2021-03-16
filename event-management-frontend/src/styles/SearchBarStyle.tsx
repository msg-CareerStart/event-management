import { makeStyles } from "@material-ui/core/styles";

const useStylesSearchBar = makeStyles((themeDark) => ({
  searchBar: {
    width: "70%",
    border: "1px solid grey",
    fontSize: "14px",
    color: "rgba(0,0,0,0.73)",
    position: "relative",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  searchBarInput: {
    width: "100%",
    border: "none !important",
    fontSize: "14px",
    color: "rgba(0,0,0,0.73)",
    padding: "10px 5px",
    boxSizing: "border-box",
    outline: "none",
    backgroundColor: "white",
    alignContent: "center",
  },
  suggestionsText: {
    listStyleType: "none",
    textAlign: "left",
    margin: "0",
    padding: "0",
    borderTop: "1px solid grey",
  },
  suggestedItem: {
    padding: "10px 5px",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "rgba(128,128,128,0.20)",
    },
  },
  containerSuggestions: {
    zIndex: 2,
    position: "absolute",
    backgroundColor: "white",
    width: "99.9%",
    borderBottom: "1px solid",
    borderLeft: "1px solid",
    borderRight: "1px solid",
  },
}));

export default useStylesSearchBar;
