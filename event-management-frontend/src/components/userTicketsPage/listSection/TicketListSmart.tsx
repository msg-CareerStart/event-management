import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../store/store';
import { fetchTickets, incrementPage, resetPage, resetState, setIsFetching } from '../../../actions/TicketsPageActions';
import TicketListDumb from './TicketListDumb';
import { TicketFilters } from '../../../model/TicketFilters';

interface Props {
  tickets: [];
  filters: TicketFilters;
  page: number;
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  fetchTickets: (page: number, filters: TicketFilters) => void;
  incrementPage: () => void;
  resetPage: () => void;
  resetState: () => void;
  isFetching: boolean;
  setIsFetching: (isLoading: boolean) => void;
}

const TicketListSmart = ({
  tickets,
  filters,
  page,
  isLoading,
  isError,
  fetchTickets,
  incrementPage,
  resetPage,
  resetState,
  isFetching,
  setIsFetching,
  hasMore
}: Props) => {

  useEffect(() => {
    if (!isFetching) return

    if (hasMore) {
      incrementPage()
      fetchTickets(page, filters);

      if (tickets.length > 0) {
        setIsFetching(false)
      }
    }
  }, [hasMore, tickets, isFetching]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (hasMore) {
        setIsFetching(true);
      }
    } else {
      setIsFetching(false)
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <TicketListDumb isError={isError} isLoading={isLoading} ticketsDetails={tickets} />
  );
};

const mapStateToProps = (state: AppState) => ({
  tickets: state.tickets.allTickets,
  filters: state.tickets.filters,
  page: state.tickets.page,
  isLoading: state.tickets.isLoading,
  isError: state.tickets.isError,
  isFetching: state.tickets.isFetching,
  hasMore: state.tickets.isMore,
});


export default connect(mapStateToProps,
  { fetchTickets, incrementPage, resetPage, setIsFetching, resetState })(TicketListSmart);
