import React, { KeyboardEvent, FormEvent, ChangeEvent } from 'react';
import { UserEventFilters } from '../../../model/userEventsPage/UserEventFilters';
import { MenuItem, TextField, Grid, InputAdornment, FormControlLabel, Button, Chip, Paper } from '@material-ui/core';
import { UserMathRelation } from '../../../model/userEventsPage/UserMathRelation';
import { YellowCheckbox } from '../../../styles/YellowCheckbox';
import { UserEventType } from '../../../model/userEventsPage/UserEventType';
import { useStyles } from '../../../styles/CommonStyles';
import { Autocomplete } from '@material-ui/lab';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useUserFilterStyles } from '../../../styles/userEventsPage/UserFilterStyle';
import { TFunction } from 'i18next';

interface UserEventFilterProps {
  filters: UserEventFilters;
  locations: string[];
  errorRate: string;
  isLocationsLoading: boolean;
  isLocationsError: boolean;
  translation: TFunction;
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeLocation: (event: object, value: string | string[], reason: string) => void;
  submitForm: (event: FormEvent<HTMLFormElement>) => void;
  resetUserFilters: () => void;
  restrictNumberInput: (event: KeyboardEvent<HTMLDivElement>) => void;
}

function UserEventsListFilterDumb({
  filters,
  locations,
  errorRate,
  isLocationsLoading,
  isLocationsError,
  translation,
  onChangeInput,
  onChangeLocation,
  submitForm,
  resetUserFilters,
  restrictNumberInput,
}: UserEventFilterProps) {
  const commonClasses = useStyles();
  const classes = useUserFilterStyles();

  return (
    <Paper className={classes.root}>
      <form onSubmit={(event) => submitForm(event)}>
        <Grid container spacing={3} className={classes.filterArea}>
          <Grid item xs={12} sm={9} md={10} xl={10} container spacing={3}>
            <Grid item xs={12} sm={12} md={4} xl={4}>
              <TextField
                name="title"
                label={translation('userEventList.name')}
                variant="outlined"
                value={filters.title}
                onChange={onChangeInput}
                fullWidth
                className={classes.textOverflow}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={8} xl={8}>
              <Autocomplete
                className={classes.textOverflow}
                multiple
                limitTags={3}
                fullWidth
                disabled={isLocationsError || isLocationsLoading}
                options={locations}
                disableCloseOnSelect
                filterSelectedOptions
                value={filters.locations}
                onChange={onChangeLocation}
                noOptionsText={translation('userEventList.noOption')}
                renderTags={(value: string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                  ))
                }
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <YellowCheckbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      checked={selected}
                    />
                    {option}
                  </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label={
                      isLocationsError
                        ? translation('userEventList.noLocations')
                        : translation('userEventList.locations')
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} xl={4} className={classes.relationArea}>
              <TextField
                name="rateSign"
                className={classes.relationSelect}
                select
                variant="outlined"
                value={filters.rateSign}
                onChange={onChangeInput}
              >
                <MenuItem value={UserMathRelation.GREATER}>&gt;</MenuItem>
                <MenuItem value={UserMathRelation.GREATEROREQUAL}>&ge;</MenuItem>
                <MenuItem value={UserMathRelation.LOWER}>&lt;</MenuItem>
                <MenuItem value={UserMathRelation.LOWEROREQUAL}>&le;</MenuItem>
                <MenuItem value={UserMathRelation.EQUAL}>=</MenuItem>
              </TextField>

              <TextField
                name="rate"
                className={classes.textOverflow}
                label={`${translation('userEventList.rate')} ${errorRate ? ' - ' + errorRate : ''}`}
                value={isNaN(filters.rate) ? '' : filters.rate}
                variant="outlined"
                type="number"
                error={errorRate !== ''}
                onChange={onChangeInput}
                onKeyPress={(e) => restrictNumberInput(e)}
                fullWidth
                InputProps={{
                  inputProps: {
                    max: 100,
                    min: 0,
                  },
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} xl={4}>
              <FormControlLabel
                className={classes.checkboxOverflow}
                label={translation('userEventList.pastEvents')}
                labelPlacement="end"
                control={
                  <YellowCheckbox name="type" checked={filters.type === UserEventType.PAST} onChange={onChangeInput} />
                }
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={3} md={2} xl={2} container spacing={3}>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Button
                className={`${commonClasses.mainButtonStyle} ${commonClasses.pinkGradientButtonStyle} ${classes.filterButtons}`}
                disabled={errorRate !== ''}
                type="submit"
              >
                {translation('userEventList.filterButton')}
              </Button>
            </Grid>

            <Grid item xs={12} sm={12} md={12} xl={12}>
              <Button
                className={`${commonClasses.mainButtonStyle} ${commonClasses.pinkGradientButtonStyle} ${classes.filterButtons}`}
                onClick={resetUserFilters}
              >
                {translation('userEventList.clearButton')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default UserEventsListFilterDumb;
