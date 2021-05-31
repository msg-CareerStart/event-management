import React, { KeyboardEvent, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@material-ui/core';
import { createTextField } from '../../../utils/DetailsAccUtils';
import { useStyles } from '../../../styles/CommonStyles';
import { myAccountStyles } from '../../../styles/MyAccountStyles';
import { connect, useSelector } from 'react-redux';
import { AppState } from '../../../store/store';
import UserForm from '../../../model/UserForm';

interface Props {
  // formErros: {
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  // };
  userForm: UserForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function DetailsDumb(props: Props) {
  const classes = myAccountStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.fundal}>
      <Typography className={classes.typography}>
        {' '}
        {props.userForm.userName} {t('welcome.usernameDetails')}
      </Typography>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item container direction="column" justify="center" alignItems="center">
          {createTextField(
            classes.root,
            'lastname',
            t('welcome.accDetailsName'),
            props.handleChange,
            props.userForm.lastName,
            '',
            'string'
          )}
          {createTextField(
            classes.root,
            'firstname',
            t('welcome.accDetailsPrenume'),
            props.handleChange,
            props.userForm.firstName,
            '',
            'string'
          )}
          {createTextField(
            classes.root,
            'email',
            t('welcome.accDetailsEmail'),
            props.handleChange,
            props.userForm.email,
            '',
            'string'
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default DetailsDumb;
