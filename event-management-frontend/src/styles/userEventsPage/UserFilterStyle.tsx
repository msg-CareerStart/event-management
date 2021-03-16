import { makeStyles } from "@material-ui/core";

export const useUserFilterStyles = makeStyles({
    root: {
        marginTop: 10,
        marginBottom: 10,
        padding: '3% 0'
    },
    filterArea: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    filterButtonsArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    relationArea: {
        display: 'flex',
        alignItems: 'flex-start'
    },
    relationSelect: {
        marginRight: '5px'
    },
    filterButtons: {
        width: '100%'
    },
    textOverflow: {
        "& .MuiFormLabel-root": {
            display: 'block',
            overflow: 'hidden',
            width: 'calc(100%)',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        },
        display: 'block',
        width: 'calc(100%)',
        textOverflow: 'ellipsis'
    },
    checkboxOverflow: {
        display: 'block',
        width: 'calc(100%)',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    }
}); 
