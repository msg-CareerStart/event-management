import React from 'react';

import { useTranslation } from 'react-i18next';
import { Grid, Typography, FormControlLabel, Switch } from '@material-ui/core';
import { createTextField } from '../../../utils/DetailsAccUtils';
import { useStyles } from '../../../styles/CommonStyles';
import { myAccountStyles } from '../../../styles/MyAccountStyles';

interface AppSettingsDumbProps {
  // formErros: {
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  // };
}

function AppSettingsDumb() {
  const classes = myAccountStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.fundal}>
      <Typography className={classes.typography}>"Username" {t('welcome.usernameAppSettings')}</Typography>
      <Grid item container className={classes.grid} direction="column" justify="center" alignItems="center">
        <Grid className={classes.gridpadding} item xl={1} lg={3} md={2} sm={4} xs={7}>
          <FormControlLabel
            control={<Switch color="primary" name="notificationSwitch" />}
            label={t('welcome.notificationSwitch')}
          />
        </Grid>

        {createTextField(classes.root, 'email', t('welcome.occupancyRate'), 'Test for now', 'error txt', 'string')}
        <Typography className={classes.typographyInfo}>({t('welcome.occuppancyInfo')})</Typography>
      </Grid>
    </div>
  );
}

export default AppSettingsDumb;
