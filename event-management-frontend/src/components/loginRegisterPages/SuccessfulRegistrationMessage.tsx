import { Alert, AlertTitle } from '@material-ui/lab';
import useStylesSuccess from '../../styles/FormSuccessStyle';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface FromSuccessProps {
  successMessage: string;
}

export const RegistrationSucces = (props: FromSuccessProps) => {
  const classes = useStylesSuccess();
  const { t } = useTranslation();

  return (
    <Alert severity="success" className={classes.success}>
      <AlertTitle>
        <strong>{props.successMessage}.</strong>
      </AlertTitle>
      {t('successfulRegistration')}
      <Link color="secondary" to={'/login'}>
        <strong>{t('successfulRegistrationLink')}</strong>
      </Link>
      {t('successfulRegistrationToContinue')}
    </Alert>
  );
};
