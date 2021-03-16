import { makeStyles } from "@material-ui/core";

export const useStylesTickets = makeStyles(theme => ({
    ticketsTitle: {
        color: '#F2AE30',
        fontSize: 24,
        fontWeight: 'bold',
        alignContent: "center",
        alignItems: "center"
    },
    pdfButton: {
        [theme.breakpoints.down("xs")]: {
            padding: 0
        },
        [theme.breakpoints.up("sm")]: {
            padding: 20
        },
    },
    linkDecoration: {
        textDecoration: 'none'
    },
    grayBackground: {
        backgroundColor: "#F4F5F9"
    },
    ticketTableLayout: {
        tableLayout: "fixed"
    },
    displayNone: {
        display: 'none'
    },
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        overflow: 'visible',
        marginTop: 10
    },
    ticketColumnMobile: {
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    tableCellPadding: {
      //paddingLeft: 20,
        //paddingRight: 20
    },
    paddingTable: {
        margin: 30,
    }
}));
