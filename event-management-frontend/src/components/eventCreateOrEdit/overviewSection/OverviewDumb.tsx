import React, { KeyboardEvent } from 'react';
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
} from '@material-ui/core';
import { EventCrud } from '../../../model/EventCrud';
import { useTranslation } from 'react-i18next';
import { YellowCheckbox } from '../../../styles/YellowCheckbox';
import { useStylesOverviewDumb } from '../../../styles/OverviewStyles';
import { createTextField, createDateTextField, createTimeTextField } from '../../../utils/OverviewUtils';

interface OverviewDumbProps {
  newEvent: boolean;
  event: EventCrud;
  isAdmin: boolean;
  handleEnterKey: (e: KeyboardEvent<HTMLDivElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formErrors: {
    title: string;
    subtitle: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    maxPeople: string;
  };
  handleChangeCheckboxState: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setStatus: (status: string) => void;
}

function OverviewDumb(props: OverviewDumbProps) {
  const overviewClasses = useStylesOverviewDumb();
  const { t } = useTranslation();

  return (
    <div className={overviewClasses.fundal}>
      <Typography className={overviewClasses.typography}></Typography>

      <Grid container direction='column' justify='center' alignItems='center'>
        <Grid item container direction='row' justify='center' alignItems='center'>
          {createTextField(overviewClasses.root, props.handleEnterKey, props.isAdmin, 'title',
            t('welcome.overviewTitle'), props.handleChange, props.event.title, props.formErrors.title, 'string', null)}

          {createTextField(overviewClasses.root, props.handleEnterKey, props.isAdmin, 'subtitle',
            t('welcome.overviewSubtitle'), props.handleChange, props.event.subtitle, props.formErrors.subtitle, 'string', null)}

          {createTextField(overviewClasses.root, props.handleEnterKey, props.isAdmin, 'maxPeople',
            t('welcome.overviewMaxPpl'), props.handleChange, props.event.maxPeople, props.formErrors.maxPeople, 'number', { inputProps: { min: 0 } })}

        </Grid>

        <Grid item container className={overviewClasses.grid} direction='row' justify='center' alignItems='center'>
          <Grid item xl={7} lg={7} sm={8} xs={7}>
            <form className={overviewClasses.root}>
              <TextField
                className={overviewClasses.margin}
                onKeyDown={props.handleEnterKey}
                name='description'
                disabled={!props.isAdmin}
                label={t('welcome.overviewDescription')}
                variant='outlined'
                multiline
                rows='5'
                rowsMax={7}
                onChange={props.handleChange}
                defaultValue={props.event.description}
                error={props.formErrors.description.length > 0}
                helperText={props.formErrors.description}
                required
                fullWidth
              />
            </form>
          </Grid>
        </Grid>

        <Grid item container spacing={2} className={overviewClasses.grid} direction='row' justify='center' alignItems='center'>
          <Grid item container spacing={2} className={overviewClasses.grid} direction='row' justify='center' alignItems='center'>
            {createDateTextField(overviewClasses.root, props.isAdmin, 'startDate',
              t('welcome.overviewStartDate'), props.handleChange, props.event.startDate, props.formErrors.startDate)}

            {createTimeTextField(overviewClasses.root, props.isAdmin, 'startTime',
              t('welcome.overviewStartTime'), props.handleChange, props.event.startHour, props.formErrors.startTime)}

          </Grid>

          <Grid item container spacing={2} className={overviewClasses.grid} direction='row' justify='center' alignItems='center' >
            {createDateTextField(overviewClasses.root, props.isAdmin, 'endDate',
              t('welcome.overviewEndDate'), props.handleChange, props.event.endDate, props.formErrors.endDate)}

            {createTimeTextField(overviewClasses.root, props.isAdmin, 'endTime',
              t('welcome.overviewEndTime'), props.handleChange, props.event.endHour, props.formErrors.endTime)}

          </Grid>
        </Grid>
      </Grid>

      <Grid item container className={overviewClasses.grid} direction='row' justify='center' alignItems='center'>
        <Grid item xl={1} lg={2} md={2} sm={4} xs={7}>
          <FormControlLabel
            disabled={!props.isAdmin}
            control={
              <YellowCheckbox
                checked={props.event.highlighted}
                onChange={props.handleChangeCheckboxState}
                name='highlighted'
              />
            }
            label={t('welcome.overviewHighlighted')}
          />
        </Grid>

        <Grid item xl={1} lg={2} md={2} sm={4} xs={7}>
          <FormControl className={overviewClasses.formControl}>
            <InputLabel>Status</InputLabel>
            <Select
              disabled={!props.isAdmin}
              value={props.event.status ? 'true' : 'false'}
              onChange={(e) => props.setStatus(e.target.value as string)}
            >
              <MenuItem value={'true'}>{t('welcome.overviewStatusActive')}</MenuItem>
              <MenuItem value={'false'}>{t('welcome.overviewStatusInactive')}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}

export default OverviewDumb;
