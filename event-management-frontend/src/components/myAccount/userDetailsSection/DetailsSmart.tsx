import React from 'react';
import { connect } from 'react-redux';
import UserForm from '../../../model/UserForm';
import { AppState } from '../../../store/store';
import DetailsDumb from './DetailsDumb';
import { updateFormErrors } from '../../../actions/UserFormActions';
import { UserFormErrors } from '../../../model/UserFormError';
import { useTranslation } from 'react-i18next';

interface Props {
  userForm: UserForm;
  formErrors: UserFormErrors;
  editUserAction: (userForm: UserForm) => void;
  updateFormErrors: (errors: UserFormErrors) => void;
}

function DetailsSmart(props: Props) {
  const { t } = useTranslation();
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
    let newFormErrors = Object.assign({}, props.formErrors);

    switch (name) {
      case 'firstname':
        newFormErrors.firstName = value.length < 3 ? t('welcome.errMsgUserMinCharacters') : '';
        break;

      case 'lastname':
        console.log('aicicccc');
        newFormErrors.lastName = value.length < 3 ? t('welcome.errMsgUserMinCharacters') : '';
        newFormErrors.lastName = value.length < 3 ? t('welcome.errMsgUserMinCharacters') : '';
        console.log(newFormErrors);
        break;
      case 'email':
        console.log(value);
        if (value.includes('@yahoo.com') || value.includes('@gmail.com')) newFormErrors.email = '';
        else newFormErrors.email = t('welcome.errMsgUserInvalidEmail');
        break;

      default:
        break;
    }
    props.updateFormErrors(newFormErrors);
  };

  return <DetailsDumb userForm={props.userForm} formErros={props.formErrors} handleChange={handleChange} />;
}

export default DetailsSmart;
