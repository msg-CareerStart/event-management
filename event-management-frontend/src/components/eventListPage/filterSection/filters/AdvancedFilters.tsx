import React, { KeyboardEvent } from 'react';
import { Grid, TextField, MenuItem, InputAdornment, FormControlLabel } from '@material-ui/core';
import { TFunction } from 'i18next';
import { YellowCheckbox } from '../../../../styles/YellowCheckbox';
import { MathRelation } from '../../../../model/MathRelation';
import { useFilterStyles } from '../../../../styles/FilterStyles';
import moment from 'moment';

interface AdvancedFiltersProps {
  t: TFunction;
  status: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  startHour: string | undefined;
  endHour: string | undefined;
  rate: number | string;
  rateSign: MathRelation;
  maxPeople: number | string;
  maxPeopleSign: MathRelation;
  highlighted: boolean | undefined;
  errorRate: string;
  errorMaxPeople: string;
  errorEndDate: string;
  errorStartDate: string;
  errorStartHour: string;
  errorEndHour: string;
  restrictNumberInput: (event: KeyboardEvent<HTMLDivElement>) => void;
  handleChangeStatus: (status: string) => void;
  handleChangeHighlighted: (highlighted: boolean) => void;
  handleChangeStartHour: (startHour: string) => void;
  handleChangeEndHour: (endHour: string) => void;
  handleChangeMaxPeople: (maxPeople: string) => void;
  handleChangeMaxPeopleSign: (maxPeopleSign: MathRelation) => void;
  handleChangeRate: (rate: string) => void;
  handleChangeRateSign: (rateSign: MathRelation) => void;
  handleChangeStartDate: (startDate: string) => void;
  handleChangeEndDate: (startDate: string) => void;
}

function AdvancedFilters({
  t,
  status,
  startDate,
  endDate,
  startHour,
  endHour,
  rate,
  rateSign,
  maxPeople,
  maxPeopleSign,
  highlighted,
  errorRate,
  errorMaxPeople,
  errorEndDate,
  errorStartDate,
  errorStartHour,
  errorEndHour,
  restrictNumberInput,
  handleChangeStatus,
  handleChangeHighlighted,
  handleChangeStartHour,
  handleChangeEndHour,
  handleChangeMaxPeople,
  handleChangeMaxPeopleSign,
  handleChangeRate,
  handleChangeRateSign,
  handleChangeStartDate,
  handleChangeEndDate,
}: AdvancedFiltersProps) {
  const classes = useFilterStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={4}>
        <TextField
          variant="outlined"
          type="date"
          error={errorStartDate !== ''}
          label={t('eventList.startDate')}
          helperText={errorStartDate}
          value={startDate === undefined ? new Date() : moment(startDate).format('YYYY-MM-DD')}
          onChange={(e) => handleChangeStartDate(e.target.value)}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={12} md={4}>
        <TextField
          variant="outlined"
          type="date"
          value={endDate === undefined ? new Date() : moment(endDate).format('YYYY-MM-DD')}
          onChange={(e) => handleChangeEndDate(e.target.value)}
          error={errorEndDate !== ''}
          label={t('eventList.endDate')}
          helperText={errorEndDate}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={12} md={2}>
        <TextField
          error={errorStartHour !== ''}
          label={t('eventList.startHour')}
          helperText={errorStartHour}
          variant="outlined"
          type="time"
          value={startHour ? startHour : '00:00'}
          onChange={(e) => handleChangeStartHour(e.target.value)}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={12} md={2}>
        <TextField
          error={errorEndHour !== ''}
          label={t('eventList.endHour')}
          helperText={errorEndHour}
          variant="outlined"
          type="time"
          value={endHour ? endHour : '23:59'}
          onChange={(e) => handleChangeEndHour(e.target.value)}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={12} md={4} className={classes.relationArea}>
        <TextField
          select
          variant="outlined"
          className={classes.relationSelect}
          value={maxPeopleSign}
          onChange={(e) => handleChangeMaxPeopleSign(e.target.value as MathRelation)}
        >
          <MenuItem value={MathRelation.GREATER}>&gt;</MenuItem>
          <MenuItem value={MathRelation.LOWER}>&lt;</MenuItem>
          <MenuItem value={MathRelation.EQUAL}>=</MenuItem>
        </TextField>

        <TextField
          value={maxPeople}
          variant="outlined"
          error={errorMaxPeople !== ''}
          label={`${t('eventList.maxPeople')} ${errorMaxPeople ? ' - ' + errorMaxPeople : ''}`}
          type="number"
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
          onKeyPress={(e) => restrictNumberInput(e)}
          onChange={(e) => handleChangeMaxPeople(e.target.value)}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={12} md={4} className={classes.relationArea}>
        <TextField
          select
          variant="outlined"
          className={classes.relationSelect}
          value={rateSign}
          onChange={(e) => handleChangeRateSign(e.target.value as MathRelation)}
        >
          <MenuItem value={MathRelation.GREATER}>&gt;</MenuItem>
          <MenuItem value={MathRelation.LOWER}>&lt;</MenuItem>
          <MenuItem value={MathRelation.EQUAL}>=</MenuItem>
        </TextField>

        <TextField
          value={rate}
          label={`${t('eventList.occupancyRate')} ${errorRate ? ' - ' + errorRate : ''}`}
          variant="outlined"
          type="number"
          error={errorRate !== ''}
          InputProps={{
            inputProps: {
              max: 100,
              min: 0,
            },
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
          onKeyPress={(e) => restrictNumberInput(e)}
          onChange={(e) => handleChangeRate(e.target.value)}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sm={12} md={2}>
        <TextField
          select
          variant="outlined"
          label={t('eventList.status')}
          value={status}
          onChange={(e) => handleChangeStatus(e.target.value as string)}
          fullWidth
        >
          <MenuItem value={'true'}>{t('eventList.active')}</MenuItem>
          <MenuItem value={'false'}>{t('eventList.inactive')}</MenuItem>
          <MenuItem value={'none'}>{t('eventList.notSet')}</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12} sm={12} md={2} className={classes.highlightedCheckbox}>
        <FormControlLabel
          control={
            <YellowCheckbox
              checked={highlighted ? highlighted : false}
              onChange={(e) => handleChangeHighlighted(e.target.checked)}
            />
          }
          label={t('eventList.highlighted')}
          labelPlacement="end"
        />
      </Grid>
    </Grid>
  );
}

export default AdvancedFilters;
