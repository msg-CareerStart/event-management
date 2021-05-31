import React from 'react';

import { useTranslation } from 'react-i18next';
import { Grid, Typography, FormControlLabel, Switch } from '@material-ui/core';
import { createTextField } from '../../../utils/DetailsAccUtils';
import { useStyles } from '../../../styles/CommonStyles';
import { myAccountStyles } from '../../../styles/MyAccountStyles';
import { useSelector } from 'react-redux';
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

function AppSettingsDumb(props: Props) {
  const classes = myAccountStyles();
  const { t } = useTranslation();

  const [notify, setNotify] = React.useState({
    checked: props.userForm.sendNotification,
  });

  const handleChangeNotify = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotify({ ...notify, [event.target.name]: event.target.checked });
    props.userForm.sendNotification = !props.userForm.sendNotification;
  };

  return (
    <div className={classes.fundal}>
      <Typography className={classes.typography}>
        {' '}
        {props.userForm.userName} {t('welcome.usernameAppSettings')}
      </Typography>
      <Grid item container className={classes.grid} direction="column" justify="center" alignItems="center">
        <Grid className={classes.gridpadding} item xl={1} lg={3} md={2} sm={4} xs={7}>
          <Switch color="primary" checked={notify.checked} onChange={handleChangeNotify} name="checked" />
          <Typography className={classes.typographyInfo}> {t('welcome.notificationSwitch')} </Typography>
        </Grid>

        {createTextField(
          classes.root,
          'rate',
          t('welcome.occupancyRate'),
          props.handleChange,
          props.userForm.occupancyRate,
          '',
          'number'
        )}
        <Typography className={classes.typographyInfo}>({t('welcome.occuppancyInfo')})</Typography>
      </Grid>
    </div>
  );
}

export default AppSettingsDumb;
