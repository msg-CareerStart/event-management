import React, { useEffect } from 'react';
import HeaderAccSmart from './headerAccount/headerAccountSmart';
import DetailsSmart from './userDetailsSection/DetailsSmart';
import AppSettingsSmart from './appSettings/AppSettingsSmart';
import StepperAccount from './StepperAccount';
import { Paper } from '@material-ui/core';
import { eventDetailsStyles } from '../../styles/EventDetailsStyle';
import { AppState } from '../../store/store';
// import { myAccountStyles } from '../../styles/MyAccountStyles';
import { Dispatch } from 'redux';
import { addUser, editUser, loadUserById, loadUserByUsername } from '../../actions/UserFormActions';
import UserForm from '../../model/UserForm';
import { connect } from 'react-redux';
interface Props {
  match: any;
  isAdmin: boolean;
  userForm: UserForm;
  editUserAction: (userForm: UserForm) => void;
}

const MyAccount = ({ match, isAdmin, userForm, editUserAction }: Props) => {
  //   const classes = myAccountStyles();

  const backgroundStyle = eventDetailsStyles();

  const userDetailComponent = <DetailsSmart userForm={userForm} editUserAction={editUserAction} />;
  const appSettingsComponent = <AppSettingsSmart userForm={userForm} editUserAction={editUserAction} />;

  return (
    <Paper className={backgroundStyle.paper}>
      <HeaderAccSmart userForm={userForm} editUserAction={editUserAction} />
      <StepperAccount userDetailComponent={userDetailComponent} appSettingsComponent={appSettingsComponent} />
    </Paper>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    userForm: state.userForm.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    editUserAction: (userForm: UserForm) => dispatch(editUser(userForm)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
