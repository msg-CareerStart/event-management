import React, { KeyboardEvent } from 'react';
import Booking from '../../../../../model/Booking';
import EmailStepDumb from './EmailStepDumb';
import { connect } from 'react-redux';
import { EmailStepFormErrors } from '../../../../../model/BuyTicketsSecondPage';
import { updateEmailFormErrors } from '../../../../../actions/TicketReservationActions';
import { useTranslation } from 'react-i18next';
import { Dispatch } from 'redux';
import { AppState } from '../../../../../store/store';

interface EmailStepSmartProps {
  nextStep: () => void;
  prevStep: () => void;
  handleEnterKey: (e: KeyboardEvent<HTMLDivElement>) => void;
  email: string;

  updateBookings: (booking: Booking) => void;
  booking: Booking;

  emailFormErrors: EmailStepFormErrors;
  updateEmailFormErrors: (emailFormErrors: EmailStepFormErrors) => void;
}

const emailRegex = RegExp(
  /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

function EmailStepSmart({
  nextStep,
  prevStep,
  handleEnterKey,
  email,
  updateBookings,
  booking,
  emailFormErrors,
  updateEmailFormErrors,
}: EmailStepSmartProps) {
  const { t } = useTranslation();

  const handleEmailStepChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    let newBooking = { ...booking };
    newBooking.email = value;
    updateBookings(newBooking);

    let emailError = { ...emailFormErrors };
    emailError.error = emailRegex.test(value) ? '' : t('buyTicketsSecondPage.invalidEmailAddress');
    updateEmailFormErrors(emailError);
  };

  return (
    <EmailStepDumb
      nextStep={nextStep}
      prevStep={prevStep}
      handleEnterKey={handleEnterKey}
      email={email}
      handleEmailStepChange={handleEmailStepChange}
      emailFormErrors={emailFormErrors}
    />
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    emailFormErrors: state.ticketCategories.emailFormErrors,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateEmailFormErrors: (emailFormErrors: EmailStepFormErrors) => dispatch(updateEmailFormErrors(emailFormErrors)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailStepSmart);
