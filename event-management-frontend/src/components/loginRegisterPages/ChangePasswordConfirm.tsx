import React from 'react';
import { useStyles } from '../../styles/CommonStyles';
import useStylesChangePassword from '../../styles/ChangePasswordStyle';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

const ChangePasswordConfirm = () => {
  const classes = useStyles();
  const classesChangePassword = useStylesChangePassword();

  return (
    <div className={classesChangePassword.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1 className={classes.typography}>
            <Trans i18nKey="changePassword.title">Change Password</Trans>
          </h1>
        </Grid>

        <Grid item xs={12}>
          <p className={classesChangePassword.onNewLine}>
            <Trans i18nKey="changePassword.message">Your password has been successfully updated!</Trans>
          </p>
        </Grid>

        <Grid item xs={12}>
          <Link to={'/login'} className={classesChangePassword.link}>
            <Button className={`${classes.mainButtonStyle} ${classes.pinkGradientButtonStyle} ${classesChangePassword.loginButton}`}>
              <Trans i18nKey="changePassword.button">Login</Trans>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};
export default ChangePasswordConfirm;
