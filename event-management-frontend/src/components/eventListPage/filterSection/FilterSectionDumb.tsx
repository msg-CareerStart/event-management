import React, { FormEvent, KeyboardEvent } from 'react';
import { Grid, Button, Collapse } from '@material-ui/core';
import 'react-datepicker/dist/react-datepicker.css';
import { MathRelation } from '../../../model/MathRelation';
import { useStyles } from '../../../styles/CommonStyles';
import { EventFilters } from '../../../model/EventFilters';
import { TFunction } from 'i18next';
import { useFilterStyles } from '../../../styles/FilterStyles';
import StandardFilters from './filters/StandardFilters';
import AdvancedFilters from './filters/AdvancedFilters';

interface FilterSectionProps {
  t: TFunction;
  isExpanded: boolean;
  filters: EventFilters;
  errorRate: string;
  errorMaxPeople: string;
  errorEndDate: string;
  errorStartDate: string;
  errorStartHour: string;
  errorEndHour: string;
  resetFilters: () => void;
  toggle: () => void;
  submitForm: (event: FormEvent<HTMLFormElement>) => void;
  restrictNumberInput: (event: KeyboardEvent<HTMLDivElement>) => void;
  handleChangeTitle: (title: string) => void;
  handleChangeSubtitle: (subtitle: string) => void;
  handleChangeLocation: (location: string) => void;
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

function FilterSectionDumb({
  t,
  isExpanded,
  filters,
  errorRate,
  errorMaxPeople,
  errorEndDate,
  errorStartDate,
  errorStartHour,
  errorEndHour,
  resetFilters,
  toggle,
  submitForm,
  restrictNumberInput,
  handleChangeTitle,
  handleChangeSubtitle,
  handleChangeLocation,
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
}: FilterSectionProps) {
  const classes = useFilterStyles();
  const commonClasses = useStyles();

  return (
    <form onSubmit={(event) => submitForm(event)} className={classes.filterArea}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={9} md={10}>
          <StandardFilters
            t={t}
            title={filters.title}
            subtitle={filters.subtitle}
            location={filters.location}
            handleChangeTitle={handleChangeTitle}
            handleChangeSubtitle={handleChangeSubtitle}
            handleChangeLocation={handleChangeLocation}
          />

          <Collapse in={isExpanded} timeout={500} className={classes.collapseArea}>
            <AdvancedFilters
              t={t}
              status={filters.status}
              startDate={filters.startDate}
              endDate={filters.endDate}
              startHour={filters.startHour}
              endHour={filters.endHour}
              rate={filters.rate}
              rateSign={filters.rateSign}
              maxPeople={filters.maxPeople}
              maxPeopleSign={filters.maxPeopleSign}
              highlighted={filters.highlighted}
              errorRate={errorRate}
              errorMaxPeople={errorMaxPeople}
              errorEndDate={errorEndDate}
              errorStartDate={errorStartDate}
              errorStartHour={errorStartHour}
              errorEndHour={errorEndHour}
              restrictNumberInput={restrictNumberInput}
              handleChangeStatus={handleChangeStatus}
              handleChangeHighlighted={handleChangeHighlighted}
              handleChangeStartHour={handleChangeStartHour}
              handleChangeEndHour={handleChangeEndHour}
              handleChangeMaxPeople={handleChangeMaxPeople}
              handleChangeMaxPeopleSign={handleChangeMaxPeopleSign}
              handleChangeRate={handleChangeRate}
              handleChangeRateSign={handleChangeRateSign}
              handleChangeStartDate={handleChangeStartDate}
              handleChangeEndDate={handleChangeEndDate}
            />
          </Collapse>
        </Grid>

        <Grid item xs={12} sm={3} md={2} className={classes.filterButtonsArea}>
          <Button
            type="submit"
            disabled={
              errorRate !== '' ||
              errorMaxPeople !== '' ||
              errorStartDate !== '' ||
              errorEndDate !== '' ||
              errorStartHour !== '' ||
              errorEndHour !== ''
            }
            className={`${commonClasses.mainButtonStyle} ${commonClasses.pinkGradientButtonStyle} ${classes.filterButtons}`}
          >
            {t('eventList.filterButton')}
          </Button>

          <Button
            className={`${commonClasses.mainButtonStyle} ${commonClasses.pinkGradientButtonStyle}  ${classes.filterButtons}`}
            onClick={resetFilters}
          >
            {t('eventList.clearButton')}
          </Button>

          <div onClick={toggle} className={classes.filterExpandText}>
            {isExpanded ? t('eventList.seeLessFilters') : t('eventList.seeMoreFilters')}
          </div>
        </Grid>
      </Grid>
    </form>
  );
}

export default FilterSectionDumb;
