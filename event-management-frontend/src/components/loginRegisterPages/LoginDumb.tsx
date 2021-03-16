import React from 'react';
import {
  FormGroup,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Avatar,
} from '@material-ui/core';
import { Trans, useTranslation } from 'react-i18next';
import { SuccessMessage } from './SuccessMessage';
import { FormErrors } from './FormErrors';
import { useStyles } from '../../styles/CommonStyles';
import useStylesLogin from '../../styles/LoginStyle';
import { Link } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import RO from '../../languageImages/RO.png';
import EN from '../../languageImages/EN.png';

interface Props {
  username: string;
  password: string;
  error: string;
  loginPassword: (password: string) => void;
  loginUsername: (username: string) => void;
  success: string;
  values: { showPassword: boolean };
  handleClickShowPassword: () => void;
  onSubmit: () => void;
}

const LoginDumb = (props: Props) => {
  const classesLogin = useStylesLogin();
  const classes = useStyles();
  const [, i18n] = useTranslation();

  const handleChangeAppLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('i18nextLng', language);
  };
  return (
    <div className={classesLogin.root}>
      <FormGroup className={`${classesLogin.loginform} loginformResponsive`}>
        <h1 className={classes.typography}>
          <Trans i18nKey="login.title">Login</Trans>
        </h1>

        <div className={classesLogin.successDiv}>
          <SuccessMessage success={props.success} />
        </div>

        <TextField
          className={classesLogin.loginformItems}
          label={<Trans i18nKey="login.username">Username</Trans>}
          type="text"
          value={props.username}
          required
          variant="outlined"
          onChange={(e) => props.loginUsername(e.target.value)}
        />

        <FormControl className={classesLogin.loginformItems} required variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            <Trans i18nKey="login.password">Password</Trans>
          </InputLabel>
          <OutlinedInput
            labelWidth={80}
            id="outlined-adornment-password"
            type={props.values.showPassword ? 'text' : 'password'}
            value={props.password}
            required
            onChange={(event) => props.loginPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={props.handleClickShowPassword} edge="end">
                  {props.values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <div className="field">
          <p className={classesLogin.alignLeftDiv}>
            <Link to={'/forgotpassword'} className={classesLogin.link}>
              <Trans i18nKey="login.forgotPassword">Forgot password?</Trans>
            </Link>
          </p>
        </div>
        {props.error ? <FormErrors error={props.error} /> : null}
        <Button
          variant="contained"
          type="submit"
          onClick={props.onSubmit}
          className={`${classes.mainButtonStyle} ${classes.pinkGradientButtonStyle} ${classesLogin.loginButton}`}
        >
          <Trans i18nKey="login.button">Login</Trans>
        </Button>

        <div className="field">
          <p className="control">
            <Trans i18nKey="login.registerLink">
              Don't have an account?
              <Link to={'/register'} className={classesLogin.link}>
                Register here
              </Link>
            </Trans>
          </p>
        </div>
        <div>
          <div onClick={() => handleChangeAppLanguage('ro')} className={classesLogin.flags}>
            <Avatar alt="RO" variant="square" className={classesLogin.small} src={RO} />
          </div>
          <div onClick={() => handleChangeAppLanguage('en')} className={classesLogin.flags}>
            <Avatar alt="EN" variant="square" className={classesLogin.small} src={EN} />
          </div>
        </div>
      </FormGroup>
    </div>
  );
};
export default LoginDumb;
