import React, { KeyboardEvent } from 'react';
import OverviewDumb from './OverviewDumb';
import { EventCrud } from '../../../model/EventCrud';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { EventFormErrors } from '../../../model/EventFormErrors';
import { updateFormErrors, updateEvent } from '../../../actions/HeaderEventCrudActions';
import { compareDates } from '../../../utils/CompareUtilsForOverview';
import { Dispatch } from 'redux';
import { AppState } from '../../../store/store';
import { resetErrors, setStartDateError, setStartTimeError, setEndTimeError } from '../../../utils/OverviewUtils';

interface OverviewSmartProps {
  newEvent: boolean;
  isAdmin: boolean;
  setOpen: (open: boolean) => void;
  setMsgUndo: (msgUndo: string) => void;
  setDialogTitle: (dialogTitle: string) => void;
  setDialogDescription: (dialogDescription: string) => void;

  eventCrud: EventCrud;
  formErrors: EventFormErrors;
  updateEvent: (event: EventCrud) => void;
  updateFormErrors: (errors: EventFormErrors) => void;
}

function OverviewSmart(props: OverviewSmartProps) {
  const { t } = useTranslation();
  let today = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
  const dateAndTime = today.split('T');
  const currDate = dateAndTime[0];

  const handleChangeCheckboxState = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newEvent = Object.assign({}, props.eventCrud);
    newEvent.highlighted = event.target.checked;
    props.updateEvent(newEvent);
  };

  const handleChangeStatus = (newStatus: string) => {
    let newEvent = Object.assign({}, props.eventCrud);
    newEvent.status = newStatus === 'true' ? true : false;
    props.updateEvent(newEvent);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    // update event
    let newEvent = Object.assign({}, props.eventCrud);

    switch (name) {
      case 'title':
        newEvent.title = value;
        break;
      case 'subtitle':
        newEvent.subtitle = value;
        break;
      case 'description':
        newEvent.description = value;
        break;
      case 'startDate':
        newEvent.startDate = value;
        break;
      case 'startTime':
        newEvent.startHour = value;
        break;
      case 'endDate':
        newEvent.endDate = value;
        break;
      case 'endTime':
        newEvent.endHour = value;
        break;
      case 'maxPeople':
        newEvent.maxPeople = value;
        break;
      default:
        break;
    }
    props.updateEvent(newEvent);

    // update form errors
    let newFormErrors = Object.assign({}, props.formErrors);

    switch (name) {
      case 'title':
        newFormErrors.title = value.length < 3 ? t('welcome.errMsgOverviewMinCharacters') : '';
        break;

      case 'subtitle':
        newFormErrors.subtitle = value.length < 3 ? t('welcome.errMsgOverviewMinCharacters') : '';
        break;

      case 'description':
        newFormErrors.description = value.length < 3 ? t('welcome.errMsgOverviewMinCharacters') : '';
        break;

      case 'startDate':
        newFormErrors = resetErrors(newFormErrors);

        newFormErrors.startDate = setStartDateError(value, currDate, props.eventCrud.endDate, t);
        newFormErrors.endDate = compareDates(value, props.eventCrud.endDate) === 1 ? t('welcome.errMsgOverviewLastDayBeforeFirst') : '';
        newFormErrors.startTime = setStartTimeError(value, props.eventCrud.endDate, props.eventCrud.startHour, props.eventCrud.endHour, t);
        newFormErrors.endTime = setEndTimeError(value, props.eventCrud.endDate, props.eventCrud.startHour, props.eventCrud.endHour, t);
        break;

      case 'endDate':
        newFormErrors = resetErrors(newFormErrors);

        newFormErrors.startDate = setStartDateError(props.eventCrud.startDate, currDate, value, t);
        newFormErrors.endDate = compareDates(props.eventCrud.startDate, value) === 1 ? t('welcome.errMsgOverviewLastDayBeforeFirst') : '';
        newFormErrors.startTime = setStartTimeError(props.eventCrud.startDate, value, props.eventCrud.startHour, props.eventCrud.endHour, t);
        newFormErrors.endTime = setEndTimeError(props.eventCrud.startDate, value, props.eventCrud.startHour, props.eventCrud.endHour, t);
        break;

      case 'startTime':
        newFormErrors = resetErrors(newFormErrors);

        newFormErrors.startTime = setStartTimeError(props.eventCrud.startDate, props.eventCrud.endDate, value, props.eventCrud.endHour, t);
        newFormErrors.startDate = setStartDateError(props.eventCrud.startDate, currDate, props.eventCrud.endDate, t);
        newFormErrors.endTime = setEndTimeError(props.eventCrud.startDate, props.eventCrud.endDate, value, props.eventCrud.endHour, t);
        break;

      case 'endTime':
        newFormErrors = resetErrors(newFormErrors);

        newFormErrors.endTime = setEndTimeError(props.eventCrud.startDate, props.eventCrud.endDate, props.eventCrud.startHour, value, t);
        newFormErrors.startDate = setStartDateError(props.eventCrud.startDate, currDate, props.eventCrud.endDate, t);
        newFormErrors.startTime = setStartTimeError(props.eventCrud.startDate, props.eventCrud.endDate, props.eventCrud.startHour, value, t);
        break;

      case 'maxPeople':
        newFormErrors.maxPeople = Number(value) < 2 ? t('welcome.errMsgOverviewMaxPpl') : '';
        break;

      default:
        break;
    }

    props.updateFormErrors(newFormErrors);
  };

  const handleEnterKey = (e: KeyboardEvent<HTMLDivElement>): void => {
    e.keyCode === 13 && e.preventDefault();
  };

  return (
    <OverviewDumb
      newEvent={props.newEvent}
      event={props.eventCrud}
      isAdmin={props.isAdmin}
      handleEnterKey={handleEnterKey}
      handleChange={handleChange}
      formErrors={props.formErrors}
      handleChangeCheckboxState={handleChangeCheckboxState}
      setStatus={handleChangeStatus}
    />
  );
}

const mapStateToProps = ({ eventCrud }: AppState) => {
  return {
    eventCrud: eventCrud.event,
    formErrors: eventCrud.formErrors,
    error: eventCrud.error,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateEvent: (event: EventCrud) => dispatch(updateEvent(event)),
    updateFormErrors: (errors: EventFormErrors) => dispatch(updateFormErrors(errors)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OverviewSmart);
