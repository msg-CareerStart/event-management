import React, { KeyboardEvent } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { compareDates, compareTimes } from './CompareUtilsForOverview';
import { EventFormErrors } from '../model/EventFormErrors';
import { TFunction } from 'i18next';

export const createTextField = (
  style: string,
  handleEnterKey: (e: KeyboardEvent<HTMLDivElement>) => void,
  name: string,
  labelText: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  defaultValueText: string | number,
  errorText: string,
  inputType: string,
  inputProps: { inputProps: { min: number } } | null
) => {
  return (
    <Grid item xl={4} lg={4} sm={8} xs={11}>
      <form className={style} autoComplete="off">
        <TextField
          onKeyDown={handleEnterKey}
          name={name}
          type={inputType}
          fullWidth
          label={labelText}
          variant="outlined"
          onChange={handleChange}
          defaultValue={defaultValueText}
          error={errorText.length > 0}
          helperText={errorText}
          required
          InputProps={inputProps as { inputProps: { min: number } }}
        />
      </form>
    </Grid>
  );
};
