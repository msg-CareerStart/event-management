import React from 'react';
import { connect } from 'react-redux';
import { addUser, editUser, loadUserById, loadUserByUsername } from '../../../actions/UserFormActions';
import UserForm from '../../../model/UserForm';
import { AppState } from '../../../store/store';
import HeaderAccDumb from './headerAccountDumb';
import { Dispatch } from 'redux';

let saveInfo = (): void => {};

interface Props {
  userForm: UserForm;
  editUserAction: (userForm: UserForm) => void;
}

function HeaderAccSmart(props: Props) {
  return <HeaderAccDumb userForm={props.userForm} editUserAction={props.editUserAction} />;
}

export default HeaderAccSmart;
