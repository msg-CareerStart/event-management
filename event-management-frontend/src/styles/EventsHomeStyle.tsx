import {makeStyles} from "@material-ui/core/styles";


export const useStylesEventsHome = makeStyles({
    root: {
        minWidth: 275,
        borderRadius: 16,
        "&:hover": {
            boxShadow: `0 6px 12px 0 grey`,
            cursor: "pointer",
        },
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 20,
    },
    date: {
        color: "#F2AE30",
        fontSize: 15,
    },
    location: {
        color: "#F2AE30",
        fontSize: 15,
    },
    eventCard: {
        padding: 15,
    },
});
