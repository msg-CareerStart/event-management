import { TFunction } from "i18next";

export const getAddEventErrorMessage = (status: string, t: TFunction): string => {
  let result = '';

  switch (Number(status)) {
    case 400:
      result = t("serverErrors.saveEvent_400");
      break;
    case 404:
      result = t("serverErrors.saveEvent_404");
      break;
    case 409:
      result = t("serverErrors.saveEvent_409");
      break;
    case 406:
      result = t("serverErrors.saveEvent_406");
      break;
    case 500:
      result = t("serverErrors.saveEvent_500");
      break;
    default:
      result = t("userEventList.errorMessage");
  }
  return result;
}

export const getEditEventErrorMessage = (status: string, t: TFunction): string => {
  let result = '';

  switch (Number(status)) {
    case 400:
      result = t("serverErrors.editEvent_400");
      break;
    case 404:
      result = t("serverErrors.editEvent_404");
      break;
    case 409:
      result = t("serverErrors.editEvent_409");
      break;
    case 406:
      result = t("serverErrors.editEvent_406");
      break;
    default:
      result = t("userEventList.errorMessage");
  }
  return result;
}

export const getDeleteEventErrorMessage = (status: string, t: TFunction): string => {
  let result = '';

  switch (Number(status)) {
    case 404:
      result = t("serverErrors.deleteEvent_404");
      break;
    default:
      result = t("userEventList.errorMessage");
  }
  return result;
}

export const getAddTicketErrorMessage = (status: string, t: TFunction): string => {
  let result = '';

  switch (Number(status)) {
    case 404:
      result = t("serverErrors.tickets_404");
      break;
    case 409:
      result = t("serverErrors.tickets_409");
      break;
    case 417:
      result = t("serverErrors.tickets_417");
      break;
    case 500:
      result = t("serverErrors.tickets_500");
      break;
    default:
      result = t("userEventList.errorMessage");
  }
  return result;
}

export const displayErrorMessage = (status: string, isRequest: boolean, addRequest: boolean, editRequest: boolean, deleteRequest: boolean, t: TFunction): string => {
  if (isRequest) return getAddTicketErrorMessage(status, t);
  if (addRequest) return getAddEventErrorMessage(status, t);
  if (editRequest) return getEditEventErrorMessage(status, t);
  if (deleteRequest) return getDeleteEventErrorMessage(status, t);
  return '';
}
