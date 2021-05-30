import React, { KeyboardEvent } from 'react';

import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@material-ui/core';
import { createTextField } from '../../../utils/DetailsAccUtils';
import { useStyles } from '../../../styles/CommonStyles';
import { myAccountStyles } from '../../../styles/MyAccountStyles';

interface DetailsDumbProps {
  // formErros: {
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  // };
}

function DetailsDumb(props: DetailsDumbProps) {
  const classes = myAccountStyles();
  const classes2 = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.fundal}>
      <Typography className={classes.typography}>"Username" {t('welcome.usernameDetails')}</Typography>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item container direction="column" justify="center" alignItems="center">
          {createTextField(classes.root, 'name', t('welcome.accDetailsName'), 'Test for nw', 'error txt', 'string')}
          {createTextField(
            classes.root,
            'surname',
            t('welcome.accDetailsPrenume'),
            'Test for nw',
            'error txt',
            'string'
          )}
          {createTextField(classes.root, 'email', t('welcome.accDetailsEmail'), 'Test for nw', 'error txt', 'string')}
        </Grid>
      </Grid>
    </div>
  );
}

export default DetailsDumb;
