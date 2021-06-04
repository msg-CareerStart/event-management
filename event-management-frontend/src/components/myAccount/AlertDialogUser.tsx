import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStyles } from '../../styles/CommonStyles';
import { useTranslation } from 'react-i18next';

interface AlertDialogUserProps {
  // isRequest: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  setRequest: (request: boolean) => void;
  isError: boolean;
}

export default function AlertDialogUser({ open, setRequest, setOpen, isError }: AlertDialogUserProps) {
  const { t } = useTranslation();
  const buttonClass = useStyles();

  const handleCancel = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {isError ? (
          <>
            <DialogTitle id="alert-dialog-title">{t('welcome.userDialogErrorTitle')}</DialogTitle>
            <DialogContent>{t('welcome.userDialogErrorText')}</DialogContent>
            <DialogActions>
              <Button onClick={handleCancel} color="primary">
                OK
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogTitle id="alert-dialog-title">{t('welcome.userDialogSuccesTitle')}</DialogTitle>
            <DialogContent>{t('welcome.userDialogSuccesText')}</DialogContent>
            <DialogActions>
              <Button onClick={handleCancel} color="primary">
                OK
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
