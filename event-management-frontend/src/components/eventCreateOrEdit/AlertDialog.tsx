import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Grid, Container, CircularProgress } from '@material-ui/core';
import { useStyles } from '../../styles/CommonStyles';
import { displayErrorMessage } from '../../utils/AlertDialogUtils';

interface AlertDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  msgUndo: string;
  dialogTitle: string;
  dialogDescription: string;

  prevStep?: () => void;
  isLoading?: boolean;
  eventIsLoading?: boolean;
  isError?: boolean;
  errorMsg?: string;
  isRequest: boolean;
  addRequest: boolean;
  editRequest: boolean;
  deleteRequest: boolean;
  handleGoToTicketsPage?: () => void;
  resetErrors: () => void;
  setAddRequest?: (addRequest: boolean) => void,
  setEditRequest?: (editRequest: boolean) => void,
  setRequest?: (request: boolean) => void,
}

export default function AlertDialog({
  prevStep,
  open,
  setOpen,
  msgUndo,
  dialogTitle,
  dialogDescription,
  isLoading,
  isError,
  errorMsg,
  isRequest,
  addRequest,
  editRequest,
  deleteRequest,
  eventIsLoading,
  handleGoToTicketsPage,
  resetErrors,
  setAddRequest,
  setEditRequest,
  setRequest
}: AlertDialogProps) {
  const buttonClass = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const handleProceed = (): void => {
    setOpen(false);
    prevStep !== undefined && prevStep();
    history.push('/admin');
  };

  const handleCancel = (): void => {
    setOpen(false);
    prevStep !== undefined && prevStep();
  };

  const goBack = (): void => {
    resetErrors();
    setAddRequest !== undefined && setAddRequest(false);
    setEditRequest !== undefined && setEditRequest(false);
    setRequest !== undefined && setRequest(false);

    if (isRequest) {
      handleCancel();
    } else {
      setOpen(false);
    }
  }

  const handleSuccessButton = (): void => {
    if (isRequest) {
      handleGoToTicketsPage !== undefined && handleGoToTicketsPage();
    } else {
      setOpen(false);
      history.push('/admin/events');
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        {isRequest || addRequest || editRequest || deleteRequest ?
          isLoading || eventIsLoading ?
            <DialogContent>
              <Grid container direction='row' justify='center' alignItems='center'>
                <Container maxWidth='lg'>
                  <CircularProgress />
                </Container>
                <DialogContentText id='alert-dialog-description'>Loading</DialogContentText>
              </Grid>
            </DialogContent> :
            isError ?
              <>
                <DialogTitle id='alert-dialog-title'>{displayErrorMessage(errorMsg as string, isRequest, addRequest, editRequest, deleteRequest, t)}</DialogTitle>
                <DialogContent>
                  <DialogActions>
                    <Button onClick={goBack} color='primary' autoFocus className={`${buttonClass.mainButtonStyle} ${buttonClass.pinkGradientButtonStyle} ${buttonClass.buttonSize}`}>
                      OK
                    </Button>
                  </DialogActions>
                </DialogContent>
              </> :
              <>
                <DialogTitle id='alert-dialog-title'>
                  {isRequest ? t("successMsg.successfulBuy") : addRequest ? t("successMsg.successfulAdd") : editRequest ? t("successMsg.successfulEdit") : t("successMsg.successfulDelete")}
                </DialogTitle>
                <DialogContent>
                  <DialogActions>
                    <Button onClick={handleSuccessButton} color='primary' autoFocus className={`${buttonClass.mainButtonStyle} ${buttonClass.pinkGradientButtonStyle} ${buttonClass.buttonSize}`}>
                      OK
                  </Button>
                  </DialogActions>
                </DialogContent>
              </> :
          <>
            <DialogTitle id='alert-dialog-title'>{dialogTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>{dialogDescription}</DialogContentText>
            </DialogContent>
            <DialogActions>
              {msgUndo === t('welcome.popupMsgCancelUndo') ? (
                <Button onClick={handleProceed} color='primary'>
                  {t('welcome.popupMsgContinueUndo')}
                </Button>
              ) : null}
              <Button onClick={handleCancel} color='primary' autoFocus>
                {msgUndo}
              </Button>
            </DialogActions>
          </>
        }
      </Dialog>
    </>
  );
}
