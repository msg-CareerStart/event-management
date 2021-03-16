import { makeStyles } from "@material-ui/core";

export const useFilterStyles = makeStyles({
    filterArea:{
        paddingTop: '30px',
        paddingBottom: '10px',
    },
    filterButtonsArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    relationArea: {
        display: 'flex',
        alignItems: 'center',
    },
    relationSelect: {
        marginRight: '5px',
    },
    filterExpandText: {
        cursor: 'pointer',
        fontSize: 12,
    },
    highlightedCheckbox: {
        display: 'flex',
        alignItems: 'center'
    },
    customDatePickerWidth: {
        '& .react-datepicker-wrapper': {
            width: '100%'
        },
    },
    datePicker: {
        width: '100%',
        zIndex: 200
    },
    collapseArea: {
        paddingTop: '24px'
    },
    filterButtons: {
        width: '100%',
        marginBottom: '10px'
    }
}); 
