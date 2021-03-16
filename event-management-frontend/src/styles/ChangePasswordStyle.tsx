import { makeStyles, Theme } from '@material-ui/core/styles';

const useStylesChangePassword = makeStyles((theme: Theme)=>({
    root:{
        flexGrow:1,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        height: "100vh",
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
       

    },
    onNewLine:{
        align:"center"
    },
    loginButton:{
        width: '20%'
    },
    link:{
        textDecoration:'none'
    }
}))

export default useStylesChangePassword;
