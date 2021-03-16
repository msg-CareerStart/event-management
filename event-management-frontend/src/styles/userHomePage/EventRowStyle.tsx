import { makeStyles } from "@material-ui/core";

export const useEventRowStyle = makeStyles( theme =>({
    eventIconInfo: {
        marginRight: '8px',
        color:  theme.palette.secondary.dark
    },
    eventDivInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    eventTitle: {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        cursor: 'pointer',
        '&:hover':{
            color: theme.palette.primary.light
        }
    }
}));
