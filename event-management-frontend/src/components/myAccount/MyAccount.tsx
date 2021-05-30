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
  user: UserForm;
  fetchUserByIDAction: (id: number) => void;
  fetchUserByUsernameAction: (username: string) => void;
  addUserAction: (user: UserForm) => void;
  editUserAction: (user: UserForm) => void;
}

const userDetailComponent = <DetailsSmart />;
const appSettingsComponent = <AppSettingsSmart />;

const MyAccount = ({
  match,
  isAdmin,
  user,
  fetchUserByIDAction,
  fetchUserByUsernameAction,
  addUserAction,
  editUserAction,
}: Props) => {
  //   const classes = myAccountStyles();

  useEffect(() => {
    console.log(user);
    console.log(user);
    console.log(user);
    console.log(user);
  });

  const backgroundStyle = eventDetailsStyles();

  return (
    <Paper className={backgroundStyle.paper}>
      <HeaderAccSmart />
      <StepperAccount userDetailComponent={userDetailComponent} appSettingsComponent={appSettingsComponent} />
    </Paper>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    user: state.userForm.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchUserByIDAction: (id: number) => dispatch(loadUserById(id)),
    fetchUserByUsernameAction: (username: string) => dispatch(loadUserByUsername(username)),
    addUserAction: (user: UserForm) => dispatch(addUser(user)),
    editUserAction: (user: UserForm) => dispatch(editUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
