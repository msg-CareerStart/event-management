import { TicketsStepFormErrors, TicketAvailabilityData } from "../../model/BuyTicketsSecondPage";

export const initializeTicketsStepFormErrors = (ticketsStepFormErrors: TicketsStepFormErrors[], ticketCategories: TicketAvailabilityData[]): TicketsStepFormErrors[] => {
  ticketCategories.forEach(ticket => {
    ticketsStepFormErrors.find(item => item.ticketCategoryTitle === ticket.title) === undefined &&
      ticketsStepFormErrors.push({ ticketCategoryTitle: ticket.title, error: "" });
  });

  return ticketsStepFormErrors;
}

export const updateTicketsStepErrorsLocally = (ticketsStepFormErrors: TicketsStepFormErrors[], name: string, message: string,
  updateTicketsStepFormErrors: (ticketsStepFormErrors: TicketsStepFormErrors[]) => void): void => {
  let index = ticketsStepFormErrors.findIndex(error => error.ticketCategoryTitle === name);
  ticketsStepFormErrors[index].error = message;
  updateTicketsStepFormErrors(ticketsStepFormErrors);
}
