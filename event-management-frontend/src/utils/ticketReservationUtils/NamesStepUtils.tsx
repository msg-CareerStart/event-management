import { TicketNames, TicketsPerCateory } from "../../model/UserReserveTicket";
import { NamesStepFormErrors } from "../../model/BuyTicketsSecondPage";

export const createNamesStepFields = (initialTicketNames: TicketNames[], ticket: TicketsPerCateory): TicketNames[] => {
  let newField: TicketNames = { ticketTitle: ticket.category, names: new Array(ticket.quantity).fill("") };
  (initialTicketNames.find(item => item.ticketTitle === ticket.category) === undefined) && initialTicketNames.push(newField);
  return initialTicketNames;
}

export const initializeNamesStepFormErrors = (namesStepFormErrors: NamesStepFormErrors[], ticketAmount: TicketsPerCateory[]): NamesStepFormErrors[] => {
  for (let i = 0; i < ticketAmount.length; i++) {
    for (let j = 0; j < ticketAmount[i].quantity; j++) {
      let currTextFieldName = ticketAmount[i].category + "_" + j;
      namesStepFormErrors.find(item => item.textFieldName === currTextFieldName) === undefined &&
        namesStepFormErrors.push({ textFieldName: currTextFieldName, error: "" });
    }
  }
  return namesStepFormErrors;
}

export const updateNamesStepErrorsLocally = (namesStepFormErrors: NamesStepFormErrors[], textFieldName: string, message: string,
  updateTicketsStepFormErrors: (namesStepFormErrors: NamesStepFormErrors[]) => void): void => {
  let index = namesStepFormErrors.findIndex(error => error.textFieldName === textFieldName);
  namesStepFormErrors[index].error = message;
  updateTicketsStepFormErrors(namesStepFormErrors);
}

export const verifyExistenceOfTickets = (ticketNames: TicketNames[]): boolean => {
  if (ticketNames.length === 0) return false;
  return true;
}
