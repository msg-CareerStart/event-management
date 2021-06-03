import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface DialogProps {
  open: boolean;
  handleClose: () => void;
}

const DialogExport = (props: DialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={props.open}>
      <DialogTitle>{t('files.errorTitle')}</DialogTitle>

      <DialogContent>
        <DialogContentText>{t('files.errorExportDialog')}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          {t('files.errorButton')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogExport;
