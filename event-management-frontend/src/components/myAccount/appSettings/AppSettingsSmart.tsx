import React from 'react';
import { useTranslation } from 'react-i18next';
import UserForm from '../../../model/UserForm';
import { UserFormErrors } from '../../../model/UserFormError';
import AppSettingsDumb from './AppSettingsDumb';

interface Props {
  userForm: UserForm;
  formErrors: UserFormErrors;
  editUserAction: (userForm: UserForm) => void;
  updateFormErrors: (errors: UserFormErrors) => void;
}

function AppSettingsSmart(props: Props) {
  const { t } = useTranslation();
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
    let newFormErrors = Object.assign({}, props.formErrors);

    switch (name) {
      case 'rate':
        console.log('aics');
        newFormErrors.ocupancyRate =
          !Number.isNaN(value) && parseFloat(value) >= 0 && parseFloat(value) <= 100
            ? ''
            : t('welcome.errMsgUserInvalidRate');

        console.log(newFormErrors);
        break;
      default:
        break;
    }
    props.updateFormErrors(newFormErrors);
  };
  return <AppSettingsDumb userForm={props.userForm} formErros={props.formErrors} handleChange={handleChange} />;
}

export default AppSettingsSmart;
