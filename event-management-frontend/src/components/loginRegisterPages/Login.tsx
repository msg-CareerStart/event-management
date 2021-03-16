import React from 'react';
import { Auth } from 'aws-amplify';
import { displayErrorMessage } from '../../validation/LoginValidation';
import '../../styles/Responsivity.css';
import { Trans } from 'react-i18next';
import useStylesLogin from '../../styles/LoginStyle';
import { displaySuccessMessage } from '../../validation/RegistrationValidation';
import { useHistory } from 'react-router-dom';
import { AppState } from '../../store/store';
import { Dispatch } from 'redux';
import { loginUsername, loginPassword, loginisLoading, loginError, loginSuccess } from '../../actions/LoginPageActions';
import { connect } from 'react-redux';
import LoginDumb from './LoginDumb';

interface Props {
  isLoading: boolean;
  username: string;
  password: string;
  error: string;
  success: string;
  loginPassword: (password: string) => void;
  loginUsername: (username: string) => void;
  loginError: (error: string) => void;
  loginisLoading: (isLoading: boolean) => void;
  loginSuccess: (succes: string) => void;
}

const Login: React.FC<Props> = (props: Props) => {
  const [values, setValues] = React.useState<{ showPassword: boolean }>({
    showPassword: false,
  });

  const classesLogin = useStylesLogin();
  const history = useHistory();

  const handleClickShowPassword = () => {
    setValues({ showPassword: !values.showPassword });
  };

  const onSubmit = async () => {
    props.loginisLoading(true);
    Auth.signIn(props.username, props.password)
      .then((user) => {
        localStorage.setItem('username', props.username);

        if (user.signInUserSession.accessToken.payload['cognito:groups'] !== undefined) {
          localStorage.setItem('role', 'admin');
          history.push('/admin/');
        } else {
          localStorage.setItem('role', 'user');
          history.push('/user/');
        }

        displaySuccessMessage(<Trans i18nKey="login.successMessage">Successful login</Trans>, props.loginSuccess);
        props.loginError('');
      })
      .catch((error) => {
        displayErrorMessage(
          <Trans i18nKey="login.errorMessage">Incorrect username or password.</Trans>,
          props.loginError
        );
        props.loginisLoading(false);
      });
  };

  return (
    <div className={classesLogin.root}>
      <LoginDumb
        username={props.username}
        password={props.password}
        success={props.success}
        values={values}
        error={props.error}
        loginPassword={props.loginPassword}
        loginUsername={props.loginUsername}
        handleClickShowPassword={handleClickShowPassword}
        onSubmit={onSubmit}
      ></LoginDumb>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  username: state.login.username,
  password: state.login.password,
  isLoading: state.login.isLoading,
  error: state.login.error,
  succes: state.login.success,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  loginUsername: (username: string) => dispatch(loginUsername(username)),
  loginPassword: (password: string) => dispatch(loginPassword(password)),
  loginisLoading: (loadingStatus: boolean) => dispatch(loginisLoading(loadingStatus)),
  loginError: (error: string) => dispatch(loginError(error)),
  loginSuccess: (success: string) => dispatch(loginSuccess(success)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
