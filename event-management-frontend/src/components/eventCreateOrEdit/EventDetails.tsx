import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, Paper } from '@material-ui/core';
import { loadEvent, deleteEvent, addEvent, editEvent, resetStore, resetErrors } from '../../actions/HeaderEventCrudActions';
import { connect } from 'react-redux';
import Header from './headerEditAndDelete/HeaderCrudSmart';
import Stepper from './Stepper';
import { useHistory } from 'react-router-dom';
import AlertDialog from './AlertDialog';
import OverviewSmart from './overviewSection/OverviewSmart';
import { EventCrud } from '../../model/EventCrud';
import { useTranslation } from 'react-i18next';
import ImagesSectionSmart from './imagesSection/ImagesSectionSmart';
import { EventImage } from '../../model/EventImage';
import MapWrapper from './locationSection/Map';
import { EventFormErrors } from '../../model/EventFormErrors';
import CategoryPageSmart from './ticketsSection/CategoryPage/CategoryPageSmart';
import { eventDetailsStyles } from '../../styles/EventDetailsStyle';
import { AppState } from '../../store/store';
import { Dispatch } from 'redux';

interface Props {
  match: any;
  isAdmin: boolean;
  fetchEventAction: (id: string) => void;
  deleteEventAction: (id: string) => void;
  addEventAction: (event: EventCrud, images: EventImage[]) => void;
  editEventAction: (event: EventCrud, images: EventImage[]) => void;
  resetStoreAction: () => void;
  resetErrorsAction: () => void;
  fetchedEvent: {
    eventIsLoading: boolean;
    event: EventCrud;
    error: string;
    images: EventImage[];
    formErrors: EventFormErrors;
    isDeleted: boolean;
    isSaved: boolean;
    modifyEventError: boolean;
  };
}

function EventDetails({
  match,
  isAdmin,
  fetchEventAction,
  deleteEventAction,
  addEventAction,
  editEventAction,
  resetStoreAction,
  resetErrorsAction,
  fetchedEvent,
}: Props) {
  const history = useHistory();
  const backgroundStyle = eventDetailsStyles();
  const { t } = useTranslation();

  let newEvent = match.path === '/admin/newEvent';

  const [open, setOpen] = useState(false);
  const [msgUndo, setMsgUndo] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogDescription, setDialogDescription] = useState('');

  const [addRequest, setAddRequest] = useState(false);
  const [editRequest, setEditRequest] = useState(false);
  const [deleteRequest, setDeleteRequest] = useState(false);

  const [idLocation, setidLocation] = useState('');

  useEffect(() => {
    if (newEvent === false) {
      fetchEventAction(match.params.id);
    }
    return () => {
      resetStoreAction();
    };
  }, [fetchEventAction, resetStoreAction, match.params.id, newEvent]);

  const verifyDateAndTimePeriods = (event: EventCrud): boolean => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    if (event.startHour >= event.endHour) {
      setMsgUndo(t('welcome.popupMsgTryAgain'));
      setDialogTitle(t('welcome.popupMsgErrTitle'));
      setDialogDescription(t('welcome.popupMsgTimeErrDescription'));
      setOpen(true);
      return false;

    } else if (startDate > endDate) {
      setMsgUndo(t('welcome.popupMsgTryAgain'));
      setDialogTitle(t('welcome.popupMsgErrTitle'));
      setDialogDescription(t('welcome.popupMsgDateErrDescription'));
      setOpen(true);
      return false;
    }
    return true;
  };

  const verifyErrorMessages = (errors: EventFormErrors): boolean => {
    if (
      errors.title.length > 0 ||
      errors.subtitle.length > 0 ||
      errors.description.length > 0 ||
      errors.startDate.length > 0 ||
      errors.endDate.length > 0 ||
      errors.startTime.length > 0 ||
      errors.endTime.length > 0 ||
      errors.maxPeople.length > 0 ||
      errors.ticketsPerUser.length > 0 ||
      errors.ticketInfo.length > 0
    ) {
      setMsgUndo(t('welcome.popupErrMsgUnderstood'));
      setDialogTitle(t('welcome.popupMsgErrTitle'));
      setDialogDescription(t('welcome.popupErrMsgDescription'));
      setOpen(true);
      return false;
    }
    for (var ticketError of errors.ticketCategoryDtoList) {
      if (
        ticketError.title.length > 0 ||
        ticketError.subtitle.length > 0 ||
        ticketError.price.length > 0 ||
        ticketError.description.length > 0 ||
        ticketError.ticketsPerCategory.length > 0
      ) {
        setMsgUndo(t('welcome.popupErrMsgUnderstood'));
        setDialogTitle(t('welcome.popupMsgErrTitle'));
        setDialogDescription(t('welcome.popupErrMsgDescription'));
        setOpen(true);
        return false;
      }
    }

    return true;
  };

  const verifyNullFields = (event: EventCrud): boolean => {
    if (
      event.title.length === 0 ||
      event.subtitle.length === 0 ||
      event.description.length === 0 ||
      event.maxPeople === 0 ||
      event.ticketCategoryDtoList.length === 0 ||
      event.ticketsPerUser === 0 ||
      event.ticketInfo.length === 0
    ) {
      setMsgUndo(t('welcome.popupErrMsgUnderstood'));
      setDialogTitle(t('welcome.popupMsgErrTitle'));
      setDialogDescription(t('welcome.popupErrMsgNotFilled'));
      setOpen(true);
      return false;
    }

    for (var category of event.ticketCategoryDtoList) {
      if (
        category.title.trim() === '' ||
        category.price === 0 ||
        category.description.trim() === '' ||
        category.ticketsPerCategory === 0
      ) {
        setMsgUndo(t('welcome.popupErrMsgUnderstood'));
        setDialogTitle(t('welcome.popupMsgErrTitle'));
        setDialogDescription(t('welcome.popupErrMsgNotFilled'));
        setOpen(true);
        return false;
      }
    }
    return true;
  };

  const isFormValid = (event: EventCrud, errors: EventFormErrors): boolean => {
    if (verifyDateAndTimePeriods(event) && verifyErrorMessages(errors) && verifyNullFields(event)) return true;
    return false;
  };

  let saveEvent = (): void => {
    if (isFormValid(fetchedEvent.event, fetchedEvent.formErrors)) {
      if (newEvent) {
        setAddRequest(true);
        setOpen(true);
      } else {
        setEditRequest(true);
        setOpen(true);
      }
    }
  };

  let deleteEvent = (): void => {
    if (newEvent === true) {
      setMsgUndo(t('welcome.popupMsgCancelUndo'));
      setDialogTitle(t('welcome.popupMsgCancelTitle'));
      setDialogDescription(t('welcome.popupMsgCancelDescription'));
      setOpen(true);
      resetStoreAction();
    } else {
      setDeleteRequest(true);
      setOpen(true);
    }
  };

  useEffect(() => {
    if (addRequest) {
      addEventAction(fetchedEvent.event, fetchedEvent.images);
    } else if (editRequest) {
      editEventAction(fetchedEvent.event, fetchedEvent.images);
    } else if (deleteRequest) {
      deleteEventAction(match.params.id);
    }
  }, [addRequest, editRequest, deleteRequest])

  useEffect(() => {
    if (fetchedEvent.isDeleted) {
      // history.push('/admin/events');
    }
    return () => resetStoreAction();
  }, [fetchedEvent.isDeleted]);

  useEffect(() => {
    if (fetchedEvent.isSaved) {
      // history.push('/admin/events');
    }
    return () => resetStoreAction();
  }, [fetchedEvent.isSaved]);

  const overviewComponent = (
    <OverviewSmart
      newEvent={newEvent}
      isAdmin={isAdmin}
      setOpen={setOpen}
      setMsgUndo={setMsgUndo}
      setDialogTitle={setDialogTitle}
      setDialogDescription={setDialogDescription}
    />
  );
  const locationComponent = <MapWrapper locationStatus={idLocation} setlocationStatus={setidLocation} />;
  const ticketsComponent = <CategoryPageSmart newEvent={newEvent} />;
  const imagesComponent = <ImagesSectionSmart />;

  if (fetchedEvent.eventIsLoading) {
    return (
      <Container maxWidth="lg">
        <CircularProgress />
      </Container>
    );
  }

  let title = !newEvent ? fetchedEvent.event.title : t('welcome.newEventTitle');
  return (
    <Paper className={backgroundStyle.paper}>
      <Header saveEvent={saveEvent} deleteEvent={deleteEvent} isAdmin={isAdmin} title={title} />
      <Stepper
        overviewComponent={overviewComponent}
        locationComponent={locationComponent}
        ticketsComponent={ticketsComponent}
        imagesComponent={imagesComponent}
      />
      <AlertDialog
        isRequest={false}

        addRequest={addRequest}
        editRequest={editRequest}
        deleteRequest={deleteRequest}
        eventIsLoading={fetchedEvent.eventIsLoading}
        isError={fetchedEvent.modifyEventError}
        errorMsg={fetchedEvent.error}

        resetErrors={resetErrorsAction}

        open={open}
        setOpen={setOpen}
        msgUndo={msgUndo}
        dialogTitle={dialogTitle}
        dialogDescription={dialogDescription}

        setAddRequest={setAddRequest}
        setEditRequest={setEditRequest}
      />
    </Paper>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    fetchedEvent: state.eventCrud,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchEventAction: (id: string) => dispatch(loadEvent(id)),
    deleteEventAction: (id: string) => dispatch(deleteEvent(id)),
    addEventAction: (event: EventCrud, images: EventImage[]) => dispatch(addEvent(event, images)),
    editEventAction: (event: EventCrud, images: EventImage[]) => dispatch(editEvent(event, images)),
    resetStoreAction: () => dispatch(resetStore()),
    resetErrorsAction: () => dispatch(resetErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
