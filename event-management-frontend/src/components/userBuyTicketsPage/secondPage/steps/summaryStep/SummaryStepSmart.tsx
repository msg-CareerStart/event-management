import { SummaryStepDumb } from './SummaryStepDumb';
import React from 'react';
import { AppState } from '../../../../../store/store';
import { DiscountsForEventState } from '../../../../../reducers/DiscountsForEventReducer';
import { EventCrud } from '../../../../../model/EventCrud';
import { connect } from 'react-redux';
import { TicketsPerCateory } from '../../../../../model/UserReserveTicket';
import { Grid, Typography, List } from '@material-ui/core';

interface SummaryStepSmartProps {
  nextStep: () => void;
  previousStep: () => void;
  discount: DiscountsForEventState;
  event: EventCrud;
  ticketAmmount: TicketsPerCateory[];
}

function SummaryStepSmart({ nextStep, previousStep, discount, event, ticketAmmount }: SummaryStepSmartProps) {
  let summary = ticketAmmount.map((ticketAmmountElement) => {
    let index = discount.appliedDiscounts.findIndex(
      (appliedDiscount) => appliedDiscount.CategoryTitle === ticketAmmountElement.category
    );
    let discountCodeDescription: any;
    if (index !== -1) {
      discountCodeDescription = (
        <Typography>
          Quantity: {ticketAmmountElement.quantity}, Category: {ticketAmmountElement.category}, Discount Code:{' '}
          {discount.appliedDiscounts[index].DiscountCode}, Discount: {discount.appliedDiscounts[index].percentage}%
        </Typography>
      );
    } else {
      discountCodeDescription = (
        <Typography>
          Quantity: {ticketAmmountElement.quantity}, Category: {ticketAmmountElement.category}
        </Typography>
      );
    }
    return (
      <Grid container justify="center">
        <Grid item>
          <List>{discountCodeDescription}</List>
        </Grid>
      </Grid>
    );
  });

  return <SummaryStepDumb previousStep={previousStep} nextStep={nextStep} summary={summary} />;
}

const mapStateToProps = (state: AppState) => ({
  discount: state.discounts,
  event: state.eventCrud.event,
  ticketAmmount: state.ticketCategories.ticketAmount,
});

const SummaryStep = connect(mapStateToProps)(SummaryStepSmart);

export default SummaryStep;
