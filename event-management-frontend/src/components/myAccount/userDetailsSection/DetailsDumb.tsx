import React, { KeyboardEvent, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@material-ui/core';
import { createTextField } from '../../../utils/DetailsAccUtils';
import { useStyles } from '../../../styles/CommonStyles';
import { myAccountStyles } from '../../../styles/MyAccountStyles';
import { connect, useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import UserForm from '../../../model/UserForm';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

interface Props {
  userForm: UserForm;
  formErros: {
    firstName: string;
    lastName: string;
    email: string;
    ocupancyRate: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function DetailsDumb(props: Props) {
  const classes = myAccountStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.fundal}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item container direction="column" justify="center" alignItems="center">
          <Typography className={classes.typography}>
            {' '}
            {t('welcome.usernameDetails') + props.userForm.userName}
          </Typography>

          <Grid item>
            {' '}
            <AccountCircleIcon className={classes.icon}></AccountCircleIcon>
          </Grid>

          {createTextField(
            classes.root,
            'lastname',
            t('welcome.accDetailsName'),
            props.handleChange,
            props.userForm.lastName,
            props.formErros.lastName,
            'string'
          )}
          {createTextField(
            classes.root,
            'firstname',
            t('welcome.accDetailsPrenume'),
            props.handleChange,
            props.userForm.firstName,
            props.formErros.firstName,
            'string'
          )}
          {createTextField(
            classes.root,
            'email',
            t('welcome.accDetailsEmail'),
            props.handleChange,
            props.userForm.email,
            props.formErros.email,
            'string'
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default DetailsDumb;
