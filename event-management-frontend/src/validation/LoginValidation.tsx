import { Trans } from "react-i18next";
import React from "react";

export const validatePassword = (password: string, username: string) => {
  return password.length === 0 && username.length > 0;
};

export const validateEmail = (email: string, emailError: string, setEmailError: (arg0: any) => void) => {
  if (email.trim() === "" || /^[a-zA-Z0-9_.\-$]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
    return false;
  }

  if (!emailError) {
    setEmailError(<Trans i18nKey="login.emailError">Enter a valid email address!</Trans>);
  }

  return true;
};

export const validatePasswordRequirements = (
  password: string,
  passwordError: string,
  setPasswordError: (arg0: any) => void
) => {
  if (password.trim() === "" || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
    return false;
  }

  if (!passwordError) {
    setPasswordError(<Trans i18nKey="login.passwordError">Requirements min. 8 characters uppercase and number"</Trans>);
  }
  return true;
};

export const displayErrorMessage = (message: React.ReactElement, setErrorMessage: (arg0: any) => void) => {
  setErrorMessage(message);
};
