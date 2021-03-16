import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


export const useStylesHeader = makeStyles((theme: Theme) =>
    createStyles({
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            padding: 10
        },
        title: {
            flexGrow: 1,
        },
        //Colors
        dark: {
            color: '#133655',
        },
        light: {
            color: '#6BB7D0',
        },
        ghost: {
            color: '#F4F5F9',
        },
        white: {
            color: '#FFFFFF',
        },
        yellow: {
            color: '#F2AE30',
        },
        flags: {
            '&:hover': {
                cursor: "pointer",
            }
        },
    }),
);
