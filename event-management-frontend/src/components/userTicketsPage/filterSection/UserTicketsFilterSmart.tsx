import React, { FormEvent, useState } from 'react';
import UserTicketsFilterDumb from './UserTicketsFilterDumb';
import { TicketFilters } from '../../../model/TicketFilters';
import { AppState } from '../../../store/store';
import { fetchTickets, resetFilters, updateFilters, resetPage, resetState } from '../../../actions/TicketsPageActions';
import { connect } from 'react-redux';
import { equalDate, startDateBeforeEndDate } from '../../../utils/compareDateTimes';
import { useTranslation } from 'react-i18next';


interface Props {
  expanded: boolean;
  setExpanded: (exp: boolean) => void;
  filters: TicketFilters;
  page: number;
  resetFilters: () => void;
  updateFilters: (filters: TicketFilters) => void;
  fetchTickets: (page: number, filters: TicketFilters) => void;
  resetPage: () => void;
  resetState: () => void;
}

const UserTicketsFilterSmart = ({
  expanded,
  setExpanded,
  filters,
  page,
  resetFilters,
  updateFilters,
  fetchTickets,
  resetPage,
  resetState,
}: Props) => {
  const [errorStartDate, setErrorStartDate] = useState('');
  const [errorEndDate, setErrorEndDate] = useState('');
  const [t] = useTranslation();

  const handleChange = () => {
    const newFilters = Object.assign({}, filters);
    updateFilters(newFilters);
  };

  const handleChangeTitle = (title: string) => {
    filters.title = title;
    handleChange();
  };

  const handleChangeStartDate = (date: string) => {
    filters.startDate = new Date(date);

    if (filters.endDate !== undefined) {
      if (equalDate(filters.startDate, filters.endDate)) {
        return;
      } else if (startDateBeforeEndDate(filters.startDate, filters.endDate)) {
        setErrorStartDate(t('eventList.invalidDate'));
        return;
      }
    }

    setErrorStartDate('');
    setErrorEndDate('');
    handleChange();
  };

  const handleChangeEndDate = (date: string) => {
    filters.endDate = new Date(date);

    if (filters.startDate !== undefined) {
      if (equalDate(filters.startDate, filters.endDate)) {
        return;
      } else if (startDateBeforeEndDate(filters.startDate, filters.endDate)) {
        setErrorEndDate(t('eventList.invalidDate'));
        return;
      }
    }

    setErrorStartDate('');
    setErrorEndDate('');
    handleChange();
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setExpanded(false);
    handleChange();
    resetState();
    fetchTickets(1, filters);
  };

  const toggle = () => {
    setExpanded(!expanded);
  };

  const clear = () => {
    resetFilters();
    resetState();
    setErrorStartDate('');
    setErrorEndDate('');
    fetchTickets(1, { title: '', startDate: undefined, endDate: undefined });
  };

  return (
    <UserTicketsFilterDumb
      isExpanded={expanded}
      filters={filters}
      errorStartDate={errorStartDate}
      errorEndDate={errorEndDate}
      clear={clear}
      updateFilters={updateFilters}
      toggle={toggle}
      submitForm={submitForm}
      handleChangeTitle={handleChangeTitle}
      handleChangeStartDate={handleChangeStartDate}
      handleChangeEndDate={handleChangeEndDate}
    />
  );
};

const mapStateToProps = (state: AppState) => ({
  filters: state.tickets.filters,
  page: state.tickets.page,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateFilters: (filters: TicketFilters) => dispatch(updateFilters(filters)),
    resetFilters: () => dispatch(resetFilters()),
    fetchTickets: (page: number, filters: TicketFilters) => dispatch(fetchTickets(page, filters)),
    resetPage: () => dispatch(resetPage()),
    resetState: () => dispatch(resetState())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserTicketsFilterSmart);
