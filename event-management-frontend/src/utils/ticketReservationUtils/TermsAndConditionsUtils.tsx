import { TicketsStepFormErrors, EmailStepFormErrors, NamesStepFormErrors } from '../../model/BuyTicketsSecondPage';
import Booking from '../../model/Booking';

export const verifyIfNoErrorsInTicketsStep = (ticketsStepFormErrors: TicketsStepFormErrors[]): boolean => {
  return ticketsStepFormErrors.filter((ticketError) => ticketError.error !== '').length === 0;
};

export const verifyIfNoErrorsInEmailStep = (emailFormErrors: EmailStepFormErrors): boolean => {
  return emailFormErrors.error === '';
};

export const verifyIfNoErrorsInNamesStep = (namesStepFormErrors: NamesStepFormErrors[]): boolean => {
  return namesStepFormErrors.filter((nameError) => nameError.error !== '').length === 0;
};

export const verifyIfNoNullFields = (booking: Booking): boolean => {
  if (booking.email === '') return false;
  if (booking.tickets.length === 0) return false;
  if (booking.tickets.filter((ticket) => ticket.name === '').length > 0) return false;
  return true;
};

export const verifyIfNoErrors = (
  ticketsStepFormErrors: TicketsStepFormErrors[],
  emailFormErrors: EmailStepFormErrors,
  namesStepFormErrors: NamesStepFormErrors[],
  booking: Booking
): boolean => {
  return (
    verifyIfNoErrorsInTicketsStep(ticketsStepFormErrors) &&
    verifyIfNoErrorsInEmailStep(emailFormErrors) &&
    verifyIfNoErrorsInNamesStep(namesStepFormErrors) &&
    verifyIfNoNullFields(booking)
  );
};
