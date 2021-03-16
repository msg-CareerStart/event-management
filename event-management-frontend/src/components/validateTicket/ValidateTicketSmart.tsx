import React, { useState, useEffect } from 'react';
import { Container, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  validateTicket,
  setIsError,
  setIsValid,
  setTicketID,
  setAlertVisible,
  setAlertTitle,
  setAlertDescription,
  setAlertSeverity,
  clearValidationData,
} from '../../actions/EventsPageActions';
import { AppState } from '../../store/store';
import { ValidateTicketDumb } from './ValidateTicketDumb';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { ValidateTicketAlert, initialSeverity, Severity } from './ValidateTicketAlert';
import { useValidateTicketStyles } from '../../styles/ValidateTicketStyle';

type Props = {
  match: any;
  newEvent: boolean;
  isAdmin: boolean;
  isError: boolean;
  errorStatus: number;
  customerName: string;
  customerEmail: string;
  ticketID: number;
  isLoading: boolean;
  isValid: boolean;
  alertVisible: boolean;
  alertTitle: string;
  alertDescription: string;
  alertSeverity: Severity;

  validateTicket: (ticketID: number, eventID: number) => void;
  setIsError: (error: boolean) => void;
  setIsValid: (isValid: boolean) => void;
  setTicketID: (ticketID: number) => void;
  setAlertVisible: (alertVisible: boolean) => void;
  setAlertTitle: (alertTitle: string) => void;
  setAlertDescription: (alertDescription: string) => void;
  setAlertSeverity: (alertSeverity: Severity) => void;
  clearValidationData: () => void;
};

const ValidateTicket = ({
  match,
  newEvent,
  isError,
  isLoading,
  errorStatus,
  customerName,
  customerEmail,
  ticketID,
  isValid,
  alertVisible,
  alertTitle,
  alertDescription,
  alertSeverity,
  validateTicket,
  setIsError,
  setIsValid,
  setTicketID,
  setAlertVisible,
  setAlertTitle,
  setAlertDescription,
  setAlertSeverity,
  clearValidationData,
}: Props) => {
  const eventID = match.params.id;

  const { t } = useTranslation();
  const history = useHistory();
  const classes = useValidateTicketStyles();

  useEffect(() => {
    if (newEvent === true) {
      clearValidationData();
    }
  }, []);

  const handleScan = (data: string | null) => {
    if (data) {
      setIsError(false);
      setAlertTitle('');
      setAlertDescription('');
      setTicketID(parseInt(data.split(' ')[1]));
      if (ticketID) {
        validateTicket(ticketID, eventID);
      }
    }
  };

  const handleError = () => {
    setAlertSeverity('error');
    setAlertTitle(t('validateTicket.errorMessage'));
    setAlertDescription(t('validateTicket.defaultError'));
    setAlertVisible(true);
  };

  const validateNext = () => {
    setIsError(false);
    setIsValid(false);
    setAlertVisible(false);
    setAlertTitle('');
    setAlertDescription('');
    setAlertSeverity(undefined);
  };

  const exitValidation = () => {
    history.push('/admin/events');
  };

  if (errorStatus && !alertDescription && isError) {
    setAlertSeverity('error');
    setAlertTitle(t('validateTicket.errorMessage'));
    switch (errorStatus) {
      case 404:
        setAlertDescription(t('validateTicket.notFoundError'));
        break;
      case 409:
        setAlertDescription(t('validateTicket.conflictError'));
        break;
      case 406:
        setAlertDescription(t('validateTicket.notAcceptableError'));
        break;
      default:
        setAlertDescription(t('validateTicket.defaultError'));
    }
    setAlertVisible(true);
  }

  if (isValid && !alertTitle) {
    setAlertSeverity('success');
    setAlertTitle(t('validateTicket.successfulValidation'));
    setAlertDescription(t('validateTicket.successfulMessage'));
    setAlertVisible(true);
  }

  if (isLoading) {
    return (
      <div className={classes.root}>
        <Container maxWidth="xl">
          <CircularProgress className={classes.loading} />
        </Container>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <ValidateTicketDumb handleScan={handleScan} handleError={handleError} />
        {alertVisible ? (
          <ValidateTicketAlert
            alertTitle={alertTitle}
            alertSeverity={alertSeverity}
            alertDescription={alertDescription}
            customerName={customerName}
            customerEmail={customerEmail}
            validateNext={validateNext}
            exitValidation={exitValidation}
          />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    customerName: state.events.ticketCustomerName,
    customerEmail: state.events.ticketCustomerEmail,
    errorStatus: state.events.errorStatus,
    ticketID: state.events.ticketID,
    isError: state.events.isError,
    isLoading: state.events.isLoading,
    isValid: state.events.isValid,
    alertVisible: state.events.alertVisible,
    alertTitle: state.events.alertTitle,
    alertDescription: state.events.alertDescription,
    alertSeverity: state.events.alertSeverity,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setIsError: (isError: boolean) => dispatch(setIsError(isError)),
    setIsValid: (isValid: boolean) => dispatch(setIsValid(isValid)),
    setTicketID: (ticketID: number) => dispatch(setTicketID(ticketID)),
    validateTicket: (ticketID: number, eventID: number) => dispatch(validateTicket(ticketID, eventID)),
    setAlertVisible: (alertVisible: boolean) => dispatch(setAlertVisible(alertVisible)),
    setAlertTitle: (alertTitle: string) => dispatch(setAlertTitle(alertTitle)),
    setAlertDescription: (alertDescription: string) => dispatch(setAlertDescription(alertDescription)),
    setAlertSeverity: (alertSeverity: Severity) => dispatch(setAlertSeverity(alertSeverity)),
    clearValidationData: () => dispatch(clearValidationData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidateTicket);
