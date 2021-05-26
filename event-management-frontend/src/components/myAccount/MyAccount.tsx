import React from 'react';
import HeaderAccSmart from './headerAccount/headerAccountSmart';
import DetailsSmart from './userDetailsSection/DetailsSmart';
import AppSettings from './appSettings/appSettings';
import StepperAccount from './StepperAccount';
import { Paper } from '@material-ui/core';
import { eventDetailsStyles } from '../../styles/EventDetailsStyle';
// import { myAccountStyles } from '../../styles/MyAccountStyles';

interface Props {
  match: any;
  isAdmin: boolean;
}

const userDetailComponent = <DetailsSmart />;
const appSettingsComponent = <AppSettings />;

const MyAccount = ({ match, isAdmin }: Props) => {
  //   const classes = myAccountStyles();

  const backgroundStyle = eventDetailsStyles();

  return (
    <Paper className={backgroundStyle.paper}>
      <HeaderAccSmart />
      <StepperAccount userDetailComponent={userDetailComponent} appSettingsComponent={appSettingsComponent} />
    </Paper>
  );
};

export default MyAccount;
