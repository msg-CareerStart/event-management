import { Trans } from 'react-i18next';
import React from 'react';

export const validateEmail = (email: string, emailError: string, setEmailError: (arg0: any) => void) => {
  if (email.trim() === '' || /^[a-zA-Z0-9_.\-$]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
    return false;
  }

  if (!emailError) {
    setEmailError(<Trans i18nKey="registration.emailError">Enter a valid email address!</Trans>);
  }
  return true;
};

export const validatePassword = (password: string, passwordError: string, setPasswordError: (arg0: any) => void) => {
  if (password.trim() === '' || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
    return false;
  }

  if (!passwordError) {
    setPasswordError(
      <Trans i18nKey="registration.passwordError">
        Requirements: min. 8 characters, an uppercase letter and a number.
      </Trans>
    );
  }
  return true;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
  confirmPasswordError: string,
  setConfirmPasswordError: (arg0: any) => void
) => {
  if (confirmPassword.trim() === '' || confirmPassword === password) {
    return false;
  }

  if (!confirmPasswordError) {
    setConfirmPasswordError(<Trans i18nKey="registration.passwordNotMatching">The passwords do not match.</Trans>);
  }
  return true;
};

export const validateFirstName = (
  firstName: string,
  firstNameError: string,
  setFirstNameError: (arg0: any) => void
) => {
  if (firstName.trim() === '') {
    if (!firstNameError) {
      setFirstNameError(<Trans i18nKey="registration.emptyError">Enter a value</Trans>);
    }
    return true;
  }
};

export const validateLastName = (lastName: string, lastNameError: string, setLastNameError: (arg0: any) => void) => {
  if (lastName.trim() === '') {
    if (!lastNameError) {
      setLastNameError(<Trans i18nKey="registration.emptyError">Enter a value</Trans>);
    }
    return true;
  }
};

export const validateUserName = (username: string, usernameError: string, setUsernameError: (arg0: any) => void) => {
  if (username.trim() === '') {
    if (!usernameError) {
      setUsernameError(<Trans i18nKey="registration.emptyError">Enter a value</Trans>);
    }
    return true;
  }
};
export const displaySuccessMessage = (message: React.ReactElement, setSuccessMessage: (arg0: any) => void) => {
  setSuccessMessage(message);
};
