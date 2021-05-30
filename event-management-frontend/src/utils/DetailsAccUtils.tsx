import React, { KeyboardEvent } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { compareDates, compareTimes } from './CompareUtilsForOverview';
import { EventFormErrors } from '../model/EventFormErrors';
import { TFunction } from 'i18next';

export const createTextField = (
  style: string,
  name: string,
  labelText: string,
  defaultValueText: string | number,
  errorText: string,
  inputType: string
) => {
  return (
    <Grid item xl={4} lg={4} sm={8} xs={11}>
      <form className={style} autoComplete="off">
        <TextField
          name={name}
          type={inputType}
          fullWidth
          label={labelText}
          variant="outlined"
          defaultValue={defaultValueText}
          error={errorText.length > 0}
          helperText={errorText}
          required
        />
      </form>
    </Grid>
  );
};
