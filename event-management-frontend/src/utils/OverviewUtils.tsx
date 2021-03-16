import React, { KeyboardEvent } from "react";
import { Grid, TextField } from "@material-ui/core";
import { compareDates, compareTimes } from "./CompareUtilsForOverview";
import { EventFormErrors } from "../model/EventFormErrors";
import { TFunction } from "i18next";

export const createTextField = (
  style: string,
  handleEnterKey: (e: KeyboardEvent<HTMLDivElement>) => void,
  isAdmin: boolean,
  name: string,
  labelText: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  defaultValueText: string | number,
  errorText: string,
  inputType: string,
  inputProps: { inputProps: { min: number } } | null) => {

  return (
    <Grid item xl={4} lg={4} sm={8} xs={11}>
      <form className={style} autoComplete="off">
        <TextField
          onKeyDown={handleEnterKey}
          disabled={!isAdmin}
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
}

export const createDateTextField = (
  style: string,
  isAdmin: boolean,
  name: string,
  labelText: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  defaultValueText: string,
  errorText: string) => {

  return (
    <Grid item xl={2} lg={4} md={5} sm={7} xs={12}>
      <form className={style} autoComplete="off">
        <TextField
          label={labelText}
          name={name}
          disabled={!isAdmin}
          type="date"
          onChange={handleChange}
          defaultValue={defaultValueText}
          error={errorText.length > 0}
          helperText={errorText}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    </Grid>
  );
}

export const createTimeTextField = (
  style: string,
  isAdmin: boolean,
  name: string,
  labelText: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  defaultValueText: string,
  errorText: string) => {

  return (
    <Grid item xl={2} lg={4} md={5} sm={7} xs={12}>
      <form className={style} autoComplete="off">
        <TextField
          label={labelText}
          name={name}
          disabled={!isAdmin}
          type="time"
          onChange={handleChange}
          defaultValue={defaultValueText}
          error={errorText.length > 0}
          helperText={errorText}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
      </form>
    </Grid>
  );
}

export const setStartDateError = (date1: string, date2: string, date3: string, t: TFunction): string => {
  let result = '';
  compareDates(date1, date2) === -1
    ? result = t('welcome.errMsgOverviewFirstDayInPast')
    : compareDates(date1, date3) === 1
      ? result = t('welcome.errMsgOverviewFirstDayAfterLast')
      : result = '';

  return result;
}

export const setStartTimeError = (date1: string, date2: string, time1: string, time2: string, t: TFunction): string => {
  let result = '';
  if (compareTimes(time1, time2) !== -1)
    result = t('welcome.errMsgOverviewOneDayEventStartTimeErr')
  return result;
}
// compareDates(date1, date2) === 0 && 

export const setEndTimeError = (date1: string, date2: string, time1: string, time2: string, t: TFunction): string => {
  let result = '';
  if (compareTimes(time1, time2) !== -1)
    result = t('welcome.errMsgOverviewOneDayEventEndTimeErr')
  return result;
}
// compareDates(date1, date2) === 0 && 

export const resetErrors = (newFormErrors: EventFormErrors): EventFormErrors => {
  newFormErrors.startDate = '';
  newFormErrors.endDate = '';
  newFormErrors.startTime = '';
  newFormErrors.endTime = '';

  return newFormErrors;
}

