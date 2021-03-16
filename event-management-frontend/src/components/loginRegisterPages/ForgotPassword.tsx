import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { FormGroup, TextField, Button } from '@material-ui/core';
import useStylesLogin from '../../styles/LoginStyle';
import { useStyles } from '../../styles/CommonStyles';
import { useHistory } from 'react-router-dom';
import { validateEmail, displayErrorMessage } from '../../validation/LoginValidation';
import { FormErrors } from './FormErrors';
import { Trans } from 'react-i18next';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const classesLogin = useStylesLogin();
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState('');

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (validateEmail(email, emailError, setEmailError)) {
      return;
    }
    try {
      await Auth.forgotPassword(email);
      history.push('/forgotpasswordverification');
    } catch (error) {
      displayErrorMessage(<Trans i18nKey="forgotPassword.errorMessage">Enter your email address.</Trans>, setError);
    }
  };

  return (
    <div className={`${classesLogin.root} forgotPasswordResponsive`}>
      <FormGroup>
        <h1 className={classes.typography}>
          <Trans i18nKey="forgotPassword.title">Forgot your password?</Trans>
        </h1>

        <p>
          <Trans i18nKey="forgotPassword.message">
            Please enter the email address associated with your account and we'll email you a password reset link.
          </Trans>
        </p>

        <TextField
          className={classesLogin.loginformItems}
          label="Email"
          type="email"
          value={email}
          required
          variant="outlined"
          helperText={emailError}
          error={emailError !== '' || validateEmail(email, emailError, setEmailError)}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError('');
          }}
        />

        {error ? <FormErrors error={error} /> : null}

        <Button
          variant="contained"
          type="submit"
          onClick={onSubmit}
          className={`${classes.mainButtonStyle} ${classes.pinkGradientButtonStyle} ${classesLogin.loginButton}`}
        >
          <Trans i18nKey="forgotPassword.button">Submit</Trans>
        </Button>
      </FormGroup>
    </div>
  );
};

export default ForgotPassword;
