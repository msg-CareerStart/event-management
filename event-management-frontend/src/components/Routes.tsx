import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Login from './loginRegisterPages/Login';
import ForgotPassword from './loginRegisterPages/ForgotPassword';
import ForgotPasswordVerification from './loginRegisterPages/ForgotPasswordVerification';
import ChangePasswordConfirm from './loginRegisterPages/ChangePasswordConfirm';
import '../styles/Responsivity.css';
import '../App.css';
import Registration from './loginRegisterPages/Registration';

const AuthWrapper = () => {
  return (
    <div className="App">
      <div className="authComponentsResponsive">
        {/* <Button onClick={() => changeLanguage("en")}>en</Button>
        <Button onClick={() => changeLanguage("ro")}>ro</Button>
        <hr /> */}
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/forgotpassword" component={ForgotPassword}></Route>
          <Route path="/forgotpasswordverification" component={ForgotPasswordVerification}></Route>
          <Route path="/changepasswordconfirmation" component={ChangePasswordConfirm}></Route>
          <Route path="/register" component={Registration}></Route>
        </Switch>
      </div>
    </div>
  );
};

export default AuthWrapper;
