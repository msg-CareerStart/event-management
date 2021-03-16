import React, { useEffect, useState, KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import {
  loadTicketCategories,
  addBookings,
  updateBookings,
  updateTicketAmount,
  updateTicketNames,
  updateChecked,
} from '../../../actions/TicketReservationActions';
import { Container, CircularProgress, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import BuyTicketsSecondPageDumb from './BuyTicketsSecondPageDumb';
import Booking from '../../../model/Booking';
import { TicketsPerCateory, TicketNames } from '../../../model/UserReserveTicket';
import { TicketAvailabilityData } from '../../../model/BuyTicketsSecondPage';
import ErrorIcon from '@material-ui/icons/Error';
import { Dispatch } from 'redux';
import { AppState } from '../../../store/store';
import { useTranslation } from 'react-i18next';

interface BuyTicketsSecondPageSmartProps {
  match: any;

  isErrorTicketCategories: boolean;
  isLoadingTicketCategories: boolean;

  ticketCategories: TicketAvailabilityData[];
  fetchTicketCategories: (idEvent: string) => void;
  addBookings: (booking: Booking) => void;

  updateBookings: (booking: Booking) => void;
  booking: Booking;

  updateTicketAmount: (ticketAmount: TicketsPerCateory[]) => void;

  updateTicketNames: (ticketAmount: TicketNames[]) => void;
  ticketNames: TicketNames[];

  updateChecked: (checked: boolean) => void;
  checked: boolean;
}

const handleEnterKey = (e: KeyboardEvent<HTMLDivElement>): void => {
  e.keyCode === 13 && e.preventDefault();
};

function BuyTicketsSecondPageSmart({
  match,
  isErrorTicketCategories,
  isLoadingTicketCategories,
  ticketCategories,
  fetchTicketCategories,
  addBookings,
  booking,
  updateBookings,
  updateTicketNames,
  updateTicketAmount,
  ticketNames,
  updateChecked,
  checked,
}: BuyTicketsSecondPageSmartProps) {
  const [step, setStep] = useState(1);
  const history = useHistory();
  const [ t ] = useTranslation();
  
  useEffect(() => {
    fetchTicketCategories(match.params.id);
  }, [match.params.id, fetchTicketCategories]);

  useEffect(() => {
    let initialTicketState: TicketsPerCateory[] = [];
    if (!isErrorTicketCategories) {
      ticketCategories.map((ticket) => initialTicketState.push({ category: ticket.title, quantity: 0 }));
      updateTicketAmount(initialTicketState);
    }
  }, [ticketCategories, updateTicketAmount]);

  if (isLoadingTicketCategories) {
    return (
      <Grid container direction='row' justify='center' alignItems='center'>
        <Container maxWidth='lg'>
          <CircularProgress />
        </Container>
        <h6>{t("welcome.loading")}</h6>
      </Grid>
    );
  } else if (isErrorTicketCategories) {
    return (
      <Grid container direction='row' justify='center' alignItems='center'>
        <ErrorIcon color={'primary'} fontSize={'large'} />
        <h2>{t("userEventList.errorMessage")}</h2>
      </Grid>
    );
  }

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  const gotoFirstPage = () => {
    history.push(`/user/reserve-tickets/first-page/${match.params.id}`);
  };

  const gotoEventListPage = () => {
    history.push('/user/events');
  };

  return (
    <BuyTicketsSecondPageDumb
      gotoFirstPage={gotoFirstPage}
      gotoEventListPage={gotoEventListPage}
      ticketCategories={ticketCategories}
      eventId={match.params.id}
      booking={booking}
      updateBookings={updateBookings}
      addBookings={addBookings}
      updateTicketNames={updateTicketNames}
      ticketNames={ticketNames}
      updateChecked={updateChecked}
      checked={checked}
      step={step}
      nextStep={nextStep}
      prevStep={prevStep}
      handleEnterKey={handleEnterKey}
    />
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    isErrorTicketCategories: state.ticketCategories.isErrorTicketCategories,
    isLoadingTicketCategories: state.ticketCategories.isLoadingTicketCategories,
    booking: state.ticketCategories.booking,
    ticketCategories: state.ticketCategories.ticketCategory,

    ticketNames: state.ticketCategories.ticketNames,
    checked: state.ticketCategories.checked,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchTicketCategories: (idEvent: string) => dispatch(loadTicketCategories(idEvent)),
    addBookings: (booking: Booking) => dispatch(addBookings(booking)),

    updateBookings: (booking: Booking) => dispatch(updateBookings(booking)),
    updateTicketAmount: (ticketAmount: TicketsPerCateory[]) => dispatch(updateTicketAmount(ticketAmount)),
    updateTicketNames: (ticketNames: TicketNames[]) => dispatch(updateTicketNames(ticketNames)),
    updateChecked: (checked: boolean) => dispatch(updateChecked(checked)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyTicketsSecondPageSmart);
