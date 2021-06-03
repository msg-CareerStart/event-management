import React, { useEffect, KeyboardEvent } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { userBuyTicketsStyle } from '../../../../../styles/UserBuyTicketsStyle';
import { TicketsPerCateory, TicketNames } from '../../../../../model/UserReserveTicket';
import TicketsStepDumb from './TicketsStepDumb';
import { connect } from 'react-redux';
import {
  updateTicketsStepFormErrors,
  updateTicketAmount,
  updateBookings,
} from '../../../../../actions/TicketReservationActions';
import { TicketsStepFormErrors, TicketAvailabilityData } from '../../../../../model/BuyTicketsSecondPage';
import Booking from '../../../../../model/Booking';
import {
  initializeTicketsStepFormErrors,
  updateTicketsStepErrorsLocally,
} from '../../../../../utils/ticketReservationUtils/TicketsStepUtils';
import { useTranslation } from 'react-i18next';
import { Dispatch } from 'redux';
import { AppState } from '../../../../../store/store';
import DiscountCodeBox from './DiscountCodeBox';

interface TicketsStepSmartProps {
  nextStep: () => void;
  handleEnterKey: (e: KeyboardEvent<HTMLDivElement>) => void;
  updateTicketAmount: (ticketAmount: TicketsPerCateory[]) => void;
  ticketCategories: TicketAvailabilityData[];
  ticketAmount: TicketsPerCateory[];

  updateTicketNames: (ticketAmount: TicketNames[]) => void;

  ticketsStepFormErrors: TicketsStepFormErrors[];
  updateTicketsStepFormErrors: (ticketsStepFormErrors: TicketsStepFormErrors[]) => void;

  eventId: number | string;

  updateBookings: (booking: Booking) => void;
  booking: Booking;

  gotoFirstPage: () => void;
}

function TicketsStepSmart({
  nextStep,
  handleEnterKey,
  updateTicketAmount,
  ticketCategories,
  ticketAmount,
  updateTicketNames,
  ticketsStepFormErrors,
  updateTicketsStepFormErrors,
  booking,
  updateBookings,
  eventId,
  gotoFirstPage,
}: TicketsStepSmartProps) {
  const ticketsPageStyle = userBuyTicketsStyle();
  const { t } = useTranslation();

  ticketsStepFormErrors = initializeTicketsStepFormErrors(ticketsStepFormErrors, ticketCategories);
  useEffect(() => {
    const today = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];

    let oldBooking = { ...booking };
    oldBooking.eventId = Number(eventId);
    oldBooking.bookingDate = today;
    updateBookings(oldBooking);

    //initialize form errors for TicketsStep
    updateTicketsStepFormErrors(ticketsStepFormErrors);
  }, []);

  useEffect(() => {
    ticketsStepFormErrors
      .filter((ticketError) => ticketError.error !== '')
      .forEach((ticketError) => {
        if (
          ticketCategories.find((ticketCategory) => ticketCategory.title === ticketError.ticketCategoryTitle)!
            .remaining >= ticketAmount.find((ticket) => ticket.category === ticketError.ticketCategoryTitle)!.quantity
        )
          ticketError.error = '';
      });
  }, []);

  const handleTicketsStepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const index = ticketCategories.findIndex((ticket) => ticket.title === name);
    const remaining = ticketCategories[index].remaining;
    const category = ticketCategories[index].title;

    updateTicketNames([]);

    //check for errors
    if (Number(value) < 0) {
      updateTicketAmount(
        ticketAmount.map((item) => (item.category === name ? { ...item, quantity: Number(value) } : item))
      );
      updateTicketsStepErrorsLocally(
        ticketsStepFormErrors,
        name,
        t('buyTicketsSecondPage.wrongInput'),
        updateTicketsStepFormErrors
      );
    } else if (remaining < Number(value)) {
      updateTicketAmount(
        ticketAmount.map((item) => (item.category === name ? { ...item, quantity: Number(value) } : item))
      );
      updateTicketsStepErrorsLocally(
        ticketsStepFormErrors,
        name,
        `${t('buyTicketsSecondPage.ticketsLeft_1')} ${remaining} ${t(
          'buyTicketsSecondPage.ticketsLeft_2'
        )} ${category}`,
        updateTicketsStepFormErrors
      );
    } else {
      updateTicketAmount(
        ticketAmount.map((item) => (item.category === name ? { ...item, quantity: Number(value) } : item))
      );
      updateTicketsStepErrorsLocally(ticketsStepFormErrors, name, '', updateTicketsStepFormErrors);
    }
  };

  // Get the number of tickets for the category at index i in 'ticketCategories'
  function getTicketNumber(i: number): number {
    var a = ticketAmount.find((ticket) => ticket.category === ticketCategories[i].title)?.quantity;
    if (typeof a === 'undefined') return 0;
    return a;
  }

  function isNrOfTicketsOK(): boolean {
    // Check if the user is buying tickets for at least 1 category
    let isBuyingTickets: boolean = false;
    // Check if the user has bad input for at least 1 category
    let hasBadInput: boolean = false;
    for (let i = 0; i < ticketCategories.length; i++) {
      if (getTicketNumber(i) > 0) isBuyingTickets = true;
      if (getTicketNumber(i) < 0 || getTicketNumber(i) > ticketCategories[i].remaining) hasBadInput = true;
    }
    return isBuyingTickets && !hasBadInput;
  }

  let inputs: JSX.Element[] = [];
  for (let i = 0; i < ticketCategories.length; i++) {
    const currError = ticketsStepFormErrors.find(
      (error) => error.ticketCategoryTitle === ticketCategories[i].title
    )!.error;
    inputs.push(
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10} key={ticketCategories[i].title}>
        <TextField
          className={ticketsPageStyle.position}
          onKeyDown={handleEnterKey}
          type="number"
          name={ticketCategories[i].title}
          fullWidth
          defaultValue={ticketAmount.find((ticket) => ticket.category === ticketCategories[i].title)?.quantity}
          label={ticketCategories[i].title}
          variant="outlined"
          onChange={handleTicketsStepChange}
          error={currError.length > 0}
          helperText={currError}
          InputProps={{ inputProps: { min: 0 } }}
        />
        <DiscountCodeBox
          ticketCategory={ticketCategories[i].title}
          ticketNumber={getTicketNumber(i)}
          available={getTicketNumber(i) < ticketCategories[i].remaining}
          categoryID={ticketCategories[i].categoryID}
        />
      </Grid>
    );
  }

  return (
    <TicketsStepDumb
      gotoFirstPage={gotoFirstPage}
      nextStep={nextStep}
      inputs={inputs}
      allowNextStep={isNrOfTicketsOK()}
    />
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    booking: state.ticketCategories.booking,
    ticketAmount: state.ticketCategories.ticketAmount,
    ticketsStepFormErrors: state.ticketCategories.ticketsStepFormErrors,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateBookings: (booking: Booking) => dispatch(updateBookings(booking)),
    updateTicketAmount: (ticketAmount: TicketsPerCateory[]) => dispatch(updateTicketAmount(ticketAmount)),
    updateTicketsStepFormErrors: (ticketsStepFormErrors: TicketsStepFormErrors[]) =>
      dispatch(updateTicketsStepFormErrors(ticketsStepFormErrors)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketsStepSmart);
