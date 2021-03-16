import React from 'react';
import { useStyles } from '../../styles/CommonStyles';
import useStylesLogin from '../../styles/LoginStyle';
import {
  FormGroup,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Button,
} from '@material-ui/core';
import { Trans } from 'react-i18next';
import { FormErrors } from './FormErrors';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

interface Props {
  email: string;
  newpassword: string;
  error: string;
  verificationPassword: (newpassword: string) => void;
  verificationEmail: (email: string) => void;
  verificationCode: (code: string) => void;
  code: string;
  values: { showPassword: boolean };
  handleClickShowPassword: () => void;
  onSubmit: (event: { preventDefault: () => void }) => Promise<void>;
  newpasswordError: string;
  setPasswordError: (newpasswordError: string) => void;
  emailError: string;
  setEmailError: (emailError: string) => void;
  validateEmail: (email: string, emailError: string, setEmailError: (emailError: string) => void) => boolean;
  validatePasswordRequirements: (
    newpassword: string,
    newpasswordError: string,
    setPasswordError: (newpasswordError: string) => void
  ) => boolean;
}

const VerificationDumb = (props: Props) => {
  const classes = useStyles();
  const classesLogin = useStylesLogin();
  return (
    <div className={classesLogin.root}>
      <FormGroup>
        <h1 className={classes.typography}>
          <Trans i18nKey="forgotPasswordVerification.title">Set new password</Trans>
        </h1>

        <p>
          <Trans i18nKey="forgotPasswordVerification.message">
            Please enter the verification code sent to your email address below, your email address and a new password.
          </Trans>
        </p>

        <TextField
          className={classesLogin.loginformItems}
          label={<Trans i18nKey="forgotPasswordVerification.code">Verification Code</Trans>}
          type="text"
          value={props.code}
          required
          variant="outlined"
          onChange={(e) => props.verificationCode(e.target.value)}
        />

        <TextField
          className={classesLogin.loginformItems}
          label="Email"
          type="email"
          value={props.email}
          variant="outlined"
          required
          helperText={props.emailError}
          error={props.emailError !== '' || props.validateEmail(props.email, props.emailError, props.setEmailError)}
          onChange={(e) => {
            props.verificationEmail(e.target.value);
            props.setEmailError('');
          }}
        />

        <FormControl className={classesLogin.loginformItems} required variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            <Trans i18nKey="forgotPasswordVerification.password">Password</Trans>
          </InputLabel>

          <OutlinedInput
            labelWidth={80}
            type={props.values.showPassword ? 'text' : 'password'}
            value={props.newpassword}
            required
            error={
              props.newpasswordError !== '' ||
              props.validatePasswordRequirements(props.newpassword, props.newpasswordError, props.setPasswordError)
            }
            onChange={(event) => {
              props.verificationPassword(event.target.value);
              props.setPasswordError('');
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={props.handleClickShowPassword} edge="end">
                  {props.values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{props.newpasswordError}</FormHelperText>
          {props.error ? <FormErrors error={props.error} /> : null}
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          onClick={props.onSubmit}
          className={`${classes.mainButtonStyle} ${classes.pinkGradientButtonStyle} ${classesLogin.loginButton}`}
        >
          <Trans i18nKey="forgotPasswordVerification.button">Submit</Trans>
        </Button>
      </FormGroup>
    </div>
  );
};
export default VerificationDumb;
