import React from 'react';
import { connect } from 'react-redux';
import UserForm from '../../../model/UserForm';
import { AppState } from '../../../store/store';
import DetailsDumb from './DetailsDumb';

interface Props {
  userForm: UserForm;
  editUserAction: (userForm: UserForm) => void;
}

function DetailsSmart(props: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    //update user form
    let newUserForm = Object.assign({}, props.userForm);

    switch (name) {
      case 'lastname':
        props.userForm.lastName = value;
        break;
      case 'firstname':
        props.userForm.firstName = value;
        break;
      case 'email':
        props.userForm.email = value;
        break;
      default:
        break;
    }

    // update form errors
    //TO DO
  };

  return <DetailsDumb userForm={props.userForm} handleChange={handleChange} />;
}

export default DetailsSmart;
