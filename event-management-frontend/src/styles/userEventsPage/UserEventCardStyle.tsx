import { makeStyles } from "@material-ui/core";

export const useCardStyle = makeStyles( theme =>({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    cardActions:{
        padding: 0,
    },
    imageWrapper: {
        width: '100%',
        height: '300px',
        cursor: 'pointer'
    },
    detailsButton: {
        height: '50px',
        width: '100%',
        borderRadius: 0
    },
    eventInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: '3% 5%',
        '& div': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        }
    },
    eventIconInfo: {
        marginRight: '8px',
        color: '#f2ac0a'
    },
    eventDivInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    eventTextInfo: {
        display: 'block',
        overflow: 'hidden',
        width: 'calc(100%)',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        '&:hover':{
            overflow: 'visible',
            whiteSpace: 'normal'
        }
    },
    eventTitle: {
        color: theme.palette.primary.main,
        cursor: 'pointer',
        '&:hover':{
            color: theme.palette.primary.light
        }
    }
}))
