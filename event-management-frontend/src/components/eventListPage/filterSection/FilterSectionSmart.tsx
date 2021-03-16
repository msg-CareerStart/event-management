import React, { FormEvent, KeyboardEvent } from 'react';
import FilterSectionDumb from './FilterSectionDumb';
import { Container } from '@material-ui/core';
import {
  updateFilters,
  filterEvents,
  resetPage,
  resetFilters,
  fetchAllEvents,
  setErrorRate,
  setErrorMaxPeople,
  setErrorStartDate,
  setErrorEndDate,
  setErrorStartHour,
  setErrorEndHour,
} from '../../../actions/EventsPageActions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { MathRelation } from '../../../model/MathRelation';
import { EventFilters } from '../../../model/EventFilters';
import { useTranslation } from 'react-i18next';
import { equalDate, startTimeGreaterThenEndTime, startDateBeforeEndDate } from '../../../utils/compareDateTimes';
import { AppState } from '../../../store/store';

interface FilterSectionProps {
  page: number;
  expanded: boolean;
  filters: EventFilters;
  errorRate: string;
  errorMaxPeople: string;
  errorStartDate: string;
  errorEndDate: string;
  errorStartHour: string;
  errorEndHour: string;
  resetPage: () => void;
  resetFilters: () => void;
  setExpanded: (exp: boolean) => void;
  updateFilters: (filters: EventFilters) => void;
  filterEvents: (filters: EventFilters, page: number) => void;
  fetchAllEvents: () => void;
  setErrorRate: (error: string) => void;
  setErrorMaxPeople: (error: string) => void;
  setErrorStartDate: (error: string) => void;
  setErrorEndDate: (error: string) => void;
  setErrorStartHour: (error: string) => void;
  setErrorEndHour: (error: string) => void;
}

function FilterSectionSmart({
  page,
  filters,
  expanded,
  errorRate,
  errorMaxPeople,
  errorStartDate,
  errorEndDate,
  errorStartHour,
  errorEndHour,
  setExpanded,
  updateFilters,
  filterEvents,
  resetPage,
  resetFilters,
  fetchAllEvents,
  setErrorRate,
  setErrorMaxPeople,
  setErrorStartDate,
  setErrorEndDate,
  setErrorStartHour,
  setErrorEndHour,
}: FilterSectionProps) {
  const [t] = useTranslation();

  const handleChangeTitle = (title: string) => {
    const newFilters = Object.assign({}, filters);
    newFilters.title = title;
    updateFilters(newFilters);
  };

  const handleChangeSubtitle = (subtitle: string) => {
    const newFilters = Object.assign({}, filters);
    newFilters.subtitle = subtitle;
    updateFilters(newFilters);
  };

  const handleChangeLocation = (location: string) => {
    const newFilters = Object.assign({}, filters);
    newFilters.location = location;
    updateFilters(newFilters);
  };

  const handleChangeStatus = (status: string) => {
    const newFilters = Object.assign({}, filters);
    newFilters.status = status;
    updateFilters(newFilters);
  };

  const handleChangeHighlighted = (highlighted: boolean) => {
    const newFilters = Object.assign({}, filters);
    newFilters.highlighted = highlighted;
    updateFilters(newFilters);
  };

  const handleChangeStartHour = (startHour: string) => {
    const newFilters = Object.assign({}, filters);
    newFilters.startHour = startHour;

    if (filters.endDate !== undefined && filters.startDate !== undefined) {
      if (equalDate(filters.startDate, filters.endDate)) {
        if (newFilters.startHour !== undefined && filters.endHour !== undefined) {
          if (startTimeGreaterThenEndTime(newFilters.startHour, filters.endHour)) {
            setErrorStartHour(t('eventList.invalidHour'));
            return;
          }
        }
      }
    }

    setErrorEndHour('');
    setErrorStartHour('');
    updateFilters(newFilters);
  };

  const handleChangeEndHour = (endHour: string) => {
    const newFilters = Object.assign({}, filters);
    newFilters.endHour = endHour;

    if (filters.endDate !== undefined && filters.startDate !== undefined) {
      if (equalDate(filters.startDate, filters.endDate)) {
        if (filters.startHour !== undefined && newFilters.endHour !== undefined) {
          if (startTimeGreaterThenEndTime(filters.startHour, newFilters.endHour)) {
            setErrorEndHour(t('eventList.invalidHour'));
            return;
          }
        }
      }
    }

    setErrorStartHour('');
    setErrorEndHour('');
    updateFilters(newFilters);
  };

  const handleChangeStartDate = (startDate: string) => {
    const newFilters = Object.assign({}, filters);
    newFilters.startDate = new Date(startDate);

    if (filters.endDate !== undefined) {
      if (equalDate(newFilters.startDate, filters.endDate)) {
        if (filters.startHour !== undefined && filters.endHour !== undefined) {
          if (startTimeGreaterThenEndTime(filters.startHour, filters.endHour)) {
            setErrorEndHour(t('eventList.invalidHour'));
            setErrorStartHour(t('eventList.invalidHour'));
            return;
          }
        }
      } else if (startDateBeforeEndDate(newFilters.startDate, filters.endDate)) {
        setErrorStartDate(t('eventList.invalidDate'));
        return;
      }
    }

    setErrorStartDate('');
    setErrorEndHour('');
    setErrorStartHour('');
    setErrorEndDate('');
    updateFilters(newFilters);
  };

  const handleChangeEndDate = (endDate: string) => {
    const newFilters = Object.assign({}, filters);
    newFilters.endDate = new Date(endDate);

    if (filters.startDate !== undefined) {
      if (equalDate(filters.startDate, newFilters.endDate)) {
        if (filters.startHour !== undefined && filters.endHour !== undefined) {
          if (startTimeGreaterThenEndTime(filters.startHour, filters.endHour)) {
            setErrorEndHour(t('eventList.invalidHour'));
            setErrorStartHour(t('eventList.invalidHour'));
            return;
          }
        }
      } else if (startDateBeforeEndDate(filters.startDate, newFilters.endDate)) {
        setErrorEndDate(t('eventList.invalidDate'));
        return;
      }
    }

    setErrorStartDate('');
    setErrorEndHour('');
    setErrorStartHour('');
    setErrorEndDate('');
    updateFilters(newFilters);
  };

  const handleChangeMaxPeople = (maxPeople: string) => {
    const newFilters = Object.assign({}, filters);

    if (maxPeople === '') {
      setErrorMaxPeople('');
      newFilters.maxPeople = maxPeople;
      updateFilters(newFilters);
    } else {
      const maxPeopleNumber = parseInt(maxPeople);

      if (maxPeopleNumber.toString() !== maxPeople && maxPeople !== '') {
        setErrorMaxPeople(t('eventList.notANumber'));
      } else {
        setErrorMaxPeople('');
        newFilters.maxPeople = maxPeopleNumber;
        updateFilters(newFilters);
      }
    }
  };

  const handleChangeMaxPeopleSign = (maxPeopleSign: MathRelation) => {
    const newFilters = Object.assign({}, filters);
    newFilters.maxPeopleSign = maxPeopleSign;
    updateFilters(newFilters);
  };

  const handleChangeRate = (rate: string) => {
    const newFilters = Object.assign({}, filters);

    if (rate === '') {
      setErrorRate('');
      newFilters.rate = rate;
      updateFilters(newFilters);
    } else {
      const rateNumber = parseInt(rate);

      if (rateNumber.toString() !== rate && rate !== '') {
        setErrorRate(t('eventList.notANumber'));
      } else if (rateNumber > 100) {
        setErrorRate(t('eventList.notAValidPercent'));
      } else {
        setErrorRate('');
        newFilters.rate = rateNumber;
        updateFilters(newFilters);
      }
    }
  };

  const handleChangeRateSign = (rateSign: MathRelation) => {
    const newFilters = Object.assign({}, filters);
    newFilters.rateSign = rateSign;
    updateFilters(newFilters);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetPage();
    filterEvents(filters, page);
    setExpanded(false);
  };

  const toggle = () => {
    setExpanded(!expanded);
  };

  const restrictNumberInput = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === '-' || e.key === 'e' || e.key === '+' || e.key === '.' || e.key === ',') {
      e.preventDefault();
    }
  };

  const resetAllFilters = () => {
    resetFilters();
    fetchAllEvents();
  };

  return (
    <Container>
      <FilterSectionDumb
        t={t}
        handleChangeStartDate={handleChangeStartDate}
        handleChangeEndDate={handleChangeEndDate}
        toggle={toggle}
        isExpanded={expanded}
        filters={filters}
        errorStartHour={errorStartHour}
        errorEndHour={errorEndHour}
        errorRate={errorRate}
        errorMaxPeople={errorMaxPeople}
        errorEndDate={errorEndDate}
        errorStartDate={errorStartDate}
        resetFilters={resetAllFilters}
        restrictNumberInput={restrictNumberInput}
        submitForm={submitForm}
        handleChangeTitle={handleChangeTitle}
        handleChangeSubtitle={handleChangeSubtitle}
        handleChangeLocation={handleChangeLocation}
        handleChangeStatus={handleChangeStatus}
        handleChangeHighlighted={handleChangeHighlighted}
        handleChangeStartHour={handleChangeStartHour}
        handleChangeEndHour={handleChangeEndHour}
        handleChangeMaxPeople={handleChangeMaxPeople}
        handleChangeMaxPeopleSign={handleChangeMaxPeopleSign}
        handleChangeRate={handleChangeRate}
        handleChangeRateSign={handleChangeRateSign}
      />
    </Container>
  );
}

const mapStateToProps = ({ events }: AppState) => ({
  filters: events.filters,
  page: events.page,
  errorRate: events.errors.errorRate,
  errorMaxPeople: events.errors.errorMaxPeople,
  errorStartDate: events.errors.errorStartDate,
  errorEndDate: events.errors.errorEndDate,
  errorStartHour: events.errors.errorStartHour,
  errorEndHour: events.errors.errorEndHour,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateFilters: (filters: EventFilters) => dispatch(updateFilters(filters)),
    filterEvents: (filters: EventFilters, page: number) => dispatch(filterEvents(filters, page)),
    resetPage: () => dispatch(resetPage()),
    resetFilters: () => dispatch(resetFilters()),
    fetchAllEvents: () => dispatch(fetchAllEvents()),
    setErrorRate: (error: string) => dispatch(setErrorRate(error)),
    setErrorMaxPeople: (error: string) => dispatch(setErrorMaxPeople(error)),
    setErrorStartDate: (error: string) => dispatch(setErrorStartDate(error)),
    setErrorEndDate: (error: string) => dispatch(setErrorEndDate(error)),
    setErrorStartHour: (error: string) => dispatch(setErrorStartHour(error)),
    setErrorEndHour: (error: string) => dispatch(setErrorEndHour(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterSectionSmart);
