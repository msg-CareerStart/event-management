import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Button, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useValidateTicketStyles } from '../../styles/ValidateTicketStyle';
import { useStyles } from '../../styles/CommonStyles';
import '../../styles/Responsivity.css';

export type Severity = 'error' | 'success' | undefined;
export const initialSeverity: Severity = undefined;

type Props = {
  alertTitle: string;
  alertSeverity: Severity;
  alertDescription: string;
  customerName: string;
  customerEmail: string;

  validateNext: () => void;
  exitValidation: () => void;
};

export const ValidateTicketAlert = ({
  alertTitle,
  alertSeverity,
  alertDescription,
  customerName,
  customerEmail,
  validateNext,
  exitValidation,
}: Props) => {
  const { t } = useTranslation();
  const classes = useValidateTicketStyles();
  const classes2 = useStyles();

  return (
    <div className={`${classes.alertStyle} alertResponsive`}>
      <Alert severity={alertSeverity} className={classes.alertIconStyle}>
        <AlertTitle className={classes.titleStyle}>
          <strong>{alertTitle}</strong>
        </AlertTitle>
        {alertDescription}
        {alertSeverity === 'success' ? (
          <>
            <p>
              <strong>{t('validateTicket.customerName')}</strong>
              <div>{customerName}</div>
            </p>
            <p>
              <strong>{t('validateTicket.customerEmail')}</strong>
              <div>{customerEmail}</div>
            </p>
          </>
        ) : null}
        <Grid container>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <Button
              onClick={exitValidation}
              className={`${classes2.mainButtonStyle} ${classes2.pinkGradientButtonStyle} ${classes.exitButton}`}
              color="primary"
            >
              {t('validateTicket.exitValidation')}
            </Button>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <Button
              onClick={validateNext}
              className={`${classes2.mainButtonStyle} ${classes2.pinkGradientButtonStyle} ${classes.nextButton}`}
              autoFocus
            >
              {t('validateTicket.validateNext')}
            </Button>
          </Grid>
        </Grid>
      </Alert>
    </div>
  );
};
