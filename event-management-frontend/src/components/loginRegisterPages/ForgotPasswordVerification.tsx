import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { validatePasswordRequirements, validateEmail, displayErrorMessage } from "../../validation/LoginValidation";
import { Trans } from "react-i18next";
import { AppState } from "../../store/store";
import { Dispatch } from "redux";
import {
  verificationEmail,
  verificationPassword,
  verificationCode,
  verificationisLoading,
  verificationError,
} from "../../actions/ForgotPasswordVerificationPageAction";
import { connect } from "react-redux";
import VerificationDumb from "./ForgotPasswordVerificationDumb";

interface Props {
  isLoading: boolean;
  email: string;
  newpassword: string;
  error: string;
  code: string;
  verificationPassword: (newpassword: string) => void;
  verificationEmail: (email: string) => void;
  verificationError: (error: string) => void;
  verificationisLoading: (isLoading: boolean) => void;
  verificationCode: (code: string) => void;
}

const ForgotPasswordVerification = (props: Props) => {
  const [emailError, setEmailError] = useState("");
  const [newpasswordError, setPasswordError] = useState("");
  const history = useHistory();
  const [values, setValues] = React.useState<{ showPassword: boolean }>({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (
      validatePasswordRequirements(props.newpassword, newpasswordError, setPasswordError) ||
      validateEmail(props.email, emailError, setEmailError)
    ) {
      return;
    }

    try {
      await Auth.forgotPasswordSubmit(props.email, props.code, props.newpassword);

      history.push('/changepasswordconfirmation');
    } catch (error) {
      displayErrorMessage(
        <Trans i18nKey="forgotPasswordVerification.errorMessage">Invalid verification code or email address!</Trans>,
        props.verificationError
      );
    }
  };

  return (
    <VerificationDumb
      email={props.email}
      newpassword={props.newpassword}
      error={props.error}
      code={props.code}
      values={values}
      verificationPassword={props.verificationPassword}
      verificationCode={props.verificationCode}
      verificationEmail={props.verificationEmail}
      handleClickShowPassword={handleClickShowPassword}
      onSubmit={onSubmit}
      newpasswordError={newpasswordError}
      setPasswordError={setPasswordError}
      emailError={emailError}
      setEmailError={setEmailError}
      validateEmail={validateEmail}
      validatePasswordRequirements={validatePasswordRequirements}
    ></VerificationDumb>

  );
};
const mapStateToProps = (state: AppState) => ({
  email: state.forgotPasswordVerification.email,
  newpassword: state.forgotPasswordVerification.newpassword,
  isLoading: state.forgotPasswordVerification.isLoading,
  error: state.forgotPasswordVerification.error,
  code: state.forgotPasswordVerification.code,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  verificationEmail: (email: string) => dispatch(verificationEmail(email)),
  verificationPassword: (newpassword: string) => dispatch(verificationPassword(newpassword)),
  verificationisLoading: (loadingStatus: boolean) => dispatch(verificationisLoading(loadingStatus)),
  verificationError: (error: string) => dispatch(verificationError(error)),
  verificationCode: (code: string) => dispatch(verificationCode(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordVerification);
