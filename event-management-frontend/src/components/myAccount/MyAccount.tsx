import React, { useEffect, useState } from 'react';
import HeaderAccSmart from './headerAccount/headerAccountSmart';
import DetailsSmart from './userDetailsSection/DetailsSmart';
import AppSettingsSmart from './appSettings/AppSettingsSmart';
import StepperAccount from './StepperAccount';
import { Button, Paper } from '@material-ui/core';
import { eventDetailsStyles } from '../../styles/EventDetailsStyle';
import { AppState } from '../../store/store';
// import { myAccountStyles } from '../../styles/MyAccountStyles';
import { Dispatch } from 'redux';
import { addUser, editUser, loadUserById, loadUserByUsername } from '../../actions/UserFormActions';
import UserForm from '../../model/UserForm';
import { connect } from 'react-redux';
import { UserFormErrors } from '../../model/UserFormError';
import { updateFormErrors } from '../../actions/UserFormActions';
import AlertDialogUser from './AlertDialogUser';
interface Props {
  match: any;
  isAdmin: boolean;
  userForm: UserForm;
  formErrors: UserFormErrors;
  editUserAction: (userForm: UserForm) => void;
  updateFormErrors: (errors: UserFormErrors) => void;
  isError: boolean;
  isRequest: boolean;
}

const MyAccount = ({
  match,
  isRequest,
  isAdmin,
  isError,
  userForm,
  formErrors,
  editUserAction,
  updateFormErrors,
}: Props) => {
  //   const classes = myAccountStyles();
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const [errors, setErrors] = useState(false);
  const backgroundStyle = eventDetailsStyles();

  const validForm = (): boolean => {
    let err = verifyErrorMessages(formErrors);
    setErrors(err);
    console.log(err + 'gic');
    return err;
  };

  const verifyErrorMessages = (errors: UserFormErrors): boolean => {
    if (
      errors.firstName.length > 0 ||
      errors.lastName.length > 0 ||
      errors.email.length > 0 ||
      errors.ocupancyRate.length > 0
    ) {
      setRequest(true);
      setOpen(true);
      return true;
    }
    console.log('ssss');
    setRequest(true);
    setOpen(true);
    return false;
  };

  const userDetailComponent = (
    <DetailsSmart
      userForm={userForm}
      formErrors={formErrors}
      editUserAction={editUserAction}
      updateFormErrors={updateFormErrors}
    />
  );
  const appSettingsComponent = (
    <AppSettingsSmart
      userForm={userForm}
      formErrors={formErrors}
      editUserAction={editUserAction}
      updateFormErrors={updateFormErrors}
    />
  );

  return (
    <Paper className={backgroundStyle.paper}>
      <HeaderAccSmart userForm={userForm} editUserAction={editUserAction} validForm={validForm} />
      <StepperAccount userDetailComponent={userDetailComponent} appSettingsComponent={appSettingsComponent} />
      <AlertDialogUser
        // isRequest={false}
        open={open}
        setRequest={setRequest}
        setOpen={setOpen}
        isError={errors}
      ></AlertDialogUser>
    </Paper>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    userForm: state.userForm.user,
    formErrors: state.userForm.formErrors,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    editUserAction: (userForm: UserForm) => dispatch(editUser(userForm)),
    updateFormErrors: (errors: UserFormErrors) => dispatch(updateFormErrors(errors)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
