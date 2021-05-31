import React from 'react';
import UserForm from '../../../model/UserForm';
import AppSettingsDumb from './AppSettingsDumb';

interface Props {
  userForm: UserForm;
  editUserAction: (userForm: UserForm) => void;
}

function AppSettingsSmart(props: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    //update user form
    let newUserForm = Object.assign({}, props.userForm);

    switch (name) {
      case 'rate':
        var x = value;
        var y: number = +x;
        props.userForm.occupancyRate = y;
        break;
      case 'send':
        //to do
        break;
      default:
        break;
    }
    console.log(props.userForm);
    // update form errors
    //TO DO
  };
  return <AppSettingsDumb userForm={props.userForm} handleChange={handleChange} />;
}

export default AppSettingsSmart;
