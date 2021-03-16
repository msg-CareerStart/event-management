import React, { Suspense } from 'react';
import Amplify from 'aws-amplify';
import config from './config';
import AuthWrapper from './components/Routes';
import { Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import { CircularProgress, Grid } from '@material-ui/core';
import './App.css';
import MainUser from './components/MainUser';

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <Grid container alignItems={'center'} justify={'center'}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <CircularProgress /> &nbsp; Loading...
    </Grid>
  </div>
);

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
});

// This component will be rendered by our <Router>
const App = () => {
  return (
      <Suspense fallback={<Loader />}>
        <AuthWrapper />
        <Switch>
          <Route path="/admin" component={Main} />
          <Route path="/user" component={MainUser} />
        </Switch>
      </Suspense>
  );
};

export default App;
