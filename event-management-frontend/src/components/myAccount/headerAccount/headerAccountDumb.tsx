import React from 'react';

import { Button, Grid, Typography, useMediaQuery, AppBar, IconButton, Tooltip } from '@material-ui/core';
import { useStyles } from '../../../styles/CommonStyles';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import { headerCrudDumbStyles } from '../../../styles/HeaderCrudStyles';
import { useTranslation } from 'react-i18next';
interface Props {
  isAdmin: boolean;
}

function HeaderAccDumb({}: Props) {
  const buttonStyle = useStyles();
  const gridStyle = headerCrudDumbStyles();
  const { t } = useTranslation();

  const clearButton = (
    <Button variant="contained" className={`${buttonStyle.mainButtonStyle} ${buttonStyle.pinkGradientButtonStyle} `}>
      {t('welcome.headerCRUDClear')}
    </Button>
  );

  const clearIcon = (
    <IconButton>
      <ClearIcon color="secondary"></ClearIcon>
    </IconButton>
  );

  // const clearIconButton =
  //     isAdmin ===true ? (
  //         title === t()

  //     ): null

  const saveButton = (
    <Button variant="contained" className={`${buttonStyle.mainButtonStyle} ${buttonStyle.pinkGradientButtonStyle}`}>
      {t('welcome.headerCRUDSave')}
    </Button>
  );

  const saveIconButton = (
    <Tooltip title="Save">
      <IconButton>
        <SaveIcon color="secondary" />
      </IconButton>
    </Tooltip>
  );

  const bigWindow = (
    <Grid container spacing={2} className={gridStyle.grid} direction="row" justify="space-between" alignItems="center">
      <Grid item sm={4} xs={5}>
        <Typography align="left" className={`${gridStyle.typography} ${gridStyle.position}`}>
          MyPage
        </Typography>
      </Grid>

      <Grid item sm={5} xs={5}>
        <Grid
          container
          spacing={2}
          className={gridStyle.secondGrid}
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Grid item xs={6} md={4} lg={3}>
            {clearButton}
          </Grid>

          <Grid item xs={6} md={4} lg={3}>
            {saveButton}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const smallWindow = (
    <Grid container className={gridStyle.grid} direction="row" justify="space-between" alignItems="center">
      <Grid item sm={7} xs={8}>
        <Typography align="left" className={`${gridStyle.typography} ${gridStyle.position}`}>
          "MyAccount"
        </Typography>
      </Grid>

      <Grid
        item
        container
        sm={5}
        xs={4}
        className={gridStyle.secondGrid}
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        {clearIcon}
        {saveIconButton}
      </Grid>
    </Grid>
  );

  const matches = useMediaQuery('(max-width:630px)');
  return <AppBar position="sticky">{matches ? smallWindow : bigWindow}</AppBar>;
}

export default HeaderAccDumb;
