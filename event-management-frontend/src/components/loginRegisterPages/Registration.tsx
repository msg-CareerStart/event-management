import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { AppState } from '../../store/store';
import { Dispatch } from 'redux';
import {
  registrationisLoading,
  registrationError,
  registrationSuccess,
  registrationFirstName,
  registrationLastName,
  registrationEmail,
  registrationUsername,
  registrationPassword,
  registrationConfirmPassword,
  registrationFirstNameError,
  registrationLastNameError,
  registrationEmailError,
  registrationUsernameError,
  registrationPasswordError,
  registrationConfirmPasswordError,
} from '../../actions/RegistrationPageActions';
import { connect } from 'react-redux';
import {
  validateFirstName,
  validateLastName,
  validateUserName,
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from '../../validation/RegistrationValidation';
import { useTranslation } from 'react-i18next';
import RegistrationDumb from './RegistrationDumb';

interface Props {
  isLoading: boolean;
  error: string;
  success: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstNameError: string;
  lastNameError: string;
  emailError: string;
  usernameError: string;
  passwordError: string;
  confirmPasswordError: string;

  registrationisLoading: (isLoading: boolean) => void;
  registrationError: (error: string) => void;
  registrationSuccess: (succes: string) => void;
  registrationFirstName: (firstName: string) => void;
  registrationLastName: (lastName: string) => void;
  registrationEmail: (email: string) => void;
  registrationUsername: (username: string) => void;
  registrationPassword: (password: string) => void;
  registrationConfirmPassword: (confirmPassword: string) => void;
  registrationFirstNameError: (firstNameError: string) => void;
  registrationLastNameError: (lastNameError: string) => void;
  registrationEmailError: (emailError: string) => void;
  registrationUsernameError: (usernameError: string) => void;
  registrationPasswordError: (passwordError: string) => void;
  registrationConfirmPasswordError: (confirmPasswordError: string) => void;
}

const Registration = ({
  error,
  success,
  firstName,
  lastName,
  email,
  username,
  password,
  confirmPassword,
  firstNameError,
  lastNameError,
  emailError,
  usernameError,
  passwordError,
  confirmPasswordError,
  registrationisLoading,
  registrationError,
  registrationSuccess,
  registrationFirstName,
  registrationLastName,
  registrationEmail,
  registrationUsername,
  registrationPassword,
  registrationConfirmPassword,
  registrationFirstNameError,
  registrationLastNameError,
  registrationEmailError,
  registrationUsernameError,
  registrationPasswordError,
  registrationConfirmPasswordError,
}: Props) => {
  const [values, setValues] = useState<{ showPassword: boolean }>({
    showPassword: false,
  });

  /* const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, registrationLastNameError,] = useState('');
  const [emailError, registrationEmailError] = useState('');
  const [usernameError, registrationUsernameError] = useState('');
  const [passwordError, registrationPasswordError] = useState('');
  const [confirmPasswordError, registrationConfirmPasswordError] = useState('');*/
  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };
  const { t } = useTranslation();
  const onSubmit = async () => {
    registrationisLoading(true);
    if (
      validateFirstName(firstName, firstNameError, registrationFirstNameError) ||
      validateLastName(lastName, lastNameError, registrationLastNameError) ||
      validateUserName(username, usernameError, registrationUsernameError) ||
      validateConfirmPassword(password, confirmPassword, confirmPasswordError, registrationConfirmPasswordError) ||
      validateEmail(email, emailError, registrationEmailError) ||
      validatePassword(password, passwordError, registrationPasswordError)
    ) {
      return;
    }
    try {
      await Auth.signUp({
        username: username,
        password: password,
        attributes: {
          given_name: firstName,
          family_name: lastName,
          email: email,
        },
      });

      registrationError('');
      registrationSuccess(t('registration.successMessage'));
    } catch (error) {
      switch (error.code) {
        case 'UsernameExistsException':
          registrationUsernameError(t('registration.userExists'));
          registrationError(t('registration.userExists'));
          break;
      }
      registrationisLoading(false);
    }
  };
  return (
    <RegistrationDumb
      error={error}
      success={success}
      values={values}
      firstName={firstName}
      lastName={lastName}
      email={email}
      username={username}
      password={password}
      confirmPassword={confirmPassword}
      firstNameError={firstNameError}
      lastNameError={lastNameError}
      emailError={emailError}
      usernameError={usernameError}
      passwordError={passwordError}
      confirmPasswordError={confirmPasswordError}
      setFirstName={registrationFirstName}
      setLastName={registrationLastName}
      setEmail={registrationEmail}
      setUsername={registrationUsername}
      setPassword={registrationPassword}
      setConfirmPassword={registrationConfirmPassword}
      setFirstNameError={registrationFirstNameError}
      setLastNameError={registrationLastNameError}
      setEmailError={registrationEmailError}
      setUsernameError={registrationUsernameError}
      setPasswordError={registrationPasswordError}
      setConfirmPasswordError={registrationConfirmPasswordError}
      handleClickShowPassword={handleClickShowPassword}
      onSubmit={onSubmit}
    ></RegistrationDumb>
  );
};

const mapStateToProps = (state: AppState) => ({
  isLoading: state.registration.isLoading,
  error: state.registration.error,
  success: state.registration.success,
  firstName: state.registration.firstName,
  lastName: state.registration.lastName,
  email: state.registration.email,
  username: state.registration.username,
  password: state.registration.password,
  confirmPassword: state.registration.confirmPassword,
  firstNameError: state.registration.firstNameError,
  lastNameError: state.registration.lastNameError,
  emailError: state.registration.emailError,
  usernameError: state.registration.usernameError,
  passwordError: state.registration.passwordError,
  confirmPasswordError: state.registration.confirmPasswordError,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  registrationisLoading: (loadingStatus: boolean) => dispatch(registrationisLoading(loadingStatus)),
  registrationError: (error: string) => dispatch(registrationError(error)),
  registrationSuccess: (success: string) => dispatch(registrationSuccess(success)),
  registrationFirstName: (firstName: string) => dispatch(registrationFirstName(firstName)),
  registrationLastName: (lastName: string) => dispatch(registrationLastName(lastName)),
  registrationEmail: (email: string) => dispatch(registrationEmail(email)),
  registrationUsername: (username: string) => dispatch(registrationUsername(username)),
  registrationPassword: (password: string) => dispatch(registrationPassword(password)),
  registrationConfirmPassword: (confirmPassword: string) => dispatch(registrationConfirmPassword(confirmPassword)),

  registrationFirstNameError: (firstNameError: string) => dispatch(registrationFirstNameError(firstNameError)),
  registrationLastNameError: (lastNameError: string) => dispatch(registrationLastNameError(lastNameError)),
  registrationEmailError: (emailError: string) => dispatch(registrationEmailError(emailError)),
  registrationUsernameError: (usernameError: string) => dispatch(registrationUsernameError(usernameError)),
  registrationPasswordError: (passwordError: string) => dispatch(registrationPasswordError(passwordError)),
  registrationConfirmPasswordError: (confirmPasswordError: string) =>
    dispatch(registrationConfirmPasswordError(confirmPasswordError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
