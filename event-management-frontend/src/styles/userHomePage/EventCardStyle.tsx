import { makeStyles } from "@material-ui/core";

export const useEventCardStyle = makeStyles(theme => ({
    header: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
        paddingRight: '8%',
        paddingLeft: '8%',
    },
    day: {
        backgroundColor: theme.palette.secondary.dark,
    },
    icon: {
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        padding: '12px',
        color: 'rgba(0, 0, 0, 0.54)',
        minWidth: '1px'
    },
    visibleIcon: {
        cursor: 'pointer',
    },
    invisibleIcon: {
        visibility: 'hidden',
    
    },
    cardContent: {
        paddingRight: '8%',
        paddingLeft: '8%'
    },
    pagination: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '8%',
        paddingLeft: '8%',
    },
}));
